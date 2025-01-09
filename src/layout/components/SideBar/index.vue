<template>
  <el-menu
    router
    class="sidebar-container-menu"
    :default-active="defaultActive"
    :background-color="variables.menuBg"
    :text-color="variables.menuActiveText"
    :active-text-color="variables.menuActiveText"
    :collapse="sidebar.opened"
  >
    <el-menu-item index="/dashboard">
      <el-icon><icon-menu /></el-icon>
      <span>导航一</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app"
import variables from "@/styles/variable.module.scss"
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const { sidebar } = useAppStore()

const defaultActive = computed(() => {
  const { path } = route
  console.log(path)

  return path
})
</script>
<style lang="scss" scoped></style>
