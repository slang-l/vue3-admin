<template>
  <div class="app-wrapper" text-black>
    <div class="sider-container">
      <SideBar></SideBar>
    </div>
    <div class="main-contaner">
      <div class="header">
        <NavBar></NavBar>
        <div class="tags-view">导航条-2</div>
      </div>
      <div class="app-main">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SideBar from "@/layout/components/SideBar/index.vue"
import NavBar from "@/layout/components/NavBar/index.vue"
</script>

<style lang="scss" scoped>
.app-wrapper {
  @apply flex w-full h-full;

  .sider-container {
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      @apply w-[var(--sidebar-width)];
    }
  }
  .main-contaner {
    @apply flex flex-col flex-1;
  }
  .head {
    @apply h-[var(--navbar-height)] bg-blue;
  }
  .tags-view {
    @apply h-[var(--tagsview-height)] bg-green;
  }
}
.app-main {
  @apply bg-amber;
  min-height: calc(100vh - var(--navbar-height) - var(--tagsview-height));
}
</style>
