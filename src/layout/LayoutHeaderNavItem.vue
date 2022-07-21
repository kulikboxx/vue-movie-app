<template>
  <li class="header-nav__list-item">
    <router-link :to="path" class="header-nav__list-item-link">
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
.header-nav__list-item-link {
  @include link-element-focus;
  position: relative;
  display: inline-block;
  padding: 0.375em 0.625em;
  color: inherit;
  font-size: inherit;
  text-decoration: none;
  transition: color 0.4s;

  &::after {
    content: '';
    position: absolute;
    inset: 90% 50% 0;
    height: 2px;
    background-color: transparent;
    transition: inset 0.4s, background-color 0.4s;
  }

  &:hover,
  &.router-link-exact-active {
    color: $primary;

    &::after {
      inset: 90% 0 0;
      background-color: $primary;
    }
  }
}
</style>
