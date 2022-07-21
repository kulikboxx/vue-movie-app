import { GetterTree } from 'vuex';
import { State } from './state';
import { Getter } from './';
import { alertConfig } from '../config/alerts.config';

export const getters: GetterTree<State, State> = {
  [Getter.GET_ALERTS]: (state) => state.alerts.slice(-alertConfig.maxLength),
  [Getter.GET_CURRENT_PAGE]: (state) => state.currentPage,
  [Getter.GET_ERROR]: (state) => state.error,
  [Getter.GET_FETCHING]: (state) => state.fetching,
  [Getter.GET_MOVIES_LIST]: (state) => state.moviesList,
  [Getter.GET_TV_SHOWS_LIST]: (state) => state.tvShowsList,
};
