<template>
  <img v-bind="{ alt, src }" class="base-image" />
</template>

<script lang="ts" setup>
interface Props {
  alt?: string;
  src?: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.base-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
