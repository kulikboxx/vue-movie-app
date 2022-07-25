import { MutationTree } from 'vuex';
import { State } from './state';
import { Mutation } from './';
import { AlertItem, MovieItem, TVShowItem } from '../interfaces';

interface Mutations {
  [Mutation.HIDE_ALERT](
    state: State,
    payload: { id: number | undefined; index: number }
  ): void;
  [Mutation.SET_CURRENT_PAGE](state: State, page: number): void;
  [Mutation.SHOW_ALERT](state: State, payload: AlertItem): void;
  [Mutation.UPDATE_ERROR](state: State, payload: boolean): void;
  [Mutation.UPDATE_FETCHING](state: State, payload: boolean): void;
  [Mutation.UPDATE_MOVIES_LIST](state: State, payload: Array<MovieItem>): void;
  [Mutation.UPDATE_TV_SHOWS_LIST](
    state: State,
    payload: Array<TVShowItem>
  ): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.HIDE_ALERT](state, { id, index }) {
    !id ? state.alerts.shift() : state.alerts.splice(index, 1);
  },
  [Mutation.SET_CURRENT_PAGE](state, page) {
    state.currentPage = page;
  },
  [Mutation.SHOW_ALERT](state, payload) {
    state.alerts.push({ ...payload, id: Date.now() });
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
