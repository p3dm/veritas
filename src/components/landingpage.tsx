"use client";

import { Background } from "./ui/background";
import { Heading } from "./ui/heading";
import { Footer } from "./ui/footer";

export function LandingPage() {
  return (
    <main className="p-inset h-[100dvh] w-full">
      <div className="relative h-full w-full">
        <Background src="/bg2.mp4" />
        <Heading />
        <Footer />
      </div>
    </main>
  );
}
