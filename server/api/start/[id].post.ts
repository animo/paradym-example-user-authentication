const runtimeConfig = useRuntimeConfig()

// Return the identifier of the execution that is created in Paradym
type StartWorkflowReturnType = {
  id: string
}

export default defineEventHandler(async (event): Promise<StartWorkflowReturnType> => {
  try {
    const workflowId = event.context.params?.id as string
    const body = await readBody(event)

    const res = await fetch(`${runtimeConfig.public.PARADYM_URL}/executions`, {
      method: 'POST',
      headers: {
        'x-access-token': runtimeConfig.PARADYM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflowId,
        input: { ...body },
      }),
    })

    const response = await res.json()

    return {
      id: response.id,
    }
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: e instanceof Error ? e.message : 'An unknown error occurred.',
    })
  }
})
