import { relations } from "drizzle-orm";
import { aiConversations, aiMessages, aiUsage, aiFeedback, aiEmbeddings } from "./tables";
import { users } from "../iam/tables";

export const aiConversationsRelations = relations(aiConversations, ({ one, many }) => ({
  user: one(users, {
    fields: [aiConversations.userId],
    references: [users.id],
  }),
  messages: many(aiMessages),
  feedback: many(aiFeedback),
}));

export const aiMessagesRelations = relations(aiMessages, ({ one }) => ({
  conversation: one(aiConversations, {
    fields: [aiMessages.conversationId],
    references: [aiConversations.id],
  }),
}));

export const aiUsageRelations = relations(aiUsage, ({ one }) => ({
  user: one(users, {
    fields: [aiUsage.userId],
    references: [users.id],
  }),
}));

export const aiFeedbackRelations = relations(aiFeedback, ({ one }) => ({
  conversation: one(aiConversations, {
    fields: [aiFeedback.conversationId],
    references: [aiConversations.id],
  }),
}));
