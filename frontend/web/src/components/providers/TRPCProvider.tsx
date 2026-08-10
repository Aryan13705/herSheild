"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "../../lib/trpc";
import { auth } from "../../lib/auth-client";
import superjson from "superjson";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false, // Prevent aggressive refetching on app switch
        retry: 1, // Don't retry 3 times on failure
      },
    },
  }));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          async headers() {
            const user = auth.currentUser;
            if (user) {
              const token = await user.getIdToken();
              return {
                authorization: `Bearer ${token}`,
              };
            }
            return {};
          },
          // superjson is typically used here if we configure it on the server
          // transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
