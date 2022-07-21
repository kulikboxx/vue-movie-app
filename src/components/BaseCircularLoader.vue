<template>
  <span class="base-circular-loader"></span>
</template>

<script lang="ts" setup>
interface Props {
  size?: string;
}

withDefaults(defineProps<Props>(), { size: '16px' });
</script>

<style lang="scss" scoped>
.base-circular-loader {
  display: inline-block;
  width: v-bind(size);
  height: v-bind(size);
  border: 0.2rem dashed $white;
  border-radius: 50%;
  animation: 1s rotation linear infinite;
}

@keyframes rotation {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}
</style>
