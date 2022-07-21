<template>
  <transition name="base-page-loader">
    <div v-if="visible" class="base-page-loader">
      <div class="base-page-loader__first">
        <div class="base-page-loader__second">
          <div class="base-page-loader__third"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
interface Props {
  visible?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss">
.base-page-loader,
.base-page-loader__first,
.base-page-loader__second {
  display: flex;
  justify-content: center;
  align-items: center;
}

.base-page-loader {
  position: fixed;
  inset: 0;
  background-color: $main;
  z-index: 9999;

  &__first,
  &__second,
  &__third {
    padding: 0.2em;
    border-radius: 50%;
    border: 0.4rem solid transparent;
    animation: rotation 2s ease infinite;
  }

  &__first {
    width: 150px;
    height: 150px;
    border-left-color: $primary;
    animation-delay: 0s;
  }

  &__second,
  &__third {
    width: 100%;
    aspect-ratio: 1/1;
  }

  &__second {
    border-left-color: $pink;
    animation-delay: 0.3s;
  }

  &__third {
    border-left-color: $green;
    animation-delay: 0.6s;
  }

  &-enter-active {
    transition: opacity 0s ease;
  }

  &-leave-active {
    transition: opacity 1s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

@keyframes rotation {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}
</style>
