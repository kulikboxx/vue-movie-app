<template>
  <div class="base-scroll-up">
    <base-button
      class="base-scroll-up__button"
      size="35px"
      square
      @click="scrollUp()"
    >
      <base-icon name="chevron-up" size="24px" />
    </base-button>
  </div>
</template>

<script lang="ts" setup>
function scrollUp() {
  window.scroll({ top: 0 });
}
</script>

<style lang="scss" scoped>
.base-scroll-up {
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;
  z-index: 1;

  &__button {
    background-image: $gradient;
    border: none;
  }
}

@media (min-width: 1200px) {
  .base-scroll-up {
    right: calc(50% - 645px);
  }
}
</style>
