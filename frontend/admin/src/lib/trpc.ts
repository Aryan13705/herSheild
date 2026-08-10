import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@hershield/server";

export const trpc = createTRPCReact<AppRouter>();
