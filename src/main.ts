import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue';

import App from './App.vue';
import router from '@/plugins/router';
import '@/styles/main.css';

const head = createHead();
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(head);

app.mount('#app');
