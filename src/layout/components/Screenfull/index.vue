<template>
  <SvgIcon
    :icon-name="
      isFullScreen
        ? 'ant-design:fullscreen-exit-outlined'
        : 'ant-design:fullscreen-outlined'
    "
    @click="handleClick"
    :customClass="'w-2em h-2em'"
  ></SvgIcon>
</template>

<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon/index.vue"
import { getCurrentInstance, onBeforeMount, onMounted, ref } from "vue"
import screenfull from "screenfull"
const isFullScreen = ref(false)

const { proxy } = getCurrentInstance()

const handleClick = () => {
  if (!screenfull.isEnabled) {
    proxy.$message({
      message: "浏览器不支持全屏",
      type: "warning"
    })
    return
  }
  screenfull.toggle()
}
const updateScreenfull = () => {
  isFullScreen.value = screenfull.isFullscreen
}
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on("change", updateScreenfull)
  }
})

onBeforeMount(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", updateScreenfull)
  }
})
</script>
