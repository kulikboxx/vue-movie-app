<template>
  <base-section class="base-poster">
    <base-image v-bind="{ alt, src }" class="base-poster__image" />

    <base-wrapper class="base-poster__wrapper">
      <div
        :class="['base-poster__content', `base-poster__content--${position}`]"
      >
        <slot />
      </div>
    </base-wrapper>
  </base-section>
</template>

<script lang="ts" setup>
type PositionType = 'left' | 'center' | 'right';

interface Props {
  alt?: string;
  height?: string;
  position?: PositionType;
  src?: string;
}

withDefaults(defineProps<Props>(), { height: '350px', position: 'left' });
</script>

<style lang="scss">
.base-poster {
  position: relative;
  display: flex;
  min-height: v-bind(height);
  z-index: 0;

  &::after {
    content: '';
    background-color: rgba($primary, 0.85);
    z-index: -1;
  }

  &::after,
  &__image {
    position: absolute;
    inset: 0;
  }

  &__image {
    object-position: top center;
    z-index: -2;
  }

  &__wrapper {
    margin: auto;
    width: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    &--left {
      align-items: flex-start;
    }

    &--center {
      text-align: center;
      align-items: center;
    }

    &--right {
      text-align: right;
      align-items: flex-end;
    }
  }
}
</style>
