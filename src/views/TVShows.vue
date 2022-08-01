<template>
  <article class="tv-shows-page">
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
                {{ dictionary.release }}: {{ item.release_date }}
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
            v-bind="{ items: tvShowsList, visibleItems: 12 }"
            class="tv-shows-page__pagination"
            @change="(list: Array<TVShowItem>) => (paginatedList = list)"
          />
        </div>
      </base-wrapper>
    </base-section>
  </article>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from '../store';
import { TVShowItem } from '../interfaces';
import { transformText, sliceText } from '../helpers';
import { dictionary } from '../config';

import LayoutGridCards from '../layout/LayoutGridCards.vue';

const store = useStore();

const tvShowsList = computed(() => store.getTVShowsList);

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
