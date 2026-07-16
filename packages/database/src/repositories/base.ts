import { db } from "../client";
import { eq, inArray, sql } from "drizzle-orm";
import type { PgTable, TableConfig } from "drizzle-orm/pg-core";

/**
 * Shared BaseRepository to avoid duplicated CRUD logic.
 */
export class BaseRepository<
  TTable extends PgTable<TableConfig>,
  TInsert extends Record<string, any>,
  TSelect extends Record<string, any>
> {
  constructor(protected readonly table: TTable) {}

  async findById(id: string): Promise<TSelect | undefined> {
    const results = await db.select().from(this.table).where(eq((this.table as any).id, id));
    return results[0] as TSelect | undefined;
  }

  async findMany(ids: string[]): Promise<TSelect[]> {
    if (ids.length === 0) return [];
    const results = await db.select().from(this.table).where(inArray((this.table as any).id, ids));
    return results as TSelect[];
  }

  async create(data: TInsert): Promise<TSelect> {
    const results = await db.insert(this.table).values(data).returning();
    return results[0] as TSelect;
  }

  async update(id: string, data: Partial<TInsert>): Promise<TSelect | undefined> {
    const results = await db
      .update(this.table)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq((this.table as any).id, id))
      .returning();
    return results[0] as TSelect | undefined;
  }

  async softDelete(id: string): Promise<void> {
    await db
      .update(this.table)
      .set({ deletedAt: sql`now()` } as any)
      .where(eq((this.table as any).id, id));
  }

  async hardDelete(id: string): Promise<void> {
    await db.delete(this.table).where(eq((this.table as any).id, id));
  }
}
