"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import WelcomePage from "./welcome-page";
import InterestsStep from "./interests-step";
import PersonalInfoStep from "./personal-info-step";
import AvatarStep from "./avatar-step";
import ProfileCustomizationStep from "./profile-customization-step";
import CompletionStep from "./completion-step";
import SplashScreen from "./splash-screen";
import OnboardingHeader from "./onboarding-header";

export type OnboardingData = {
  interests: string[];
  firstName: string;
  lastName: string;
  age: string;
  avatar: string | null;
  theme: string;
  learningGoal: string;
};

const steps = [
  "welcome",
  "interests",
  "personal-info",
  "avatar",
  "profile-customization",
  "completion",
] as const;

type Step = (typeof steps)[number];

const splashMessages = {
  interests: { message: "Great choice!", emoji: "🎯" },
  "personal-info": { message: "Getting to know you!", emoji: "👋" },
  avatar: { message: "Looking good!", emoji: "✨" },
  "profile-customization": { message: "Almost there!", emoji: "🚀" },
  completion: { message: "You're all set!", emoji: "🎉" },
};

const stepLabels = [
  "Welcome",
  "Interests",
  "Info",
  "Avatar",
  "Profile",
  "Done",
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [showSplash, setShowSplash] = useState(false);
  const [pendingStep, setPendingStep] = useState<Exclude<
    Step,
    "welcome"
  > | null>(null);
  const [data, setData] = useState<OnboardingData>({
    interests: [],
    firstName: "",
    lastName: "",
    age: "",
    avatar: null,
    theme: "default",
    learningGoal: "",
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStepName = steps[currentIndex + 1];

      // Skip splash for welcome -> interests and show splash for other transitions
      if (currentStep === "welcome") {
        setCurrentStep(nextStepName);
      } else {
        setPendingStep(nextStepName as Exclude<Step, "welcome">);
        setShowSplash(true);
      }
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (pendingStep) {
      setCurrentStep(pendingStep);
      setPendingStep(null);
    }
  };

  const renderStep = () => {
    const stepProps = {
      data,
      updateData,
      onNext: nextStep,
      onPrev: prevStep,
    };

    switch (currentStep) {
      case "welcome":
        return <WelcomePage onNext={nextStep} />;
      case "interests":
        return <InterestsStep {...stepProps} />;
      case "personal-info":
        return <PersonalInfoStep {...stepProps} />;
      case "avatar":
        return <AvatarStep {...stepProps} />;
      case "profile-customization":
        return <ProfileCustomizationStep {...stepProps} />;
      case "completion":
        return <CompletionStep data={data} />;
      default:
        return <WelcomePage onNext={nextStep} />;
    }
  };

  const currentStepIndex = steps.indexOf(currentStep);
  const showHeader = currentStep !== "welcome" && currentStep !== "completion";

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && (
        <OnboardingHeader
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          stepLabels={stepLabels}
        />
      )}

      <main className="flex-1 bg-gradient-to-br from-background via-card to-muted overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showSplash && pendingStep && splashMessages[pendingStep] && (
          <SplashScreen
            message={splashMessages[pendingStep].message}
            emoji={splashMessages[pendingStep].emoji}
            onComplete={handleSplashComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
