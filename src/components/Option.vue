<template>
  <li class="select-none cursor-pointer px-2 text-sm leading-6" :class="[active ? 'bg-blue-500 text-white' : 'bg-hite']" @click="select">
    <slot></slot>
  </li>
</template>
<script lang="ts" setup>
import { getCurrentInstance, computed, onMounted, useAttrs } from 'vue'

interface Props {
  value: string | number
}

let exposed: Record<string, any> = {}

const props = defineProps<Props>()

let active = computed(() => {
  let exposed = getCurrentInstance()?.parent?.exposed
  return exposed?.current.value == props.value
})
onMounted(() => {
  exposed = getCurrentInstance()?.parent?.exposed as Record<string, any>
})
const select = () => {
  exposed.select(props.value)
}
</script>  