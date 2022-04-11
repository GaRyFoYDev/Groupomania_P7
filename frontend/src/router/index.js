import { createRouter, createWebHistory } from 'vue-router'


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
    }
  ]
})

router.beforeEach((to, from) => {
  function isLoggedIn(){
    if (localStorage.getItem("id"))
    return true
  } 

if(to.meta.requiresAuth && !isLoggedIn()){
  return { name: 'login'}

}  
  
})

export default router
