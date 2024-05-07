<template>
    <div class="categoriesWrapper" :class="{ reorder: state.edit }">

            <template v-for="(category) in categories">
                <div :id="`cat${category.id}`" class="category categoriesTitle " :class="{deleted: category.deleted}">
                    <div class="content">
                        <h2>{{ category.name }}</h2>
                    </div>
                    <CategoryActions :class="{ visible: state.edit }" :category="category" />
                </div>


                <div class="subcategoriesWrapper">
                    <div class="plantSide" :class="{ visible: category.id == 9 && !state.edit }">
                        <img src="~/assets/images/plantSide.png" alt="">
                    </div>
                    <div class="subcategories">
                        <div v-for="(subcategory, subCatKey) in category.subcategories" :id="`cat${subcategory.id}`"
                            class="category " :class="{deleted: subcategory.deleted}">
                            <div class="content">
                                <NuxtLink class="link" :to="`/category/${subcategory.id}`">
                                    <span class="emoji"><span class="icon">{{ subcategory.emoji }}</span></span>
                                    <span class="title"><span class="titleContent">{{ subcategory.name }}</span></span>
                                </NuxtLink>
                            </div>
                            <CategoryActions :class="{ visible: state.edit }" :category="subcategory" />
                        </div>
                    </div>
                </div>
            </template>
            
        </div>
    <div class="plantTop" :class="{ visible: !state.edit }">
        <img src="~/assets/images/plantTop.png" alt="">
    </div>
    <div class="plantBottomWrapper" :class="{ clicked: state.showEditBtn, visible: !state.edit }"
        @click="state.showEditBtn = true">
        <div class="plantBottom">
            <img src="~/assets/images/plantBottom.png" alt="">
        </div>
    </div>

    <div class="pageActions">
        <template v-if="state.edit">
            <NuxtLink class="button" to="/category/create">➕</NuxtLink>
            <a class="button" @click="state.edit = false; state.showEditBtn = false">✖️</a>
        </template>
        <template v-else>
            <a class="button" @click="state.edit = true">✏️</a>

        </template>

    </div>


</template>

<script setup>
import { CategoriesStore } from "~/stores/categories";
import { storeToRefs } from 'pinia'

const categoriesStore = CategoriesStore()
await categoriesStore.getAll()
let { categories } = storeToRefs(categoriesStore)

let state = reactive({
    edit: false,
    showEditBtn: false
})





</script>
