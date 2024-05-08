export const EntriesStore = defineStore('entries', {
  state: () => ({
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    entries: [],
    moviesTVShows: [],
  }),
  getters: {
    all(state) {
      return () => state.entries
    }
  },
  actions: {
    async getSimilar(query, categoryId) {
      const response = await $fetch(`${this.baseURL}/entry/search?query=${query}&category_id=${categoryId}`)
      this.entries = response.data
    },
    async updateAll(entries, category_id) {
      const response = await $fetch(`${this.baseURL}/entry`, {
        method: 'POST',
        body: JSON.stringify({
          entries,
          category_id
        }),
      });
    },
    async findMovieTVShow(query) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDk5YmYwNzMyMjU5MGRiNjM2N2RkOTk3MzcwMDc2NSIsInN1YiI6IjY1ZjlhODM4MjRiMzMzMDE2MTdhNDM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O5HWEE0uBRS_WwNo0g4-TZKgKueV9aTyssQqXr6BNUM'
        }
      };
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}`, options)
      const results = await response.json();
      this.moviesTVShows = results.results
    },
    async addMovieTVShow(data) {
      const response = await $fetch(`${this.baseURL}/entry/store-media`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },
})
