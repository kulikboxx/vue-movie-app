<template>
  <base-poster
    v-bind="{
      alt: topMoviePoster.title,
      src: topMoviePoster.backdrop_lg,
    }"
  >
    <base-heading type="h1">{{ topMoviePoster.title }}</base-heading>
    <base-paragraph>{{ topMoviePoster.overview }}</base-paragraph>

    <base-button
      color="secondary"
      @click="
        $router.push({ name: 'movie', params: { id: topMoviePoster.id } })
      "
    >
      {{ dictionary.details }}
    </base-button>
  </base-poster>

  <base-section class="home-page__section">
    <base-wrapper>
      <base-caption class="home-page__caption">
        {{ dictionary.popularMovies }} ({{ slicedMoviesList.length }})

        <template #baseCaptionSuffix>
          <base-button
            color="inherit"
            text
            @click="$router.push({ name: 'movies' })"
          >
            ({{ moviesList.length }})
            {{ dictionary.showAll }}

            <base-icon name="arrow-right" />
          </base-button>
        </template>
      </base-caption>

      <base-carousel
        v-bind="{
          breakpoints,
          items: slicedMoviesList,
          itemsPerView: 5,
          spaceBetween: 10,
        }"
        class="home-page__carousel"
      >
        <template #baseCarouselItem="{ item }">
          <base-card v-bind="{ alt: item.title, src: item.backdrop_md }">
            <template #baseCardTop>
              <base-badge color="danger">
                {{ transformText(item.original_language) }}
              </base-badge>

              <base-badge color="success">
                {{ item.vote_average }}
              </base-badge>
            </template>

            <base-heading type="h3">
              {{ sliceText(item.title, 22, false) }}
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
                  $router.push({ name: 'movie', params: { id: item.id } })
                "
              >
                {{ dictionary.details }}
              </base-button>
            </template>
          </base-card>
        </template>

        <template #baseCarouselPrev>
          <base-button color="secondary">
            <base-icon name="arrow-left" />
          </base-button>
        </template>

        <template #baseCarouselNext>
          <base-button color="secondary">
            <base-icon name="arrow-right" />
          </base-button>
        </template>
      </base-carousel>
    </base-wrapper>
  </base-section>

  <base-poster
    v-bind="{
      alt: randomTvShowPoster.name,
      src: randomTvShowPoster.backdrop_lg,
    }"
    position="center"
  >
    <base-heading type="h1">{{ randomTvShowPoster.name }}</base-heading>
    <base-paragraph>{{ randomTvShowPoster.overview }}</base-paragraph>

    <base-button
      color="secondary"
      @click="
        $router.push({ name: 'tv-show', params: { id: randomTvShowPoster.id } })
      "
    >
      {{ dictionary.details }}
    </base-button>
  </base-poster>

  <base-section class="home-page__section">
    <base-caption class="home-page__caption">
      {{ dictionary.popularTvShows }} ({{ slicedTvShowsList.length }})

      <template #baseCaptionSuffix>
        <base-button
          color="inherit"
          text
          @click="$router.push({ name: 'tv-shows' })"
        >
          ({{ tvShowsList.length }})
          {{ dictionary.showAll }}

          <base-icon name="arrow-right" />
        </base-button>
      </template>
    </base-caption>

    <base-carousel
      v-bind="{
        breakpoints,
        items: slicedTvShowsList,
        itemsPerView: 5,
        spaceBetween: 10,
      }"
      class="home-page__carousel"
    >
      <template #baseCarouselItem="{ item }">
        <base-card v-bind="{ alt: item.name, src: item.backdrop_md }">
          <template #baseCardTop>
            <base-badge color="danger">
              {{ transformText(item.original_language) }}
            </base-badge>

            <base-badge color="success">
              {{ item.vote_average }}
            </base-badge>
          </template>

          <base-heading type="h3">
            {{ sliceText(item.name, 20, false) }}
          </base-heading>

          <base-badge color="secondary">
            {{ dictionary.release }}: {{ item.first_air_date }}
          </base-badge>

          <base-paragraph size="sm">
            {{ sliceText(item.overview, 120, true) }}
          </base-paragraph>

          <template #baseCardActions>
            <base-button
              color="primary"
              @click="
                $router.push({ name: 'tv-show', params: { id: item.id } })
              "
            >
              {{ dictionary.details }}
            </base-button>
          </template>
        </base-card>
      </template>

      <template #baseCarouselPrev>
        <base-button color="secondary">
          <base-icon name="arrow-left" />
        </base-button>
      </template>

      <template #baseCarouselNext>
        <base-button color="secondary">
          <base-icon name="arrow-right" />
        </base-button>
      </template>
    </base-carousel>
  </base-section>

  <base-poster
    v-bind="{
      alt: bottomMoviePoster.title,
      src: bottomMoviePoster.backdrop_lg,
    }"
    position="right"
  >
    <base-heading type="h1">{{ bottomMoviePoster.title }}</base-heading>
    <base-paragraph>{{ bottomMoviePoster.overview }}</base-paragraph>

    <base-button
      color="secondary"
      @click="
        $router.push({ name: 'movie', params: { id: bottomMoviePoster.id } })
      "
    >
      {{ dictionary.details }}
    </base-button>
  </base-poster>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore, Getter } from '../store';
import { randomNumber } from '../helpers/use-random-number';
import { transformText, sliceText } from '../helpers/use-text';
import { dictionary } from '../config/dictionary.config';

const store = useStore();

const breakpoints = {
  250: { itemsPerView: 1 },
  500: { itemsPerView: 2 },
  750: { itemsPerView: 3 },
  1000: { itemsPerView: 4 },
  1200: { itemsPerView: 5 },
};

const moviesList = computed(() => store.getters[Getter.GET_MOVIES_LIST]);
const tvShowsList = computed(() => store.getters[Getter.GET_TV_SHOWS_LIST]);

const slicedMoviesList = computed(() => moviesList.value.slice(0, 20));
const slicedTvShowsList = computed(() => tvShowsList.value.slice(0, 20));

const topMoviePoster = computed(() => {
  return moviesList.value[randomNumber(0, moviesList.value.length - 1)];
});

const bottomMoviePoster = computed(() => {
  return moviesList.value[randomNumber(0, moviesList.value.length - 1)];
});

const randomTvShowPoster = computed(() => {
  return tvShowsList.value[randomNumber(0, tvShowsList.value.length - 1)];
});
</script>

<style lang="scss" scoped>
.home-page {
  &__section {
    padding: 0em 0.625em;
  }

  &__caption {
    margin: 2em 0 1em;
  }

  &__carousel {
    margin-bottom: 2em;
  }
}
</style>
