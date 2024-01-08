<script setup lang="ts">
import { useUser } from '~/composables/states'
import { capitalizeFirstLetter } from '~/components/utils'

import { BanknotesIcon, CheckBadgeIcon, ClockIcon, UsersIcon } from '@heroicons/vue/24/outline'

useHead({
  title: 'Dashboard'
})

// Add auth middleware so that his page is restricted for authenticated users
definePageMeta({
  middleware: ['auth'],
})

const user = useUser()
const name = capitalizeFirstLetter(user.value?.name ?? 'Stranger')

// Dashboard dummy data
const stats = [
  { label: 'Current Balance', value: '€5,200' },
  { label: 'Savings Balance', value: '€12,300' },
  { label: 'Credit Card Limit', value: '€3,000' },
]

const actions = [
  {
    icon: ClockIcon,
    name: 'View Transaction History',
    href: '#',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    icon: CheckBadgeIcon,
    name: 'Manage Cards',
    href: '#',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    icon: UsersIcon,
    name: 'Contact Support',
    href: '#',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    icon: BanknotesIcon,
    name: 'Transfer Funds',
    href: '#',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
]

const announcements = [
  {
    id: 1,
    title: 'New Savings Plan Available',
    href: '#',
    preview:
      'Explore our new high-interest savings plan. Save more and earn more with competitive interest rates and flexible terms.',
  },
  {
    id: 2,
    title: 'Updated Banking Fees',
    href: '#',
    preview:
      'We’ve updated our banking fees. Please review the changes to stay informed about your account charges and benefits.',
  },
  {
    id: 3,
    title: 'Mobile App Update',
    href: '#',
    preview:
      'Our mobile banking app has been updated with new features for easier account management. Update now for a better banking experience.',
  },
]

</script>

<template>
  <UContainer class="h-full w-full items-center justify-center p-16">
    <main class="pb-8">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">
          Profile
        </h1>
        <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="profile-overview-title">
              <div class="overflow-hidden rounded-lg bg-white shadow">
                <h2
                  id="profile-overview-title"
                  class="sr-only"
                >
                  Profile Overview
                </h2>
                <div class="bg-white p-6">
                  <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="sm:flex sm:space-x-5">
                      <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p class="text-sm font-medium text-gray-600">
                          Welcome back,
                        </p>
                        <p class="text-xl font-bold text-gray-900 sm:text-2xl">
                          {{ name }}
                        </p>
                        <p class="text-sm font-medium text-gray-600">
                          Customer
                        </p>
                      </div>
                    </div>
                    <div class="mt-5 flex justify-center sm:mt-0">
                      <div
                        class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Profile
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
                >
                  <div
                    v-for="stat in stats"
                    :key="stat.label"
                    class="px-6 py-5 text-center text-sm font-medium"
                  >
                    <span class="text-gray-900">{{ stat.value }}</span>
                    {{ ' ' }}
                    <span class="text-gray-600">{{ stat.label }}</span>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="quick-links-title">
              <div
                class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0"
              >
                <h2
                  id="quick-links-title"
                  class="sr-only"
                >
                  Quick links
                </h2>
                <div
                  v-for="(action, actionIdx) in actions"
                  :key="action.name"
                  :class="[
                    actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                    actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                    'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500',
                  ]"
                >
                  <div>
                    <span
                      :class="[
                        action.iconBackground,
                        action.iconForeground,
                        'inline-flex rounded-lg p-3 ring-4 ring-white',
                      ]"
                    >
                      <component
                        :is="action.icon"
                        class="h-6 w-6"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div class="mt-8">
                    <h3 class="text-lg font-medium">
                      <a
                        :href="action.href"
                        class="focus:outline-none"
                      >
                        <span
                          class="absolute inset-0"
                          aria-hidden="true"
                        />
                        {{ action.name }}
                      </a>
                    </h3>
                    <p class="mt-2 text-sm text-gray-500">
                      Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at
                      blanditiis et quo et molestiae.
                    </p>
                  </div>
                  <span
                    class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <section aria-labelledby="announcements-title">
              <div class="overflow-hidden rounded-lg bg-white shadow">
                <div class="p-6">
                  <h2
                    id="announcements-title"
                    class="text-base font-medium text-gray-900"
                  >
                    Announcements
                  </h2>
                  <div class="mt-6 flow-root">
                    <ul
                      role="list"
                      class="-my-5 divide-y divide-gray-200"
                    >
                      <li
                        v-for="announcement in announcements"
                        :key="announcement.id"
                        class="py-5"
                      >
                        <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                          <h3 class="text-sm font-semibold text-gray-800">
                            <a
                              :href="announcement.href"
                              class="hover:underline focus:outline-none"
                            >
                              <span
                                class="absolute inset-0"
                                aria-hidden="true"
                              />
                              {{ announcement.title }}
                            </a>
                          </h3>
                          <p class="mt-1 line-clamp-2 text-sm text-gray-600">
                            {{ announcement.preview }}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="mt-6">
                    <div
                      class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      View all
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </UContainer>
</template>
