<template>
  <label :class="['base-textarea', 'base-textarea__label']">
    <slot />

    <textarea
      v-bind="{ disabled, placeholder, value: modelValue }"
      :class="[
        'base-textarea__element',
        { 'base-textarea__element--autogrow': autogrow },
        { 'base-textarea__element--invalid': invalid },
      ]"
      @input="
        handleTextareaChange($event);
        autogrow && textareaAutoGrow($event);
      "
    >
    </textarea>
  </label>
</template>

<script lang="ts" setup>
interface Props {
  autogrow?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  modelValue?: string;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
});

const emit = defineEmits(['update:modelValue']);

function handleTextareaChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
}

function textareaAutoGrow(e: Event) {
  const textarea = e.target as HTMLTextAreaElement;

  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
  textarea.style.overflow = 'hidden';
}
</script>

<style lang="scss">
.base-textarea {
  &__label {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  &__element {
    @include base-element-styles;
    @include placeholder-style;
    min-height: 120px;
    border-color: $gray;
    resize: vertical;

    &[disabled],
    &--autogrow {
      resize: none;
    }

    &--invalid {
      @include invalid-element-styles;
    }
  }
}
</style>
