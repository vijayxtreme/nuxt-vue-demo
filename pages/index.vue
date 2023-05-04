<script setup lang="ts">
import { useBoredStore } from '@/stores/boredStore'
const store = useBoredStore()
await store.getData()
const data = computed(() => store.data)
async function addToList(){
    store.addItem(data?.value?.activity)
    await store.getData()
}
</script>


<template>
  <div>
    <h2>Suggest me stuff I can do</h2>
    <p>{{ data.activity }}</p>
    <p>Price: ${{ data.price }}</p>
    <p>Type of activity: {{  data.type }}</p>
    <button @click="addToList">Yeah</button> | <button @click="store.getData">Nah</button>
    <Itinerary />
  </div>
</template>


<style>
</style>
