"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

interface SplashScreenProps {
  message: string;
  emoji: string;
  onComplete: () => void;
}

const particles = ["✨", "🎉", "⭐", "🌟", "💫", "🎊"];

export default function SplashScreen({
  message,
  emoji,
  onComplete,
}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); // Show for 1.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(12px)" }}
        className="absolute inset-0"
        style={{ backdropFilter: "blur(12px)" }}
      />

      {/* Floating particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300,
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
          className="absolute text-2xl pointer-events-none"
        >
          {particle}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: 1,
            delay: 0.4,
          }}
          className="text-8xl mb-4"
        >
          {emoji}
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-4xl font-bold text-foreground mb-2"
        >
          {message}
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto max-w-32"
        />
      </motion.div>
    </motion.div>
  );
}
