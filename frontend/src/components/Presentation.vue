<template>
  <div class="container py-5 mb-2">
    <div class="row align-items-center">
      <div class="col-md-5 text-center animate__animated animate__bounceIn animate__slow">
        <img src="@/assets/innovatube-logo.png" alt="InnovaTube Logo" class="img-fluid logo">
      </div>
      <div class="col-md-7">
        <h1 class="display-4 spaced-text">Bienvenido a InnovaTube</h1>
        <p class="lead">
          Explora una amplia variedad de videos en YouTube, desde tutoriales hasta entretenimiento, y guarda tus favoritos para acceder a ellos fácilmente. Reproduce tus contenidos preferidos de manera rápida y sencilla con nuestra plataforma intuitiva
        </p>
        <button class="btn btn-success btn-lg mt-3 animate__animated animate__pulse animate__infinite" @click="scrollToFeatures">
          <i class="fas fa-chevron-down"></i> Ver características
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Presentation',
  methods: {
    scrollToFeatures() {
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
.logo {
  max-width: 100%;
  height: auto;
  margin-left: -50px;
}

.spaced-text {
  letter-spacing: 0.1em; 
}

.animate__pulse {
  --animate-duration: 2s;
}

.btn-success {
  animation-duration: 2s; 
  animation-iteration-count: infinite; 
}
</style>
