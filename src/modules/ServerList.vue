<template>
  <div class="py-2 h-full flex flex-col w-[166px] bg-gray-100">
    <div
      class="flex-1 mx-2 mt-2 bg-white border-gray-300 border-x border-t overflow-y-scroll">
      <div class="cursor-pointer flex" v-for="(server, i) in servers" :key="i" @click="emit('select', i)">
        <div class="flex-1 px-2 py-2 relative flex justify-center items-center"
          :class="[index == i ? 'bg-blue-500' : 'bg-white']">
          <div class="leading-4 flex-1 text-left text-sm">
            <p :class="index === i && 'text-white'">{{ server.tag }}</p>
            <p class="text-xs" :class="[index === i ? 'text-white' : 'text-gray-500']">{{ server.port }}</p>
          </div>
          <div class="text-xs pt-1 text-right" :class="[index === i ? 'text-white' : 'text-gray-500']">
            <p class="text-xs">{{ server.latency || 0 }} ms</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mx-2 justify-center border-y border-gray-300 bg-light-300 items-center">
      <div
        class="flex-1 h-5 text-center flex justify-center cursor-pointer items-center border-gray-300 border-b-width-1px border-l"
        @click="add">
        <AddFilled class="w-4 h-4" :class="running ? 'text-gray-300' : 'text-gray-500'"></AddFilled>
      </div>
      <div
        class="flex-1 h-5 text-center flex justify-center items-center cursor-pointer border-gray-300 border-b-width-1px border-l"
        @click="remove">
        <MinusFilled class="w-4 h-4" :class="running ? 'text-gray-300' : 'text-gray-500'"></MinusFilled>
      </div>
      <div
        class="flex-1 h-5 text-center flex justify-center items-center cursor-pointer border-gray-300 border-b-width-1px border-l border-r"
        @click="ping">
        <SpeedFilled class="w-4 h-4" :class="running ? 'text-gray-300' : 'text-gray-500'"></SpeedFilled>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AddFilled, MinusFilled, SpeedFilled, StopRound, PlayArrowRound } from '@vicons/material'
import { toRefs, computed, ref, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { invoke, event } from '@tauri-apps/api'
import useServerStore from '@/store/server'

interface Props {
  servers: Record<string, any>[],
  index: number
}

interface Emits {
  (e: 'select', i: number): void,
  (e: 'add'): void,
  (e: 'run'): void,
  (e: 'remove'): void
}

const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const { servers, index } = toRefs(props)

const store = useServerStore()
const { running } = storeToRefs(store)
const add = () => {
  if (running.value) return
  emit('add')
}
const remove = () => {
  if (running.value) return
  emit('remove')
}
const ping = () => {
  const addrs = props.servers.map((server: Record<string, any>) => {
    return server.address
  })
  invoke('latencies', { addrs })
}
event.listen('latency', ({ payload }: { payload: number[] }) => {
  payload.forEach((latency: number, i: number) => {
    servers.value[i].latency = latency
  })
})
</script>