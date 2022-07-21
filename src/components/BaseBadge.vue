<template>
  <span :class="['base-badge', `base-badge--${color}`]">
    <slot />
  </span>
</template>

<script lang="ts" setup>
type BadgeColor = 'primary' | 'secondary' | 'danger' | 'warning' | 'success';

interface Props {
  color?: BadgeColor;
}

withDefaults(defineProps<Props>(), { color: 'primary' });
</script>

<style lang="scss" scoped>
.base-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.727em;
  font-size: $fsize-md;
  font-weight: $fweight-lt;
  border-radius: 100vmax;
  white-space: nowrap;

  &--primary {
    @include primary-element-palette;
  }

  &--secondary {
    @include secondary-element-palette;
  }

  &--danger {
    @include danger-element-palette;
  }

  &--warning {
    @include warning-element-palette;
  }

  &--success {
    @include success-element-palette;
  }
}
</style>
