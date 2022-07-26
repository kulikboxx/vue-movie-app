<template>
  <label class="base-input">
    <slot />

    <div
      :class="[
        'base-input__wrapper',
        { 'base-input__wrapper--disabled': disabled },
        { 'base-input__wrapper--invalid': invalid },
        { 'base-input__wrapper--focused': isFocused },
        { 'base-input__wrapper--prefix': $slots.baseInputPrefix },
      ]"
      tabindex="0"
      @blur="toggleFocus()"
      @focus="toggleFocus()"
    >
      <slot name="baseInputPrefix" />

      <input
        v-bind="{
          ...$attrs,
          disabled,
          placeholder,
          readonly,
          type,
          value: modelValue,
        }"
        ref="baseInputRef"
        class="base-input__element"
        @blur="toggleFocus()"
        @focus="toggleFocus()"
        @input="handleInputChange($event)"
        @click.stop
        @keydown.stop
      />

      <base-button
        v-if="clearable && modelValue"
        color="inherit"
        text
        @click="emit('update:modelValue', ''), focus()"
      >
        <base-icon name="close" />
      </base-button>

      <slot name="baseInputSuffix" />
    </div>
  </label>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

type InputType = 'text' | 'tel' | 'email';

interface Props {
  clearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  modelValue?: string;
  placeholder?: string;
  readonly?: boolean;
  type?: InputType;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
});

const emit = defineEmits(['update:modelValue']);

defineExpose({ focus });

const isFocused = ref(false);
const baseInputRef = ref<HTMLInputElement>();

function toggleFocus() {
  isFocused.value = !isFocused.value;
}

function focus() {
  baseInputRef.value?.focus();
}

function handleInputChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value.trimStart());
}

watch(isFocused, () => {
  if (isFocused.value) {
    focus();
  }
});
</script>

<style lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: $main;

  &__wrapper {
    @include base-element-styles(space-between);
    flex: 1;
    width: 100%;
    border-color: $gray;

    &--focused {
      outline: 0.4rem solid rgba($gray, 0.5);
    }

    &--invalid {
      @include invalid-element-styles;

      &.base-input__wrapper--focused {
        outline: 0.4rem solid rgba($pink, 0.2);
      }
    }

    &--prefix {
      gap: 1.6rem;
    }
  }

  &__element {
    @include placeholder-style;
    all: inherit;
    padding: 0;
    border-color: transparent;
    border-radius: 0;
    box-shadow: none;
    outline: none;
  }
}
</style>
