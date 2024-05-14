<template>
    <div class="modal" :class="{ visible: showModal }">
        <div class="content">
            <h2>Are you sure you want to delete the entry «{{ entriesStore.entryToDelete?.value }}»?</h2>
            <div class="actions">
                <div class="button" @click="deleteEntry">🗑️</div>
                <div class="button" @click="closeModal">✖️</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EntriesStore } from "~/stores/entries"
const entriesStore = EntriesStore()
const router = useRouter()

let { showModal } = storeToRefs(entriesStore)

const deleteEntry = async () => {
    await entriesStore.delete()
    await entriesStore.toggleModal()
    router.push(`/category/${entriesStore.entryToDelete.category.id}`)
}

const closeModal = async () => {
    await entriesStore.toggleModal()
}
</script>
