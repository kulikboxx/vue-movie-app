<template>
  <article class="not-found-page">
    <base-poster
      v-bind="{
        alt: moviePoster.title,
        src: moviePoster.backdrop_lg,
      }"
      position="center"
    >
      <base-heading type="h1">{{ dictionary.pageDoesNotExist }}</base-heading>
    </base-poster>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '../store';
import { MovieItem } from '../interfaces';
import { getRandomNumber } from '../helpers';
import { dictionary } from '../config';

const store = useStore();

const moviesList = computed(() => store.getMoviesList);

const moviePoster = computed(
  () => moviesList.value[getRandomNumber(0, moviesList.value.length - 1)]
);
</script>
