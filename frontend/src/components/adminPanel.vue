<template >
<Transition name="toast">
    <Toast v-if="successDeleteAccount"  :notifyText="'Le Compte de ' + 'a été supprimé avec succès'" @close-notif="closeDeleteAccount"/>
</Transition>
<div class="admin_container">
    <h2>Liste des utilisateurs</h2>
    <div  v-for="user in userStore.users" :key="user.uuid">
     <div  class="card" >
        <div class="card_image">
            <img v-if="user.image !== null " :src="user.image" alt="">
            <img v-else src="../assets/images/default_profile_400x400.png" alt="">
            
            </div>
        <div>{{user.prenom}} <span>{{user.nom}}</span></div>
        <button @click="id= user.uuid; nom= user.nom; prenom=user.prenom; open = true;  " class="btn btn-primary"><i class="fa-regular fa-trash-can"></i></button>
         
     </div>
    </div>
     
</div>

<Teleport to="body">
  <div v-if="open" class="modal">
    <div class="modal_container">
        <p>Êtes vous sûr de vouloir supprimer le compte de <strong>{{prenom}} {{nom}}</strong>  ?</p>
         <div  class="profil_delete_check_btn">
            <button @click="deleteAccount" class="btn delete ">Oui</button>
            <button @click="open =false" class="btn btn-primary" >Non</button>
        </div>
    
      </div>

    </div>
</Teleport>
</template>


<script setup>

import{useUserStore} from '@/stores/user';
import{useLoginStore} from '@/stores/login';
import {ref} from 'vue';
import router from '../router';
import Toast from './Toast.vue';

const userStore = useUserStore();
const loginStore = useLoginStore();
const id = ref('');
const successDeleteAccount = ref(false);
const nom = ref('');
const prenom = ref('');
const open = ref(false)

// Fermeture de la modal suppression compte
const closeDeleteAccount = () => { 
    successDeleteAccount.value = false
    router.push('/')
    loginStore.$reset();
    userStore.$reset();
    }

// Récupération des infos du store User
userStore.getAll();


// Suppresion d'un compte
async function deleteAccount(){

    await fetch(`http://localhost:5000/api/auth/${id.value}`, {
       
       method: 'DELETE',
       headers: {
            "Authorization": `Bearer ${loginStore.token} `,
            "Content-Type": "application/json"
        }
    })
    .then((res) => {
        if(res.ok){
            open.value = false
            userStore.getAll();
        }

    })
  
}







</script>

<style lang="scss" scoped>

.admin{

    &_container{
        width: 50%;
        min-height: 20vh;

        
        border-radius: 5px;
        margin: 0 auto 200px;

    h2{
        text-align: center;
        margin: 20px 0;
    }
     
      @media screen and (max-width: 320px) {
        width: 95%;
    }
  
        
    }
}
.card{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: var(--text-primary-color);
    border: 1px solid var(--gray-2);
    border-radius: 4px;
    height: 10vh;
    text-transform: capitalize;
    padding: 10px;
    margin-bottom: 20px;

    

    &_image{
        width: 60px;
        height: 60px;

        img{
            border-radius: 50%;
             width: 60px;
            height: 60px;
        }
       
    }

    button{
        background-color: var(--danger-2);
        font-size: 1rem;
        font-weight: 500;
    }
}

.delete{
      
     
      padding: 10px;
      background-color: var(--danger-2);
      color: var(--text-primary-color);
    &:hover {
      background-color: var(--danger-1);
    }
  }

 .verification{
     display: flex;
     align-items: center;
     flex-direction: column;
     margin-bottom: 10px;

     p{
         margin-bottom: 5px;
     }

     button{
         margin-left: 5px;
         margin-right: 5px;
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

.modal {


    position: fixed;
    z-index: 999;
    background-color: rgb(0, 0,0, 0.7);
   // color: var(--text-primary-color);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;  
    
    &_container{
        max-width: 400px;
        background-color: var(--text-primary-color);
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        line-height: 25px;
        
    
    button{
        margin-top: 15px;
        margin-right: 10px;
    }
    
    strong{
        text-transform: capitalize;
    }
    }

}

</style>