<template>
  <base-section class="tv-shows-page__section">
    <base-wrapper>
      <base-caption class="tv-shows-page__caption">
        <template #baseCaptionHeadingH1>
          {{ dictionary.popularTvShows }} ({{ tvShowsList.length }})
        </template>
      </base-caption>

      <div class="tv-shows-page__container">
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
              {{ dictionary.release }}: {{ item.first_air_date }}
            </base-badge>

            <base-paragraph size="sm">
              {{ sliceText(item.overview, 150, true) }}
            </base-paragraph>

            <template #baseCardActions>
              <base-button
                color="primary"
                @click="
                  $router.push({ name: item.route, params: { id: item.id } })
                "
              >
                {{ dictionary.details }}
              </base-button>
            </template>
          </base-card>
        </layout-grid-cards>

        <base-pagination
          v-bind="{ items: tvShowsList, limit: 8 }"
          class="tv-shows-page__pagination"
          @change="(list: Array<TVShowItem>) => (paginatedList = list)"
        />
      </div>
    </base-wrapper>
  </base-section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore, Getter } from '../store';
import { TVShowItem } from '../interfaces';
import { transformText, sliceText } from '../helpers/use-text';
import { dictionary } from '../config/dictionary.config';

import LayoutGridCards from '../layout/LayoutGridCards.vue';

const store = useStore();

const tvShowsList = computed<Array<TVShowItem>>(
  () => store.getters[Getter.GET_TV_SHOWS_LIST]
);

const paginatedList = ref<Array<TVShowItem>>();
</script>

<style lang="scss">
.tv-shows-page {
  &__caption {
    margin-bottom: 1em;
  }

  &__pagination {
    margin-top: 1.875em;
  }
}
</style>
