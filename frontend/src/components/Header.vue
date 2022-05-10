<template>
    <nav>
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
import {useUserStore} from '../stores/user'
const loginStore = useLoginStore();
const userStore = useUserStore();

const logOut = async() =>{

    loginStore.$reset();
    userStore.$reset();
    await router.push({path: '/'});
   
   
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

</style>