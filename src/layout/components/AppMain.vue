<template>
  <div class="app-main">
    <RouterView v-slot="{ Component }">
      <Transition name="fade">
        <KeepAlive>
          <component :is="Component" :key="$route.path"></component>
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
<style lang="scss" scoped>
.app-main {
  @apply bg-amber overflow-hidden pos-relative;
  min-height: calc(100vh - var(--navbar-height) - var(--tagsview-height));
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-500 pos-absolute;
}
.fade-enter-from {
  @apply opacity-0 translate-x-[50px];
}
.fade-leave-to {
  @apply opacity-0 translate-x-[-50px];
}
</style>
