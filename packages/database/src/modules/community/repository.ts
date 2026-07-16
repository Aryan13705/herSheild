import { BaseRepository } from "../../repositories/base";
import { posts } from "./tables";
import { desc, isNull } from "drizzle-orm";
import { db } from "../../client";

export class CommunityRepository extends BaseRepository<typeof posts, typeof posts.$inferInsert, typeof posts.$inferSelect> {
  constructor() {
    super(posts);
  }

  async getRecentPosts(limit: number = 20) {
    return db.query.posts.findMany({
      where: isNull(posts.deletedAt),
      orderBy: [desc(posts.createdAt)],
      limit,
      with: {
        user: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          }
        }
      }
    });
  }
}

export const communityRepository = new CommunityRepository();
