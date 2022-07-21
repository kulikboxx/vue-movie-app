<template>
  <div :class="['base-linear-loader', { 'base-linear-loader--fixed': fixed }]">
    <div class="base-linear-loader__inner" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  fixed?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.base-linear-loader {
  width: 100%;
  height: 3px;
  background-color: $gray;
  overflow: hidden;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }

  &__inner {
    width: 200%;
    height: 100%;
    background-image: linear-gradient(
      45deg,
      $secondary,
      $primary,
      $secondary,
      $primary,
      $secondary
    );
    animation: move 0.7s linear infinite;
  }
}

@keyframes move {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0%);
  }
}
</style>
