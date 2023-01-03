import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export default defineStore(
  'setting',
  () => {
    const socksPort = ref(1088)

    const restoreSetting = () => {
      socksPort.value = 1088
    }
    return { socksPort, restoreSetting }
  },
  { persist: true }
)
