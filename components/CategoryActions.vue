<template>
    <div class="actions">
        <NuxtLink class="button" :to="`/category/edit/${props.category.id}`">✏️</NuxtLink>
        <div class="button" @click="deleteCategory(props.category)">🗑️</div> 
    </div>
</template>

<script setup>
import { CategoriesStore } from "~/stores/categories";

const categoriesStore = CategoriesStore()
const props = defineProps(['category'])

const deleteCategory = async (category) => {
    await categoriesStore.toggleModal(category)
}
</script>