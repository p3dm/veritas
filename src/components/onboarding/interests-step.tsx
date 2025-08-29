"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface InterestsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const interests = [
  {
    id: "math",
    label: "Mathematics",
    emoji: "🔢",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
  },
  {
    id: "science",
    label: "Science",
    emoji: "🔬",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
  },
  {
    id: "history",
    label: "History",
    emoji: "📜",
    color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
  },
  {
    id: "literature",
    label: "Literature",
    emoji: "📚",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
  },
  {
    id: "art",
    label: "Art & Design",
    emoji: "🎨",
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
  },
  {
    id: "music",
    label: "Music",
    emoji: "🎵",
    color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200",
  },
  {
    id: "coding",
    label: "Programming",
    emoji: "💻",
    color: "bg-gray-50 hover:bg-gray-100 border-gray-200",
  },
  {
    id: "languages",
    label: "Languages",
    emoji: "🌍",
    color: "bg-teal-50 hover:bg-teal-100 border-teal-200",
  },
  {
    id: "business",
    label: "Business",
    emoji: "💼",
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
  },
];

export default function InterestsStep({
  data,
  updateData,
  onNext,
  onPrev,
}: InterestsStepProps) {
  const toggleInterest = (interestId: string) => {
    const newInterests = data.interests.includes(interestId)
      ? data.interests.filter((id) => id !== interestId)
      : [...data.interests, interestId];

    updateData({ interests: newInterests });
  };

  const canProceed = data.interests.length >= 1;

  const getBottomText = () => {
    if (data.interests.length === 0) {
      return {
        main: "Choose at least one subject to continue",
        sub: "Don't worry, you can always change these later! 🌟",
      };
    } else if (data.interests.length === 1) {
      return {
        main: `${data.interests.length} interest selected`,
        sub: "Great start! Feel free to add more subjects you're curious about ✨",
      };
    } else if (data.interests.length <= 3) {
      return {
        main: `${data.interests.length} interests selected`,
        sub: "Perfect balance! You're building a well-rounded learning journey 🎯",
      };
    } else {
      return {
        main: `${data.interests.length} interests selected`,
        sub: "Wow! You're truly curious about the world. That's the spirit of learning! 🚀",
      };
    }
  };

  const bottomText = getBottomText();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center p-6 pt-20">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              What sparks your curiosity?
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Choose the subjects that excite you most! You can always add more
              later ✨
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    data.interests.includes(interest.id)
                      ? "ring-2 ring-primary bg-primary/5 border-primary"
                      : interest.color
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl">{interest.emoji}</div>
                    <h3 className="font-semibold text-card-foreground">
                      {interest.label}
                    </h3>
                    {data.interests.includes(interest.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary text-2xl"
                      >
                        ✓
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t p-6"
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {bottomText.main}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {bottomText.sub}
            </p>
          </div>

          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
