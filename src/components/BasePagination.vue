<template>
  <div class="base-pagination">
    <base-button
      :disabled="currentPage === 0"
      class="base-pagination__button"
      color="secondary"
      square
      @click="setPage(currentPage - 1)"
    >
      <base-icon name="chevron-up" degrees="-90deg" rotation size="21px" />
    </base-button>

    <base-button
      v-for="(page, index) in transformedPages"
      :key="index"
      v-bind="{ color: page === currentPage ? 'danger' : 'secondary' }"
      :class="[
        'base-pagination__button',
        { 'base-pagination__dots': typeofValue(page) },
      ]"
      square
      @click="setPage(+page)"
    >
      {{ typeofValue(page) ? page : +page + 1 }}
    </base-button>

    <base-button
      :disabled="currentPage === totalPages - 1"
      class="base-pagination__button"
      color="secondary"
      square
      @click="setPage(currentPage + 1)"
    >
      <base-icon name="chevron-up" degrees="90deg" rotation size="21px" />
    </base-button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  currentPage: number;
  totalPages: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 0,
  totalPages: 1,
});

const emit = defineEmits(['change']);

const currentPage = computed(() => props.currentPage);
const pagesArray = computed(() => Array.from(Array(props.totalPages).keys()));

const transformedPages = computed(() => {
  const current = currentPage.value;
  const dots = '...';
  const lastPage = props.totalPages - 1;
  const limit = 5;
  const threshold = 2;

  if (props.totalPages < 7) return pagesArray.value;

  if (current <= threshold) {
    return [...filterPages(0, limit - 1), dots, lastPage];
  } else if (current >= lastPage - limit + threshold) {
    return [0, dots, ...filterPages(lastPage - limit + 1, lastPage)];
  }

  return [0, dots, ...filterPages(current - 1, current + 1), dots, lastPage];
});

function filterPages(start: number, end: number) {
  return pagesArray.value.filter((page) => page >= start && page <= end);
}

function typeofValue(value: string | number) {
  return typeof value === 'string';
}

function setPage(page: number) {
  emit('change', page);
}
</script>

<style lang="scss" scoped>
.base-pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &__button {
    &:focus {
      z-index: 5;
    }

    &:first-of-type {
      border-left-color: $gray;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-of-type {
      border-right-color: $gray;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:first-of-type, :last-of-type) {
      padding: 0.3125em 0.625em;
      border-radius: 0;
    }

    &:not(:first-of-type) {
      border-left-color: $gray;
    }
  }

  &__dots {
    pointer-events: none;
  }
}
</style>
