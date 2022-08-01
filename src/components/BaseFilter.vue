<template>
  <div class="base-filter">
    Base Filter
    <!-- <div class="base-filter__group">
      <base-heading type="h4">{{ categoryTitles.rating }}:</base-heading>

      <div class="base-filter__wrapper">
        <base-radio
          v-for="(item, index) in Object.values(RatingOptions)"
          :key="index"
          v-model="filterValues.rating"
          :value="item"
        >
          {{ item }}
        </base-radio>
      </div>
    </div>

    <div class="base-filter__group">
      <base-heading type="h4">{{ categoryTitles.language }}:</base-heading>

      <div class="base-filter__wrapper">
        <base-checkbox
          v-for="(item, index) in 3"
          :key="index"
          v-model="filterValues.languages"
          :value="item"
        >
          {{ item }}
        </base-checkbox>
      </div>
    </div>

    <div class="base-filter__group">
      <base-heading type="h4">{{ categoryTitles.release }}:</base-heading>

      <div class="base-filter__wrapper">
        <base-checkbox
          v-for="(item, index) in 3"
          :key="index"
          v-model="filterValues.releases"
          :value="item"
        >
          {{ item }}
        </base-checkbox>
      </div>
    </div> -->
  </div>
</template>

<!-- <script lang="ts" setup>
import { reactive } from 'vue';
import { MovieItem, TVShowItem } from '../interfaces';
import { categoryTitles, RatingOptions } from '../config';

type ItemType = MovieItem | TVShowItem;

interface Props {
  items: Array<ItemType>;
}

interface FilterValues {
  languages: Array<string>;
  releases: Array<string>;
  rating: string;
}

defineProps<Props>();

const filterValues = reactive<FilterValues>({
  languages: [],
  releases: [],
  rating: '',
});
</script> -->

<style lang="scss">
.base-filter,
.base-filter__group {
  display: flex;
  flex-direction: column;
}

.base-filter {
  gap: 0.6rem;
}

.base-filter__group {
  gap: 0.4rem;
}

.base-filter__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (min-width: 1200px) {
  .base-filter__wrapper {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
