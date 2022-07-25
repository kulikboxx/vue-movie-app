<template>
  <p
    :class="[
      'base-paragraph',
      `base-paragraph--${color}`,
      `base-paragraph--${size}`,
    ]"
  >
    <slot />
  </p>
</template>

<script lang="ts" setup>
type ParagraphColor = 'gray' | 'inherit' | 'primary';
type FontSize = 'sm' | 'md' | 'lg';

interface Props {
  color?: ParagraphColor;
  size?: FontSize;
}

withDefaults(defineProps<Props>(), { color: 'inherit', size: 'md' });
</script>

<style lang="scss">
.base-paragraph {
  font-weight: $fweight-lt;
  line-height: 150%;

  &--gray {
    color: $gray;
  }

  &--primary {
    color: $primary;
  }

  &--sm {
    font-size: 1.2rem;
  }

  &--md {
    font-size: 1.4rem;
  }

  &--lg {
    font-size: 1.6rem;
  }
}
</style>
