<template>
  <main class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="app-main" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style lang="scss">
.app-main {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(5px);
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
}
</style>
