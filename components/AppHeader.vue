<script setup>
import { useUser } from '~/composables/states'

const appConfig = useAppConfig()
const user = useUser()

async function logOut() {
  localStorage.removeItem('user')
  user.value = null
  await navigateTo('/sign-up')
}

</script>

<template>
  <div class="h-16 flex items-center border-b">
    <UContainer class="flex w-full justify-between items-center">
      <a
        class="flex gap-1 items-center"
        href="/"
      >
        <img
          class="h-5 w-auto"
          src="~/assets/globe.png"
          alt="Your Company"
        >
        <h1 class="font-semibold p-2">{{ appConfig.brand }}</h1>
      </a>
      <div
        v-if="!user"
        class="text-sm grid grid-flow-col gap-8 px-4"
      >
        <ULink to="/login">
          Login
        </ULink>
        <ULink to="/sign-up">
          Sign up
        </ULink>
      </div>
      <div v-else>
        <UButton @click="logOut">
          Log out
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
