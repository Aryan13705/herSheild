import { BaseRepository } from "../../repositories/base";
import { users } from "./tables";
import { eq, isNull } from "drizzle-orm";
import { db } from "../../client";

export class UserRepository extends BaseRepository<typeof users, typeof users.$inferInsert, typeof users.$inferSelect> {
  constructor() {
    super(users);
  }

  async findByEmail(email: string) {
    const results = await db.select().from(this.table).where(
      eq(this.table.email, email)
    );
    return results[0];
  }

  async findActiveUsers() {
    // Only return users who are not soft deleted
    return db.select().from(this.table).where(isNull(this.table.deletedAt));
  }
}

export const userRepository = new UserRepository();
