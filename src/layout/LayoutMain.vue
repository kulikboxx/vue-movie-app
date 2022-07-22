<template>
  <main class="app-main">
    <!-- <router-view v-slot="{ Component }">
      <transition name="app-main" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view> -->

    <router-view />
  </main>
</template>

<style lang="scss">
.app-main {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.6s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
