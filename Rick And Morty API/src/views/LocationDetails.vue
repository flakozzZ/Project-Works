<template>
  <div class="location-details">
    <input v-model="searchQuery" type="text" placeholder="Search...">

    <h2>{{ characterLocation.name }}</h2>
    <p><strong>Type:</strong> {{ characterLocation.type }}</p>
    <p><strong>Dimension:</strong> {{ characterLocation.dimension }}</p>
    <div class="characters-list">
      <div v-for="character in filteredEpisode" :key="character.id" class="character-item">
        <router-link :to="`/character/${character.id}`">
          <img :src="character.image" :alt="character.name" class="character-image">
        </router-link>

        <p class="character-name">{{ character.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { locationStore } from "../store/locations.js";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {filterData} from "../helper/helper.js";


    const store = locationStore();
    const route = useRoute();
    const id = route.params.id;
    const searchQuery = ref(localStorage.getItem("searchQuery_locationDetails") || "");

    const characterLocation = computed(() => store.locationCharacters);
    const charactersInfoLocation = computed(() => store.charactersInfoLocation);

    const filteredEpisode = computed(() => {
      return filterData(charactersInfoLocation.value, 'name', searchQuery);
    });

    onMounted(async () => {
      await store.getCharactersLocations(id);
    });

    watch(searchQuery, (newValue) => {
      localStorage.setItem("searchQuery_locationDetails", newValue); // Сохраняем в LocalStorage с уникальным ключом
    });


</script>

<style scoped>
.location-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.location-details h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.location-details p {
  margin: 5px 0;
}

.characters-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Добавляем пробелы между элементами */
}

.character-item {
  flex: 0 0 15%; /* Устанавливаем ширину элемента в 20% от родительского контейнера */
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.character-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 5px;
}

.character-name {
  font-size: 14px;
}
</style>