<template>
  <div class="h-full w-full px-6 py-4">
    <div class="flex items-center h-10 pb-4">
      <label class="text-gray-500 text-sm">Socks Port</label>
      <div class="flex-1 flex justify-end items-center">
        <input type="text" v-model="socksPort" class="py-1 rounded border border-gray-300 text-xs px-2 w-16" />
      </div>
    </div>
    <div class="flex items-center h-10 pb-4">
      <label class="text-gray-500 text-sm">Relay Port</label>
      <div class="flex-1 flex justify-end items-center">
        <input type="text" v-model="relayPort" class="py-1 rounded border border-gray-300 text-xs px-2 w-16" />
      </div>
    </div>
    <div class="flex items-center h-10 pb-4">
      <span class="text-gray-500 text-sm">System Proxy</span>
      <div class="flex-1 flex justify-end items-center text-right">
        <label for="toggle" class="flex items-center cursor-pointer">
          <div class="relative">
            <input type="checkbox" :disabled="!running" id="toggle" class="sr-only" v-model="isSysProxyEnabled" @change="toggleSysProxy">
            <div class="block bg-gray-200 w-8 h-5 rounded-full"></div>
            <div class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition"></div>
          </div>
        </label>
      </div>
    </div>
    <div class="flex items-center h-10 pb-4">
      <label class="text-gray-500 text-sm">Clear Cache</label>
      <div class="flex-1 flex justify-end items-center">
        <div class="ml-4" @click="clearCache">
          <DeleteOutlined class="w-5 h-5 cursor-pointer"></DeleteOutlined>
        </div>
      </div>
    </div>
    <Toast ref="toastRef" />
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref, computed } from 'vue'
import { path, dialog, tauri, fs } from '@tauri-apps/api'
import { ReadMoreOutlined, RestoreFilled, UploadFilled, DownloadFilled, OutputFilled, DeleteOutlined } from '@vicons/material'
import useSettingStore from '@/store/setting'
import useServerStore from '@/store/server'
import Toast from '../components/Toast.vue'
import { storeToRefs } from 'pinia'
import { clearCache } from '@/util'

const toastRef = ref<InstanceType<typeof Toast>>()
const settingStore = useSettingStore()
const serverStore = useServerStore()
const { socksPort, relayPort, isSysProxyEnabled } = storeToRefs(settingStore)
const { running } = storeToRefs(serverStore)

const restore = () => {
  settingStore.restoreSetting()
}

const toggleSysProxy = () => {
  tauri.invoke('toggle_sysproxy', {isEnabled: isSysProxyEnabled.value, port: socksPort.value})
}

const clearCache = () => {
  const t = toastRef.value as any
  clearCache()
  t.show('clear local cache success')
}
</script>