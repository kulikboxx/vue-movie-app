<template>
  <base-alert :alerts="alerts" />
  <base-page-loader :visible="fetching" />
  <layout-header />
  <layout-main />
  <layout-footer />
  <base-scroll-up />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore, Action, Getter } from './store';
import { AlertItem } from './interfaces';

import LayoutHeader from './layout/LayoutHeader.vue';
import LayoutMain from './layout/LayoutMain.vue';
import LayoutFooter from './layout/LayoutFooter.vue';

const store = useStore();

const alerts = computed<Array<AlertItem>>(
  () => store.getters[Getter.GET_ALERTS]
);
const fetching = computed<boolean>(() => store.getters[Getter.GET_FETCHING]);

onMounted(() => store.dispatch(Action.USE_FETCH));
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
