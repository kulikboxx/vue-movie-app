<template>
  <div class="app-grid-details">
    <div v-if="$slots.layoutGridDetailsImage" class="app-grid-details__image">
      <slot name="layoutGridDetailsImage" />
    </div>

    <div class="app-grid-details__content">
      <slot />

      <div class="app-grid-details__actions">
        <slot name="layoutGridDetailsActions" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-grid-details {
  display: grid;
  gap: 3rem;

  &__content,
  &__content > div {
    display: flex;
  }

  &__content {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }

  &__content > div {
    flex-wrap: wrap;
    gap: 1rem;
  }
}

@media (min-width: 640px) {
  .app-grid-details {
    grid-template-columns: minmax(300px, 420px) minmax(300px, 1fr);
  }
}
</style>
