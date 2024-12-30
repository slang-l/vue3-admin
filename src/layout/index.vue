<template>
  <div class="app-wrapper" text-red>
    <div class="sider-container">侧边栏</div>
    <div class="main-contaner">
      <div class="header">
        <div class="navbar">导航条-1</div>
        <div class="tags-view">导航条-2</div>
      </div>
      <div class="app-main">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-wrapper {
  @apply flex w-full h-full;

  .sider-container {
    @apply bg-red w-[var(--sidebar-width)];
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
