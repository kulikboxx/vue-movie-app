<template>
  <div class="app-grid-cards">
    <slot />
  </div>
</template>

<style lang="scss">
.app-grid-cards {
  display: grid;
  gap: 1.2rem;
}

@media (min-width: 490px) {
  .app-grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 730px) {
  .app-grid-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 960px) {
  .app-grid-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

// @media (min-width: 1200px) {
//   .app-grid-cards {
//     grid-template-columns: repeat(5, 1fr);
//   }
// }
</style>
