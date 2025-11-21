import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OnboardingWrapper from "@/components/OnboardingWrapper";
import LowBalanceWarning from "@/components/LowBalanceWarning";
import { LowBalanceWarningProvider } from "@/hooks/useLowBalanceWarning";
import { ToastProvider } from "@/components/ToastNotification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Play and Pay - Pay-as-you-watch Micro-payments",
  description: "Blockchain-based SaaS for real-time micro-payments for digital content using Algorand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LowBalanceWarningProvider>
          <ToastProvider>
            <OnboardingWrapper>
              {children}
              <LowBalanceWarning />
            </OnboardingWrapper>
          </ToastProvider>
        </LowBalanceWarningProvider>
      </body>
    </html>
  );
}
