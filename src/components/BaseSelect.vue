<template>
  <div class="base-select">
    <base-popover>
      <template #basePopoverTrigger="{ isOpened, togglePopoverVisibility }">
        <base-input
          v-model="selectedValue"
          v-bind="{ disabled, invalid, placeholder }"
          readonly
          @click="togglePopoverVisibility()"
          @keydown.space="togglePopoverVisibility()"
          @keydown.down="
            !isOpened && togglePopoverVisibility();
            setFocus(0);
          "
        >
          <template #baseInputSuffix>
            <base-icon
              :degrees="isOpened ? '0deg' : '180deg'"
              name="chevron-up"
              rotation
            />
          </template>

          <slot />
        </base-input>
      </template>

      <template #basePopoverContent="{ closePopover }">
        <ul class="base-select__list">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="base-select__list-item"
            ref="baseSelectItemRef"
            tabindex="0"
            @click.stop="
              setValue(typeof item === 'string' ? item : item[displayKey]),
                closePopover()
            "
            @focus="
              setValue(typeof item === 'string' ? item : item[displayKey])
            "
            @keydown.esc="closePopover()"
            @keydown.enter="closePopover()"
            @keydown.up="setFocus(index - 1)"
            @keydown.down="setFocus(index + 1)"
          >
            {{
              transformValue(typeof item === 'string' ? item : item[displayKey])
            }}
          </li>
        </ul>
      </template>
    </base-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  disabled?: boolean;
  displayKey?: string;
  invalid?: boolean;
  items: Array<string | Record<string, string>>;
  modelValue: string;
  placeholder: string;
}

const props = withDefaults(defineProps<Props>(), {
  displayKey: 'option',
  placeholder: '',
});

const emit = defineEmits(['update:modelValue']);

const baseSelectItemRef = ref<Array<HTMLLIElement>>([]);
const selectedValue = ref(props.modelValue);

function setFocus(index: number) {
  baseSelectItemRef.value[index]?.focus();
}

function setValue(value: string) {
  selectedValue.value = transformValue(value);
  emit('update:modelValue', value);
}

function transformValue(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

watch(
  () => props.modelValue,
  () => {
    selectedValue.value = props.modelValue;
  }
);
</script>

<style lang="scss">
.base-select {
  display: grid;
  gap: 0.5rem;

  &__list {
    @include base-scrollbar-styles(0.5rem);
    padding-right: 0.25em;
    max-height: 40vh;
    list-style: none;
    overflow-y: auto;

    &-item {
      padding: 0.375em 0.625em;
      border-radius: 0.4rem;

      &:hover,
      &:focus-visible {
        background-color: $gray;
        outline: none;
      }
    }
  }
}
</style>
