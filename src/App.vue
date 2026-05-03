<template>
  <div class="min-h-full">
    <BackButton />
    <RouterView />
    <SupabaseStatus />
    <Version />
  </div>
</template>

<script setup lang="ts">
import BackButton from './components/BackButton/BackButton.vue'
import SupabaseStatus from './components/SupabaseStatus/SupabaseStatus.vue'
import Version from './components/Version/Version.vue'
</script>
