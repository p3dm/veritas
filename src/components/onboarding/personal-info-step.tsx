"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface PersonalInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PersonalInfoStep({
  data,
  updateData,
  onNext,
  onPrev,
}: PersonalInfoStepProps) {
  const canProceed = data.firstName.trim() && data.lastName.trim() && data.age;

  const getBottomText = () => {
    const filledFields = [
      data.firstName.trim(),
      data.lastName.trim(),
      data.age,
    ].filter(Boolean).length;

    if (filledFields === 0) {
      return {
        main: "Please fill in your information to continue",
        sub: "We'll use this to personalize your learning experience 🌟",
      };
    } else if (filledFields === 1) {
      return {
        main: "Great start! Please complete the remaining fields",
        sub: "Just a few more details and we'll be all set ✨",
      };
    } else if (filledFields === 2) {
      return {
        main: "Almost there! One more field to go",
        sub: "You're doing great! Just one more step 🚀",
      };
    } else {
      return {
        main: `Welcome ${data.firstName}! Ready to continue?`,
        sub: "All set! Let's move on to the next step 🎉",
      };
    }
  };

  const bottomText = getBottomText();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center p-6 pt-20">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4 float-animation">👋</div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Nice to meet you!
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Tell us a bit about yourself so we can personalize your experience
              🌟
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 bg-card p-8 rounded-xl border border-border shadow-lg"
          >
            {/* ... existing form fields ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name 📝
                </Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={data.firstName}
                  onChange={(e) => updateData({ firstName: e.target.value })}
                  className="transition-all duration-200 focus:scale-105"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name 📝
                </Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={data.lastName}
                  onChange={(e) => updateData({ lastName: e.target.value })}
                  className="transition-all duration-200 focus:scale-105"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Age Range 🎂</Label>
              <Select
                value={data.age}
                onValueChange={(value) => updateData({ age: value })}
              >
                <SelectTrigger className="transition-all duration-200 focus:scale-105">
                  <SelectValue placeholder="Select your age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="13-17">13-17 years old 🧒</SelectItem>
                  <SelectItem value="18-24">18-24 years old 🎓</SelectItem>
                  <SelectItem value="25-34">25-34 years old 💼</SelectItem>
                  <SelectItem value="35-44">35-44 years old 🏡</SelectItem>
                  <SelectItem value="45-54">45-54 years old 🌟</SelectItem>
                  <SelectItem value="55+">55+ years old 🌺</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {data.firstName && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20"
              >
                <p className="text-primary font-medium">
                  Hello {data.firstName}! 👋 Welcome to the EduQuest family! 🎉
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t p-6"
      >
        <div className="max-w-2xl mx-auto flex justify-between items-center">
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
