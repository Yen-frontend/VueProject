<template>
  <div class="fixed bottom-4 right-4 grid gap-1.5 min-w-44 px-3 py-2.5 text-xs rounded-lg bg-stone-900/80 text-stone-100 backdrop-blur-sm pointer-events-none">
    <div>
      <span v-if="status === 'checking'">⏳ 連線中...</span>
      <span v-else-if="status === 'ok'" class="text-emerald-400">✓ Supabase 已連線</span>
      <span v-else class="text-red-400">✗ Supabase 連線失敗</span>
    </div>
    <div v-if="apiState.active.length > 0" class="grid gap-0.5 border-t border-stone-600/40 pt-1.5">
      <div v-for="name in apiState.active" :key="name" class="text-amber-400">
        ⏳ {{ name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'
import { apiState } from '../../lib/apiTracker'

const status = ref<'checking' | 'ok' | 'error'>('checking')

onMounted(async () => {
  try {
    const { error } = await supabase.auth.getSession()
    if (error) throw error
    status.value = 'ok'
  } catch {
    status.value = 'error'
  }
})
</script>
