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
import { computed, onMounted, watch } from 'vue';
import { useStore } from '../store';
import { MovieItem, TVShowItem } from '../interfaces';

const store = useStore();

type ItemType = MovieItem | TVShowItem;

interface Props {
  items: Array<ItemType>;
  visibleItems: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['change']);

const totalPages = computed(() =>
  Math.ceil(props.items.length / props.visibleItems)
);
const currentPage = computed(() => store.getCurrentPage);
const pagesArray = computed(() => Array.from(Array(totalPages.value).keys()));

const transformedPages = computed(() => {
  const current = currentPage.value;
  const dots = '...';
  const lastPage = totalPages.value - 1;
  const limit = 5;
  const threshold = 2;

  if (totalPages.value < 7) return pagesArray.value;

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

function paginatePages(page: number) {
  const limit = props.visibleItems;

  return props.items.filter(
    (item: ItemType, i: number) => i >= page * limit && i < page * limit + limit
  );
}

function setPage(page: number) {
  store.setCurrentPage(page);
  emit('change', paginatePages(page));
}

watch(
  () => props.items,
  () => {
    setPage(currentPage.value);
  }
);

onMounted(() => setPage(currentPage.value));
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
