"use client";

import * as React from "react";

export function NetworkBoundary({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = React.useState(false);

  React.useEffect(() => {
    function handleOnline() { setIsOffline(false); }
    function handleOffline() { setIsOffline(true); }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-safety-warning)] text-[var(--color-surface-bg)] px-4 py-2 text-sm font-medium text-center shadow-md flex items-center justify-center space-x-2">
          <span>You are currently offline. Some features may be unavailable.</span>
        </div>
      )}
      {children}
    </>
  );
}
