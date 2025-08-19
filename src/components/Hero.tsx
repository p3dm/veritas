import React from 'react'
import Navbar from "@/components/ui/Navbar";
import { Background } from './ui/background';
import { Newsletter } from './ui/newsletter';
import { Footer } from './ui/footer';

const Hero = () => {
  return (
    <>
      <Background src="/bg2.mp4" />
      <Newsletter />
      <Footer />
    </>
  )
}
export default Hero