"use client";

import { motion } from "motion/react";
import ProgressBar from "./progress-bar";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function OnboardingHeader({
  currentStep,
  totalSteps,
  stepLabels,
}: OnboardingHeaderProps) {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b"
    >
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
      />
    </motion.header>
  );
}
