import { AlertItem, MovieItem, TVShowItem } from './interfaces';

export interface State {
  alerts: Array<AlertItem>;
  currentPage: number;
  error: boolean;
  fetching: boolean;
  moviesList: Array<MovieItem>;
  paginatedList: Array<MovieItem | TVShowItem>;
  tvShowsList: Array<TVShowItem>;
}

export const state: State = {
  alerts: [],
  currentPage: 0,
  error: false,
  fetching: false,
  moviesList: [],
  paginatedList: [],
  tvShowsList: [],
};
