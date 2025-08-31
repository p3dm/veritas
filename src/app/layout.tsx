import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Veritas English",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

const arcuataSerif = localFont({
  src: [
    {
      path: "../../public/fonts/Arcuata-Regular.otf",
      weight: "400",
    },
  ],
  variable: "--font-arcuata-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${arcuataSerif.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
