import { users, User } from '../db/schema'
import { db } from '../sqlite-service'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const newUser: User = {
      ...body,
    }
    const result = db.insert(users).values(newUser).run()
    return { result, newUser }
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: e instanceof Error ? e.message : 'An unknown error occurred.',
    })
  }
})
