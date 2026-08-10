import { handle } from "hono/vercel";
import { authRouter } from "@hershield/server";

export const GET = handle(authRouter);
export const POST = handle(authRouter);
export const PUT = handle(authRouter);
export const PATCH = handle(authRouter);
export const DELETE = handle(authRouter);
