<template>
<<<<<<< HEAD
    <div id="app" class="container">
      <transition name="fade" mode="out-in">
        <div :key="activeForm">
          <LoginForm v-if="activeForm === 'login'" :isActive="true" />
          <RegisterForm v-else :isActive="true" />
          <div class="text-center mt-2">
            <button @click="toggleForm()" :class="{ 'btn-primary': activeForm === 'login', 'btn-secondary': activeForm === 'register'}" class="btn">
              {{ activeForm === 'login' ? '¿Ya tienes una cuenta? Inicia sesión' : '¿Aún no tienes una cuenta? Regístrate' }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import LoginForm from '@/components/LoginForm.vue';
  import RegisterForm from '@/components/RegisterForm.vue';
  
  export default {
    name: 'RegisterLogin',
    components: {
      LoginForm,
      RegisterForm
    },
    data() {
      return {
        activeForm: 'login'
      };
    },
    methods: {
      toggleForm() {
        this.activeForm = this.activeForm === 'login' ? 'register' : 'login';
      }
    }
  };
  </script>
  
  <style>
  .btn {
    border-radius: 25px;
    width: 250px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  
=======
  <div id="app" class="container">
    <transition name="fade" mode="out-in">
      <div :key="activeForm">
        <LoginForm v-if="activeForm === 'login'" :isActive="true" @login-success="handleLoginSuccess" />
        <RegisterForm v-else :isActive="true" @registration-success="handleRegistrationSuccess" />
        <div class="text-center mt-2">
          <button @click="toggleForm()" :class="{ 'btn-primary': activeForm === 'login', 'btn-secondary': activeForm === 'register'}" class="btn">
            {{ activeForm === 'login' ? '¿Aún no tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión' }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'RegisterLogin',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      activeForm: 'login'
    };
  },
  methods: {
    toggleForm() {
      this.activeForm = this.activeForm === 'login' ? 'register' : 'login';
    },
    handleRegistrationSuccess() {
      this.activeForm = 'login';
    },
    handleLoginSuccess(username) {
      localStorage.setItem('username', username); 
      this.$router.push({ name: 'search' });
    }
  }
};
</script>

<style>
.btn {
  border-radius: 25px;
  width: 250px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
>>>>>>> feature/backend-frontend-integration
