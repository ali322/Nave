<template>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    :style="{
      'visibility': actived ? 'visible' : 'hidden',
      'opacity': actived ? 1 : 0,
    }"
  >
    <div
      class="absolute top-0 bottom-0 left-0 right-0 w-full h-full z-40 bg-black transition-all"
      :style="{ 'opacity': actived ? 0.6 : 0 }"
    ></div>
    <div class="bg-white rounded shadow-gray-800 relative z-50 px-6 py-4">
      <p class="pb-4">{{ message }}</p>
      <div class="flex justify-center items-center">
        <button class="btn-primary mr-4" @click="ok">
          <span class="leading-7 px-4 text-sm">Yes</span>
        </button>
        <button class="btn-secondary" @click="no">
          <span class="leading-7 px-4 text-sm">No</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const actived = ref(false)
const message = ref('')
let next = ref((_:boolean) => {})

const show = (msg: string, cb: (isOk: boolean)=> void) => {
  actived.value = true
  message.value = msg
  next.value = cb
}

const ok = () => {
  actived.value = false
  message.value = ''
  next.value(true)
}

const no = () => {
  actived.value = false
  message.value = ''
  next.value(false)
}

defineExpose({
  show
})
</script>