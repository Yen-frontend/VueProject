<template>
  <AppLayout>
    <div class="grid gap-10 text-center">
      <h1 class="text-2xl font-bold text-stone-900">功能清單</h1>
      <div class="grid grid-cols-3 gap-3">
        <RouterLink to="/page-a">
          <Button label="待辦清單" outlined fluid />
        </RouterLink>
        <RouterLink to="/page-b">
          <Button label="頁面 B" outlined fluid />
        </RouterLink>
        <RouterLink to="/page-c">
          <Button label="頁面 C" outlined fluid />
        </RouterLink>
      </div>
      <div class="flex justify-center">
        <Button label="登出" severity="danger" text @click="handleLogout" />
      </div>
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
