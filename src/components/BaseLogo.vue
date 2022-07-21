<template>
  <router-link to="/" class="base-logo">{{ dictionary.logo }}</router-link>
</template>

<script lang="ts" setup>
import { dictionary } from '../config/dictionary.config';

interface Props {
  size?: string;
}

withDefaults(defineProps<Props>(), { size: '2.2rem' });
</script>

<style lang="scss" scoped>
.base-logo {
  @include link-element-focus;
  @include gradient-text;
  font-size: v-bind(size);
  font-weight: 800;
}
</style>
