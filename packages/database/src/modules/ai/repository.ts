import { BaseRepository } from "../../repositories/base";
import { aiEmbeddings } from "./tables";
import { sql } from "drizzle-orm";
import { db } from "../../client";

export class AIRepository extends BaseRepository<typeof aiEmbeddings, typeof aiEmbeddings.$inferInsert, typeof aiEmbeddings.$inferSelect> {
  constructor() {
    super(aiEmbeddings);
  }

  async findSimilar(embedding: number[], targetType: string, limit: number = 5) {
    // Cosine similarity search using pgvector operator <=>
    const query = sql`
      SELECT id, target_id, target_type, embedding <=> ${JSON.stringify(embedding)} as distance
      FROM ${this.table}
      WHERE target_type = ${targetType}
      ORDER BY distance ASC
      LIMIT ${limit}
    `;
    const results = await db.execute(query);
    return results.rows;
  }
}

export const aiRepository = new AIRepository();
