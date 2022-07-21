<template>
  <div class="base-caption">
    <base-heading v-if="$slots.baseCaptionHeadingH1" type="h1">
      <slot name="baseCaptionHeadingH1" />
    </base-heading>

    <base-heading v-if="$slots.default" type="h2">
      <slot />
    </base-heading>

    <div v-if="$slots.baseCaptionSuffix" class="base-caption__suffix">
      <slot name="baseCaptionSuffix" />
    </div>
  </div>
</template>

<style lang="scss">
.base-caption,
.base-caption__suffix {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
</style>
