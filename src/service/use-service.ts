import axios from 'axios';
// Here must be your API key
const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: { 'Content-Type': 'application/json' },
});

export const API_URL_IMAGE_MD = 'https://image.tmdb.org/t/p/w500';
export const API_URL_IMAGE_LG = 'https://image.tmdb.org/t/p/original';

export const totalPages = 15;

export enum RouteName {
  Movie = 'movie',
  TVShow = 'tv-show',
}

export const useService = {
  getMovies(page: number) {
    return axiosInstance.get(`movie/popular?api_key=${API_KEY}&page=${page}`);
  },
  getTvShows(page: number) {
    return axiosInstance.get(`tv/popular?api_key=${API_KEY}&page=${page}`);
  },
};
