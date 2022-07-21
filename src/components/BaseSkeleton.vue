<template>
  <div class="base-skeleton">
    <div class="base-skeleton__item"></div>
    <div class="base-skeleton__item"></div>
    <div class="base-skeleton__item"></div>
    <div class="base-skeleton__item"></div>
  </div>
</template>

<style lang="scss">
.base-skeleton {
  display: grid;
  gap: 1.4rem;
  padding: 1em;
  border: 0.2rem solid $gray;
  animation: pulse 2.6s ease-in-out 0s infinite;

  &__item {
    padding: 0.5em;
    background-color: $gray;

    &:first-of-type {
      height: clamp(140px, 45vw, 250px);
    }
  }
}

.base-skeleton,
.base-skeleton__item {
  border-radius: 0.4rem;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}
</style>
