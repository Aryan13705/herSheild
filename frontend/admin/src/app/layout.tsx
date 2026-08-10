import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";
import { TRPCProvider } from "@/components/providers/TRPCProvider";
import { Shield, Activity, Map, Users, Settings, LogOut, Bell } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HerShield Admin | Command Center",
  description: "Administrative portal for HerShield emergency management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f172a] text-slate-300 min-h-screen flex`}>
        <TRPCProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </TRPCProvider>
      </body>
    </html>
  );
}
