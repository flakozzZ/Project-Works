import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router.js";
import './fonts/font.css'

createApp(App)
    .use(router)
    .mount('#app')
