<script setup lang="ts">
import { useBoredStore } from '@/stores/boredStore'
const store = useBoredStore()
await store.getData()
const data = computed(() => store.data)
const todos = computed(() => store.todos)
const isLoading = computed(() => store.isLoading)
async function addToList(){
    store.addItem({
      activity: data.value.activity,
      price: data.value.price,
      type: data.value.type
    })
    store.getData()
}
function clearLocalStorage(){
    localStorage.clear()
    window.location.reload()
}
</script>


<template>
  <div>
    <h2>Suggest me stuff I can do</h2>
    <button @click="clearLocalStorage">Clear Local Storage</button>

    <div class="boredTodo" v-if="isLoading">Loading...</div>
    <div v-if="!isLoading">
      <p>{{ data.activity }}</p>
      <p>Price: ${{ data.price }}</p>
      <p>Type of activity: {{ data.type }}</p>
    </div>
    
    <hr />
    <button @click="addToList">Yeah</button> | <button @click="store.getData">Nah</button>
      <Itinerary v-bind:todos="todos" />
    <hr />
    <Graph v-bind:todos="todos" />
  </div>
</template>


<style>
.boredtodo {
  min-height: 10vh;
}
</style>
