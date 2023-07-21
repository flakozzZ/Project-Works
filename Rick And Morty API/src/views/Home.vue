<template>
  <div class="home">
    <input v-model="searchQuery" @input="updateQuery" placeholder="Search..." type="text">
    <div class="episode-item" v-for="episode in paginatedEpisodes" :key="episode.id">
      <router-link :to="`/episode-details/${episode.id}`" class="episode-link">
        <div class="episode-info">
          <span class="episode-id">{{ episode.id }}.</span>
          <span class="episode-title">{{ episode.name }}</span>
        </div>
      </router-link>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
    </div>
  </div>
</template>

<script setup>
import {episodeStore} from "../store/episodes.js";
import {computed, ref, watch} from "vue";
import {searchStore} from "../store/search.js";


const store = episodeStore();
const search = searchStore();

store.fetchData();

const pageSize = 10;
const currentPage = ref(1);
const searchQuery = ref(localStorage.getItem("searchQuery_home") || "");

const paginatedEpisodes = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  const filteredEpisodes = store.episodes
      ? store.episodes.filter((episode) =>
          episode.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      : [];

  return filteredEpisodes.slice(start, end);
});

const totalPages = computed(() =>
    Math.ceil(store.episodes ? store.episodes.length / pageSize : 0)
);

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function updateQuery() {
  search.updateQuery(searchQuery.value); // Вызываем действие в хранилище для обновления searchQuery
  currentPage.value = 1; // Сбрасываем текущую страницу при изменении поискового запроса
}

watch(searchQuery, (newValue) => {
  localStorage.setItem("searchQuery_home", newValue);
})


</script>


<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.episode-item {
  margin-bottom: 10px;
}

.episode-link {
  display: inline-block;
  text-decoration: none;
  color: #333;
  padding: 10px;
  transition: background-color 0.3s;
  border: 1px solid #ccc; /* Добавляем границу */
  border-radius: 4px;
}

.episode-link:hover {
  background-color: #f2f2f2;
}

.episode-info {
  display: flex;
  align-items: center;
}

.episode-id {
  margin-right: 5px;
  font-weight: bold;
}

.episode-number {
  margin: 0 5px;
}


.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button:disabled {
  background-color: #eee;
  cursor: not-allowed;
}


</style>