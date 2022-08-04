<template>
  <button
    v-bind="{ disabled, type }"
    :class="[
      'base-button',
      `base-button--${color}`,
      {
        'base-button--square': square,
        'base-button--text': text,
      },
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
type ButtonColor = 'primary' | 'secondary' | 'danger' | 'inherit';
type ButtonType = 'button' | 'submit';

interface Props {
  color?: ButtonColor;
  disabled?: boolean;
  size?: string;
  square?: boolean;
  text?: boolean;
  type?: ButtonType;
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'auto',
  type: 'button',
});
</script>

<style lang="scss">
.base-button {
  @include base-element-styles;
  padding: 0.2em 0.6em;
  font-size: $fsize-md;
  font-weight: $fweight-lt;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  &--primary {
    @include primary-element-palette;
  }

  &--secondary {
    @include secondary-element-palette;
  }

  &--danger {
    @include danger-element-palette;
  }

  &--inherit {
    color: inherit;
  }

  &--square {
    gap: 0;
    padding: 0.3125em;
    width: v-bind(size);
    height: v-bind(size);
  }

  &--text,
  &--text:hover {
    padding: 0;
    background: none;

    &.base-button--primary {
      color: $primary;
    }

    &.base-button--secondary {
      color: $secondary;
    }

    &.base-button--danger {
      color: $pink;
    }
  }
}
</style>
