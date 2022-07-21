<template>
  <base-section class="movies-page__section">
    <base-wrapper>
      <base-caption class="movies-page__caption">
        <template #baseCaptionHeadingH1>
          {{ dictionary.popularMovies }} ({{ movieList.length }})
        </template>
      </base-caption>

      <div class="movies-page__container">
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
                compact
                @click="
                  $router.push({
                    name: 'movie',
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
          v-bind="{ items: movieList, limit: 8 }"
          class="movies-page__pagination"
          @change="(list: Array<MovieItem>) => (paginatedList = list)"
        />
      </div>
    </base-wrapper>
  </base-section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore, Getter, MovieItem } from '../store';
import { transformText, sliceText } from '../helpers/use-text';
import { dictionary } from '../config/dictionary.config';

import LayoutGridCards from '../layout/LayoutGridCards.vue';

const store = useStore();

const movieList = computed<Array<MovieItem>>(
  () => store.getters[Getter.GET_MOVIES_LIST]
);

const paginatedList = ref<Array<MovieItem>>();
</script>

<style lang="scss">
.movies-page {
  &__caption {
    margin-bottom: 1em;
  }

  &__pagination {
    margin-top: 1.875em;
  }
}
</style>
