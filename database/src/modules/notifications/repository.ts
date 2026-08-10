import { BaseRepository } from "../../repositories/base";
import { notifications } from "./tables";
import { eq } from "drizzle-orm";
import { db } from "../../client";

export class NotificationRepository extends BaseRepository<typeof notifications, typeof notifications.$inferInsert, typeof notifications.$inferSelect> {
  constructor() {
    super(notifications);
  }

  async getUnreadForUser(userId: string) {
    return db.select().from(this.table as any).where(
      and(eq((this.table as any).userId, userId), eq((this.table as any).isRead, false))
    );
  }
}

export const notificationRepository = new NotificationRepository();
