<template>
    <div>
        <h2>Plan for the weekend</h2>
        <p>Cost</p>
        <ul v-for="todo in todos">
            <li>{{ todo }}</li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { useBoredStore } from '@/stores/boredStore'
const store = useBoredStore()
const todos = computed(() => store.todos)
</script>