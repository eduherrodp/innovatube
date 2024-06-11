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

        <!-- Mostrar mensaje de error -->
        <div v-if="errorMsg" class="alert alert-danger mt-3">{{ errorMsg }}</div>
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
      password: '',
      errorMsg: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const userData = {
          email: this.usernameOrEmail,
          password: this.password
        };

        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        const responseData = await response.json();

        if (response.ok) {
          // Si el inicio de sesión fue exitoso, manejar el token JWT y los datos del usuario
          const token = responseData.token;
          const user = responseData.user;

          // Guardar el token JWT y los datos del usuario en localStorage
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('userId', user.id);
          localStorage.setItem('username', user.username);

          // Emitir evento de éxito de inicio de sesión
          this.$emit('login-success', user.username); // Aquí emitimos el evento

          // Limpiar campos de entrada y error
          this.usernameOrEmail = '';
          this.password = '';
          this.errorMsg = '';
        } else {
          // Si hubo un problema con el inicio de sesión, mostrar mensaje de error
          this.errorMsg = responseData.msg;
        }
      } catch (error) {
        // Manejo de errores en la llamada HTTP
        console.error('Error en el inicio de sesión:', error);
        this.errorMsg = 'Error en el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
      }
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