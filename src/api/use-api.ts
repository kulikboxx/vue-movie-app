const API_URL = 'https://api.themoviedb.org/3';
// Here must be your API key
const API_KEY = import.meta.env.VITE_API_KEY;

export const API_URL_IMAGE_MD = 'https://image.tmdb.org/t/p/w500';
export const API_URL_IMAGE_LG = 'https://image.tmdb.org/t/p/original';
export const totalPages = 10;

export enum EnpointTypes {
  Movies = 'movies',
  TVShows = 'shows',
}

export const useApi = {
  getMovies: (page: number) =>
    `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  getTvShows: (page: number) =>
    `${API_URL}/tv/popular?api_key=${API_KEY}&page=${page}`,
};
