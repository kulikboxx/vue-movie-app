<template>
  <base-alert :alerts="store.getters[Getter.GET_ALERTS]" />
  <base-page-loader :visible="store.getters[Getter.GET_FETCHING]" />
  <layout-header />
  <layout-main />
  <layout-footer />
  <base-scroll-up />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore, Action, Getter } from './store';

import LayoutHeader from './layout/LayoutHeader.vue';
import LayoutMain from './layout/LayoutMain.vue';
import LayoutFooter from './layout/LayoutFooter.vue';

const store = useStore();

onMounted(() => store.dispatch(Action.FETCH_DATA));
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
