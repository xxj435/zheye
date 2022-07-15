import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Column from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import App from './App.vue'
import store from './store'
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id',
      name: 'column',
      component: Column
    },
    {
      path: '/create',
      name: 'createPost',
      component: CreatePost
    }
  ]
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
