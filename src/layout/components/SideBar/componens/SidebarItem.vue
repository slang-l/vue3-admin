<template>
  <template v-if="!item.meta?.hidden">
    <SidebarItemLink
      v-if="filterChildren.length <= 1 && !item.meta?.alwaysShow"
      :to="resolvePath(singleChildren.path)"
    >
      <el-menu-item :index="resolvePath(singleChildren.path)">
        <el-icon v-if="iconName">
          <SvgIcon :icon-name="iconName" custom-class=""></SvgIcon>
        </el-icon>
        <template #title>{{ singleChildren.meta?.title }}</template>
      </el-menu-item>
    </SidebarItemLink>

    <el-sub-menu v-else :index="singleChildren.path">
      <template #title>
        <el-icon v-if="iconName">
          <SvgIcon :icon-name="iconName" custom-class=""></SvgIcon>
        </el-icon>
        <span>{{ singleChildren.meta?.title }}</span>
      </template>
      <SideBarItem
        v-for="child of filterChildren"
        :item="child"
        :key="child.path"
        :base-path="resolvePath(child.path)"
      ></SideBarItem>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import SvgIcon from "@/components/SvgIcon/index.vue"
import SideBarItem from "./SidebarItem.vue"
import path from "path-browserify"
import { isExternal } from "@/utils/validate"
import SidebarItemLink from "./SidebarItemLink.vue"

const { item, basePath } = defineProps<{
  item: RouteRecordRaw
  basePath: string
}>()

// 如果只有一个儿子，说明我们直接这里的儿子即可

// 如果菜单对应的children有多个，使用el-submenu去渲染

const filterChildren = computed(() =>
  (item.children || []).filter((child) => !child.meta?.hidden)
)

// 要渲染的路由
const singleChildren = computed(
  () =>
    filterChildren.value?.length === 1
      ? filterChildren.value[0]
      : { ...item, path: "" } // path: ""的意思是不需要渲染路由，只需要渲染菜单
)

// 要渲染的图标
const iconName = computed(() => singleChildren.value.meta?.icon)

// 解析父路径+子路径
const resolvePath = (childPath: string) => {
  if (isExternal(childPath)) {
    return childPath
  }
  return path.join(basePath, childPath)
}
</script>
