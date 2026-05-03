<template>
  <AuthLayout>
    <div class="grid gap-6 w-full max-w-sm p-8 bg-white border border-stone-200 rounded-xl shadow-sm">
      <h1 class="text-2xl font-bold text-center text-stone-900">登入</h1>
      <form class="grid gap-4" @submit.prevent="handleLogin">
        <div class="grid gap-1.5">
          <label class="text-sm text-stone-500">Email</label>
          <InputText v-model="email" type="email" placeholder="your@email.com" required fluid />
        </div>
        <div class="grid gap-1.5">
          <label class="text-sm text-stone-500">密碼</label>
          <Password v-model="password" placeholder="••••••••" :feedback="false" toggleMask required fluid />
        </div>
        <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
        <Button type="submit" :loading="loading" label="登入" fluid />
      </form>
      <p class="text-center text-sm text-stone-500">
        還沒有帳號？
        <RouterLink to="/register" class="font-semibold text-orange-600 underline">註冊</RouterLink>
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
