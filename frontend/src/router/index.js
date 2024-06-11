// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import RegisterLogin from '@/views/RegisterLogin.vue';
<<<<<<< HEAD
=======
import Search from '@/components/Search.vue';
>>>>>>> feature/backend-frontend-integration

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register-login',
    name: 'RegisterLogin',
    component: RegisterLogin
<<<<<<< HEAD
=======
  },
  {
    path: '/search',
    name: 'search',
    component: Search
>>>>>>> feature/backend-frontend-integration
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
