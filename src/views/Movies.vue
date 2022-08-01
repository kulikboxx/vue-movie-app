<template>
  <article class="movies-page">
    <base-section class="movies-page__section">
      <base-wrapper>
        <base-caption class="movies-page__caption">
          <template #baseCaptionHeadingH1>
            {{ dictionary.popularMovies }} ({{ listAfterSorting.length }})
          </template>
        </base-caption>

        <div class="movies-page__container">
          <base-filter
            :items="movieList"
            @filter="(list: Array<MovieItem>) => (sortedList = list)"
          />

          <layout-grid-cards>
            <base-card
              v-for="item in paginatedList"
              :key="item.id"
              v-bind="{ alt: item.title, src: item.backdrop_md }"
            >
              <template #baseCardTop>
                <base-badge color="danger">
                  {{ transformText(item.original_language) }}
                </base-badge>

                <base-badge color="success">
                  {{ item.vote_average }}
                </base-badge>
              </template>

              <base-heading type="h3">
                {{ sliceText(item.title, 20, false) }}
              </base-heading>

              <base-badge color="secondary">
                {{ dictionary.release }}: {{ item.release_date }}
              </base-badge>

              <base-paragraph size="sm">
                {{ sliceText(item.overview, 150, true) }}
              </base-paragraph>

              <template #baseCardActions>
                <base-button
                  color="primary"
                  @click="
                    $router.push({
                      name: item.route,
                      params: { id: item.id },
                    })
                  "
                >
                  {{ dictionary.details }}
                </base-button>
              </template>
            </base-card>
          </layout-grid-cards>

          <base-pagination
            v-bind="{
              items: listAfterSorting,
              visibleItems: 16,
            }"
            class="movies-page__pagination"
            @change="(list: Array<MovieItem>) => (paginatedList = list)"
          />
        </div>
      </base-wrapper>
    </base-section>
  </article>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from '../store';
import { MovieItem } from '../interfaces';
import { transformText, sliceText } from '../helpers';
import { dictionary } from '../config';

import LayoutGridCards from '../layout/LayoutGridCards.vue';

const store = useStore();

const movieList = computed(() => store.getMoviesList);

const sortedList = ref<Array<MovieItem>>();

const listAfterSorting = computed<Array<MovieItem>>(() =>
  sortedList.value?.length ? sortedList.value : movieList.value
);

const paginatedList = ref<Array<MovieItem>>();
</script>

<style lang="scss">
.movies-page {
  &__caption {
    margin-bottom: 1em;
  }

  &__container {
    display: grid;
    gap: 1.2rem;
  }

  &__pagination {
    margin-top: 0.8125em;
  }
}

@media (min-width: 1200px) {
  .movies-page {
    &__container {
      grid-template-columns: min-content 1fr;
      column-gap: 2rem;
    }

    &__pagination {
      grid-column: 2/-1;
    }
  }
}
</style>
