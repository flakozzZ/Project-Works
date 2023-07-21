import {createPinia} from "pinia";
import {episodeStore} from "./episodes.js";
import {charactersStore} from "./characters.js";
import {locationStore} from "./locations.js";
import {searchStore} from "./search.js";
const piniaStore = createPinia()
export default piniaStore
