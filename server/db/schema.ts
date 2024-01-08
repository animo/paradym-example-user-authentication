import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  email: text('email').primaryKey(),
  name: text('name'),
  connectionId: text('connectionId'),
})

export type User = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>
