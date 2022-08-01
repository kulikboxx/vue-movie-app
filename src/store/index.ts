import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { AlertItem, MovieItem, TVShowItem } from '../interfaces';
import { alertConfig } from '../config/alerts.config';
import {
  axiosInstance,
  RouteName,
  totalPages,
  useService,
  API_URL_IMAGE_MD,
  API_URL_IMAGE_LG,
} from '../service/use-service';

const router = useRouter();

type ItemType = MovieItem | TVShowItem;

interface State {
  alerts: Array<AlertItem>;
  currentPage: number;
  error: boolean;
  fetching: boolean;
  moviesList: Array<MovieItem>;
  requestPage: number;
  tvShowsList: Array<TVShowItem>;
}

export const useStore = defineStore('main', {
  state: (): State => ({
    alerts: [],
    currentPage: 0,
    error: false,
    fetching: false,
    moviesList: [],
    requestPage: 1,
    tvShowsList: [],
  }),
  getters: {
    getAlerts: (state) => state.alerts.slice(-alertConfig.maxLength),
    getCurrentPage: (state) => state.currentPage,
    getError: (state) => state.error,
    getFetching: (state) => state.fetching,
    getMoviesList: (state) => state.moviesList,
    getTVShowsList: (state) => state.tvShowsList,
  },
  actions: {
    useFetch(url: string, routeName: string) {
      this.fetching = true;

      axiosInstance
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            const result = response.data.results;

            switch (routeName) {
              case RouteName.Movie:
                this.updateMoviesList(this.filterData(result, routeName));
                break;
              case RouteName.TVShow:
                this.updateTVShowsList(this.filterData(result, routeName));
                break;
              default:
                throw new Error('Unknown mutation type!');
            }
          }
        })
        .catch((error) => {
          this.showAlert({
            message: error.message,
            type: 'error',
          });

          this.error = true;
        })
        .finally(() => setTimeout(() => (this.fetching = false), 3000));
    },
    updateMoviesList(list: MovieItem[]) {
      this.moviesList = list;
    },
    updateTVShowsList(list: TVShowItem[]) {
      this.tvShowsList = list;
    },
    filterData(data: ItemType[], route: string) {
      return data.filter((item: ItemType) => {
        item.title = item.name || item.title;
        item.backdrop_md = API_URL_IMAGE_MD + item.backdrop_path;
        item.backdrop_lg = API_URL_IMAGE_LG + item.backdrop_path;
        item.poster_md = API_URL_IMAGE_MD + item.poster_path;
        item.poster_lg = API_URL_IMAGE_LG + item.poster_path;
        item.release_date = item.first_air_date || item.release_date;
        item.route = route;

        return (
          item.title.length &&
          item.overview.length &&
          !item.backdrop_md.includes('null') &&
          !item.backdrop_lg.includes('null')
        );
      });
    },
    hideAlert(id: number | undefined) {
      const index = this.getAlerts.findIndex((al: AlertItem) => al.id === id);

      !id ? this.alerts.shift() : this.alerts.splice(index, 1);
    },
    changePage(list: Array<ItemType>, name: string, elId: number, dir: number) {
      const index = list.findIndex((el: ItemType) => el.id === elId);

      router.push({ name, params: { id: list[index + dir].id } });
    },
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    showAlert(alert: AlertItem) {
      this.alerts.push({ ...alert, id: Date.now() });

      setTimeout(() => this.hideAlert(undefined), alertConfig.duration);
    },
    fetchData() {
      for (let i = 1; i <= totalPages; i++) {
        this.useFetch(useService.getMovies(1), RouteName.Movie);
        this.useFetch(useService.getTvShows(1), RouteName.TVShow);
      }
    },
  },
});
