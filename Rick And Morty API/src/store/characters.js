import {defineStore} from 'pinia'
import axios from "axios";

export const charactersStore = defineStore('characterStore', {

    state: () => ({
        charactersData: {},
        location: "",
        origin: "",
        includedEpisodes: [],
        allCharacters: [],

    }),


    actions: {
        async getFetchDataByCharacterId(id) {
            try {
                const responseData = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                this.charactersData = responseData.data;
                this.location = responseData.data.location;
                this.origin = responseData.data.origin;
                // console.log(this.charactersData);

                const getUrlEpisode = responseData.data.episode;
                const getMapEpisode = getUrlEpisode.map((url) => axios.get(url))
                const getPromiseEpisode = await Promise.all(getMapEpisode)
                this.includedEpisodes = getPromiseEpisode.map((responseData) => (responseData.data))

            } catch (error) {
                console.error(error);
            }
        },
        async getAllCharacters() {
            try {
                const getAllData = await axios.get(`https://rickandmortyapi.com/api/character`)
                this.allCharacters = getAllData.data.results
                // console.log(this.allCharacters);
            } catch (error) {
                console.error(error);
            }
        },

    }

})