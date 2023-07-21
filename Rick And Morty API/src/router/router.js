import {createRouter, createWebHistory} from "vue-router";
import Home from '../views/Home.vue'
import EpisodeDetails from "../views/EpisodeDetails.vue";
import Character from "../views/Character.vue";
import Characters from "../views/Characters.vue";
import Locations from "../views/Locations.vue";
import LocationDetails from "../views/LocationDetails.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },

    {
        path: "/characters",
        name: "AllCharacters",
        component: Characters,
    },
    {
        path: "/locations",
        name: "AllLocations",
        component: Locations,
    },

    {
        path: "/location-details/:id",
        name: "LocationDetails",
        component: LocationDetails
    },
    {
        path: "/episode-details/:id",
        name: "EpisodeDetails",
        component: EpisodeDetails
    },
    {
        path: "/character/:id",
        name: "Character",
        component: Character,
    }


]





const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router