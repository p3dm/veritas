"use client";
import { useEffect, useState, useRef } from "react";
import { Button, buttonVariants } from "./button";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Overview } from "@/lib/data/overview";
import { Courses } from "@/lib/data/courses";
import { Pricing } from "@/lib/data/pricing";
import { Contact } from "@/lib/data/contact";
import { AlignHorizontalDistributeEndIcon } from "lucide-react";

const DURATION = 0.3;
const DELAY = DURATION;
const EASE_OUT = "easeOut";
const EASE_IN = "easeIn";
// const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const;
const SPRING = {
  type: "spring" as const,
  damping: 20,
  mass: 0.8,
};

export const Heading = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sectionActive, setSectionActive] = useState("overview");
  const isInitialRender = useRef(true);

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
        transition={{ duration: DURATION, ease: EASE_IN }}
      >
        {!isOpen && (
          <motion.h1
            layoutId="title"
            className="font-arcuata items-center text-5xl short:lg:text-8xl sm:text-8xl lg:text-9xl text-foreground"
          >
            Veritas English
          </motion.h1>
        )}
      </motion.div>
      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresence>
          <motion.div
            layout="position"
            transition={SPRING}
            key="button"
            className={
              isOpen ? "absolute bottom-15 left-1/2 -translate-x-1/2" : "mt-6"
            }
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
                <div className="flex items-center gap-4 text-foreground/80 text-sm">
                  <div>
                    <Button
                      variant={sectionActive === "overview" ? "link" : "ghost"}
                      size="sm"
                      onClick={() => setSectionActive("overview")}
                    >
                      Overview
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant={sectionActive === "courses" ? "link" : "ghost"}
                      size="sm"
                      onClick={() => setSectionActive("courses")}
                    >
                      Courses
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant={sectionActive === "pricing" ? "link" : "ghost"}
                      size="sm"
                      onClick={() => setSectionActive("pricing")}
                    >
                      Pricing
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant={sectionActive === "contact" ? "link" : "ghost"}
                      size="sm"
                      onClick={() => setSectionActive("contact")}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
                <div className="h-6 w-px bg-border/50" />
                <div>
                  <Button variant="link" size="sm">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                </div>
                <div>
                  <Button variant="link" size="sm">
                    <Link href="/auth/sign-up">Sign up</Link>
                  </Button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
        {isOpen && (
          <motion.article
            key="article"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{
              duration: 0.2,
              ease: EASE_OUT,
            }}
            className="relative flex min-h-0 flex-shrink overflow-hidden text-sm md:text-base max-h-[calc(70dvh-var(--footer-safe-area))] flex-col gap-8 text-center backdrop-blur-xl text-balance border-2 border-border/50 bg-primary/20 max-w-3xl text-foreground rounded-3xl ring-1 ring-offset-primary/10 ring-border/10 ring-offset-2 shadow-button"
          >
            <article className="relative overflow-y-auto italic p-6 h-full [&_p]:my-4">
              {sectionActive === "overview" && <Overview />}
              {sectionActive === "courses" && <Courses />}
              {sectionActive === "pricing" && <Pricing />}
              {sectionActive === "contact" && <Contact />}
            </article>
          </motion.article>
        )}
      </div>
    </div>
  );
};
