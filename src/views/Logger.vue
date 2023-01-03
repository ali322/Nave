<template>
  <div class="h-full">
    <div
      class="h-full p-2 bg-zinc-900 text-left overflow-y-scroll text-sm text-white font-sans"
    >
      <p v-for="(line, i) in store.output" :key="i" class="leading-tight">{{ line }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import useServerStore from '@/store/server'

const store = useServerStore()
</script>