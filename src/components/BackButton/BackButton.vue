<template>
  <button
    v-if="show"
    class="fixed top-4 left-4 z-50 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors cursor-pointer"
    @click="router.back()"
  >
    ← 返回
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const hidden = ['/', '/login', '/register']
const show = computed(() => !hidden.includes(route.path))
</script>
