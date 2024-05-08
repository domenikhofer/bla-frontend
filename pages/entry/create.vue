<template>

    <form @submit="createMediaEntry" method="post">
        <h2>Add Entry</h2>
        <label>
            <div class="label">
                Name
            </div>
            <input type="search" class="searchMovieTV" placeholder="">
        </label>
        <input type="hidden" id="image" name="image">
        <input type="hidden" id="url" name="url">
        <input type="hidden" id="value" name="value">
        <input type="hidden" id="category_id" name="category_id" value="5">
        <!-- todo: add dynamic category value  -->
        <div class="imageEntryWrapper"></div>
        <div class="formActions">
            <button type="submit">✔️</button>
            <NuxtLink to="/" class="button">✖️</NuxtLink>
            <!-- todo: add correct back location  -->

        </div>
    </form>

</template>

<script setup>

// Todo: move JS from Laravel

const createMediaEntry = async (e) => {
    e.preventDefault()

};

</script>