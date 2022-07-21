<template>
  <nav :class="['header-nav', { 'header-nav--visible': isVisible }]">
    <ul class="header-nav__list">
      <layout-header-nav-item
        v-for="(route, index) in routes"
        :key="index"
        v-bind="{ label: route.name, path: route.path }"
      />
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { routes } from '../config/routes.config';

import LayoutHeaderNavItem from './LayoutHeaderNavItem.vue';

interface Props {
  isVisible?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.header-nav {
  @include base-scrollbar-styles(0.1rem);
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background-color: $main;
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.4s, opacity 0.4s;
  overflow-y: auto;
  will-change: transform;
  z-index: 100;

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    list-style: none;
  }

  &--visible {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (min-width: 992px) {
  .header-nav {
    all: unset;

    &__list {
      flex-direction: row;
      gap: 5rem;
    }
  }
}
</style>
