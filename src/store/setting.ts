import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export default defineStore(
  'setting',
  () => {
    const socksPort = ref(1080)
    const relayPort = ref(1081)
    const isSysProxyEnabled = ref(false)

    const restoreSetting = () => {
      socksPort.value = 1080
      relayPort.value = 1081
      isSysProxyEnabled.value = false
    }
    return { socksPort, relayPort, isSysProxyEnabled, restoreSetting }
  },
  { persist: true }
)
