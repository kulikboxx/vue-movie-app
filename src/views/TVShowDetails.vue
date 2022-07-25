<template>
  <base-section class="tv-show-details-page__section">
    <base-wrapper>
      <layout-grid-details>
        <template #layoutGridDetailsImage>
          <base-image v-bind="{ alt: tvShow?.title, src: tvShow?.poster_lg }" />
        </template>

        <base-heading type="h1" color="danger">
          {{ pageNumber + 1 }}. {{ tvShow?.title }}
        </base-heading>

        <base-badge color="danger">
          {{ dictionary.language }}:
          {{ tvShow?.original_language.toUpperCase() }}
        </base-badge>

        <base-paragraph>
          {{ dictionary.overview }}: {{ tvShow?.overview }}
        </base-paragraph>

        <div>
          <base-badge color="success">
            {{ dictionary.rating }}: {{ tvShow?.vote_average }}
          </base-badge>

          <base-badge color="secondary">
            {{ dictionary.views }}:
            {{ tvShow?.popularity && parseInt(tvShow?.popularity) }}
          </base-badge>

          <base-badge color="warning">
            {{ dictionary.release }}: {{ tvShow?.first_air_date }}
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
            @click="$router.push({ name: 'tv-shows' })"
          >
            <base-icon
              name="chevron-up"
              degrees="-90deg"
              rotation
              size="16px"
            />
            {{ dictionary.backToTvShows }}
          </base-button>

          <base-button
            v-if="pageNumber > 0"
            color="secondary"
            @click="
              store.dispatch(Action.CHANGE_PAGE, {
                name: tvShow?.route,
                getter: Getter.GET_TV_SHOWS_LIST,
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
            {{ dictionary.prevTvShow }}
          </base-button>

          <base-button
            v-if="pageNumber < tvShowsList.length - 1"
            color="secondary"
            @click="
              store.dispatch(Action.CHANGE_PAGE, {
                name: tvShow?.route,
                getter: Getter.GET_TV_SHOWS_LIST,
                elId: +route.params.id,
                dir: 1,
              })
            "
          >
            <base-icon name="chevron-up" degrees="90deg" rotation size="16px" />
            {{ dictionary.nextTvShow }}
          </base-button>
        </template>
      </layout-grid-details>
    </base-wrapper>
  </base-section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore, Action, Getter } from '../store';
import { TVShowItem } from '../interfaces';
import { dictionary } from '../config/dictionary.config';

import LayoutGridDetails from '../layout/LayoutGridDetails.vue';

const route = useRoute();
const store = useStore();

const pageNumber = ref(0);

const tvShowsList = computed<Array<TVShowItem>>(
  () => store.getters[Getter.GET_TV_SHOWS_LIST]
);

const tvShow = computed(() => {
  const tvShowItem = tvShowsList.value.find(
    (el: TVShowItem) => el.id === +route.params.id
  );

  if (tvShowItem) {
    pageNumber.value = tvShowsList.value.indexOf(tvShowItem);
  }

  return tvShowItem;
});
</script>

<style lang="scss">
.tv-show-details-page {
  &__caption {
    margin-bottom: 1em;
  }
}
</style>
