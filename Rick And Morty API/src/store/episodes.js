import {defineStore} from 'pinia'
import axios from "axios";


export const episodeStore = defineStore('episodeStore', {

    state: () => ({
        episodes: [],
        episodeDetails: {},
        characters: [],

    }),


    actions: {
        async fetchData() {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/episode/`)
                this.episodes = response.data.results
                // console.log(this.episodes)

            } catch (error) {
                console.log(error)
            }

        },
        async getFetchDataByEpisodeId(id) {
            try {
                const getResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
                this.episodeDetails = getResponse.data
                // console.log(this.episodeDetails);

                const getUrl = this.episodeDetails.characters;
                const getMap = getUrl.map((url) => axios.get(url));
                const getPromise = await Promise.all(getMap);
                this.characters = getPromise.map((getResponse) => (getResponse.data));
            } catch (error) {
                console.error(error)
            }

        },




    }

})






