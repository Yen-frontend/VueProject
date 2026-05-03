<template>
  <AuthLayout>
    <div class="grid gap-6 w-full max-w-sm p-8 bg-white border border-stone-200 rounded-xl shadow-sm">
      <h1 class="text-2xl font-bold text-center text-stone-900">註冊</h1>
      <form class="grid gap-4" @submit.prevent="handleRegister">
        <div class="grid gap-1.5">
          <label class="text-sm text-stone-500">Email</label>
          <InputText v-model="email" type="email" placeholder="your@email.com" required fluid />
        </div>
        <div class="grid gap-1.5">
          <label class="text-sm text-stone-500">密碼</label>
          <Password v-model="password" placeholder="至少 6 個字元" :feedback="false" toggleMask required fluid />
        </div>
        <div class="grid gap-1.5">
          <label class="text-sm text-stone-500">確認密碼</label>
          <Password v-model="confirmPassword" placeholder="再輸入一次密碼" :feedback="false" toggleMask required fluid />
        </div>
        <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
        <Message v-if="success" severity="success" :closable="false">{{ success }}</Message>
        <Button type="submit" :loading="loading" label="註冊" fluid />
      </form>
      <p class="text-center text-sm text-stone-500">
        已有帳號？
        <RouterLink to="/login" class="font-semibold text-orange-600 underline">登入</RouterLink>
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
