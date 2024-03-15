import { createApp } from 'vue'
import './style.css'

import router from './router/router.js';
import store from './store/store.js';



import App from './App.vue'

import BaseButton from './components/ui/BaseButton.vue';



const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton)

app.mount('#app');
