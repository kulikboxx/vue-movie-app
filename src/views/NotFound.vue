<template>
  <base-poster
    v-bind="{
      alt: moviePoster.title,
      src: moviePoster.backdrop_lg,
    }"
    position="center"
  >
    <base-heading type="h1">{{ dictionary.pageDoesNotExist }}</base-heading>
  </base-poster>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore, Getter } from '../store';
import { MovieItem } from '../interfaces';
import { randomNumber } from '../helpers/use-random-number';
import { dictionary } from '../config/dictionary.config';

const store = useStore();

const moviesList = computed<Array<MovieItem>>(
  () => store.getters[Getter.GET_MOVIES_LIST]
);

const moviePoster = computed(
  () => moviesList.value[randomNumber(0, moviesList.value.length - 1)]
);
</script>
