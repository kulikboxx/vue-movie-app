<template>
  <header class="app-header">
    <base-wrapper class="app-header__wrapper">
      <base-logo class="app-header__logo" />

      <layout-header-nav :is-visible="navVisibility" />

      <div class="app-header__actions">
        <base-search />

        <layout-header-button
          :rotation="navVisibility"
          class="app-header__bars"
          @click="toggleNavVisibility()"
        />
      </div>
    </base-wrapper>
  </header>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import LayoutHeaderNav from './LayoutHeaderNav.vue';
import LayoutHeaderButton from './LayoutHeaderButton.vue';
import BaseSearch from '../components/BaseSearch.vue';

const route = useRoute();

const navVisibility = ref(false);

function toggleNavVisibility() {
  navVisibility.value = !navVisibility.value;
}

watch(route, () => {
  navVisibility.value = false;
});
</script>

<style lang="scss">
.app-header {
  position: sticky;
  top: 0;
  padding: 0.75em 1.5em;
  background-color: $main;
  border-bottom: 0.1rem solid $gray;
  z-index: 50;

  &__wrapper,
  &__actions {
    display: flex;
    align-items: center;
  }

  &__wrapper {
    justify-content: space-between;
  }

  &__actions {
    gap: 1rem;
  }

  &__logo,
  &__bars {
    z-index: 200;
  }
}
</style>
