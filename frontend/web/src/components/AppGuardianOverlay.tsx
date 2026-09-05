"use client";

import React from "react";
import { GuardianOverlay } from "@hershield/feature-companion";
import { useCurrentUser } from "../context/CurrentUserContext";
import { auth } from "../lib/auth-client";

export function AppGuardianOverlay({ children }: { children: React.ReactNode }) {
  const { user } = useCurrentUser();
  
  // Extract the first name if available
  const firstName = user?.name ? user.name.split(' ')[0] : undefined;
  const getAuthHeaders = async () => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return {};
    }

    return {
      authorization: `Bearer ${token}`,
    };
  };

  return (
    <GuardianOverlay userName={firstName} getAuthHeaders={getAuthHeaders}>
      {children}
    </GuardianOverlay>
  );
}
