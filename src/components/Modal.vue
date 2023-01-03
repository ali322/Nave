<template>
  <div class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center" :style="{
    'visibility': actived ? 'visible' : 'hidden',
    'opacity': actived ? 1 : 0,
  }">
    <div class="absolute top-0 bottom-0 left-0 right-0 w-full h-full z-40 bg-black transition-all" @click="$emit('close')" :style="{'opacity': actived ? 0.6: 0 }"></div>
    <div class="bg-white rounded shadow-gray-800 relative z-50" :style="{width:`${width}px`}">
      <slot></slot>  
    </div>
  </div>
  </template>
  <script lang="ts" setup>
  import { ref, Ref, withDefaults } from 'vue'
  
  interface Props{
    width?: number,
    actived: boolean,
    onClose?: () => void
  }
  
  withDefaults(defineProps<Props>(), {
    width: 300, onClose: () => {}
  })
  </script>