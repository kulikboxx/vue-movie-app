<template>
  <transition
    v-show="isVisible && $slots.baseAnimationSingle"
    v-bind="{ name }"
  >
    <slot name="baseAnimationSingle" />
  </transition>

  <transition-group
    v-show="isVisible && $slots.baseAnimationGroup"
    v-bind="{ name, tag }"
    :class="name"
  >
    <slot name="baseAnimationGroup" />
  </transition-group>
</template>

<script lang="ts" setup>
interface Props {
  isVisible: boolean;
  name: string;
  tag?: string;
}

defineProps<Props>();
</script>

<style lang="scss">
// Alerts
.base-alert {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(15px);
  }

  &-leave-active {
    position: absolute;
  }
}

// Details page
.details-page {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.4s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
