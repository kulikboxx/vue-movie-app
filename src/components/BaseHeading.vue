<template>
  <component
    :is="type"
    :class="['base-heading', `base-heading--${type}`, `base-heading--${color}`]"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
type HeadingType = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingColor = 'inherit' | 'primary';

interface Props {
  color?: HeadingColor;
  type?: HeadingType;
}

withDefaults(defineProps<Props>(), { color: 'inherit', type: 'h2' });
</script>

<style lang="scss">
.base-heading {
  font-weight: $fweight-md;
  line-height: 150%;

  &--primary {
    color: $primary;
  }

  &--h1 {
    font-size: $fsize-xxl;
  }

  &--h2 {
    font-size: $fsize-xl;
  }

  &--h3 {
    font-size: $fsize-lg;
  }

  &--h4 {
    font-size: $fsize-rg;
  }
}
</style>
