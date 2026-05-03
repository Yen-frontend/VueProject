<template>
  <AuthLayout>
    <div class="grid gap-6 w-full max-w-sm p-8 border border-gray-200 rounded-xl">
      <h1 class="text-2xl font-bold text-center">註冊</h1>
      <form class="grid gap-4" @submit.prevent="handleRegister">
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
            placeholder="至少 6 個字元"
            required
            class="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500 transition-colors"
          />
        </div>
        <div class="grid gap-1.5">
          <label class="text-sm text-gray-500">確認密碼</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="再輸入一次密碼"
            required
            class="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-500 transition-colors"
          />
        </div>
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>
        <button
          type="submit"
          :disabled="loading"
          class="py-2.5 bg-zinc-900 text-white text-sm rounded-md hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {{ loading ? '註冊中...' : '註冊' }}
        </button>
      </form>
      <p class="text-center text-sm text-gray-500">
        已有帳號？
        <RouterLink to="/login" class="font-semibold text-zinc-900">登入</RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../../lib/supabase'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout.vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  success.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = '兩次密碼不一致'
    return
  }
  loading.value = true
  const { error: err } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (err) { error.value = err.message; return }
  success.value = '註冊成功！請至信箱確認驗證信。'
}
</script>
