<template>
  <hr :class="['base-divider', { 'base-divider--centered': centered }]" />
</template>

<script lang="ts" setup>
interface Props {
  centered?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.base-divider {
  width: 100%;
  max-width: 1200px;
  height: 1px;
  background-color: $gray;
  border: none;

  &--centered {
    margin-inline: auto;
  }
}
</style>
