import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export default defineStore(
  'setting',
  () => {
    const socksPort = ref(1080)

    const restoreSetting = () => {
      socksPort.value = 1080
    }
    return { socksPort, restoreSetting }
  },
  { persist: true }
)
