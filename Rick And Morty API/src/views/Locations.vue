<template>
  <div class="all-locations">
    <input v-model="searchQuery" @input="updateQuery" placeholder="Search..." type="text">
    <div v-for="location in displayedLocations" :key="location.id" class="location-item">
      <router-link :to="`/location-details/${location.id}`">
        {{ location.id }}. {{ location.name }}
      </router-link>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
    </div>
  </div>
</template>

<script setup>
import {locationStore} from "../store/locations.js";
import {computed, onMounted, ref, watch} from "vue";
import {searchStore} from "../store/search.js";


const thirdStore = locationStore();
const store = searchStore();

const allLocations = computed(() => thirdStore.allLocations);
const currentPage = ref(1);
const itemsPerPage = 10; // Количество локаций на странице
const searchQuery = ref(localStorage.getItem("searchQuery_allLocations") || "");

const totalPages = computed(() => Math.ceil(allLocations.value ? allLocations.value.length / itemsPerPage : 0));

const displayedLocations = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (allLocations.value) {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allLocations.value
        .filter((location) => location.name.toLowerCase().includes(query))
        .slice(startIndex, endIndex);
  } else {
    return [];
  }
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

onMounted(async () => {
  await thirdStore.getAllLocation();
});

function updateQuery() {
  store.updateQuery(searchQuery.value);
  currentPage.value = 1;
}

watch(searchQuery, (newValue) => {
  localStorage.setItem("searchQuery_allLocations", newValue);
})


</script>

<style>
.all-locations {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.location-item {
  margin-bottom: 10px;
}

.pagination {
  margin-top: 10px;
  text-align: center;
}

.pagination-button {
  margin-right: 5px;
}
</style>