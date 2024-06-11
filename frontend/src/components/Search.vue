<template>
    <div class="search-container mt-3">
        <header class="d-flex justify-content-end align-items-center mb-4">
            <div class="user-info me-5">
                <span v-if="isLoggedIn" class="username bg-primary text-white px-3 py-2 rounded">{{ username }}</span>
                <button @click="logout" class="btn btn-danger ms-2 px-4">Cerrar sesión</button>
            </div>
            <button @click="toggleFavoritesView" class="btn btn-primary ms-2" v-if="isLoggedIn && !showFavorites">
                Favoritos
            </button>
            <button @click="toggleFavoritesView" class="btn btn-primary ms-2" v-if="showFavorites">
                Regresar
            </button>
        </header>
        <section class="text-center">
            <h2 class="mb-4">Buscar videos</h2>
            <form @submit.prevent="search" class="d-flex justify-content-center">
                <input type="text" v-model="query" placeholder="Buscar..." class="form-control me-3">
                <button type="submit" class="btn btn-primary">Buscar</button>
            </form>
        </section>
        <!-- Sección para mostrar resultados de búsqueda -->
        <section v-if="!showFavorites && videos.length > 0" class="list-container m-5">
            <h3 class="mt-4">Resultados de búsqueda</h3>
            <ul class="list-group mt-3">
                <li v-for="video in videos" :key="video.videoId" class="list-group-item mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <a :href="video.url" target="_blank" class="text-primary">{{ video.title }}</a>
                            <p class="text-muted mb-0">{{ video.description }}</p>
                        </div>
                        <button @click="addToFavorites(video)" class="btn btn-sm btn-outline-primary">
                            Agregar a favoritos
                        </button>
                    </div>
                </li>
            </ul>
        </section>
        <!-- Sección para mostrar favoritos -->
        <section v-if="showFavorites && favorites.length > 0" class="list-container m-5">
            <h3 class="mt-4">Tus favoritos</h3>
            <ul class="list-group mt-3 m-">
                <li v-for="favorite in favorites" :key="favorite._id" class="list-group-item mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <a :href="favorite.url" target="_blank" class="text-primary">{{ favorite.title }}</a>
                            <p class="text-muted mb-0">{{ favorite.description }}</p>
                            <p class="text-muted mb-0">{{ favorite.videoId }}</p>
                        </div>
                        <button @click="removeFromFavorites(favorite.videoId)" class="btn btn-sm btn-outline-danger">
                            Quitar de favoritos
                        </button>
                    </div>
                </li>
            </ul>
        </section>
        <!-- Mensaje si no hay resultados de búsqueda -->
        <section v-else-if="searched && !showFavorites" class="list-container m-5">
            <p class="mt-4 text-muted">No se encontraron resultados.</p>
        </section>
        <!-- Mensaje si no hay favoritos guardados -->
        <section v-else-if="searched && showFavorites && favorites.length === 0" class="list-container m-5">
            <p class="mt-4 text-muted">No tienes videos marcados como favoritos.</p>
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
            favorites: [],
            searched: false,
            showFavorites: false, // Estado para alternar entre búsqueda y favoritos
            username: '',
            isLoggedIn: false
        };
    },
    created() {
        this.username = localStorage.getItem('username');
        this.isLoggedIn = !!localStorage.getItem('jwtToken');
        if (this.isLoggedIn) {
            this.loadFavorites();
        }
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
        async loadFavorites() {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('http://localhost:5000/videos/favorites', {
                    headers: { 'x-auth-token': token }
                });
                this.favorites = response.data;
            } catch (error) {
                console.error('Error al cargar favoritos:', error);
                this.favorites = [];
            }
        },
        async addToFavorites(video) {
            try {
                const token = localStorage.getItem('jwtToken');
                await axios.post(`http://localhost:5000/videos/favorite/${video.videoId}`, {}, {
                    headers: { 'x-auth-token': token }
                });
                alert('Video agregado a favoritos.');
                this.loadFavorites(); // Recargar la lista de favoritos después de agregar uno nuevo
            } catch (error) {
                console.error('Error al agregar video a favoritos:', error);
                alert('Error al agregar video a favoritos. Por favor, inténtelo de nuevo.');
            }
        },
        async removeFromFavorites(videoId) {
            try {
                const token = localStorage.getItem('jwtToken');
                console.log(videoId);
                await axios.delete(`http://localhost:5000/videos/favorite/${videoId}`, {
                    headers: { 'x-auth-token': token }
                });
                this.loadFavorites(); // Recargar la lista de favoritos después de eliminar uno
            } catch (error) {
                console.error('Error al eliminar video de favoritos:', error);
                alert('Error al eliminar video de favoritos. Por favor, inténtelo de nuevo.');
            }
        },
        toggleFavoritesView() {
            this.showFavorites = !this.showFavorites;
            if (this.showFavorites) {
                this.loadFavorites(); // Cargar los favoritos al cambiar a la vista de favoritos
            }
        },
        logout() {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('username');
            this.isLoggedIn = false;
            this.username = '';
            this.$emit('logout');
            this.$router.push({ name: 'Home' }).catch(err => {
                console.error('Error al redirigir a la página de inicio:', err);
            });
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