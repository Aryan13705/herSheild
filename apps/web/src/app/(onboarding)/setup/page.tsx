"use client";

import * as React from "react";
import { Button, Card, CardContent } from "@hershield/ui";

// Mock state machine for onboarding
type SetupStep = "WELCOME" | "EMERGENCY_CONTACTS" | "PERMISSIONS" | "COMPLETE";

export default function OnboardingSetupPage() {
  const [step, setStep] = React.useState<SetupStep>("WELCOME");

  const nextStep = () => {
    if (step === "WELCOME") setStep("EMERGENCY_CONTACTS");
    else if (step === "EMERGENCY_CONTACTS") setStep("PERMISSIONS");
    else if (step === "PERMISSIONS") setStep("COMPLETE");
  };

  if (step === "COMPLETE") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[var(--color-safety-safe)] flex items-center justify-center text-white mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">You're all set</h1>
        <p className="text-[var(--color-text-secondary)]">Your guardians are configured and HerShield is ready.</p>
        <Button className="w-full mt-8" onClick={() => window.location.href = "/"}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pt-12">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[var(--color-brand-primary)]">
            Step {step === "WELCOME" ? 1 : step === "EMERGENCY_CONTACTS" ? 2 : 3} of 3
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--color-surface-card)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-brand-primary)] transition-all duration-300"
            style={{ width: step === "WELCOME" ? "33%" : step === "EMERGENCY_CONTACTS" ? "66%" : "100%" }}
          />
        </div>
      </div>

      <Card className="flex-1 bg-transparent border-0 shadow-none">
        <CardContent className="p-0">
          {step === "WELCOME" && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Let's set up your safety network</h1>
              <p className="text-[var(--color-text-secondary)]">Before you start traveling, we need to configure your emergency contacts and permissions.</p>
            </div>
          )}

          {step === "EMERGENCY_CONTACTS" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Add a Guardian</h1>
              <p className="text-[var(--color-text-secondary)]">Guardians will be notified if you trigger an SOS or fail to check in.</p>
              
              <div className="space-y-2 mt-6">
                <input
                  type="text"
                  placeholder="Guardian's Name"
                  className="flex h-12 w-full rounded-md border border-[var(--color-surface-card-hover)] bg-[var(--color-surface-bg)] px-3 py-2 text-sm focus:ring-[var(--color-brand-primary)]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="flex h-12 w-full rounded-md border border-[var(--color-surface-card-hover)] bg-[var(--color-surface-bg)] px-3 py-2 text-sm focus:ring-[var(--color-brand-primary)]"
                />
              </div>
            </div>
          )}

          {step === "PERMISSIONS" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Location Permissions</h1>
              <p className="text-[var(--color-text-secondary)]">HerShield needs background location access to monitor your safe zones and alert guardians.</p>
              
              <div className="p-4 mt-6 border border-[var(--color-surface-card-hover)] rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Background Location</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">Required for safety monitoring</p>
                </div>
                <Button variant="outline" size="sm">Allow</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-auto pt-8">
        <Button className="w-full" size="lg" onClick={nextStep}>
          {step === "PERMISSIONS" ? "Finish Setup" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
