<template>
  <button
    v-bind="{ disabled, type }"
    :class="[
      'base-button',
      `base-button--${color}`,
      {
        'base-button--circle': circle,
        'base-button--compact': compact,
        'base-button--square': square,
        'base-button--text': text,
        'base-button--uppercase': uppercase,
      },
    ]"
  >
    <base-circular-loader v-if="loading" :size="loaderSize" />

    <a
      v-else-if="$slots.baseButtonLink"
      v-bind="{ href }"
      target="_blank"
      class="base-button__link"
    >
      <slot name="baseButtonLink" />
    </a>

    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
type ButtonColor = 'primary' | 'secondary' | 'danger' | 'inherit';
type ButtonType = 'button' | 'submit';

interface Props {
  circle?: boolean;
  color?: ButtonColor;
  compact?: boolean;
  disabled?: boolean;
  href?: string;
  link?: string;
  loaderSize?: string;
  loading?: boolean;
  size?: string;
  square?: boolean;
  text?: boolean;
  type?: ButtonType;
  uppercase?: boolean;
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
  font-size: 1.4rem;
  font-weight: 400;
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

  &--compact {
    padding: 0.2em 0.6em;
  }

  &--circle {
    padding: 0.375em;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }

  &--text {
    padding: 0;
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

  &--uppercase {
    text-transform: uppercase;
  }

  &__link {
    color: inherit;
  }
}
</style>
