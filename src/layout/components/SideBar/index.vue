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
    <SidebarItem v-for="r in routes" :key="r.path" :item="r"></SidebarItem>
  </el-menu>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app"
import variables from "@/styles/variable.module.scss"
import { computed } from "vue"
import { useRoute } from "vue-router"

import SidebarItem from "./componens/SidebarItem.vue"
import { routes } from "@/router/index"

const route = useRoute()

const { sidebar } = useAppStore()

const defaultActive = computed(() => {
  const { path } = route
  console.log(path)

  return path
})
</script>
<style lang="scss" scoped></style>
