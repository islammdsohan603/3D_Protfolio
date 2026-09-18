import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MD. SOHAN | Full-Stack Engineer & Creative Technologist",
  description:
    "Portfolio of MD. SOHAN — Full-Stack Engineer & Creative Technologist specializing in Next.js, React, TypeScript, Node.js, MongoDB, Three.js, and modern interactive architectures.",
  keywords: [
    "MD. SOHAN",
    "Creative Technologist",
    "Full-Stack Engineer",
    "Next.js Architect",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "Three.js",
    "Awwwards Portfolio",
  ],
  authors: [{ name: "MD. SOHAN" }],
  openGraph: {
    title: "MD. SOHAN | Full-Stack Engineer & Creative Technologist",
    description:
      "Interactive portfolio of MD. SOHAN — Full-Stack Engineer & Creative Technologist specializing in scalable web systems and creative experiences.",
    url: "https://my-nextjs-protfolio.vercel.app/",
    siteName: "MD. SOHAN",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-slate-100 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-black transition-colors duration-300">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
