// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import RegisterLogin from '@/views/RegisterLogin.vue';
import Search from '@/components/Search.vue';

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
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
