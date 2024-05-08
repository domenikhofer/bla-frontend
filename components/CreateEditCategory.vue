<template>
    <form @submit="submitCategory">
        <h2 v-if="props.type === 'edit'">Edit Category</h2>
        <h2 v-else>Create Category</h2>
        <label>
            <div class="label">
                Emoji
            </div>
            <input type="text" name="emoji" maxlength="2" placeholder="" v-model="category.emoji" :class="{empty: !category.emoji}">
        </label>
        <label>
            <div class="label">
                Name
            </div>
            <input type="text" name="name" placeholder="" v-model="category.name" :class="{empty: !category.name}">
        </label>
        <label>
            <div class="label">
                Parent Category
            </div>
            <select name="parent_id" v-model="category.parent_id">
                <option :value="null">No Category</option>
                <option v-for="c in categories" :value="c.id">
                    {{ c.name }}
                </option>
            </select>
        </label>
        <label>
            <div class="label">
                Category Type
            </div>
            <select name="category_type_id" v-model="category.category_type_id">
                <option :value="null">No Type</option>
                <option v-for="ct in categoryTypes" :value="ct.id">
                    {{ ct.name }}
                </option>

            </select>
        </label>
        <div class="formActions">
            <button type="submit">✔️</button>
            <NuxtLink to="/" class="button">✖️</NuxtLink>
        </div>
    </form>
</template>

<script setup>
import { CategoriesStore } from "~/stores/categories";
const route = useRoute()
const router = useRouter()
const categoriesStore = CategoriesStore()
const props = defineProps(['type'])

await categoriesStore.getAll()
await categoriesStore.getCategoryTypes()
if (props.type === 'edit') {
    await categoriesStore.get(route.params.id)
} else {
    categoriesStore.categoryToEdit = {
        emoji: '',
        name: '',
        parent_id: null,
        category_type_id: null
    }

}
const { categoryToEdit: category } = storeToRefs(categoriesStore)


const categories = categoriesStore.categories
const categoryTypes = categoriesStore.categoryTypes

const submitCategory = async (e) => {
    e.preventDefault()
    if (props.type === 'edit') {
        await categoriesStore.update()
    } else {
        await categoriesStore.add()
    }
    await categoriesStore.getAll()
    await router.push('/')
}

</script>