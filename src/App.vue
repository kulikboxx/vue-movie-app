<template>
  <base-page-loader />
  <base-alert />
  <layout-header />
  <layout-main />
  <layout-footer />
  <base-scroll-up />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useStore } from './store';

import LayoutHeader from './layout/LayoutHeader.vue';
import LayoutMain from './layout/LayoutMain.vue';
import LayoutFooter from './layout/LayoutFooter.vue';

const store = useStore();

onBeforeMount(() => store.fetchData());
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
