<template>
  <div class="app-grid-cards">
    <slot />
  </div>
</template>

<style lang="scss">
.app-grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
}
</style>
