<template>
  <transition name="base-dialog">
    <dialog
      v-if="isVisible"
      :open="isVisible"
      class="base-dialog"
      ref="baseDialogRef"
      @click.stop.self="closeDialog()"
    >
      <div class="base-dialog__body">
        <base-button
          class="base-dialog__close"
          color="inherit"
          text
          @click="closeDialog()"
        >
          <base-icon name="close" />
        </base-button>

        <div class="base-dialog__content">
          <slot v-bind="{ close: closeDialog }" />
        </div>
      </div>
    </dialog>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, watch } from 'vue';

interface Props {
  isVisible?: boolean;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), { duration: 400 });
const emit = defineEmits(['close']);

const baseDialogRef: Ref<HTMLDialogElement | undefined> = ref();
const duration = computed(() => props.duration + 'ms');

function closeDialog() {
  emit('close');
}

watch(
  () => props.isVisible,
  () => {
    if (props.isVisible) {
      baseDialogRef.value?.showModal();
    } else {
      setTimeout(() => {
        baseDialogRef.value?.close();
      }, props.duration);
    }
  }
);
</script>

<style lang="scss">
$duration: v-bind(duration);

.base-dialog {
  position: fixed;
  display: grid;
  place-items: center;
  inset: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  color: inherit;
  background-color: $backdrop;
  border: none;
  z-index: 5000;

  &__body {
    display: flex;
    flex-direction: column;
    margin-inline: 0.375em;
    padding: 1.625em 2.25em 2.25em;
    max-width: 500px;
    max-height: 90vh;
    background-color: $white;
    border-radius: 1.6rem;
  }

  &__close {
    align-self: flex-end;
    transform: translateX(8px);
  }

  &__content {
    @include base-scrollbar-styles(0.5rem);
    margin-top: 0.375em;
    overflow-y: auto;
  }

  &-enter-active {
    animation: bounce-in $duration;
  }

  &-leave-active {
    animation: bounce-in $duration reverse;
  }
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    transform: scale(1.015);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
