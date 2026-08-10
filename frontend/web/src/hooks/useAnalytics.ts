"use client";

import * as React from "react";

type EventName = 
  | "APP_OPENED"
  | "USER_REGISTERED"
  | "ONBOARDING_STARTED"
  | "ONBOARDING_COMPLETED"
  | "LOGIN_SUCCESS";

export function useAnalytics() {
  const trackEvent = React.useCallback((eventName: EventName, properties?: Record<string, any>) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics Track]: ${eventName}`, properties);
    }
    // TODO: Integrate actual provider (PostHog/Mixpanel) later
  }, []);

  const identifyUser = React.useCallback((userId: string, traits?: Record<string, any>) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics Identify]: ${userId}`, traits);
    }
  }, []);

  return { trackEvent, identifyUser };
}
