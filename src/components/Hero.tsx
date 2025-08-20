import * as React from "react";
import Navbar from "@/components/ui/navbar";
import { Background } from '@/components/ui/background';
import { Footer } from '@/components/ui/footer';
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

const Hero = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Navbar />
      <Background src="/bg2.mp4" />
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>
      <Footer />
    </div>
  )
}
export default Hero