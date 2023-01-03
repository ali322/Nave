import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore(
  'server',
  () => {
    const servers: Ref<Record<string, any>[]> = ref([])
    const running = ref(false)
    const selected = ref(0)
    const output: Ref<string[]> = ref([])

    const createServer = (payload: Record<string, any>) => {
      servers.value = servers.value.slice().concat([payload])
    }
    const saveServer = (payload: Record<string, any>) => {
      servers.value = servers.value
        .slice()
        .map((server: Record<string, any>, i: number) => {
          if (payload.index === i) {
            return payload.server
          }
          return server
        })
    }
    const loadServer = (payload: Record<string, any>[]) => {
      servers.value = payload.slice()
    }
    const deleteServer = (index: number) => {
      servers.value = servers.value
        .slice()
        .filter((server: Record<string, any>, i: number) => i !== index)
    }
    const selectServer = (index: number) => {
      selected.value = index
    }
    const writeOutput = (payload: string) => {
      output.value = output.value.slice().concat([payload])
    }
    const purgeOutput = () => {
      output.value = []
    }
    return {
      servers,
      running,
      selected,
      output,
      createServer,
      saveServer,
      loadServer,
      deleteServer,
      selectServer,
      writeOutput,
      purgeOutput
    }
  },
  { persist: true }
)
