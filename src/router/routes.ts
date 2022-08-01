const routeOptions = [
  { path: '/', name: 'home', component: 'Home' },
  { path: '/movies', name: 'movies', component: 'Movies' },
  { path: '/movies/:id', name: 'movie', component: 'MovieDetails' },
  { path: '/tv-shows', name: 'tv-shows', component: 'TVShows' },
  { path: '/tv-shows/:id', name: 'tv-show', component: 'TVShowDetails' },
  { path: '/contact', name: 'contact', component: 'Contact' },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: 'NotFound' },
];

export const routes = routeOptions.map((route) => ({
  ...route,
  component: () => import(`../views/${route.component}.vue`),
}));
