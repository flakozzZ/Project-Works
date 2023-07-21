<template>
  <input v-model="searchQuery" placeholder="Search..." type="text">
  <div class="all-characters">
    <div v-for="character in filteredCharacters" :key="character.id" class="character-item">
      <div class="character-name">{{ character.name }}</div>
      <router-link :to="`/character/${character.id}`">
        <img :src="character.image" :alt="character.name">
      </router-link>
    </div>


  </div>
</template>

<script setup>
import {charactersStore} from "../store/characters.js";
import {computed, onMounted, ref, watch} from "vue";
import {filterData} from "../helper/helper.js";


const secondStore = charactersStore();
const searchQuery = ref(localStorage.getItem("searchQuery_allCharacters") || "");


const allCharacters = computed(() => secondStore.allCharacters);

const filteredCharacters = computed(() => {

  return filterData(allCharacters.value, 'name', searchQuery);
})

onMounted(async () => {
  await secondStore.getAllCharacters();
});
watch(searchQuery, (newValue) => {
  localStorage.setItem("searchQuery_allCharacters", newValue);
})

</script>

<style scoped>
.all-characters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.character-item {
  border: 1px solid #000;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-name {
  margin-bottom: 10px;
}
</style>