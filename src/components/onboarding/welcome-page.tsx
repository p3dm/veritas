"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Trophy, Users } from "lucide-react";

interface WelcomePageProps {
  onNext: () => void;
}

export default function WelcomePage({ onNext }: WelcomePageProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const emojis = ["🎉", "📚", "🌟", "🚀", "💡", "🎯", "✨", "🎊"];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating Emojis */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {emojis.map((emoji, index) => (
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
                repeatDelay: 3 + Math.random() * 2,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
          className="relative"
        >
          <div className="text-8xl mb-4 float-animation">🎓</div>
          <div className="absolute -top-4 -right-4 text-3xl">✨</div>
          <div className="absolute -bottom-2 -left-4 text-2xl">🌟</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold text-primary text-balance">
            Welcome to EduQuest! 🚀
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Get ready for an amazing learning adventure! We&apos;re excited to
            help you discover new knowledge and achieve your goals. Let&apos;s
            personalize your experience together! 🌈
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8"
        >
          {[
            { icon: BookOpen, label: "Learn", emoji: "📖" },
            { icon: Trophy, label: "Achieve", emoji: "🏆" },
            { icon: Users, label: "Connect", emoji: "👥" },
            { icon: Sparkles, label: "Grow", emoji: "🌱" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="text-2xl mb-2">{item.emoji}</div>
              <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-card-foreground">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="text-lg px-8 py-6 pulse-glow hover:scale-105 transition-transform duration-200"
          >
            Let&apos;s Get Started! 🎯
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-sm text-muted-foreground"
        >
          This will only take 2-3 minutes ⏰
        </motion.p>
      </div>
    </div>
  );
}
