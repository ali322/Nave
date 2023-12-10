<template>
  <div>
    <div class="flex items-center leading-6 py-1 rounded border border-gray-300" ref="selectBtn">
      <span class="flex-1 px-2 text-sm" :class="{'text-gray-300': props.disabled}">{{ current }}</span>
      <div class="cursor-pointer flex items-center" @click.stop="!props.disabled && (focus = !focus)">
        <ArrowDropUpFilled class="w-5 h-5" v-if="focus"></ArrowDropUpFilled>
        <ArrowDropDownFilled class="w-5 h-5" v-else></ArrowDropDownFilled>
      </div>
    </div>
    <teleport to="body">
      <div
        class="fixed bg-white shadow-md rounded pb-2 border border-gray-200 z-[100]"
        v-show="focus"
        :style="dropdownStyle"
        ref="selectDropdown"
      >
        <ul class="overflow-hidden">
          <slot></slot>
        </ul>
      </div>
    </teleport>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, watch, onDeactivated, readonly, computed } from 'vue'
import { ArrowDropUpFilled, ArrowDropDownFilled } from '@vicons/material'

interface Pos {
  x: number, y: number, w: number
}

const props = defineProps<{
  value: string | number,
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:value', val: typeof props.value):void
  (e: 'change', val: typeof props.value): void
}>()

let current = computed({
  get() {
    return props.value
  },
  set(val: string | number) {
    emit('update:value', val)
    if(props.value !== val) {
      emit('change', val)
    }
  }
})
let focus = ref(false)
let selectBtn = ref()
let selectDropdown = ref()
let pos: Ref<Pos> = ref({ x: 0, y: 0, w: 0 })
let dropdownStyle = computed(() => {
  return {
    top: `${pos.value.y}px`, left:`${pos.value.x}px`, width: `${pos.value.w}px`
  }
})

function calcPos() {
  const btnRect = selectBtn.value.getBoundingClientRect()
  pos.value.w = btnRect.width
  pos.value.x = btnRect.left
  pos.value.y = btnRect.top + btnRect.height + 5
}

watch(focus, (val: boolean): void => {
  val && calcPos()
})

function closeOnClick(e: Event) {
  if (!selectBtn.value?.contains(e.target) && !selectDropdown.value?.contains(e.target)) {
    focus.value = false
  }
}

window.addEventListener('click', closeOnClick)
onDeactivated(() => {
  window.removeEventListener('click', closeOnClick)
})

const select = (val: string) => {
  current.value = val
  focus.value = false
}

defineExpose({ select, current: readonly(current) })
</script>