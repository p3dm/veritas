import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { V0Provider } from "@/lib/context";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ThemeToggle } from "@/components/theme-toggle";

const V0Setup = dynamic(() => import("@/components/ui/v0-setup"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const arcuata = localFont({
  src: "../font/ArcuataTrial-Medium.otf",
  variable: "--font-arcuata",
  weight: "500",
  style: "normal",
  display: "swap",
});


const isV0 = process.env['VERCEL_URL']?.includes('vusercontent.net') ?? false

export const metadata: Metadata = {
  title: {
    template: "%s | VeritasEnglish®",
    default: "VeritasEnglish",
  },
  description: "Learn with Truth, Succeed with Proof",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const isDark = theme === "dark";
  return (
    <ClerkProvider>
      <html lang="en" className={cn(isDark && "dark")} data-theme={isDark ? "night" : "light"}>
        <body className={cn(geistSans.variable, geistMono.variable, arcuata.variable, "antialiased")}>
          <V0Provider isV0={isV0}>
            <header>
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <ThemeToggle />
            </header>
            {children}
            {isV0 && <V0Setup />}
          </V0Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
