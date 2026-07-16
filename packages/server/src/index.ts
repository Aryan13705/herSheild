import { Hono } from "hono";

const app = new Hono().basePath("/api/v1");

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    message: "HerShield API is running",
    timestamp: new Date().toISOString(),
  });
});

export type AppType = typeof app;
export { app };
