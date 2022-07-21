<template>
  <li class="app-footer__list-item">
    <router-link :to="path" class="app-footer__list-item-link">
      {{ label }}
    </router-link>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  label: string;
  path: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.app-footer__list-item-link {
  @include link-element-focus;
  color: inherit;
  font-size: 1.4rem;
  text-decoration: none;
  transition: color 0.4s;

  &:hover {
    color: $primary;
  }
}
</style>
