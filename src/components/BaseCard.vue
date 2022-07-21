<template>
  <div class="base-card">
    <div v-if="$slots.baseCardTop" class="base-card__top">
      <slot name="baseCardTop" />
    </div>

    <div v-if="alt && src" class="base-card__image">
      <slot name="baseCardImage">
        <base-image v-bind="{ src, alt }" />
      </slot>
    </div>

    <div class="base-card__content">
      <slot />

      <div v-if="$slots.baseCardActions" class="base-card__actions">
        <slot name="baseCardActions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  alt?: string;
  src?: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.base-card {
  position: relative;
  display: grid;
  grid-template-rows: 220px 1fr;
  min-height: 100%;
  border-radius: 0.4rem;
  border: 0.1rem solid $gray;
  overflow: hidden;
  z-index: 0;

  &__top,
  &__content,
  &__actions {
    display: flex;
  }

  &__top {
    position: absolute;
    inset: 8px 10px auto;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.75em;
    gap: 1rem;
  }

  &__actions {
    margin-top: auto;
    align-self: flex-end;
    gap: 1rem;
  }
}
</style>
