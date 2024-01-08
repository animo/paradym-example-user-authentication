<script setup lang="ts">
import { useUser } from '~/composables/states'

import type { FormError } from '#ui/types'

useHead({
  title: 'Sign up'
})

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()

const user = useUser()
const toast = useToast()
const intervalId = ref()
const state = reactive({
  name: undefined,
  email: undefined,
  isLoading: false,
  status: 'form',
  executionId: '',
  invitationUrl: '',
  connectionId: '',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'This field is required.' })
  if (!state.email) errors.push({ path: 'email', message: 'This field is required.' })
  return errors
}

async function onSubmit() {
  state.isLoading = true

  // User email is used as FK, so first check if user email already exists.
  const userExists = await $fetch(`/api/users/${state.email}`)

  if (userExists.user) {
    toast.add({ title: 'Email already exists. Please use a different email.' })
    state.isLoading = false
    return
  }

  // Start the sign up workflow after validation
  const signInRes = await $fetch(`/api/start/${runtimeConfig.public.SIGN_UP_WORKFLOW_ID}`, {
    method: 'POST',
    body: {
      name: state.name,
      email: state.email,
    },
  })

  // Save the execution id to keep track of workflow status
  state.executionId = signInRes.id
}


const fetchStatus = async () => {
  const res = await $fetch(`/api/status/${state.executionId}`)

  // We create a connection and render the QR-code in the client.
  // Workflow will automatically continue after the QR is scanned and the connection is set up.
  if (res.status === 'waitingForTrigger' && Object.keys(res.actions).length === 1) {
    state.isLoading = false
    state.invitationUrl = res.actions.createConnection.output.invitationUrl
    state.status = 'connect'
  }

  // Credential has been issued (2nd action) and we can now render a message to the user
  // prompting them to accept the credential notification in their wallet.
  if (res.status === 'waitingForTrigger' && Object.keys(res.actions).length === 2) {
    state.status = 'credentialIssued'
  }

  // Credential has been successfully issued and sign up process is completed.
  if (res.status === 'completed') {
    state.status = 'completed'
    state.connectionId = res.actions.createConnection.output.connection.connectionId
    await onCompleted()
  }
}

async function onCompleted() {
  // Save the new user in the data storage, including the connectionId for future interactions.
  const usr = await $fetch('/api/users', {
    method: 'POST',
    body: {
      email: state.email,
      name: state.name,
      connectionId: state.connectionId,
    },
  })

  // Add user to state and redirect to dashboard
  user.value = usr.newUser
  await navigateTo('/')
}

// To keep this demo simple, we use polling to periodically check on the status of the execution
// This can be improved by using Webhooks (https://docs.paradym.id/working-with-executions/using-webhooks)
onMounted(async () => {
  intervalId.value = setInterval(async () => {
    if (state.executionId && !user.value) await fetchStatus()
  }, 2000)
})

onUnmounted(async () => {
  clearInterval(intervalId.value)
})

// Clear the interval if user exists
watch(
  () => user.value,
  () => clearInterval(intervalId.value)
)

</script>

<template>
  <UContainer>
    <UCard class="p-8 max-w-md mx-auto overflow-hidden">
      <div>
        <img
          class="mx-auto h-10 w-auto"
          src="~/assets/globe.png"
          alt="Your Company"
        >
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for a {{ appConfig.brand }} account
        </h2>
      </div>

      <transition
        class="mt-10 h-64"
        name="fade"
        mode="out-in"
      >
        <div
          v-if="state.status === 'form'"
          key="form"
        >
          <UForm
            :validate="validate"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormGroup
              label="Name"
              name="name"
            >
              <UInput v-model="state.name" />
            </UFormGroup>
            <UFormGroup
              label="Email"
              name="email"
            >
              <UInput
                v-model="state.email"
                type="email"
              />
            </UFormGroup>
            <UButton
              :loading="state.isLoading"
              type="submit"
              class="flex w-full justify-center"
            >
              Sign up
            </UButton>
          </UForm>
          <p class="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            {{ ' ' }}
            <ULink
              active-class="text-primary"
              inactive-class="font-semibold text-primary hover:text-primary-600"
              to="/login"
            >
              Log in
            </ULink>
          </p>
        </div>
        <div
          v-else-if="state.status === 'connect'"
          key="connect"
          class="flex gap-8 flex-col justify-center items-center"
        >
          <QrCode :value="state.invitationUrl" />
          <p>
            Use the
            <ULink
              active-class="text-primary"
              inactive-class="font-semibold text-primary hover:text-primary-600"
              to="https://docs.paradym.id/integrating-with-a-holder-wallet/paradym-wallet"
              target="_blank"
            >
              Paradym wallet
            </ULink>
            to scan the QR code.
          </p>
        </div>
        <div
          v-else
          key="credentialIssued"
          class="grid text-center items-center justify-center h-64 w-full mx-auto"
        >
          <p>Accept the credential in your wallet to complete the sign up process.</p>
        </div>
      </transition>
    </UCard>
  </UContainer>
</template>
