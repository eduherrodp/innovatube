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

        <!-- Mostrar mensaje de error-->
         <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div> 

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
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      // Validaciones
      if (!/^[a-zA-Z\s]+$/.test(this.firstName) || !/^[a-zA-Z\s]+$/.test(this.lastName)) {
        alert('Por favor ingresa nombres y apellidos válidos.');
        return;
      }

      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(this.username)) {
        alert('Nombre de usuario inválido. Debe contener solo letras, números, guiones bajos y guiones medios, y tener entre 3 y 20 caracteres.');
        return;
      }

      if (!/^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(this.email)) {
        alert('Por favor ingresa una dirección de correo electrónico válida.');
        return;
      }

      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(this.password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
      }

      try {
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword
        };

        // Realizar la solicitud HTTP al backend
        const response = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        const responseData = await response.json();

        // Manejar la respuesta del backend
        if (response.ok) {
          // Si el registro fue exitoso, mostrar mensaje y manejar el token JWT
          alert('Registro exitoso.');

          const token = responseData.token;
          localStorage.setItem('jwtToken', token);

          // Emitir evento para redirigir a la página de inicio de sesión
          this.$emit('registration-success');

          this.firstName = '';
          this.lastName = '';
          this.email = '';
          this.username = '';
          this.password = '';
          this.confirmPassword = '';
        } else {
          // Si hubo un problema con el registro, mostrar mensaje de error
          this.errorMessage = responseData.msg || 'Error en el registro. Por favor, intente de nuevo más tarde.';
        }
      } catch (error) {
        // Manejo de errores en la llamada HTTP
        console.error('Error en el registro:', error);
        this.errorMessage = 'Error en el registro. Por favor, intente de nuevo más tarde.';
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
