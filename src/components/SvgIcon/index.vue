<template>
  <IconifyIcon
    :class="svgClass"
    :icon="iconName"
    v-if="!isExternalIcon"
    v-bind="$attrs"
  ></IconifyIcon>
  <div
    v-else
    :style="styleExternalIcon"
    :class="svgClass"
    bg-current
    text-red
    v-bind="$attrs"
  ></div>
</template>
<script lang="ts" setup>
import { Icon as IconifyIcon } from "@iconify/vue"
import { isExternal } from "@/utils/validate"
import { computed, defineProps } from "vue"

const { iconName, customClass } = defineProps<{
  iconName: string
  customClass: string
}>()
const isExternalIcon = computed(() => isExternal(iconName))
console.log(isExternalIcon)

// class="customClass + icon"
// 组合成的类名
const svgClass = computed(() => (customClass ? `icon ${customClass}` : "icon"))

// 通过mask渲染svg，兼容性不好，可以通过请求svg的方式进行渲染
const styleExternalIcon = computed(() => ({
  mask: `url(${iconName}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${iconName}) no-repeat 50% 50%`,
  "-mask-size": "cover"
}))
</script>
