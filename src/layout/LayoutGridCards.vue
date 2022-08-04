<template>
  <div class="app-grid-cards">
    <slot />
  </div>
</template>

<style lang="scss">
.app-grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: min-content;
  gap: 1.2rem;
}
</style>
