"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface AvatarStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const avatarOptions = [
  { id: "student", emoji: "🧑‍🎓", label: "Student" },
  { id: "teacher", emoji: "👩‍🏫", label: "Teacher" },
  { id: "scientist", emoji: "🧑‍🔬", label: "Scientist" },
  { id: "artist", emoji: "🧑‍🎨", label: "Artist" },
  { id: "engineer", emoji: "👷", label: "Engineer" },
  { id: "explorer", emoji: "🧭", label: "Explorer" },
  { id: "wizard", emoji: "🧙‍♂️", label: "Wizard" },
  { id: "astronaut", emoji: "🧑‍🚀", label: "Astronaut" },
  { id: "detective", emoji: "🕵️", label: "Detective" },
];

export default function AvatarStep({
  data,
  updateData,
  onNext,
  onPrev,
}: AvatarStepProps) {
  const selectAvatar = (avatarId: string) => {
    updateData({ avatar: avatarId });
  };

  const canProceed = data.avatar !== null;

  const getBottomText = () => {
    if (!data.avatar) {
      return {
        main: "Choose an avatar to represent your learning journey",
        sub: "Pick one that resonates with your personality! 🌟",
      };
    } else {
      const selectedAvatar = avatarOptions.find((a) => a.id === data.avatar);
      return {
        main: `${selectedAvatar?.emoji} ${selectedAvatar?.label} selected!`,
        sub: `Perfect choice, ${data.firstName}! Your avatar looks great 🎉`,
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
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Choose your learning avatar!
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Pick an avatar that represents your learning journey 🌟
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8"
          >
            {avatarOptions.map((avatar, index) => (
              <motion.div
                key={avatar.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 text-center ${
                    data.avatar === avatar.id
                      ? "ring-2 ring-primary bg-primary/5 border-primary"
                      : "hover:bg-card/80 border-border"
                  }`}
                  onClick={() => selectAvatar(avatar.id)}
                >
                  <div className="text-6xl mb-3">{avatar.emoji}</div>
                  <h3 className="font-semibold text-card-foreground mb-2">
                    {avatar.label}
                  </h3>
                  {data.avatar === avatar.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-primary text-xl"
                    >
                      ✓ Selected!
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {data.avatar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="bg-card p-6 rounded-xl border border-border inline-block">
                <p className="text-lg font-medium text-card-foreground mb-2">
                  Great choice, {data.firstName}! 🎉
                </p>
                <div className="text-4xl mb-2">
                  {avatarOptions.find((a) => a.id === data.avatar)?.emoji}
                </div>
                <p className="text-sm text-muted-foreground">
                  Your {avatarOptions.find((a) => a.id === data.avatar)?.label}{" "}
                  avatar is ready!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
            Continue
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
