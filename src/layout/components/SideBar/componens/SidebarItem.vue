<template>
  <el-menu-item v-if="filterChildren.length <= 1">
    <el-icon v-if="iconName">
      <SvgIcon :icon-name="iconName" custom-class=""></SvgIcon>
    </el-icon>
    <template #title>{{ singleChildren.meta?.title }}</template>
  </el-menu-item>
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
    ></SideBarItem>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import SvgIcon from "@/components/SvgIcon/index.vue"
import SideBarItem from "./SidebarItem.vue"

const { item } = defineProps<{ item: RouteRecordRaw }>()

// 如果只有一个儿子，说明我们直接这里的儿子即可

// 如果菜单对应的children有多个，使用el-submenu去渲染

const filterChildren = computed(() => item.children || [])

// 要渲染的路由
const singleChildren = computed(() =>
  filterChildren.value?.length === 1 ? filterChildren.value[0] : item
)

// 要渲染的图标
const iconName = computed(() => singleChildren.value.meta?.icon)
</script>
