import { BoredItem } from "~/interfaces/BoredInterface";
export const useBoredStore = defineStore("boredStore", {
  state: () => ({
    isLoading: false,
    data: { activity: "", price: 0, type: "" } as any,
    todos: [] as any,
    total: 0,
  }),
  actions: {
    async getData() {
      try {
        this.isLoading = true;
        const { data } = await useFetch(
          `http://www.boredapi.com/api/activity?type=recreational`
        );
        console.log(data);
        this.data = data;
      } catch (e) {}
      this.isLoading = false;
    },
    addItem(item: BoredItem) {
      this.todos.push(item);
      this.total = this.total + item.price;
    },
    removeItem(item: BoredItem) {
      this.todos = this.todos.filter(
        (it: BoredItem) => it.activity !== item.activity
      );
    },
  },
});
