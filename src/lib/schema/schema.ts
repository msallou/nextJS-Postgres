// lib/schema/schema.ts
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 255 }),
});
