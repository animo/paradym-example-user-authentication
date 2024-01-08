const runtimeConfig = useRuntimeConfig()

// Subset of the Request Presentation with an Invitation Action
// https://docs.paradym.id/building-a-workflow/actions/verify-credentials#request-presentation-with-an-invitation
type RequestPresentationType = {
  invitation: {
    invitationUrl: string
  }
  presentationExchange: {
    anoncreds: {
      presentation: {
        attributes: {
          value: {
            name: string
            email: string
          }
        }[]
      }
    }
  }
}

// Subset of the Create Connection Action
// https://docs.paradym.id/building-a-workflow/actions/connections#create-connection
type CreateConnectionType = {
  invitationUrl: string
  connection: {
    connectionId: string
    status: string
  }
}

type StatusReturnType = {
  status: 'created' | 'running' | 'waitingForTrigger' | 'failed' | 'completed'
  actions: {
    createPresentationRequestInvitation: {
      output: RequestPresentationType
    }
    createConnection: {
      output: CreateConnectionType
    }
  }
}

export default defineEventHandler(async (event): Promise<StatusReturnType> => {
  try {
    const id = event.context.params?.id as string

    const res = await fetch(`${runtimeConfig.public.PARADYM_URL}/executions/${id}`, {
      method: 'GET',
      headers: {
        'x-access-token': runtimeConfig.PARADYM_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    const actionResult = await res.json()

    return {
      status: actionResult.status,
      actions: actionResult.payload.actions,
    }
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: e instanceof Error ? e.message : 'An unknown error occurred.',
    })
  }
})
