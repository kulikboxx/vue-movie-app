<template>
  <label
    :class="[
      'base-radio',
      'base-radio__label',
      { 'base-radio__label--disabled': disabled },
    ]"
  >
    <input
      v-bind="{
        checked: modelValue === value,
        disabled,
        value,
      }"
      :class="[
        'base-radio__element',
        { 'base-radio__element--invalid': invalid },
      ]"
      type="radio"
      @change="handleRadioChange($event)"
    />
    <slot />
  </label>
</template>

<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  invalid?: boolean;
  modelValue?: string;
  value?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  value: '',
});

const emit = defineEmits(['update:modelValue']);

function handleRadioChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
.base-radio {
  &__label {
    display: flex;
    align-items: center;
    gap: 1rem;
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
      width: 16px;
      height: 16px;
      border-radius: 50%;
      cursor: pointer;
    }

    &::before {
      border: 0.2rem solid $primary;
    }

    &::after {
      position: absolute;
      inset: 0;
      background-color: $primary;
      border: 0.2rem solid transparent;
      transition: transform 0.3s;
      transform: scale(0);
    }

    &:checked::after {
      transform: scale(0.55);
    }

    &:focus {
      outline: none;

      &-visible::before {
        outline: 0.4rem solid rgba($primary, 0.2);
      }
    }

    &--invalid {
      &::before {
        border-color: $pink;
      }

      &:focus-visible::before {
        outline: 0.4rem solid rgba($pink, 0.2);
      }
    }
  }
}
</style>
