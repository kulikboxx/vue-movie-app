<template>
  <div
    class="base-popover"
    ref="basePopoverRef"
    @click="togglePopoverVisibility()"
  >
    <slot
      name="basePopoverTrigger"
      v-bind="{ isOpened, togglePopoverVisibility }"
    />

    <transition name="base-popover">
      <div
        v-if="$slots.basePopoverContent && isOpened"
        class="base-popover__content"
        @click.stop
      >
        <slot name="basePopoverContent" v-bind="{ closePopover }" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, onUnmounted } from 'vue';

defineEmits(['open']);

const basePopoverRef: Ref<HTMLDivElement | undefined> = ref();
const isOpened = ref(false);

function togglePopoverVisibility() {
  isOpened.value = !isOpened.value;
}

function closePopover() {
  isOpened.value = false;
}

function eventHandler(e: Event) {
  if ((e.target as HTMLElement).parentNode !== basePopoverRef.value) {
    closePopover();
  }
}

onMounted(() => {
  document.addEventListener('click', eventHandler);
});

onUnmounted(() => {
  document.removeEventListener('click', eventHandler);
});
</script>

<style lang="scss" scoped>
.base-popover {
  position: relative;
  display: inline-block;

  &__content {
    position: absolute;
    inset: 110% 0 auto;
    padding: 0.75em;
    width: clamp(280px, 100%, 1200px);
    background-color: $white;
    border: 0.1rem solid $gray;
    border-radius: 0.4rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    z-index: 100;
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
