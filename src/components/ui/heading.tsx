"use client";
import { useEffect, useState, useRef } from "react";
import { Button, buttonVariants } from "./button";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Cross1Icon } from "@radix-ui/react-icons";

const DURATION = 0.3;
const DELAY = DURATION;
const EASE_OUT = "easeOut";
// const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const;
const SPRING = {
  type: "spring" as const,
  damping: 20,
  mass: 0.8,
};

export const Heading = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isInitialRender = useRef(false);

  useEffect(() => {
    return () => {
      isInitialRender.current = false;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex fixed overflow-hidden flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8">
      <motion.div
        layout="position"
        transition={{ duration: DURATION, ease: EASE_OUT }}
      >
        <motion.h1
          layoutId="title"
          className="font-arcuata items-center text-5xl short:lg:text-8xl sm:text-8xl lg:text-9xl text-foreground"
        >
          Veritas English
        </motion.h1>
      </motion.div>
      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresence>
          <motion.div
            layout="position"
            transition={SPRING}
            key="button"
            className={isOpen ? "my-6" : "mt-6"}
          >
            <Button
              className={cn("relative px-8 py-4 bottom-0")}
              onClick={() => setIsOpen(!isOpen)}
              shine={!isOpen}
            >
              <motion.span
                animate={{ x: isOpen ? -16 : 0 }}
                transition={{ duration: DURATION, ease: EASE_OUT }}
                className="inline-block"
              >
                Let&apos;s dive in
              </motion.span>

              {isOpen && (
                <motion.div
                  className={cn(
                    buttonVariants({ variant: "iconButton", size: "icon" }),
                    "absolute -top-px -right-px aspect-square bg-background",
                  )}
                  initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                >
                  <Cross1Icon className="size-5 text-foreground" />
                </motion.div>
              )}
            </Button>
          </motion.div>

          {isOpen && (
            <motion.nav
              key="nav"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: DURATION, ease: EASE_OUT }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="flex items-center absolute top-6 left-1/2 -translate-x-1/2 gap-6 px-6 py-3 rounded-full border border-border bg-background/70 backdrop-blur-xl ring-1 ring-border shadow-button">
                <motion.h1
                  layoutId="title"
                  transition={SPRING}
                  className="font-arcuata italic text-xl text-foreground"
                >
                  VeritasEnglish
                </motion.h1>
                <div className="h-6 w-px bg-border/50" />
                <ul className="flex items-center gap-4 text-foreground/80 text-sm">
                  <li>
                    <button
                      className={buttonVariants({
                        variant: "link",
                        size: "sm",
                      })}
                    >
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      className={buttonVariants({
                        variant: "link",
                        size: "sm",
                      })}
                    >
                      Courses
                    </button>
                  </li>
                  <li>
                    <button
                      className={buttonVariants({
                        variant: "link",
                        size: "sm",
                      })}
                    >
                      Pricing
                    </button>
                  </li>
                  <li>
                    <button
                      className={buttonVariants({
                        variant: "link",
                        size: "sm",
                      })}
                    >
                      Contact
                    </button>
                  </li>
                  <li>
                    <button
                      className={buttonVariants({
                        variant: "link",
                        size: "sm",
                      })}
                    >
                      <Link href="/auth/login">Login</Link>
                    </button>
                  </li>
                  <li>
                    <button
                      className={buttonVariants({
                        variant: "link",
                        size: "sm",
                      })}
                    >
                      <Link href="/auth/sign-up">Sign up</Link>
                    </button>
                  </li>
                </ul>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
