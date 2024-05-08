<template>

    <form @submit="createMediaEntry" method="post">
        <h2>Add Entry</h2>
        <label>
            <div class="label">
                Enter Movie or TV Show
            </div>
            <input type="search" @keydown.enter="searchMovieTV" v-model="data.query" class="searchMovieTV"
                :class="{ empty: !data.query }">
        </label>
        <div class="imageEntryWrapper">
            <div v-for="entry in data.searchResults" @click="selectMovieTV(entry)" class="entry searchResult" :class="{selected: data.movieTV.id == entry.id}">
                <div class="image">
                    <img v-if="entry.poster_path" :src="`https://image.tmdb.org/t/p/w500/${entry.poster_path}`">
                    <div class="image noImage" v-else>{{ entry.name || entry.title }}</div>
                </div>
            </div>
        </div>
        <div class="formActions">
            <button type="submit">✔️</button>
            <NuxtLink :to="`/category/${categoryId}`" class="button">✖️</NuxtLink>
        </div>
    </form>

</template>

<script setup>
import { EntriesStore } from "~/stores/entries";
const entriesStore = EntriesStore()

const route = useRoute()
const categoryId = route.params.id

const data = reactive({
    movieTV: {
        id: null,
        image: null,
        url: null,
        value: null,
        category_id: categoryId
    },
    query: null,
    searchResults: []
})

const searchMovieTV = async (e) => {
    e.preventDefault()
    await entriesStore.findMovieTVShow(data.query)
    data.searchResults = entriesStore.moviesTVShows
    console.log(data.searchResults)
}

const selectMovieTV = (entry) => {
    data.movieTV.id = entry.id
    data.movieTV.image = entry.poster_path
    data.movieTV.url = `https://www.themoviedb.org/${entry.media_type}/${entry.id}`
    data.movieTV.value = entry.name || entry.title
}

const createMediaEntry = async (e) => {
    e.preventDefault()
    await entriesStore.addMovieTVShow(data.movieTV)
    await navigateTo(`/category/${categoryId}`)
};

</script>