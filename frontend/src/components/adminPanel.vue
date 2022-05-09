<template >


<div class="admin_container">
    <h2>Liste des utilisateurs</h2>
    <div  v-for="user in userStore.users">
     <div class="card">
        <div class="card_image">
            <img v-if="user.image !== null " :src="user.image" alt="">
            <img v-else src="../assets/images/default_profile_400x400.png" alt="">
            
            </div>
        <div>{{user.prenom}} <span>{{user.nom}}</span></div>
        <button @click.self="show = true" class="btn btn-primary"><i class="fa-regular fa-trash-can"></i></button>
         
     </div>
       <Transition class="verification">
        <div v-if="show" class="profil_delete_check">
            <p>Êtes-vous sûr de bien vouloir supprimer votre compte ?</p>
            <div  class="profil_delete_check_btn">
                <button @click="id = user.uuid; deleteAccount()" class="btn delete ">Oui</button>
                <button @click.self=" show =false" class="btn btn-primary" >Non</button>

            </div>
        </div>

        </Transition>     
    </div>
  
</div>

</template>


<script setup>

import{useUserStore} from '@/stores/user';
import{useLoginStore} from '@/stores/login';
import {ref} from 'vue';


const userStore = useUserStore();
const loginStore = useLoginStore();
const id = ref('');
const show = ref(false)


userStore.getAll();


async function deleteAccount(){

    await fetch(`http://localhost:5000/api/auth/${id.value}`, {
       
       method: 'DELETE',
       headers: {
            "Authorization": `Bearer ${loginStore.token} `,
            "Content-Type": "application/json"
        }
    })

   await router.push('/')
}








</script>

<style lang="scss" scoped>

.admin{

    &_container{
        width: 50%;
        height: 20vh;
        
        border-radius: 5px;
        margin: 0 auto 200px;

    h2{
        text-align: center;
        margin: 20px 0;
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

        img{
            border-radius: 50%;
            width: 100%;
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>