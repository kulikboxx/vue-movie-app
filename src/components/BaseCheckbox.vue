<template>
  <label
    :class="[
      'base-checkbox',
      'base-checkbox__label',
      { 'base-checkbox__label--disabled': disabled },
    ]"
  >
    <input
      v-bind="{ checked: modelValue.includes(value), disabled, value }"
      :class="[
        'base-checkbox__element',
        { 'base-checkbox__element--invalid': invalid },
      ]"
      type="checkbox"
      @change="handleCheckboxChange($event)"
    />
    <slot />
  </label>
</template>

<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  invalid?: boolean;
  modelValue?: Array<string>;
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  value: '',
});

const emit = defineEmits(['update:modelValue']);

function handleCheckboxChange(e: Event) {
  const checkbox = e.target as HTMLInputElement;
  const values = [...props.modelValue];

  if (checkbox.checked) {
    values.push(checkbox.value);
  } else {
    values.splice(values.indexOf(checkbox.value), 1);
  }

  emit('update:modelValue', values);
}
</script>

<style lang="scss" scoped>
.base-checkbox {
  &__label {
    display: flex;
    align-items: center;
    gap: 1rem;
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
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    &::before {
      border: 0.2rem solid $gray;
      border-radius: 0.4rem;
    }

    &::after {
      position: absolute;
      inset: 0;
      background-color: $gray;
      border: 0.2rem solid transparent;
      border-radius: 0.4rem;
      transition: transform 0.3s;
      transform: scale(0);
    }

    &:checked::after {
      transform: scale(0.55);
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

      &:focus-visible::before {
        outline: 0.4rem solid rgba($pink, 0.2);
      }
    }
  }
}
</style>
