<template>
  <base-animation
    v-bind="{ name: 'base-alert', isVisible: alerts.length, tag: 'ul' }"
  >
    <template #baseAnimationGroup>
      <li
        v-for="alert in alerts"
        :key="alert.id"
        :class="['base-alert__item', `base-alert__item--${alert.type}`]"
      >
        <base-icon :name="alert.type" />

        {{ alert.message }}

        <base-button
          color="inherit"
          text
          @click="store.dispatch(Action.HIDE_ALERT, alert.id)"
        >
          <base-icon name="close" />
        </base-button>
      </li>
    </template>
  </base-animation>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore, Action, Getter } from '../store';

const store = useStore();
const alerts = computed(() => store.getters[Getter.GET_ALERTS]);
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
  user-select: none;
  z-index: 20000;

  &__item {
    @include base-element-styles(space-between, 1.5rem);

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
}
</style>
