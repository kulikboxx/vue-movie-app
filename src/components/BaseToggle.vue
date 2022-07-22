<template>
  <label
    :class="[
      'base-toggle',
      'base-toggle__label',
      { 'base-toggle__label--disabled': disabled },
    ]"
  >
    <input
      v-bind="{ checked: modelValue.includes(value), disabled, value }"
      :class="[
        'base-toggle__element',
        { 'base-toggle__element--invalid': invalid },
      ]"
      type="checkbox"
      @change="handleToggleChange($event)"
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

function handleToggleChange(e: Event) {
  const toggle = e.target as HTMLInputElement;
  const values = [...props.modelValue];

  if (toggle.checked) {
    values.push(toggle.value);
  } else {
    values.splice(values.indexOf(toggle.value), 1);
  }

  emit('update:modelValue', values);
}
</script>

<style lang="scss" scoped>
.base-toggle {
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
      cursor: pointer;
    }

    &::before {
      width: 34px;
      height: 20px;
      border: 0.2rem solid $gray;
      border-radius: 1.6rem;
      transition: background-color 0.6s;
    }

    &::after {
      position: absolute;
      top: 4px;
      left: 4px;
      height: 16px;
      width: 16px;
      background-color: $gray;
      border-radius: 50%;
      transition: left 0.3s, background-color 0.6s;
    }

    &:checked {
      &::before {
        background-color: $primary;
      }

      &::after {
        left: 18px;
      }
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
