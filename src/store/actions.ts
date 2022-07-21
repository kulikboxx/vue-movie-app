import { ActionTree, ActionContext, ActionPayload } from 'vuex';
import { State } from './state';
import { Action, Getter, Mutation } from './types';
import { AlertItem, MovieItem, TVShowItem } from './interfaces';
import {
  useApi,
  totalPages,
  EnpointTypes,
  API_URL_IMAGE_MD,
  API_URL_IMAGE_LG,
} from '../api/use-api';
import { alertConfig } from '../config/alerts.config';

import router from '../router';
import axios from 'axios';

// export interface Actions {
//   [Action.HIDE_ALERT](
//     context: ActionContext<State, State>,
//     payload: ActionPayload
//   ): void;
//   [Action.SHOW_ALERT](
//     context: ActionContext<State, State>,
//     payload: ActionPayload
//   ): void;
//   [Action.USE_FETCH](
//     context: ActionContext<State, State>,
//     payload: string
//   ): Promise<void>;
// }

export const actions: ActionTree<State, State> = {
  [Action.FETCH_DATA]({ dispatch }) {
    for (let i = 1; i <= totalPages; i++) {
      dispatch(Action.USE_FETCH, {
        url: useApi.getMovies(i),
        endpointType: EnpointTypes.Movies,
      });
      dispatch(Action.USE_FETCH, {
        url: useApi.getTvShows(i),
        endpointType: EnpointTypes.TVShows,
      });
    }
  },
  [Action.FILTER_MOVIES](_, data: Array<MovieItem>) {
    return data.filter((item: MovieItem) => {
      item.backdrop_md = API_URL_IMAGE_MD + item.backdrop_path;
      item.backdrop_lg = API_URL_IMAGE_LG + item.backdrop_path;
      item.poster_md = API_URL_IMAGE_MD + item.poster_path;
      item.poster_lg = API_URL_IMAGE_LG + item.poster_path;

      return (
        item.title.length &&
        item.overview.length &&
        !item.backdrop_md.includes('null') &&
        !item.backdrop_lg.includes('null')
      );
    });
  },
  [Action.FILTER_TV_SHOWS](_, data: Array<TVShowItem>) {
    return data.filter((item: TVShowItem) => {
      item.backdrop_md = API_URL_IMAGE_MD + item.backdrop_path;
      item.backdrop_lg = API_URL_IMAGE_LG + item.backdrop_path;
      item.poster_md = API_URL_IMAGE_MD + item.poster_path;
      item.poster_lg = API_URL_IMAGE_LG + item.poster_path;

      return (
        item.name.length &&
        item.overview.length &&
        !item.backdrop_md.includes('null') &&
        !item.backdrop_lg.includes('null')
      );
    });
  },
  [Action.HIDE_ALERT]({ commit, getters }, id) {
    const index = getters[Getter.GET_ALERTS].findIndex(
      (al: AlertItem) => al.id === id
    );

    commit(Mutation.HIDE_ALERT, { id, index });
  },
  [Action.CHANGE_PAGE]({ getters }, { getter, name, elId, dir }) {
    const elements = getters[getter];
    const index = elements.findIndex((el: TVShowItem) => el.id === elId);

    router.push({ name, params: { id: elements[index + dir].id } });
  },
  [Action.ON_PAGINATION]({ commit }, { items, limit, page }) {
    const paginatedItems = items.filter(
      (_: any, i: number) => i >= page * limit && i < page * limit + limit
    );

    commit(Mutation.SET_CURRENT_PAGE, page);
    commit(Mutation.ON_PAGINATION, paginatedItems);
  },
  [Action.SET_CURRENT_PAGE]({ commit }, page) {
    commit(Mutation.SET_CURRENT_PAGE, page);
  },
  [Action.SHOW_ALERT]({ commit, dispatch }, alert) {
    commit(Mutation.SHOW_ALERT, alert);

    setTimeout(() => dispatch(Action.HIDE_ALERT), alertConfig.duration);
  },
  async [Action.USE_FETCH]({ commit, dispatch }, { url, endpointType }) {
    commit(Mutation.UPDATE_FETCHING, true);

    axios(url)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.results;

          switch (endpointType) {
            case EnpointTypes.Movies:
              dispatch(Action.FILTER_MOVIES, result).then((data) => {
                commit(Mutation.UPDATE_MOVIES_LIST, data);
              });
              break;
            case EnpointTypes.TVShows:
              dispatch(Action.FILTER_TV_SHOWS, result).then((data) => {
                commit(Mutation.UPDATE_TV_SHOWS_LIST, data);
              });
              break;
            default:
              throw new Error('Unknown mutation type!');
          }
        }
      })
      .catch((error) => {
        commit(Mutation.SHOW_ALERT, {
          message: error.message,
          type: 'error',
        });
        commit(Mutation.UPDATE_ERROR, true);
      })
      .finally(() => commit(Mutation.UPDATE_FETCHING, false));
  },
};
