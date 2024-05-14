<template>
    <div class="entriesWrapper" :data-category="currentEntry.category.id">
        <div class="emoji">{{ currentEntry.category.emoji }}</div>
        <div class="header">
            <h1>{{ currentEntry.value }}</h1>
        </div>
        <div class="singleEntry">
            <img :src="`https://image.tmdb.org/t/p/w500/${currentEntry.image}`" alt="">
            <div class="pageActions">
                <NuxtLink :to="`/category/${currentEntry.category.id}`" class="button">⬅️</NuxtLink>
                <a :href="currentEntry.url" target="_blank" class="button">🔗</a>
                <div class="button" @click="deleteEntry(currentEntry)">🗑️</div> 
                <div class="button" @click="updateEntry(currentEntry)">
                <template v-if="currentEntry.done">😴</template>
                <template v-else>👁️</template>
                </div> 
            </div>
        </div>
    </div>

</template>

<script setup>
import { EntriesStore } from "~/stores/entries";
const route = useRoute()
const entriesStore = EntriesStore()
const entryId = route.params.id

await entriesStore.get(entryId)
const { currentEntry } = storeToRefs(entriesStore)
console.log(currentEntry)

const deleteEntry = async (entry) => {
    await entriesStore.toggleModal(entry)
}

const updateEntry = async (currentEntry) => {
    currentEntry.done = true
    await entriesStore.update(currentEntry)
    await entriesStore.get(currentEntry.id)
}

</script>