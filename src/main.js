import { createApp } from 'vue'
import './style.css'



import router from './router/router.js';
import store from './store/store.js';



import App from './App.vue'

import BaseButton from './components/ui/BaseButton.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BlobContainer from './components/ui/BlobContainer.vue';

import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_SECRET_API_KEY || process.env.SECRET_API_KEY ,
  authDomain: "test-bd9cb.firebaseapp.com",
  databaseURL: "https://test-bd9cb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-bd9cb",
  storageBucket: "test-bd9cb.appspot.com",
  messagingSenderId: "208852887883",
  appId: "1:208852887883:web:82c16e863f8a3ee149a0ce"
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.component('blob-container',BlobContainer);


app.mount('#app');
