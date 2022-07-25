<template>
  <footer class="app-footer">
    <base-divider centered />
    <base-wrapper class="app-footer__wrapper">
      <base-logo size="18px" />

      <layout-footer-list />

      <base-divider />

      <base-paragraph color="gray" size="sm">
        {{ dictionary.copyrightNotice }}
      </base-paragraph>
    </base-wrapper>
  </footer>
</template>

<script lang="ts" setup>
import { dictionary } from '../config/dictionary.config';

import LayoutFooterList from './LayoutFooterList.vue';
</script>

<style lang="scss" scoped>
.app-footer {
  margin-top: auto;
  padding: 0 0.625em 1em;
  text-align: center;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    justify-items: center;
    gap: 1.6rem;
    padding-top: 1em;
  }
}
</style>
