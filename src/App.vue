<template>
  <div class="h-full flex">
    <div class="min-w-[50px] bg-stone-800">
      <div class="py-4 text-center cursor-pointer flex items-center justify-center" @click="navigate(0)">
        <PublicOutlined class="w-6 h-6" :class="isActive === 0 ? 'text-white' : 'text-gray-400'" />
      </div>
      <div class="py-4 text-center cursor-pointer flex items-center justify-center" @click="navigate(1)">
        <DescriptionOutlined class="w-6 h-6" :class="isActive === 1 ? 'text-white' : 'text-gray-400'" />
      </div>
      <div class="py-4 text-center cursor-pointer flex items-center justify-center" @click="navigate(2)">
        <SettingsOutlined class="w-6 h-6" :class="isActive === 2 ? 'text-white' : 'text-gray-400'"></SettingsOutlined>
      </div>
    </div>
    <div class="flex-1">
      <keep-alive>
        <component :is="components[isActive]" :key="isActive" />
      </keep-alive>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import { SettingsOutlined, DescriptionOutlined, PublicOutlined } from '@vicons/material'
import Server from './views/Server.vue'
import Logger from './views/Logger.vue'
import Setting from './views/Setting.vue'

const components = [Server, Logger, Setting]

const isActive = ref(0)

const navigate = (i: number) => {
  isActive.value = i
}
</script>
<style>
#app {
  font-family: "Monospaced Number", Chinese Quote, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>