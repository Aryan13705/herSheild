import { router, protectedProcedure } from "../../trpc/init";
import { DashboardService } from "./dashboard.service";

const dashboardService = new DashboardService();

export const dashboardRouter = router({
  getOptimizedPayload: protectedProcedure.query(async ({ ctx }) => {
    return dashboardService.getOptimizedDashboardPayload(ctx.user.id);
  }),
});
