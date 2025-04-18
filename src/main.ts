import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue';

import App from './App.vue';
import router from '@/plugins/router';
import i18n, { initLocale } from '@/plugins/i18n';
import '@/styles/main.css';

// Initialiser la langue
initLocale();

const head = createHead();
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(head);
app.use(i18n);

app.mount('#app');
