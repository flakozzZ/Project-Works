import { defineStore} from "pinia";
import axios from "axios";

export const locationStore = defineStore('locationStore', {

    state: () => ({
        allLocations: [],
        locationCharacters: {},
        charactersInfoLocation: [],

    }),


    actions: {
        async getAllLocation() {
            try {
                const getAllLocation = await axios.get(`https://rickandmortyapi.com/api/location`);
                this.allLocations = getAllLocation.data.results
                console.log(this.allLocations);
            } catch (error) {
                console.log(error);
            }
        },

        async getCharactersLocations(id) {
            try {

                const getCharacterLocation = await axios.get(`https://rickandmortyapi.com/api/location/${id}`)
                this.locationCharacters = getCharacterLocation.data
                console.log(this.locationCharacters);

                const getUrlCharacters = this.locationCharacters.residents
                const getMapCharacters = getUrlCharacters.map((url)=>axios.get(url))
                const getPromiseCharacters = await Promise.all(getMapCharacters)
                this.charactersInfoLocation = getPromiseCharacters.map((getCharacterLocation)=>(getCharacterLocation.data));
            } catch (error) {
                console.error(error);
            }
        }

    }

})