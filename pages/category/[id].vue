<template>
    <div class="entriesWrapper" :data-category="category.id">
        <div class="emoji">{{ category.emoji }}</div>
        <div class="header">
            <h1>{{ category.name }}</h1>
        </div>
        <div v-if="category.category_type_id == null" class="entryWrapper">
            <template v-if="category.entries.length">

                <div v-for="entry in category.entries" class="entry">
                    <div class="title" contenteditable="true" spellcheck="false">
                        {{ entry.value }}
                    </div>
                    <div class="actions">
                        <a class="link" target="_blank">🔍</a>
                    </div>
                    <div class="similar">
                        <div class="label">Existing Entries</div>
                        <div class="results"></div>
                    </div>
                </div>
            </template>
            <div v-else class="entry">
                <div class="title" contenteditable="true" spellcheck="false">First Entry</div>
                <div class="actions">
                    <a class="link" target="_blank">🔍</a>
                </div>
                <div class="similar">
                    <div class="label">Existing Entries</div>
                    <div class="results"></div>
                </div>
            </div>


            <div class="entry template">
                <div class="title" contenteditable="true" spellcheck="false"></div>
                <div class="actions">
                    <a class="link" target="_blank">🔍</a>
                </div>
                <div class="similar">
                    <div class="label">Existing Entries</div>
                    <div class="results"></div>
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
const route = useRoute()
const categoriesStore = CategoriesStore()

await categoriesStore.getWithEntries(route.params.id)
const category = categoriesStore.categoryToEdit

</script>