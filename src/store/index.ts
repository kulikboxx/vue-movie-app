import { defineStore } from 'pinia';
import { AlertItem, MovieItem, TVShowItem, FetchOptions } from '../interfaces';
import {
  alertConfig,
  endpointApi,
  API_URL_IMAGE_MD,
  API_URL_IMAGE_LG,
} from '../config';

type ItemType = MovieItem | TVShowItem;

interface State {
  alerts: Array<AlertItem>;
  initialFetching: boolean;
  fetching: boolean;
  moviesList: Array<MovieItem>;
  tvShowsList: Array<TVShowItem>;
  totalPages: number;
}

export const useStore = defineStore('main', {
  state: (): State => ({
    alerts: [],
    initialFetching: true,
    fetching: false,
    moviesList: [],
    tvShowsList: [],
    totalPages: 10,
  }),
  getters: {
    getAlerts: (state) => state.alerts.slice(-alertConfig.maxLength),
    getFetching: (state) => state.fetching,
    getMoviesList: (state) => state.moviesList,
    getTVShowsList: (state) => state.tvShowsList,
  },
  actions: {
    showAlert(alert: AlertItem) {
      this.alerts.push({ ...alert, id: Date.now() });

      setTimeout(() => this.hideAlert(undefined), alertConfig.duration);
    },
    hideAlert(id: number | undefined) {
      const index = this.getAlerts.findIndex((al: AlertItem) => al.id === id);

      !id ? this.alerts.shift() : this.alerts.splice(index, 1);
    },
    changePage(list: Array<ItemType>, elId: number, dir: number) {
      const index = list.findIndex((el: ItemType) => el.id === elId);
      return list[index + dir].id;
    },
    async useFetch(url: string, options: FetchOptions = {}) {
      const {
        method = 'GET',
        headers = { 'Content-Type': 'application/json' },
        body,
        responseType = 'json',
      } = options;

      const isGetMethod = method === 'GET';
      this.fetching = true;

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: isGetMethod ? null : body,
        });

        if (!response.ok) {
          throw new Error(response.status + ': ' + response.statusText);
        }

        return await response[responseType]();
      } catch (error) {
        this.showAlert({
          message: (error as Error).message,
          type: 'error',
        });
      } finally {
        this.fetching = false;
      }
    },
    sanitizeData(data: ItemType[]) {
      return data.filter((item: ItemType) => {
        item.title = item.name || item.title;
        item.backdrop_md = API_URL_IMAGE_MD + item.backdrop_path;
        item.backdrop_lg = API_URL_IMAGE_LG + item.backdrop_path;
        item.poster_md = API_URL_IMAGE_MD + item.poster_path;
        item.poster_lg = API_URL_IMAGE_LG + item.poster_path;
        item.release_date = item.first_air_date || item.release_date;

        return (
          item.title.length &&
          item.overview.length &&
          !item.backdrop_md.includes('null') &&
          !item.backdrop_lg.includes('null')
        );
      });
    },
    fetchData() {
      for (let i = 1; i <= this.totalPages; i++) {
        Promise.all([
          this.useFetch(endpointApi.movies(i)),
          this.useFetch(endpointApi.tvShows(i)),
        ])
          .then((data) => {
            this.moviesList = [
              ...this.moviesList,
              ...this.sanitizeData(data[0].results),
            ];

            this.tvShowsList = [
              ...this.tvShowsList,
              ...this.sanitizeData(data[1].results),
            ];
          })
          .finally(() =>
            setTimeout(() => (this.initialFetching = false), 2000)
          );
      }
    },
  },
});
