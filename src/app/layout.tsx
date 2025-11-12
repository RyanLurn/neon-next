import type { Metadata } from "next";

import { Geist_Mono, Geist } from "next/font/google";

import "@/app/globals.css";
import { ModeToggle } from "@/components/utilities/mode-toggle";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  description: "An opinionated starter template for Next.js",
  title: "Next.js Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ModeToggle className="fixed top-3 right-3 z-50" />
          <div className="h-dvh">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
