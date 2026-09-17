import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MD. SOHAN ISLAM | Elite Full-Stack & 3D Web Specialist",
  description:
    "Interactive 3D portfolio web application of MD. SOHAN ISLAM — Full-Stack Web Developer, Next.js Architect, Programming Hero Blackbelt Developer. Specializing in React, Next.js, TypeScript, Node.js, MongoDB, and Three.js.",
  keywords: [
    "MD. SOHAN ISLAM",
    "Sohan Islam",
    "Full-Stack Web Developer",
    "Next.js Developer",
    "Programming Hero Blackbelt",
    "3D Web Specialist",
    "React Developer",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "MERN Stack",
  ],
  authors: [{ name: "MD. SOHAN ISLAM" }],
  openGraph: {
    title: "MD. SOHAN ISLAM | Elite Full-Stack & 3D Web Specialist",
    description:
      "Interactive 3D portfolio web application of MD. SOHAN ISLAM. Recognized Programming Hero Blackbelt Developer.",
    url: "https://my-nextjs-protfolio.vercel.app/",
    siteName: "MD. SOHAN ISLAM Portfolio",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}>
      <body className="bg-[#09090b] text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
