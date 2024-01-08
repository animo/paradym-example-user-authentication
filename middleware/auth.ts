import { useUser } from '~/composables/states'

export default defineNuxtRouteMiddleware(() => {
  const user = useUser()

  if (!user.value) {
    return navigateTo('/sign-up')
  }
})
