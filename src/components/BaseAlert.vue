<template>
  <transition-group
    v-show="alerts.length"
    name="base-alert"
    class="base-alert"
    tag="ul"
  >
    <li
      v-for="alert in alerts"
      :key="alert.id"
      :class="['base-alert__item', `base-alert__item--${alert.type}`]"
    >
      <base-icon :name="alert.type" />

      {{ alert.message }}

      <base-button color="inherit" text @click="store.hideAlert(alert.id)">
        <base-icon name="close" />
      </base-button>
    </li>
  </transition-group>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '../store';

const store = useStore();
const alerts = computed(() => store.getAlerts);
</script>

<style lang="scss" scoped>
.base-alert {
  position: fixed;
  inset: 0.625em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin-inline: auto;
  max-width: 500px;
  height: max-content;
  list-style: none;
  z-index: 20000;

  &__item {
    @include base-element-styles(space-between, 1.5rem);
    text-align: center;

    &--error {
      @include danger-element-palette;
    }

    &--success {
      @include success-element-palette;
    }

    &--warning {
      @include warning-element-palette;
    }
  }

  &-move,
  &-enter-active,
  &-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(5px);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
