<template>
  <div>
    <transition name="toast" :duration="3000">
      <div class="absolute top-1/3 left-1/2 origin-center z-50 bg-transparent" v-show="actived">
        <div
          class="relative right-1/2 text-white shadow-md rounded px-4 py-4 opacity-90"
          :class="[hasErr ? 'bg-red-500' : 'bg-green-500']"
        >
          <div class="flex items-center">
            <span class="px-2 text-sm">{{ message }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const actived = ref(false)
const message = ref('')
const hasErr = ref(false)
let next = ref(() => { })

const show = (msg: string, cb: () => void) => {
  actived.value = true
  message.value = msg
  hasErr.value = false
  next.value = cb
  setTimeout(() => {
    actived.value = false
  }, 1000)
}

const error = (msg: string, cb: () => void) => {
  actived.value = true
  message.value = msg
  hasErr.value = true
  next.value = cb
  setTimeout(() => {
    actived.value = false
  }, 1000)
}

defineExpose({
  show, error
})
</script>
<style>
.toast-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.toast-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all 0.2s ease;
}
.toast-leave-from {
  opacity: 1;
  transform: scale(1);
}
.toast-leave-active {
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>