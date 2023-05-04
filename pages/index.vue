<script setup lang="ts">
import { useBoredStore } from '@/stores/boredStore'
const store = useBoredStore()
await store.getData()
const data = computed(() => store.data)
const isLoading = computed(() => store.isLoading)
async function addToList(){
    store.addItem({
      activity: data.value.activity,
      price: data.value.price,
      type: data.value.type
    })
    await store.getData()
}
</script>


<template>
  <div>
    <h2>Suggest me stuff I can do</h2>
    <div class="boredTodo" v-if="isLoading">Loading...</div>
    <div v-if="!isLoading">
    
      <p>{{ data.activity }}</p>
      <p>Price: ${{ data.price }}</p>
      <p>Type of activity: {{ data.type }}</p>

    </div>
    <hr />
    <button @click="addToList">Yeah</button> | <button @click="store.getData">Nah</button>
      <Itinerary todos="todos" />
      <p>Total Cost: ${{ store.total.toFixed(2) }}</p>
  </div>
</template>


<style>
.boredtodo {
  min-height: 10vh;
}
</style>
