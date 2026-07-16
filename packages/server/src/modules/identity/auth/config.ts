import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, schema } from "@hershield/database";
import { identityService } from "../services/IdentityService";
import { sessionService } from "../services/SessionService";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      // Map Better Auth's expected internal schema to our highly customized database
      user: schema.users,
      session: schema.userSessions,
      // account and verification tables can map to standard tables or be added to iam schema. 
      // Assuming drizzleAdapter handles creation if they don't exist, or we can use generic names.
    }
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Initialize identity components in a pseudo-transaction hook
          await identityService.initializeIdentity(user.id, user.email);
        }
      }
    },
    session: {
      create: {
        after: async (session) => {
          // Better auth handles the session insertion natively, 
          // we use this hook to sync to our cache and trigger audit logs.
          await sessionService.syncSession(session.token, session.userId);
        }
      }
    }
  }
});
