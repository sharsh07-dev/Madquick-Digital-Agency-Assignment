// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider"; // <-- IMPORT IT

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secure Vault",
  description: "Your Personal Password Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider> {/* <-- WRAP HERE */}
      </body>
    </html>
  );
}