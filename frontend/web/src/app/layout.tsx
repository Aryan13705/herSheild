import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CurrentUserProvider } from "../context/CurrentUserContext";
import { ErrorBoundary } from "../components/boundaries/ErrorBoundary";
import { NetworkBoundary } from "../components/boundaries/NetworkBoundary";
import { OfflineIndicator } from "../components/OfflineIndicator";
import { TRPCProvider } from "../components/providers/TRPCProvider";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { ServiceWorkerRegistry } from "../components/ServiceWorkerRegistry";
import { AppGuardianOverlay } from "../components/AppGuardianOverlay";
import { PerformanceMonitor } from "../components/PerformanceMonitor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "HerShield | Travel with a guardian, always.",
  description: "HerShield watches your route, checks in on you, and alerts your circle if something feels off.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PerformanceMonitor />
        <OfflineIndicator />
        <ServiceWorkerRegistry />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCProvider>
            <NetworkBoundary>
              <ErrorBoundary>
                <CurrentUserProvider>
                  <AppGuardianOverlay>
                    {children}
                  </AppGuardianOverlay>
                </CurrentUserProvider>
              </ErrorBoundary>
            </NetworkBoundary>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
