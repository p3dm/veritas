"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface ProfileCustomizationStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const themes = [
  {
    id: "default",
    name: "Classic",
    emoji: "📚",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "nature",
    name: "Nature",
    emoji: "🌿",
    color: "bg-green-50 border-green-200",
  },
  {
    id: "space",
    name: "Space",
    emoji: "🚀",
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: "ocean",
    name: "Ocean",
    emoji: "🌊",
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "🌅",
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌲",
    color: "bg-emerald-50 border-emerald-200",
  },
];

const learningGoals = [
  "Master new skills for career growth 💼",
  "Explore topics I'm passionate about 💡",
  "Prepare for exams or certifications 📝",
  "Learn for personal enrichment 🌟",
  "Stay curious and keep learning 🧠",
  "Build expertise in my field 🎯",
];

export default function ProfileCustomizationStep({
  data,
  updateData,
  onNext,
  onPrev,
}: ProfileCustomizationStepProps) {
  const selectTheme = (themeId: string) => {
    updateData({ theme: themeId });
  };

  const canProceed = data.learningGoal.trim().length > 0;

  const getBottomText = () => {
    const hasTheme = data.theme !== "default";
    const hasGoal = data.learningGoal.trim().length > 0;

    if (!hasTheme && !hasGoal) {
      return {
        main: "Choose a theme and set your learning goal",
        sub: "Personalize your experience to make learning more engaging! ✨",
      };
    } else if (hasTheme && !hasGoal) {
      const selectedTheme = themes.find((t) => t.id === data.theme);
      return {
        main: `${selectedTheme?.emoji} ${selectedTheme?.name} theme selected!`,
        sub: "Now tell us about your learning goals to complete setup 🎯",
      };
    } else if (!hasTheme && hasGoal) {
      return {
        main: "Learning goal set! Choose a theme to finish",
        sub: "Pick a visual theme that inspires your learning journey 🎨",
      };
    } else {
      const selectedTheme = themes.find((t) => t.id === data.theme);
      return {
        main: `All set with ${selectedTheme?.name} theme and your goal!`,
        sub: "Perfect! You&rsquo;re ready to start your personalized learning journey 🚀",
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
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Customize your experience!
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Choose a theme and tell us about your learning goals ✨
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* ... existing theme selection ... */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-center mb-4">
                Pick your favorite theme 🎭
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 text-center ${
                        data.theme === theme.id
                          ? "ring-2 ring-primary bg-primary/5 border-primary"
                          : `${theme.color} hover:shadow-md`
                      }`}
                      onClick={() => selectTheme(theme.id)}
                    >
                      <div className="text-3xl mb-2">{theme.emoji}</div>
                      <h4 className="font-medium text-card-foreground">
                        {theme.name}
                      </h4>
                      {data.theme === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-primary text-lg mt-1"
                        >
                          ✓
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ... existing learning goal section ... */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card p-6 rounded-xl border border-border"
            >
              <Label className="text-lg font-semibold mb-4 block">
                What&rsquo;s your main learning goal? 🎯
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {learningGoals.map((goal, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => updateData({ learningGoal: goal })}
                    className={`p-3 text-left rounded-lg border transition-all duration-200 hover:scale-105 ${
                      data.learningGoal === goal
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-muted hover:bg-muted/80 border-border"
                    }`}
                  >
                    {goal}
                  </motion.button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customGoal" className="text-sm">
                  Or write your own goal:
                </Label>
                <Textarea
                  id="customGoal"
                  placeholder="Tell us what you want to achieve... 💭"
                  value={data.learningGoal}
                  onChange={(e) => updateData({ learningGoal: e.target.value })}
                  className="min-h-[100px] transition-all duration-200 focus:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t p-6"
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button
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
            Finish Setup
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
