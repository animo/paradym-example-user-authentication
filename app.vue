<script setup lang="ts">
const appConfig = useAppConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appConfig.brand}` : appConfig.brand;
  }
})

const user = useUser()

onMounted(async () => {
  // Replenish user from local storage
  const localUser = localStorage.getItem('user')
  if (localUser) {
    user.value = JSON.parse(localUser)
    navigateTo('/')
  }
})

</script>

<template>
  <div class="font-[Lato] overflow-hidden isolate bg-gray-50 relative h-screen w-screen justify-between flex flex-col">
    <BackgroundBlur />
    <AppHeader />
    <div class="flex items-center justify-center grow">
      <NuxtPage />
    </div>
    <AppFooter />
  </div>
  <UNotifications />
</template>

<style>
.page-enter-active,
.page-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}

.fade-enter-from,
.fade-leave-to,
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>