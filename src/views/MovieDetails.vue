<template>
  <article class="movie-details-page">
    <base-section class="movie-details-page__section">
      <base-wrapper>
        <layout-grid-details>
          <template #layoutGridDetailsImage>
            <base-image v-bind="{ alt: movie?.title, src: movie?.poster_lg }" />
          </template>

          <base-heading type="h1" color="danger">
            {{ pageNumber + 1 }}. {{ movie?.title }}
          </base-heading>

          <base-badge color="danger">
            {{ dictionary.language }}:
            {{ movie?.original_language.toUpperCase() }}
          </base-badge>

          <base-paragraph>
            {{ dictionary.overview }}: {{ movie?.overview }}
          </base-paragraph>

          <div>
            <base-badge color="success">
              {{ dictionary.rating }}: {{ movie?.vote_average }}
            </base-badge>

            <base-badge color="warning">
              {{ dictionary.release }}: {{ movie?.release_date }}
            </base-badge>

            <base-badge color="secondary">
              {{ dictionary.views }}:
              {{ movie?.popularity && parseInt(movie?.popularity) }}
            </base-badge>
          </div>

          <template #layoutGridDetailsActions>
            <base-button
              color="secondary"
              @click="$router.push({ name: 'home' })"
            >
              <base-icon
                name="chevron-up"
                degrees="-90deg"
                rotation
                size="16px"
              />
              {{ dictionary.home }}
            </base-button>

            <base-button
              color="secondary"
              @click="$router.push({ name: 'movies' })"
            >
              <base-icon
                name="chevron-up"
                degrees="-90deg"
                rotation
                size="16px"
              />
              {{ dictionary.backToMovies }}
            </base-button>

            <base-button
              v-if="pageNumber > 0"
              color="secondary"
              @click="
                $router.push({
                  name: 'movie',
                  params: {
                    id: store.changePage(moviesList, +route.params.id, -1),
                  },
                })
              "
            >
              <base-icon
                name="chevron-up"
                degrees="-90deg"
                rotation
                size="16px"
              />
              {{ dictionary.prevMovie }}
            </base-button>

            <base-button
              v-if="pageNumber < moviesList.length - 1"
              color="secondary"
              @click="
                $router.push({
                  name: 'movie',
                  params: {
                    id: store.changePage(moviesList, +route.params.id, 1),
                  },
                })
              "
            >
              <base-icon
                name="chevron-up"
                degrees="90deg"
                rotation
                size="16px"
              />
              {{ dictionary.nextMovie }}
            </base-button>
          </template>
        </layout-grid-details>
      </base-wrapper>
    </base-section>
  </article>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../store';
import { dictionary } from '../config';

import LayoutGridDetails from '../layout/LayoutGridDetails.vue';

const route = useRoute();
const store = useStore();

const pageNumber = ref(0);

const moviesList = computed(() => store.getMoviesList);

const movie = computed(() => {
  const movieItem = moviesList.value.find((el) => el.id === +route.params.id);

  if (movieItem) {
    pageNumber.value = moviesList.value.indexOf(movieItem);
  }

  return movieItem;
});
</script>

<style lang="scss">
.movie-details-page {
  &__caption {
    margin-bottom: 1em;
  }
}
</style>
