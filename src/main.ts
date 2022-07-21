import { createApp } from 'vue';
import { store, key } from './store';
import router from './router';

import App from './App.vue';
import './styles/index.scss';

const app = createApp(App);

app.use(router).use(store, key).mount('#app');
