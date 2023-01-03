<template>
  <div class="h-full w-full px-6 py-4">
    <div class="flex items-center h-10 pb-4">
      <label class="text-gray-500 text-sm">Socks Port</label>
      <div class="flex-1 flex justify-end items-center">
        <input type="text" v-model="socksPort" class="py-1 rounded border border-gray-300 text-xs px-2 w-16" />
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
const { socksPort } = storeToRefs(settingStore)

const restore = () => {
  settingStore.restoreSetting()
}

const clearCache = () => {
  const t = toastRef.value as any
  clearCache()
  t.show('clear local cache success')
}
</script>