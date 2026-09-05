import { Hono } from "hono";
import { authRouter } from "./modules/identity/auth/router";

export const app = new Hono();

// Mount all routers
app.route("/", authRouter);
