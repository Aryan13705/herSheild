import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@hershield/server";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({
      req,
      resHeaders: new Headers(),
    }),
  });

export { handler as GET, handler as POST };
