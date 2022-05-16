import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

const app = createApp(App);

//Utilisation de pinia pour le state management 
const pinia = createPinia();

// Utilisation du plugin pour la persistance des données
pinia.use(piniaPluginPersistedstate);


app.use(pinia);
app.use(router);

app.mount('#app');

