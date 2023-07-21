import { defineStore } from "pinia";

import axios from "axios";


export const searchStore = defineStore("searchStore", {
    state: () => ({
        searchQuery: "",
    }),


    actions: {
        async updateQuery(query) {
            this.searchQuery = query;
        },
    },
});
