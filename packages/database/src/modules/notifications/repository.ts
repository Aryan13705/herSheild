import { BaseRepository } from "../../repositories/base";
import { notifications } from "./tables";
import { eq } from "drizzle-orm";
import { db } from "../../client";

export class NotificationRepository extends BaseRepository<typeof notifications, typeof notifications.$inferInsert, typeof notifications.$inferSelect> {
  constructor() {
    super(notifications);
  }

  async getUnreadForUser(userId: string) {
    return db.select().from(this.table).where(
      eq(this.table.userId, userId)
    ).where(eq(this.table.isRead, false));
  }
}

export const notificationRepository = new NotificationRepository();
