"use client";

import { motion } from "motion/react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  stepLabels,
}: ProgressBarProps) {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-4">
      {/* Step indicators */}
      <div className="flex justify-between items-center mb-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: index <= currentStep ? 1 : 0.8,
                opacity: index <= currentStep ? 1 : 0.5,
                backgroundColor:
                  index <= currentStep
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted))",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full mb-1"
            />
            {stepLabels && stepLabels[index] && (
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={{ opacity: index <= currentStep ? 1 : 0.5 }}
                className="text-xs text-muted-foreground hidden sm:block"
              >
                {stepLabels[index]}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />

        {/* Animated shimmer effect */}
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      {/* Progress text */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <motion.span
          key={progress}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm font-medium text-primary"
        >
          {Math.round(progress)}% Complete
        </motion.span>
      </div>
    </div>
  );
}
