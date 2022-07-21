export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/movies/',
    name: 'movies',
    component: () => import('@/views/Movies.vue'),
  },
  {
    path: '/movies/:id',
    name: 'movie',
    component: () => import('@/views/MovieDetails.vue'),
  },
  {
    path: '/tv-shows',
    name: 'tv-shows',
    component: () => import('@/views/TVShows.vue'),
  },
  {
    path: '/tv-shows/:id',
    name: 'tv-show',
    component: () => import('@/views/TVShowDetails.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/Contact.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
];
