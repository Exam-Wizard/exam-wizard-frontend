"use client";

// import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  fallback: ["Helvetica Neue", "sans-serif"],
});

// export const metadata: Metadata = {
//   title: "Exam Wizard",
//   description: "Smart Exam Management System",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          {children}
          <Toaster theme="light" richColors />
        </Providers>
      </body>
    </html>
  );
}
