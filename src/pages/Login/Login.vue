<template>
  <AuthLayout>
    <div class="grid gap-6 w-full max-w-sm p-8 border border-gray-200 rounded-xl">
      <h1 class="text-2xl font-bold text-center">登入</h1>
      <form class="grid gap-4" @submit.prevent="handleLogin">
        <div class="grid gap-1.5">
          <label class="text-sm text-gray-500">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            required
            class="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500 transition-colors"
          />
        </div>
        <div class="grid gap-1.5">
          <label class="text-sm text-gray-500">密碼</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            class="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500 transition-colors"
          />
        </div>
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
        <button
          type="submit"
          :disabled="loading"
          class="py-2.5 bg-zinc-900 text-white text-sm rounded-md hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {{ loading ? '登入中...' : '登入' }}
        </button>
      </form>
      <p class="text-center text-sm text-gray-500">
        還沒有帳號？
        <RouterLink to="/register" class="font-semibold text-zinc-900">註冊</RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (err) { error.value = err.message; return }
  router.push('/')
}
</script>
