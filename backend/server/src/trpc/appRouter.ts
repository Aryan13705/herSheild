import { router } from "./init";
import { authTrpcRouter } from "../modules/identity/auth/trpc";
import { tripsRouter } from "../modules/travel/trips.router";
import { dashboardRouter } from "../modules/travel/dashboard.router";
import { mapsRouter } from "../modules/maps/maps.router";
import { safetyRouter } from "../modules/safety/safety.router";
import { aiRouter } from "../modules/ai/ai.router";
import { profileRouter } from "../modules/profile/profile.router";
import { intelligenceRouter } from "../modules/intelligence/intelligence.router";

export const appRouter = router({
  auth: authTrpcRouter,
  trips: tripsRouter,
  dashboard: dashboardRouter,
  maps: mapsRouter,
  safety: safetyRouter,
  ai: aiRouter,
  profile: profileRouter,
  intelligence: intelligenceRouter,
});

export type AppRouter = typeof appRouter;
