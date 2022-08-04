<template>
  <article class="movies-page">
    <base-section class="movies-page__section">
      <base-wrapper>
        <base-caption class="movies-page__caption">
          <template #baseCaptionHeadingH1>
            {{ dictionary.popularMovies }} ({{ moviesList?.length }})
          </template>
        </base-caption>

        <layout-grid-cards>
          <base-card
            v-for="(item, index) in paginatedList"
            :key="index"
            v-bind="{ alt: item?.title, src: item?.backdrop_md }"
          >
            <template #baseCardTop>
              <base-badge color="danger">
                {{ transformText(item?.original_language) }}
              </base-badge>

              <base-badge color="success">
                {{ item?.vote_average }}
              </base-badge>
            </template>

            <base-heading type="h3">
              {{ sliceText(item?.title, 20, false) }}
            </base-heading>

            <base-badge color="secondary">
              {{ dictionary.release }}: {{ item?.release_date }}
            </base-badge>

            <base-paragraph size="sm">
              {{ sliceText(item?.overview, 150, true) }}
            </base-paragraph>

            <template #baseCardActions>
              <base-button
                color="primary"
                @click="
                  $router.push({ name: 'movie', params: { id: item?.id } })
                "
              >
                {{ dictionary.details }}
              </base-button>
            </template>
          </base-card>
        </layout-grid-cards>

        <base-pagination
          v-bind="{ currentPage, totalPages }"
          class="movies-page__pagination"
          @change="(page: number) => (currentPage = page)"
        />
      </base-wrapper>
    </base-section>
  </article>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from '../store';
import { transformText, sliceText } from '../helpers';
import { MovieItem } from '../interfaces';
import { dictionary } from '../config';

import LayoutGridCards from '../layout/LayoutGridCards.vue';

const store = useStore();

const currentPage = ref(0);
const visibleItems = 12;

const moviesList = computed(() => store.getMoviesList);

const totalPages = computed(() =>
  Math.ceil(moviesList.value.length / visibleItems)
);

const paginatedList = computed(() =>
  moviesList.value.filter(
    (item: MovieItem, i: number) =>
      i >= currentPage.value * visibleItems &&
      i < currentPage.value * visibleItems + visibleItems
  )
);
</script>

<style lang="scss">
.movies-page {
  &__caption {
    margin-bottom: 1em;
  }

  &__pagination {
    margin-top: 0.8125em;
  }
}
</style>
