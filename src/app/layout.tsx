import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.className} antialiased`}>
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
            <header className="p-4 border-b flex items-center gap-3">
              <SignedOut>
                <Link href="/sign-in">Sign in</Link>
                <Link href="/sign-up">Sign up</Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
