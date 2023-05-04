export const useBoredStore = defineStore("boredStore", {
  state: () => ({
    data: {} as any,
    todos: [],
  }),
  actions: {
    async getData() {
      try {
        const { data } = await useFetch(
          `http://www.boredapi.com/api/activity?type=recreational`
        );
        console.log(data);
        this.data = data;
      } catch (e) {}
    },
    addItem(item) {
      this.todos.push(item);
    },
  },
});
