import { Hono } from "hono";
import { auth } from "./config";
import { deviceService } from "../services/DeviceService";
import { requireAuth } from "../middleware/auth";
import { requirePolicy } from "../middleware/rbac";

export const authRouter = new Hono();

// 1. Mount Better Auth Natively
// This handles /api/auth/sign-in, /api/auth/sign-up, /api/auth/sign-out, etc.
authRouter.all("/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// 2. Custom Identity Routes (Extending Better Auth)
// Devices Management
const devicesRouter = new Hono();
devicesRouter.use("*", requireAuth);

devicesRouter.get("/", async (c) => {
  const user = c.get("user");
  const devices = await deviceService.getDevicesForUser(user.id);
  return c.json({ devices });
});

devicesRouter.delete("/:id", requirePolicy("delete", "Profile"), async (c) => {
  const user = c.get("user");
  const deviceId = c.req.param("id");
  await deviceService.revokeDevice(deviceId, user.id);
  return c.json({ success: true });
});

authRouter.route("/devices", devicesRouter);

export default authRouter;
