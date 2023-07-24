import {createRouter, createWebHistory} from "vue-router";
import Login from "../auth/Login.vue";
import Register from "../auth/Register.vue";


const routes = [
    {path: '/auth/signin', name: "Login", component: Login },
    {path: '/auth/signup', name: "Register", component: Register},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;