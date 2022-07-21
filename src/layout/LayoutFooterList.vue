<template>
  <ul class="app-footer__list">
    <layout-footer-list-item
      v-for="(route, index) in routes"
      :key="index"
      v-bind="{ label: route.name, path: route.path }"
    />
  </ul>
</template>

<script lang="ts" setup>
import { routes } from '../config/routes.config';

import LayoutFooterListItem from './LayoutFooterListItem.vue';

interface Props {
  isVisible?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss">
.app-footer__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 2rem;
  list-style: none;
}
</style>
