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
import { computed, ref, watch } from 'vue';

interface Props {
  isVisible?: boolean;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), { duration: 400 });
const emit = defineEmits(['close']);

const baseDialogRef = ref<HTMLDialogElement>();
const duration = computed(() => props.duration + 'ms');

function toggleBodyOverflow(isHidden: boolean) {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  if (isHidden) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollBarWidth + 'px';
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '0px';
  }
}

function closeDialog() {
  emit('close');
}

watch(
  () => props.isVisible,
  () => {
    if (props.isVisible) {
      baseDialogRef.value?.showModal();
      toggleBodyOverflow(true);
    } else {
      setTimeout(() => {
        baseDialogRef.value?.close();
        toggleBodyOverflow(false);
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
  padding-inline: 0.25em;
  width: 100%;
  height: 100vh;
  color: inherit;
  background-color: rgba($main, 0.95);
  border: none;
  z-index: 50000;

  &__body {
    display: flex;
    flex-direction: column;
    padding: 0.6em;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    background-color: $main;
    border: 0.1rem solid $gray;
    border-radius: 1.6rem;
  }

  &__close {
    align-self: center;
  }

  &__content {
    @include base-scrollbar-styles(0.5rem);
    margin-top: 0.375em;
    padding: 0.25em;
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
