<template>
  <div class="base-search">
    <base-button color="primary" text @click="toggleDialogVisibility(true)">
      <base-icon name="search" size="24px" />
    </base-button>

    <teleport to="#app">
      <base-dialog
        :is-visible="dialogVisibility"
        @close="toggleDialogVisibility(false)"
      >
        <base-input
          v-model="searchedValue"
          clearable
          placeholder="Enter a value"
          ref="baseSearchInputRef"
          type="text"
          @keydown.down="setFocus(0)"
        >
        </base-input>

        <ul class="base-search__list">
          <li
            v-if="!computedList?.length"
            class="base-search__list-item--empty"
          >
            <base-heading type="h4">
              {{ dictionary.emptyList }}
            </base-heading>
          </li>

          <template v-else>
            <li
              v-for="(item, index) in computedList"
              :key="item.id"
              class="base-search__list-item"
              ref="baseSearchListItemRef"
              tabindex="0"
              @click="goToDetailsPage(item.id)"
              @keydown.up="setFocus(index - 1)"
              @keydown.down="setFocus(index + 1)"
              @keydown.enter="goToDetailsPage(item.id)"
            >
              <base-heading type="h4">
                {{ item.title }}
              </base-heading>
            </li>
          </template>
        </ul>
      </base-dialog>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { MovieItem, TVShowItem } from '../interfaces';
import { dictionary } from '../config';

const router = useRouter();
const store = useStore();

const baseSearchInputRef = ref<HTMLInputElement>();
const baseSearchListItemRef = ref<Array<HTMLLIElement>>([]);
const dialogVisibility = ref(false);
const searchedValue = ref('');
const moviesList = computed(() => store.getMoviesList);
const tvShowsList = computed(() => store.getTVShowsList);

const searchList = computed(() => [...moviesList.value, ...tvShowsList.value]);

const computedList = computed(() => {
  const value = searchedValue.value;

  return searchList.value.filter((el) =>
    value.length && el.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
      ? el
      : ''
  );
});

function setFocus(index: number) {
  baseSearchListItemRef.value[index]?.focus();
}

function goToDetailsPage(id: number) {
  const index = moviesList.value.findIndex((el) => el.id === id);
  router.push({ name: index !== -1 ? 'movie' : 'tv-show', params: { id } });
  toggleDialogVisibility(false);
}

function toggleDialogVisibility(val: boolean) {
  dialogVisibility.value = val;
}

watch(dialogVisibility, () => {
  setTimeout(() => {
    baseSearchInputRef.value?.focus();
    searchedValue.value = '';
  });
});
</script>

<style lang="scss">
.base-search {
  display: inline-flex;
  align-items: center;

  &__list {
    @include base-scrollbar-styles(0.5rem);
    margin-top: 0.625em;
    padding: 0.75em;
    height: 40vh;
    border: 0.1rem solid $gray;
    border-radius: 0.4rem;
    list-style: none;
    overflow-y: auto;

    &-item {
      padding: 0.375em 0.625em;
      border-radius: 0.4rem;
      cursor: pointer;

      &--empty {
        padding: 0.25em 0.5em;
        color: $gray;
      }

      &:hover,
      &:focus-visible {
        background-color: $gray;
        outline: none;
      }

      &:not(:last-of-type) {
        margin-bottom: 0.375em;
      }

      &:not(.base-search__list-item--empty) {
        cursor: pointer;
      }
    }
  }
}
</style>
