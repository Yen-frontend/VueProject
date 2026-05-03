<template>
  <div class="min-h-full">
    <BackButton />
    <RouterView />
    <SupabaseStatus />
  </div>
</template>

<script setup lang="ts">
import BackButton from './components/BackButton/BackButton.vue'
import SupabaseStatus from './components/SupabaseStatus/SupabaseStatus.vue'
</script>
