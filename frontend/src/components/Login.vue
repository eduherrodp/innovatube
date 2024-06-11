<template>
    <div>
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login" class="login-form">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Ingrese su email" required>
            <label for="password">Contraseña</label>
            <input type="password" id="password" v-model="password" placeholder="Ingrese su contraseña" required>
            <button type="submit" :disabled="isLoggingIn">
                <span v-if="isLoggingIn">Iniciando sesión...</span>
                <span v-else>Iniciar Sesión</span>
            </button>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            isLoggingIn: false,
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            try {
                this.isLoggingIn = true;
                console.log('Iniciando sesión con:', this.email, this.password);

                // Simulación de inicio de sesión (aquí deberías hacer la llamada HTTP real)
                // Supongamos que el servidor devuelve un token de autenticación
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simular una solicitud asincrónica

                // Limpiar datos después del inicio de sesión exitoso
                this.email = '';
                this.password = '';
                this.errorMessage = ''; // Limpiar mensaje de error si lo hubiera

            } catch (error) {
                // Manejo de errores
                console.error('Error en el inicio de sesión:', error);
                this.errorMessage = 'Credenciales inválidas. Por favor, inténtelo de nuevo.'; // Mensaje de error personalizado
            } finally {
                this.isLoggingIn = false;
            }
        }
    }
};
</script>

<style scoped>
.login-form {
    max-width: 300px;
    margin: 0 auto;
}

.login-form label {
    display: block;
    margin-bottom: 0.5rem;
}

.login-form input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.login-form button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-form button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.error-message {
    color: #dc3545;
    margin-top: 0.5rem;
}
</style>
