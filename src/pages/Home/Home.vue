<template>
  <AppLayout>
    <div class="grid gap-10 text-center">
      <h1 class="text-2xl font-bold">功能清單</h1>
      <div class="grid grid-cols-3 gap-3">
        <RouterLink to="/page-a">
          <button class="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-sm">
            待辦清單
          </button>
        </RouterLink>
        <RouterLink to="/page-b">
          <button class="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-sm">
            頁面 B
          </button>
        </RouterLink>
        <RouterLink to="/page-c">
          <button class="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-sm">
            頁面 C
          </button>
        </RouterLink>
      </div>
      <button
        class="mx-auto px-4 py-1.5 text-sm border border-gray-300 rounded-md text-gray-400 hover:bg-red-50 hover:border-red-300 hover:text-red-400 transition-colors cursor-pointer"
        @click="handleLogout"
      >
        登出
      </button>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { logout } from '../../lib/auth'
import AppLayout from '../../layouts/AppLayout/AppLayout.vue'

const router = useRouter()

async function handleLogout() {
  await logout()
  router.push('/login')
}
</script>
