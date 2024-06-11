<!-- src/components/Search.vue -->
<template>
    <div>
        <h2>Buscar Videos</h2>
        <form @submit.prevent="search">
            <input type="text" v-model="query" placeholder="Buscar...">
            <button type="submit">Buscar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            query: ''
        };
    },
    methods: {
        async search() {
            console.log('Búsqueda de videos');
        }
    }
};
</script>

<style scoped>
</style>