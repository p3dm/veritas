"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, BookOpen, Target, User } from "lucide-react";
import type { OnboardingData } from "./onboarding-flow";

interface CompletionStepProps {
  data: OnboardingData;
}

export default function CompletionStep({ data }: CompletionStepProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const confettiEmojis = ["🎉", "🎊", "✨", "🌟", "🎯", "🚀", "💫", "🏆"];
  const avatarOptions = [
    { id: "student", emoji: "🧑‍🎓" },
    { id: "teacher", emoji: "👩‍🏫" },
    { id: "scientist", emoji: "🧑‍🔬" },
    { id: "artist", emoji: "🧑‍🎨" },
    { id: "engineer", emoji: "👷" },
    { id: "explorer", emoji: "🧭" },
    { id: "wizard", emoji: "🧙‍♂️" },
    { id: "astronaut", emoji: "🧑‍🚀" },
    { id: "detective", emoji: "🕵️" },
  ];

  const selectedAvatar = avatarOptions.find((a) => a.id === data.avatar);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiEmojis.map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2 + Math.random() * 3,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="text-center mb-8"
        >
          <div className="text-8xl mb-4 bounce-in">🎉</div>
          <h1 className="text-4xl font-bold text-primary mb-4 text-balance">
            Welcome to EduQuest, {data.firstName}!
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Your learning adventure is about to begin! 🚀
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50 border-primary/20">
            <User className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Your Avatar</h3>
            <div className="text-4xl mb-2">{selectedAvatar?.emoji}</div>
            <p className="text-sm text-muted-foreground">Ready to learn!</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50 border-primary/20">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Interests</h3>
            <p className="text-2xl mb-2">{data.interests.length}</p>
            <p className="text-sm text-muted-foreground">Topics to explore</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50 border-primary/20">
            <Target className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Learning Goal</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {data.learningGoal}
            </p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-card to-card/50 border-primary/20">
            <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Theme</h3>
            <p className="text-2xl mb-2">🎨</p>
            <p className="text-sm text-muted-foreground capitalize">
              {data.theme}
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-primary mb-2">
              🎯 Your Personalized Learning Path is Ready!
            </h3>
            <p className="text-muted-foreground">
              Based on your interests in{" "}
              <strong>{data.interests.join(", ")}</strong>, we've curated the
              perfect learning experience just for you!
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 pulse-glow hover:scale-105 transition-transform duration-200"
            >
              Start Learning Journey! 🚀
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-sm text-muted-foreground"
          >
            Get ready for an amazing educational adventure! 🌟
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
