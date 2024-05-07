export const CategoriesStore = defineStore('categories', {
  state: () => ({
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    showModal: false,
    categoryToDelete: null,
    categories: [],
    categoryTypes: [],
    categoryToEdit: null
  }),
  getters: {
    all(state) {
      return () => state.categories
    }
  },
  actions: {
    async getAll() {
      const response = await $fetch(`${this.baseURL}/category`)
      this.categories = response.data
    },
    async get(id) {
      const response = await $fetch(`${this.baseURL}/category/${id}`)
      this.categoryToEdit = response.data
    },
    async getWithEntries(id) {
      const response = await $fetch(`${this.baseURL}/category/${id}?withEntries=true`)
      this.categoryToEdit = response.data
    },
    async getCategoryTypes() {
      const response = await $fetch(`${this.baseURL}/category/types`)
      this.categoryTypes = response.data
    },
    async add() {
      const response = await $fetch(`${this.baseURL}/category`, {
        method: 'POST',
        body: JSON.stringify(this.categoryToEdit),
      });
    },
    async update() {
      const response = await $fetch(`${this.baseURL}/category/${this.categoryToEdit.id}`, {
        method: 'PATCH',
        body: JSON.stringify(this.categoryToEdit),
      });
    },
    async delete(data) {
      if(this.categoryToDelete.parent_id){
        const parentIndex = this.categories.findIndex(category => category.id === this.categoryToDelete.parent_id);
        const index = this.categories[parentIndex].subcategories.findIndex(category => category.id === this.categoryToDelete.id);
        if (index !== -1) {
          this.categories[parentIndex].subcategories[index].deleted = true;
        }
      }else{
        const index = this.categories.findIndex(category => category.id === this.categoryToDelete.id);
        if (index !== -1) {
          this.categories[index].deleted = true;
        }
      } 
      const response = await $fetch(this.baseURL + '/category/' + this.categoryToDelete.id, {
        method: 'DELETE'
      });
    },
    async toggleModal(data) {
      if(data){
        this.categoryToDelete = data
      }
      this.showModal = !this.showModal
    }
  },
})
