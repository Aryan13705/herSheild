"use client";

import * as React from "react";
import { auth, firebaseConfigError } from "../lib/auth-client";
import { onAuthStateChanged, User } from "firebase/auth";

export type OnboardingStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN" | "GUARDIAN";
  permissions: string[];
  onboardingStatus: OnboardingStatus;
  preferences: {
    theme: "light" | "dark" | "system";
    notifications: boolean;
    locationSharing: "always" | "while_using" | "never";
  };
}

interface CurrentUserContextType {
  user: CurrentUser | null;
  isLoading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const CurrentUserContext = React.createContext<CurrentUserContextType | undefined>(undefined);

export function CurrentUserProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: CurrentUser | null;
}) {
  const [firebaseUser, setFirebaseUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!auth) {
      setError(new Error(firebaseConfigError || "Firebase auth is unavailable."));
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setIsLoading(false);
    }, (err) => {
      setError(err);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Map Firebase user to our CurrentUser type
  const user = React.useMemo<CurrentUser | null>(() => {
    if (!firebaseUser) return initialUser;
    
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      name: firebaseUser.displayName || "",
      role: "USER",
      permissions: [],
      onboardingStatus: "NOT_STARTED",
      preferences: {
        theme: "system",
        notifications: true,
        locationSharing: "while_using"
      }
    };
  }, [firebaseUser, initialUser]);

  const refetchUser = React.useCallback(async () => {
    // With Firebase, the SDK automatically manages the session, but we can force a token refresh if needed
    if (auth?.currentUser) {
      await auth.currentUser.getIdToken(true);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user, isLoading, error, refetchUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = React.useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
}
