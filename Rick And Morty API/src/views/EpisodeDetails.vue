<template>
  <div class="episode-details">
    <h2>{{ episodeDetails.name }}</h2>
    <p>Episode: {{ episodeDetails.episode }}</p>
    <p>Air date: {{ episodeDetails.air_date }}</p>
    <p>Characters:</p>
    <input v-model="searchQuery" type="text" placeholder="Search...">
    <ul class="character-list">
      <li v-for="character in filteredCharacters" :key="character.id" class="character-item">
        <div class="character-container">
          <h2 class="character-name">{{ character.name }}</h2>
          <router-link :to="`/character/${character.id}`" class="character-link">
            <img :src="character.image" :alt="character.name" class="character-image">
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {filterData} from "../helper/helper.js";
import {episodeStore} from "../store/episodes.js";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";


const store = episodeStore();
const route = useRoute();
const id = route.params.id;
const searchQuery = ref(localStorage.getItem("searchQuery_episodeDetails") || '')


const episodeDetails = computed(() => store.episodeDetails);
const characters = computed(() => store.characters);

onMounted(async () => {
  await store.getFetchDataByEpisodeId(id);
});

const filteredCharacters = computed(() => {


  return filterData(characters.value, 'name', searchQuery);

})
watch(searchQuery, (newValue) => {
  localStorage.setItem("searchQuery_episodeDetails", newValue);
})

</script>

<style scoped>
.episode-details {
  margin: 20px;
}

.character-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.character-item {
  flex: 0 0 25%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

.character-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.character-link {
  text-decoration: none;
  color: #000;
}

.character-image {
  width: 100px;
  height: 100px;
}
</style>