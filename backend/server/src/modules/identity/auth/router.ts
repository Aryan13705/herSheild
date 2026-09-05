import { Hono } from "hono";
import { auth } from "./config";
import { deviceService } from "../services/DeviceService";
import { requireAuth } from "../middleware/auth";
import { requirePolicy } from "../middleware/rbac";

export const authRouter = new Hono();

// Firebase handles authentication natively on the client.
// This router is used for custom identity routes.

// 2. Custom Identity Routes (Extending Better Auth)
// Devices Management
const devicesRouter = new Hono();
devicesRouter.use("*", requireAuth);

devicesRouter.get("/", async (c) => {
  const user = (c as any).get("user");
  const devices = await deviceService.getDevicesForUser(user.id);
  return c.json({ devices });
});

devicesRouter.delete("/:id", requirePolicy("delete", "Profile"), async (c) => {
  const user = (c as any).get("user");
  const deviceId = c.req.param("id")!;
  await deviceService.revokeDevice(deviceId, user.id);
  return c.json({ success: true });
});

authRouter.route("/devices", devicesRouter);

export default authRouter;
