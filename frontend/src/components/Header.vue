<template>
    <nav>
        <Transition name="toast">
            <ToastInfo v-if="goodBye" notifyText="Vous allez être déconnecté !" @close-notif="close"/>
        </Transition>
        <div @click="home" class="logo"><img src="../assets/images/icon-left-font-monochrome-white.svg" alt=""></div>
        <div class="logout">
          <i @click="profil" class="fa-solid fa-user-gear"></i>
         <i @click="logOut" class="fa-solid fa-right-from-bracket"></i>
        
        </div>
    </nav>

  
</template>


<script setup>
import router from '../router';
import { useLoginStore} from '../stores/login';
import {useUserStore} from '../stores/user';
import {ref} from 'vue';
import ToastInfo from './ToastInfo.vue';
const loginStore = useLoginStore();
const userStore = useUserStore();
const goodBye = ref(false)
const close = () =>{ 
    
    goodBye.value = false
    router.push('/')
    };


// LogOut de l'application 
const logOut = async() =>{

    goodBye.value = true;
    setTimeout(() => {goodBye.value =  false},2500)
    setTimeout(() => {router.push('/')},3500)
    loginStore.$reset();
    userStore.$reset();

   
   
}
const profil = () =>{

    if(userStore.role === null){
        router.push({path: '/profil'});
        
        }else if(userStore.role === 'admin') {
             
             router.push({path: '/admin'});
        }
    
   
}
const home = async() =>{

    await router.push({path: '/home'});

   
}



</script>

<style lang="scss" scoped>

nav{
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 20px;
    background-color: var(--danger-2);

    .logo img {
        width: 40%;
        cursor:pointer;

       @media screen and (max-width: 320px) {
        width: 50%;
    }
      

        
    }

    .logout{
        width: 5%;
        font-size: 1.2rem;
        color: var(--text-primary-color);
        font-size: 1.2rem;
        display: flex;
        justify-content: space-around;

        
    i{
        cursor: pointer;
         @media screen and (max-width: 768px) {
        margin-right: 15px;
       }
       
        &:hover{
            color: var(--primary-1);
           
        }
    }
}

}

.toast-enter-from{
    opacity: 0;
    transform: translateY(-60px);
}
.toast-enter-to{
    opacity: 1;
    transform: translateY(0);
}
.toast-enter-active{
    transition: all 0.3s ease;
}
.toast-leave-from{
    opacity: 1;
    transform: translateY(0);
}
.toast-leave-to{
    opacity: 0;
    transform: translateY(-60px);
}
.toast-leave-active{
    transition: all 0.3s ease;
}


</style>