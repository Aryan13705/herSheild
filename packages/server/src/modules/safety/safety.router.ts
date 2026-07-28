import { router } from "../../trpc/init";
import { contactsRouter } from "./contacts.router";
import { cardRouter } from "./card.router";
import { reportsRouter } from "./reports.router";
import { preferencesRouter } from "./preferences.router";
import { checkinsRouter } from "./checkins.router";

export const safetyRouter = router({
  contacts: contactsRouter,
  card: cardRouter,
  reports: reportsRouter,
  preferences: preferencesRouter,
  checkins: checkinsRouter,
});
