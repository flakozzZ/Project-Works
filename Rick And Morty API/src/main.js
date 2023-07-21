import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import piniaStore from "./store/store.js";
import router from "./router/router.js";
import axios from "axios";


createApp(App)
    .use(piniaStore)
    .use(router)
    .mount('#app')