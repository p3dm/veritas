"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OnboardingFooterProps {
  onNext?: () => void;
  onPrev?: () => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  nextLabel?: string;
  bottomText?: string;
}

export default function OnboardingFooter({
  onNext,
  onPrev,
  canGoNext = true,
  canGoPrev = true,
  nextLabel = "Continue",
  bottomText,
}: OnboardingFooterProps) {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="sticky bottom-0 z-40 bg-background/80 backdrop-blur-sm border-t p-6"
    >
      <div className="max-w-2xl mx-auto">
        {bottomText && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground mb-4 text-sm"
          >
            {bottomText}
          </motion.p>
        )}

        <div className="flex justify-between items-center">
          {onPrev ? (
            <Button
              variant="outline"
              onClick={onPrev}
              disabled={!canGoPrev}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {onNext && (
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              {nextLabel}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.footer>
  );
}
