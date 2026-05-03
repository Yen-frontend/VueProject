<template>
  <div class="min-h-full">
    <BackButton />
    <RouterView />
    <SupabaseStatus v-if="!route.meta.hideChrome" />
    <Version />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import BackButton from './components/BackButton/BackButton.vue'
import SupabaseStatus from './components/SupabaseStatus/SupabaseStatus.vue'
import Version from './components/Version/Version.vue'

const route = useRoute()
</script>
