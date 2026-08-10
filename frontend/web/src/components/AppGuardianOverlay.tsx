"use client";

import React from "react";
import { GuardianOverlay } from "@hershield/feature-companion";
import { useCurrentUser } from "../context/CurrentUserContext";

export function AppGuardianOverlay({ children }: { children: React.ReactNode }) {
  const { user } = useCurrentUser();
  
  // Extract the first name if available
  const firstName = user?.name ? user.name.split(' ')[0] : undefined;

  return (
    <GuardianOverlay userName={firstName}>
      {children}
    </GuardianOverlay>
  );
}
