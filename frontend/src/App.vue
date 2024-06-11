<template>
  <div id="app">
    <header class="header text-white py-3 animate__animated animate__fadeInDown">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="logo d-flex align-items-center">
          <img src="@/assets/innovatube-logo.png" alt="InnovaTube Logo" class="img-fluid bg-white rounded-circle" style="width: 50px;">
          <h2 class="ms-2 mb-0">InnovaTube</h2>
        </div>
        <nav>
          <ul class="nav">
            <li class="nav-item"><router-link to="/" class="nav-link text-white">Inicio</router-link></li>
            <li class="nav-item"><a class="nav-link text-white" href="#features-section">Características</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="#about-us">Sobre mí</a></li>
            <li class="nav-item"><router-link to="/register-login" class="nav-link text-black bg-white rounded-pill border border-success">Registrarse</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="flex-grow-1">
      <router-view />
    </main>
    <footer class="py-3 my-3">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><router-link to="/" class="nav-link text-body-secondary">Inicio</router-link></li>
        <li class="nav-item"><a class="nav-link text-body-secondary" href="#features-section">Características</a></li>
        <li class="nav-item"><a class="nav-link text-body-secondary" href="#about-us">Sobre mí</a></li>
      </ul>
      <p class="text-center text-body-secondary">&copy; 2024 InnovaTube</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleLogout() {
      // Manejar la acción de cerrar sesión
      this.$router.push({ name: 'home' }).catch(err => {
        console.error('Error al redirigir a la página de inicio:', err);
      });
    }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f0f0;
}
.header {
  background-color: #000000ce;
}
</style>
