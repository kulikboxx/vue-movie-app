<template>
  <base-button
    :class="[
      'app-header__button',
      { 'app-header__button--rotation': rotation },
    ]"
    square
    text
  >
    <span class="app-header__button-item"></span>
    <span class="app-header__button-item"></span>
    <span class="app-header__button-item"></span>
  </base-button>
</template>

<script lang="ts" setup>
interface Props {
  color?: boolean;
  rotation?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss">
.app-header__button {
  flex-direction: column;
  width: 35px;
  height: 35px;

  &-item {
    width: 75%;
    height: 3px;
    background-color: $primary;
    border-radius: 0.4rem;
    transition: background-color 0.4s, transform 0.4s;

    &:first-of-type {
      transform: translateY(-5px);
    }

    &:last-of-type {
      transform: translateY(5px);
    }
  }

  &--rotation {
    .app-header__button-item {
      &:first-of-type {
        transform: translateY(3px) rotateZ(-45deg);
      }

      &:nth-of-type(2) {
        transform: scale(0);
      }

      &:last-of-type {
        transform: translateY(-3px) rotateZ(45deg);
      }
    }
  }
}

@media (min-width: 992px) {
  button.app-header__button {
    display: none;
  }
}
</style>
