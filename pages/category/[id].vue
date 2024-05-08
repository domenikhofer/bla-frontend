<template>
    <div class="entriesWrapper" :data-category="category.id">
        <div class="emoji">{{ category.emoji }}</div>
        <div class="header">
            <h1>{{ category.name }}</h1>
        </div>
        <div v-if="category.category_type_id == null" class="entryWrapper">
            <div v-for="entry in data.entries" class="entry" :class="{ active: data.activeEntryId == entry.id }">
                <input class="title" ref="entryRefs" @keyup="findSimilarEntries(entry)"
                    @keydown.enter="addNewEntry(entry, $event)" @keydown.delete="removeEntry(entry, $event)"
                    @click="focusEntry(entry)" contenteditable="true" spellcheck="false" v-model="entry.value">
                <div class="actions">
                    <a @click="webSearch(entry)" class="link" target="_blank">🔍</a>
                </div>
                <div class="similar">
                    <div class="label">Existing Entries</div>
                    <div class="results" v-if="data.similarEntries.length">
                        <div v-for="se in data.similarEntries">{{ se.value }}</div>
                    </div>
                    <div class="results" v-else>
                        <div>No similar entries found</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="imageEntryWrapper">

            <a v-for="entry in category.entries" class="entry" :href="entry.url" target="_blank">
                <span class="image">
                    <img :src="entry.image" alt="">
                </span>
            </a>

        </div>
    </div>

    <div class="pageActions fixed">
        <NuxtLink to="/" class="button">⬅️</NuxtLink>
        <div v-if="category.category_type_id == null" class="button saveEntries" :data-category="category.id">💾</div>
        <NuxtLink to="/entry/create" v-else class="button addEntry">➕</NuxtLink>
    </div>
</template>

<script setup>
import { CategoriesStore } from "~/stores/categories";
import { EntriesStore } from "~/stores/entries";
const route = useRoute()
const categoriesStore = CategoriesStore()
const entriesStore = EntriesStore()
const categoryId = route.params.id

await categoriesStore.getWithEntries(categoryId)
const category = categoriesStore.categoryToEdit
const entries = (category.entries.length ? category.entries : [{ value: 'First Entry', id: new Date().getTime(), url: '', image: '' }])
const data = reactive({
    activeEntryId: null,
    entries,
    similarEntries: []
})
const entryRefs = ref([])

// Todo: move JS from Laravel

const focusEntry = (entry) => {
    data.activeEntryId = entry.id
    data.similarEntries = []
}

const addNewEntry = (entry, event) => {
    event.preventDefault()
    data.similarEntries = []
    const insertIndex = data.entries.indexOf(entry) + 1
    data.entries.splice(insertIndex, 0, { value: '', id: new Date().getTime(), url: '', image: '' })
    entryRefs.value[insertIndex].focus()
    // Todo: not working on first entry
    data.activeEntryId = data.entries[insertIndex].id
}

const removeEntry = (entry, event) => {
    if (entry.value == '') {
        event.preventDefault()
        const index = data.entries.indexOf(entry)
        data.entries = data.entries.filter(e => e.id !== entry.id)
        entryRefs.value[index - 1].focus()
        data.activeEntryId = data.entries[index - 1].id
        data.similarEntries = []
    }
}

const findSimilarEntries = async (entry) => {
    if (entry.value.length >= 3) {
        await entriesStore.getSimilar(entry.value, categoryId)
        data.similarEntries = entriesStore.entries
    } else {
        data.similarEntries = []
    }
    console.log(data.similarEntries.length)
}

const webSearch = (entry) => {
    window.open('https://www.google.com/search?q=' + entry.value.trim(), '_blank');

}

</script>