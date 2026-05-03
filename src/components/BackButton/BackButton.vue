<template>
  <Button
    v-if="show"
    label="← 返回"
    text
    class="fixed top-4 left-4 z-50"
    @click="router.back()"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const hidden = ['/', '/login', '/register']
const show = computed(() => !hidden.includes(route.path))
</script>
