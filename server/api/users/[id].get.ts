import { users } from '../../db/schema'
import { db } from '../../sqlite-service'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // get id as function parameter from route params
    const email = event.context.params?.id as string
    const usersResp = db.select().from(users).where(eq(users.email, email)).get()
    return { user: usersResp }
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: e instanceof Error ? e.message : 'An unknown error occurred.',
    })
  }
})
