<template>
  <transition name="fade" mode="out-in">
    <div v-if="isActive" class="container mt-5">
      <h2 class="text-center mb-4">Iniciar sesión</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Campo de nombre de usuario o correo electrónico -->
        <div class="mb-1">
          <label for="usernameOrEmail" class="form-label">Nombre de usuario o correo electrónico</label>
          <input type="text" id="usernameOrEmail" v-model="usernameOrEmail" class="form-control" required>
        </div>

        <!-- Campo de contraseña -->
        <div class="mb-1">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" id="password" v-model="password" class="form-control" required>
        </div>

        <!-- Botón de submit -->
        <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>

        <!-- Recuperación de contraseña -->
        <p class="mt-1"><a href="#">¿Olvidaste tu contraseña?</a></p>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['isActive'],
  data() {
    return {
      usernameOrEmail: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // Lógica para manejar el inicio de sesión
      console.log('Submit login:', this.usernameOrEmail, this.password);
    }
  }
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  opacity: 1;
}

form .form-control {
  height: 50px;
  border-radius: 25px;
}

form button {
  height: 50px;
  border-radius: 25px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
