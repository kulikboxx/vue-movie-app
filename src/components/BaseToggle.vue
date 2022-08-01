<template>
  <label
    :class="[
      'base-toggle',
      'base-toggle__label',
      { 'base-toggle__label--disabled': disabled },
    ]"
  >
    <input
      v-bind="{ ...$attrs, checked: modelValue, disabled }"
      :class="[
        'base-toggle__element',
        { 'base-toggle__element--invalid': invalid },
      ]"
      type="checkbox"
      @change.stop="handleToggleChange($event)"
    />
    <slot />
  </label>
</template>

<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  invalid?: boolean;
  modelValue?: boolean;
}

defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

function handleToggleChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
}
</script>

<style lang="scss" scoped>
.base-toggle {
  &__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: max-content;
    font-size: 1.4rem;
    font-weight: 400;

    &--disabled {
      filter: brightness(75%);
      pointer-events: none;
      user-select: none;
    }
  }

  &__element {
    position: relative;
    appearance: none;

    &::before,
    &::after {
      content: '';
      display: inline-block;
      cursor: pointer;
    }

    &::before {
      width: 30px;
      height: 18px;
      border: 0.2rem solid $gray;
      border-radius: 1.6rem;
    }

    &::after {
      position: absolute;
      top: 4px;
      left: 4px;
      height: 14px;
      width: 14px;
      background-color: $gray;
      border-radius: 50%;
      transition: left 0.3s, background-color 0.6s;
    }

    &:checked::after {
      left: 16px;
      background-color: $primary;
    }

    &:focus {
      outline: none;

      &-visible::before {
        outline: 0.4rem solid rgba($secondary, 0.6);
      }
    }

    &--invalid {
      &::before {
        border-color: $pink;
      }

      &::after {
        background-color: $pink;
      }

      &:focus-visible::before {
        outline: 0.4rem solid rgba($pink, 0.2);
      }
    }
  }
}
</style>
