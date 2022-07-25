import { ActionTree, ActionContext } from 'vuex';
import { State } from './state';
import { Action, Getter, Mutation } from './types';
import { AlertItem, MovieItem, TVShowItem } from '../interfaces';
import {
  useService,
  totalPages,
  RouteName,
  API_URL_IMAGE_MD,
  API_URL_IMAGE_LG,
} from '../service/use-service';
import { alertConfig } from '../config/alerts.config';

import router from '../router';
import { AxiosPromise } from 'axios';

type ContextType = ActionContext<State, State>;
type ItemType = MovieItem | TVShowItem;
type ArrayType = Array<ItemType>;

export interface Actions {
  [Action.FETCH_DATA](
    context: ContextType,
    payload: { response: AxiosPromise; routeName: string }
  ): void;
  [Action.FILTER_DATA](
    context: ContextType,
    payload: { data: ArrayType; route: string }
  ): ArrayType;
  [Action.HIDE_ALERT](context: ContextType, id: number): void;
  [Action.CHANGE_PAGE](
    context: ContextType,
    payload: { getter: string; name: string; elId: number; dir: number }
  ): void;
  [Action.SET_CURRENT_PAGE](context: ContextType, page: number): void;
  [Action.SHOW_ALERT](context: ContextType, alert: AlertItem): void;
  [Action.USE_FETCH](context: ContextType): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [Action.FETCH_DATA]({ commit, dispatch }, { response, routeName }) {
    commit(Mutation.UPDATE_FETCHING, true);

    response
      .then((res) => {
        if (res.status === 200) {
          const result = res.data.results;

          switch (routeName) {
            case RouteName.Movie:
              dispatch(Action.FILTER_DATA, {
                data: result,
                route: routeName,
              }).then((data) => commit(Mutation.UPDATE_MOVIES_LIST, data));
              break;
            case RouteName.TVShow:
              dispatch(Action.FILTER_DATA, {
                data: result,
                route: routeName,
              }).then((data) => commit(Mutation.UPDATE_TV_SHOWS_LIST, data));
              break;
            default:
              throw new Error('Unknown mutation type!');
          }
        }
      })
      .catch((error) => {
        commit(Mutation.SHOW_ALERT, { message: error.message, type: 'error' });
        commit(Mutation.UPDATE_ERROR, true);
      })
      .finally(() =>
        setTimeout(() => commit(Mutation.UPDATE_FETCHING, false), 3000)
      );
  },
  [Action.FILTER_DATA](_, { data, route }) {
    return data.filter((item: ItemType) => {
      item.title = item.name || item.title;
      item.backdrop_md = API_URL_IMAGE_MD + item.backdrop_path;
      item.backdrop_lg = API_URL_IMAGE_LG + item.backdrop_path;
      item.poster_md = API_URL_IMAGE_MD + item.poster_path;
      item.poster_lg = API_URL_IMAGE_LG + item.poster_path;
      item.route = route;

      return (
        item.title.length &&
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
    const elements: ArrayType = getters[getter];
    const index = elements.findIndex((el: ItemType) => el.id === elId);

    router.push({ name, params: { id: elements[index + dir].id } });
  },
  [Action.SET_CURRENT_PAGE]({ commit }, page) {
    commit(Mutation.SET_CURRENT_PAGE, page);
  },
  [Action.SHOW_ALERT]({ commit, dispatch }, alert) {
    commit(Mutation.SHOW_ALERT, alert);

    setTimeout(() => dispatch(Action.HIDE_ALERT), alertConfig.duration);
  },
  [Action.USE_FETCH]({ dispatch }) {
    for (let i = 1; i <= totalPages; i++) {
      dispatch(Action.FETCH_DATA, {
        response: useService.getMovies(i),
        routeName: RouteName.Movie,
      });
      dispatch(Action.FETCH_DATA, {
        response: useService.getTvShows(i),
        routeName: RouteName.TVShow,
      });
    }
  },
};
