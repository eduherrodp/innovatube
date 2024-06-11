<template>
    <div class="search-container mt-3">
        <header class="d-flex justify-content-end align-items-center mb-4">
            <div class="user-info me-5">
                <span v-if="isLoggedIn" class="username bg-primary text-white px-3 py-2 rounded">{{ username }}</span>
                <button @click="logout" class="btn btn-danger ms-2 px-4">Cerrar sesión</button>
            </div>
        </header>
        <section class="text-center">
            <h2 class="mb-4">Buscar videos</h2>
            <form @submit.prevent="search" class="d-flex justify-content-center">
                <input type="text" v-model="query" placeholder="Buscar..." class="form-control me-3">
                <button type="submit" class="btn btn-primary">Buscar</button>
            </form>
        </section>
        <section v-if="videos.length > 0" class="list-container m-5">
            <h3 class="mt-4">Resultados de búsqueda</h3>
            <ul class="list-group mt-3">
                <li v-for="video in videos" :key="video.videoId" class="list-group-item mb-4">
                    <div class="d-flex justify-content-between align-items-center ">
                        <div>
                            <a :href="video.url" target="_blank" class="text-primary">{{ video.title }}</a>
                            <p class="text-muted mb-0">{{ video.description }}</p>
                        </div>
                        <button @click="addToFavorites(video)" class="btn btn-sm btn-outline-primary">Agregar a
                            favoritos</button>
                    </div>
                </li>
            </ul>
        </section>
        <section v-else-if="searched">
            <p class="mt-4 text-muted">No se encontraron resultados.</p>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            query: '',
            videos: [],
            searched: false,
            username: '',
            isLoggedIn: false
        };
    },
    created() {
        this.username = localStorage.getItem('username');
        this.isLoggedIn = !!localStorage.getItem('jwtToken');
    },
    methods: {
        async search() {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('http://localhost:5000/videos/search', {
                    params: { query: this.query },
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.videos = response.data;
                this.searched = true;
            } catch (error) {
                console.error('Error al buscar videos:', error);
                this.videos = [];
                this.searched = true;
            }
        },
        logout() {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('username');
            this.isLoggedIn = false;
            this.username = '';
            this.$emit('logout');
            this.$router.push({ name: 'home' }).catch(err => {
                console.error('Error al redirigir a la página de inicio:', err);
            });
        },
        async addToFavorites(video) {
            try {
                const token = localStorage.getItem('jwtToken');
                await axios.post(`http://localhost:5000/videos/favorite/${video.videoId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Video agregado a favoritos.');
            } catch (error) {
                console.error('Error al agregar video a favoritos:', error);
                alert('Error al agregar video a favoritos. Por favor, inténtelo de nuevo.');
            }
        }
    }
};
</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;
}

.username {
    font-size: 1rem;
}

.username:hover {
    text-decoration: none;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    padding: 0.375rem 1rem;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
}

.form-control {
    width: 300px;
}
</style>