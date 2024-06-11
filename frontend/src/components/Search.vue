<template>
    <div class="search-container">
      <header>
        <div class="user-info">
          <span @click="logout">{{ username }}</span>
        </div>
        <h2>Buscar Videos</h2>
        <form @submit.prevent="search">
          <input type="text" v-model="query" placeholder="Buscar...">
          <button type="submit">Buscar</button>
        </form>
      </header>
      <section v-if="videos.length > 0">
        <h3>Resultados de búsqueda</h3>
        <ul>
          <li v-for="video in videos" :key="video.videoId">
            <a :href="video.url" target="_blank">{{ video.title }}</a>
            <p>{{ video.description }}</p>
          </li>
        </ul>
      </section>
      <section v-else-if="searched">
        <p>No se encontraron resultados.</p>
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
        username: ''
      };
    },
    created() {
      this.username = localStorage.getItem('username'); // Supone que el nombre de usuario está almacenado en el localStorage
    },
    methods: {
      async search() {
        try {
          const token = localStorage.getItem('jwtToken');
          const response = await axios.get('http://localhost:5000/api/search', {
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
        this.$router.push({ name: 'login' });
      }
    }
  };
  </script>
  
  <style scoped>
  .search-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .user-info {
    align-self: flex-end;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  form {
    display: flex;
    gap: 10px;
  }
  
  input {
    flex: 1;
    padding: 8px;
  }
  
  button {
    padding: 8px 16px;
  }
  
  section ul {
    list-style-type: none;
    padding: 0;
  }
  
  section li {
    margin-bottom: 10px;
  }
  
  section h3 {
    margin-top: 20px;
  }
  </style>  