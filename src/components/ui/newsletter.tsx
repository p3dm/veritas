"use client";

import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "./button";
import { FormNewsletter } from "./form-newsletter";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import { inputVariants } from "./input";
import { useIsV0 } from "@/lib/context";

const DURATION = 0.3;
const DELAY = DURATION;
const EASE_OUT = "easeOut";
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const;
const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8,
};

export const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8">
      <motion.div
        layout="position"
        transition={{ duration: DURATION, ease: EASE_OUT }}
      >
        <motion.h1
          layoutId="newsletter-title"
          className="font-arcuata text-5xl italic short:lg:text-8xl sm:text-8xl lg:text-9xl text-foreground"
        >
          VeritasEnglish
        </motion.h1>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceGuard>
          {!isOpen && (
            <motion.div
              key="newsletter"
              initial={isInitialRender.current ? false : "hidden"}
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  y: -150,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full max-w-xl md:gap-6 lg:gap-8">
                <FormNewsletter
                  input={(props) => (
                    /* @ts-expect-error - Type mismatch */
                    <motion.input
                      autoCapitalize="off"
                      autoComplete="email"
                      placeholder="Enter your email"
                      className={inputVariants()}
                      initial={isInitialRender.current ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: DURATION,
                          ease: EASE_OUT_OPACITY,
                        },
                      }}
                      transition={{
                        duration: DURATION,
                        ease: EASE_OUT,
                        delay: DELAY,
                      }}
                      {...props}
                    />
                  )}
                  submit={(props) => (
                    /* @ts-expect-error - Type mismatch */
                    <motion.button
                      className={buttonVariants({
                        variant: "iconButton",
                        size: "icon-xl",
                      })}
                      {...props}
                      initial={isInitialRender.current ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: DURATION,
                          ease: EASE_OUT_OPACITY,
                        },
                      }}
                      transition={{
                        duration: DURATION,
                        ease: EASE_OUT,
                        delay: DELAY,
                      }}
                    >
                      <ArrowRightIcon className="w-4 h-4 text-current" />
                    </motion.button>
                  )}
                />
                <motion.p
                  initial={isInitialRender.current ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                  }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                  className="text-base short:lg:text-lg sm:text-lg lg:text-xl !leading-[1.1] font-medium text-center text-foreground text-pretty"
                >
                  Stay updated with the latest news and exclusive content!
                  Subscribe to our newsletter today and never miss out on
                  exciting updates.
                </motion.p>
              </div>
            </motion.div>
          )}

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
                Let's dive in
              </motion.span>

              {isOpen && (
                <motion.div
                  className={cn(
                    buttonVariants({ variant: "iconButton", size: "icon" }),
                    "absolute -top-px -right-px aspect-square"
                  )}
                  initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                >
                  <Cross1Icon className="size-5 text-primary-foreground" />
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
              <div className="flex items-center absolute top-6 left-1/2 -translate-x-1/2 gap-6 px-6 py-3 rounded-full border border-border/50 bg-background/70 backdrop-blur-xl ring-1 ring-border/10 shadow-button">
                <motion.h1
                  layoutId="newsletter-title"
                  transition={SPRING}
                  className="font-arcuata italic text-xl text-foreground"
                >
                  VeritasEnglish
                </motion.h1>
                <div className="h-6 w-px bg-border/50" />
                <ul className="flex items-center gap-4 text-foreground/80 text-sm">
                  <li>
                    <button className={buttonVariants({ variant: "link", size: "sm" })}>Overview</button>
                  </li>
                  <li>
                    <button className={buttonVariants({ variant: "link", size: "sm" })}>Courses</button>
                  </li>
                  <li>
                    <button className={buttonVariants({ variant: "link", size: "sm" })}>Pricing</button>
                  </li>
                  <li>
                    <button className={buttonVariants({ variant: "link", size: "sm" })}>Contact</button>
                  </li>
                </ul>
              </div>
            </motion.nav>
          )}
        </AnimatePresenceGuard>
      </div>
    </div>
  );
};

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  const isV0 = useIsV0();

  return isV0 ? <>{children}</> : <AnimatePresence mode="popLayout" propagate>{children}</AnimatePresence>;
};
