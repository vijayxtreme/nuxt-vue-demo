<template>
    <div>
        <h2>Plan for the weekend</h2>
        <p>Cost</p>
        <ul v-for="todo in todos">
            <li>{{ todo.activity }} | Cost ${{ todo.price.toFixed(2) }} | <span>{{  todo.type }}</span> <button @click="store.removeItem(todo)">X</button></li>
        </ul>
        <p>Total Cost: ${{ store.total.toFixed(2) }}</p>
    </div>
</template>
<script setup lang="ts">
import { useBoredStore } from '@/stores/boredStore'
const store = useBoredStore()
defineProps(['todos'])
</script>

<style scoped>
span {
    font-style: italic;
}
</style>