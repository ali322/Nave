<template>
  <div class="h-full flex">
    <ServerList :servers="servers" :index="selected" @select="selectOne" @add="addOne" @remove="removeOne" />
    <ServerForm :server="servers[selected]" :index="selected" @run='runOne' @update="changeOne"
      v-if="servers.length > 0" />
    <Confirm ref="confirmRef" />
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'
import Confirm from '@/components/Confirm.vue'
import { event, tauri } from '@tauri-apps/api'
import useServerStore from '@/store/server'
import useSettingStore from '@/store/setting'
import ServerList from '@/modules/ServerList.vue'
import ServerForm from '@/modules/ServerForm.vue'

const confirmRef = ref<InstanceType<typeof Confirm>>()
const serverStore = useServerStore()
const { servers, selected, running } = storeToRefs(serverStore)
const settingStore = useSettingStore()
const { socksPort } = storeToRefs(settingStore)

watch(() => servers.value.length, (curr: number, prev: number) => {
  if (prev === 0 && curr > 0) {
    selectOne(curr - 1)
  }
})
const selectOne = (i: number) => {
  if (running.value === true) return
  selected.value = i
}
const addOne = () => {
  serverStore.createServer({
    tag: 'foo', address: 'example.com', port: 443
  })
  selected.value = servers.value.length - 1
}
const changeOne = (server: Record<string, any>) => {
  serverStore.saveServer({ server, index: selected.value })
}
const removeOne = () => {
  const c = confirmRef.value as any
  c.show('Are u sure?', (isOk: boolean) => {
    if (isOk) {
      serverStore.deleteServer(selected.value)
      selected.value = servers.value.length - 1
    }
  })
}
event.listen('sidecar-running', (evt: { payload: string }) => {
  console.log('evt', evt)
  serverStore.writeOutput(evt.payload)
})
const startOne = async () => {
  const listen = `socks://127.0.0.1:${socksPort.value}"`
  const server = servers.value[selected.value]
  const proxy = `https://${server.username}:${server.password}@${server.address}:${server.port}`
  const config = {
    listen, proxy, log: ''
  }
  tauri.invoke('run_sidecar', { config: JSON.stringify(config, null, 2) })
  running.value = true
}
const stopOne = () => {
  event.emit('stop-sidecar')
  serverStore.purgeOutput()
  running.value = false
}
let timer: any
const runOne = () => {
  if (running.value) {
    stopOne()
    if (timer) {
      clearInterval(timer)
    }
  } else {
    startOne()
  }
}
</script>