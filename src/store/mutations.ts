import { MutationTree } from 'vuex';
import { State } from './state';
import { Mutation } from './';

export const mutations: MutationTree<State> = {
  [Mutation.HIDE_ALERT](state, { id, index }) {
    !id ? state.alerts.shift() : state.alerts.splice(index, 1);
  },
  [Mutation.SET_CURRENT_PAGE](state, page) {
    state.currentPage = page;
  },
  [Mutation.SHOW_ALERT](state, payload) {
    state.alerts.push({ ...payload, id: Date.now() });
  },
  [Mutation.ON_PAGINATION](state, payload) {
    state.paginatedList = payload;
  },
  [Mutation.UPDATE_ERROR](state, payload) {
    state.error = payload;
  },
  [Mutation.UPDATE_FETCHING](state, payload) {
    state.fetching = payload;
  },
  [Mutation.UPDATE_MOVIES_LIST](state, payload) {
    state.moviesList = [...state.moviesList, ...payload];
  },
  [Mutation.UPDATE_TV_SHOWS_LIST](state, payload) {
    state.tvShowsList = [...state.tvShowsList, ...payload];
  },
};
