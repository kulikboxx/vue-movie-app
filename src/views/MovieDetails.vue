<template>
  <base-section class="movie-details-page__section">
    <base-wrapper>
      <layout-grid-details>
        <template #layoutGridDetailsImage>
          <base-image v-bind="{ alt: movie.title, src: movie.poster_lg }" />
        </template>

        <base-heading type="h1" color="danger">
          {{ pageNumber + 1 }}. {{ movie.title }}
        </base-heading>

        <div>
          <base-badge color="danger">
            {{ dictionary.language }}:
            {{ movie.original_language.toUpperCase() }}
          </base-badge>

          <base-badge>
            {{ dictionary.adult }}: {{ movie.adult ? 'Yes' : 'No' }}
          </base-badge>
        </div>

        <base-paragraph>
          {{ dictionary.overview }}: {{ movie.overview }}
        </base-paragraph>

        <div>
          <base-badge color="success">
            {{ dictionary.rating }}: {{ movie.vote_average }}
          </base-badge>

          <base-badge color="warning">
            {{ dictionary.release }}: {{ movie.release_date }}
          </base-badge>

          <base-badge color="secondary">
            {{ dictionary.views }}: {{ parseInt(movie.popularity) }}
          </base-badge>
        </div>

        <template #layoutGridDetailsActions>
          <base-button
            color="secondary"
            compact
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
            compact
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
            compact
            @click="
              store.dispatch(Action.CHANGE_PAGE, {
                name: 'movie',
                getter: Getter.GET_MOVIES_LIST,
                elId: +route.params.id,
                dir: -1,
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
            compact
            @click="
              store.dispatch(Action.CHANGE_PAGE, {
                name: 'movie',
                getter: Getter.GET_MOVIES_LIST,
                elId: +route.params.id,
                dir: 1,
              })
            "
          >
            <base-icon name="chevron-up" degrees="90deg" rotation size="16px" />
            {{ dictionary.nextMovie }}
          </base-button>
        </template>
      </layout-grid-details>
    </base-wrapper>
  </base-section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore, Action, Getter, MovieItem } from '../store';
import { dictionary } from '../config/dictionary.config';

import LayoutGridDetails from '../layout/LayoutGridDetails.vue';

const route = useRoute();
const store = useStore();

const moviesList = computed(() => store.getters[Getter.GET_MOVIES_LIST]);

const movie = computed(() =>
  moviesList.value.find((el: MovieItem) => el.id === +route.params.id)
);

const pageNumber = computed(() => moviesList.value.indexOf(movie.value));
</script>

<style lang="scss">
.movie-details-page {
  &__caption {
    margin-bottom: 1em;
  }
}
</style>
