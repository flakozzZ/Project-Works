<template>
  <div v-if="characterData">
    <div class="episode-details">
      <img :src="characterData.image" :alt="characterData.name" class="character-image">
      <h2 class="character-name">{{ characterData.name }}</h2>
      <p class="character-status">{{ characterData.status }} - {{ characterData.species }}</p>
      <p class="character-gender">Gender: {{ characterData.gender }}</p>
      <p class="character-origin">Origin: {{ origin.name }}</p>
      <p class="character-location">
        <router-link v-if="location" :to="`/location-details/${getLocationId(location.url)}`">
          {{ location.name }}
        </router-link>
        <span v-else>Loading Location...</span>
      </p>

      <input v-model="searchQuery" placeholder="Search..." type="text">
      <div class="episode" v-for="episode in filteredEpisode" :key="episode.id">
        <router-link :to="`/episode-details/${episode.id}`" class="episode-link">{{ episode.id }}. {{
            episode.name
          }}
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    Loading Character...
  </div>
</template>

<script setup>
import {charactersStore} from "../store/characters.js";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {filterData} from "../helper/helper.js";


const secondStore = charactersStore(); // Используем useMySecondStore для второго хранилища
const route = useRoute();
const id = route.params.id;
const searchQuery = ref(localStorage.getItem("searchQuery_characters") || "");

const characterData = computed(() => secondStore.charactersData);
const includedEpisodes = computed(() => secondStore.includedEpisodes);
const origin = computed(() => secondStore.origin);
const location = computed(() => secondStore.location);
const getLocationId = (url) => {
  if (!url) return ''; // Return an empty string if the url is undefined or null
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
};

onMounted(async () => {
  await secondStore.getFetchDataByCharacterId(id);
});

const filteredEpisode = computed(() => {
  return filterData(includedEpisodes.value, 'name', searchQuery);
})

watch(searchQuery, (newValue) => {
  localStorage.setItem("searchQuery_characters", newValue);
})


</script>

<style scoped>
.episode-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.character-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.character-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.character-status {
  font-size: 16px;
  margin-bottom: 10px;
}

.character-gender {
  font-size: 16px;
  margin-bottom: 10px;
}

.character-origin,
.character-location {
  font-size: 16px;
  margin-bottom: 5px;
}

.episode {
  font-size: 16px;
  margin-bottom: 5px;
}


.episode-link {
  text-decoration: none;
  color: #000;
}

</style>