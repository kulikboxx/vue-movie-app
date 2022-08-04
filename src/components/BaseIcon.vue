<template>
  <span :class="['base-icon', { 'base-icon--rotation': rotation }]">
    <component :is="icon" />
  </span>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';

interface Props {
  degrees?: string;
  name: string;
  rotation?: boolean;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), { size: '20px' });

const icon = computed(() =>
  defineAsyncComponent(() => import(`../assets/icons/${props.name}.vue`))
);
</script>

<style lang="scss">
$degrees: v-bind(degrees);

.base-icon {
  display: inline-block;
  width: v-bind(size);
  height: v-bind(size);
  transition: transform 0.3s;

  &--rotation {
    transform: rotateZ($degrees);
  }

  svg {
    width: v-bind(size);
    height: v-bind(size);
    stroke: currentColor;
    stroke-width: 2;
    background: none;
    transition: color 0.4s;
  }
}
</style>
