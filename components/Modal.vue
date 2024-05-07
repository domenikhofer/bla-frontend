<template>
    <div class="modal" :class="{ visible: showModal }">
        <div class="content">
            <h2>Are you sure you want to delete the category «{{ categoriesStore.categoryToDelete?.name }}»?</h2>
            <h3>All subcategories and their entries will also be deleted!</h3>
            <div class="actions">
                <div class="button" @click="deleteCategory">🗑️</div>
                <div class="button" @click="closeModal">✖️</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CategoriesStore } from "~/stores/categories";
const categoriesStore = CategoriesStore();

let { showModal } = storeToRefs(categoriesStore)

const deleteCategory = async () => {
    await categoriesStore.delete()
    await categoriesStore.toggleModal()
    await categoriesStore.getAll()
}

const closeModal = async () => {
    await categoriesStore.toggleModal();
}
</script>
