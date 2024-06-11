<template>
  <transition name="fade" mode="out-in">
    <div v-if="isActive" class="container mt-5">
      <h2 class="text-center mb-4">Registro</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Campo nombres -->
        <div class="mb-1">
          <label for="firstName" class="form-label">Nombre(s)</label>
          <input type="text" id="firstName" v-model="firstName" class="form-control" required>
        </div>

        <!-- Campo apellidos -->
        <div class="mb-1">
          <label for="lastName" class="form-label">Apellidos</label>
          <input type="text" id="lastName" v-model="lastName" class="form-control" required>
        </div>

        <!-- Campo de Nombre de usuario -->
        <div class="mb-1">
          <label for="username" class="form-label">Nombre de usuario</label>
          <input type="text" id="username" v-model="username" class="form-control" required>
        </div>

        <!-- Campo de Correo electrónico -->
        <div class="mb-1">
          <label for="email" class="form-label">Correo electrónico</label>
          <input type="email" id="email" v-model="email" class="form-control" required>
        </div>

        <!-- Campo de Contraseña -->
        <div class="mb-1">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" id="password" v-model="password" class="form-control" required>
        </div>

        <!-- Campo de Confirmación de contraseña -->
        <div class="mb-1">
          <label for="confirmPassword" class="form-label">Confirmación de contraseña</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required>
        </div>

        <div class="mb-2">
          <div class="g-recaptcha" data-sitekey="TU_SITE_KEY"></div>
        </div>

        <button type="submit" class="btn btn-primary w-100">Registrarse</button>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['isActive'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async handleSubmit() {
      // Validación de campos
      if (!this.firstName || !this.lastName || !this.email || !this.username || !this.password || !this.confirmPassword) {
        alert('Por favor completa todos los campos.');
        return;
      }

      // Validación de contraseña
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
      }

      try {
        // Simular llamada HTTP para registro de usuario
        console.log('Submit registration:', this.firstName, this.lastName, this.username, this.email, this.password, this.confirmPassword);

        // Limpiar campos después de un registro exitoso (simulado)
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.username = '';
        this.password = '';
        this.confirmPassword = '';

        // Redirigir o mostrar otra retroalimentación de éxito si es necesario
        alert('Registro exitoso.');
      } catch (error) {
        // Manejo de errores en la llamada HTTP
        console.error('Error en el registro:', error);
        alert('Error en el registro. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  }
};
</script>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
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
