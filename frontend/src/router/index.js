import { createRouter, createWebHistory } from 'vue-router'
import {useLoginStore} from '@/stores/login';



const router = createRouter({
  history: createWebHistory(),
  routes: [
   
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login.vue'),
      meta: {requiresAuth: false}
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue'),
      meta: {requiresAuth: false}
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/profil.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      meta: {requiresAuth: true}
    },
  ]
})

router.beforeEach((to, from) => {
  const store = useLoginStore();
  
  
if(to.meta.requiresAuth && store.isLogged === false){
  return { name: 'login'}

}  
  
})

export default router
