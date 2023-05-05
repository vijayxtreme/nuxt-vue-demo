import { BoredItem } from "~/interfaces/BoredInterface";
export const useBoredStore = defineStore("boredStore", {
  state: () => ({
    isLoading: false,
    data: { activity: "", price: 0, type: "" } as any,
    todos: [] as BoredItem[],
    total: 0,
  }),
  actions: {
    async getData() {
      try {
        this.isLoading = true;
        let { data } = await useFetch(
          `http://www.boredapi.com/api/activity?type=recreational`
        );
        let localS = localStorage.getItem("todos");
        let localTodos = [];
        if (localS) {
          localTodos = JSON.parse(localS);
          this.todos = localTodos;
        }
        this.data = data;
      } catch (e) {}
      this.isLoading = false;
    },
    addItem(item: BoredItem) {
      this.todos.push(item);
      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.total = this.total + item.price;
    },
    removeItem(item: BoredItem) {
      this.todos = this.todos.filter(
        (it: BoredItem) => it.activity !== item.activity
      );
      localStorage.setItem("todos", JSON.stringify(this.todos));

      this.total = this.total - item.price;
    },
  },
});
