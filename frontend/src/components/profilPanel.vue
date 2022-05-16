<template >
<Transition name="toast">
    <Toast v-if="successUpdatePassword"  notifyText="Votre mot de passe a bien été modifié !" @close-notif="closeSuccessPassword" />
</Transition>
<Transition name="toast">
    <Toast v-if="successDeleteAccount"  notifyText="Votre compte a été supprimé avec succès !" @close-notif="closeDeleteAccount"/>
</Transition>
<Transition name="toast">
    <ToastError v-if="failedUpdatePassword"  notifyText="Mot de passe erroné !"  @close-notif="closeUpdatePassword"/>
</Transition>
<div class="profil_container">
    <h2 class="profil_name">{{userStore.prenom}} {{userStore.nom}}</h2>
    <hr>
    <div class="profil_info">
            <div class="profil_info_photo" >
                <div class="profil_info_image">
                     <img v-if="userStore.image !== null" :src="userStore.image" />
                     <img v-else src="../assets/images/default_profile_400x400.png"/>
                    </div>
               <div>
                   
                        <input type="file" name="file" id="file" class="inputfile" accept=".jpg, .jpeg, .png, .gif" @change="updateProfilImage"/>
                        <label class="btn" for="file">Changer ma photo de profil</label>    
                      
               </div>
            </div>

        
    </div>
     <hr>
    <div class="profil_modify">
        <div class="profil_modify_password">
              <h4>Modifier mon mot de passe</h4>
              
            <form @submit.prevent="updatePassword">

              <label for="">Mot de passe actuel</label>
               <input @blur="handleCurrentPassword" v-model="currentValue" type="password">
               <p v-if="currentPasswordError" class="error">{{currentPasswordError}}</p>

              <label for="">Nouveau mot de passe</label>
               <input @blur="handleNewPassword" v-model="newValue" type="password">
               <p v-if="newPasswordError" class="error">{{newPasswordError}}</p>

              <button class="btn btn-primary">Modifier</button>

            </form>
        </div>
       <div class="profil_delete">
           <button class="delete btn" @click="show = !show">Supprimer mon compte</button>
            <Transition>
                <div v-if="show" class="profil_delete_check">
                    <p>Êtes-vous sûr de bien vouloir supprimer votre compte ?</p>
                    <div  class="profil_delete_check_btn">
                        <button @click="deleteAccount" class="btn delete ">Oui</button>
                        <button @click="show =false" class="btn btn-primary" >Non</button>

                    </div>
                </div>

            </Transition>        
      
       </div>
      
    </div>
</div>

</template>


<script setup>
import {ref} from 'vue';
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import{useUserStore} from '@/stores/user';
import{useLoginStore} from '@/stores/login';
import { useUpdateProfilStore } from '../stores/updateProfil';
import router from '../router';
import Toast from './Toast.vue';
import ToastError from './ToastError.vue';

const userStore = useUserStore();
const loginStore = useLoginStore();
const updateProfilStore = useUpdateProfilStore();
const file = ref('');
const id = userStore.uuid
const show = ref(false)
const successUpdatePassword = ref(false);
const failedUpdatePassword = ref(false);
const successDeleteAccount = ref(false);
const closeSuccessPassword = () => {successUpdatePassword .value = false};
const closeUpdatePassword = () => {failedUpdatePassword.value = false};

const closeDeleteAccount = () => { 
    successDeleteAccount.value = false
    loginStore.$reset();
    userStore.$reset();
    router.push('/')
    }

//Mis à jour de l'image de profil
async function updateProfilImage() {

    file.value = document.getElementById('file').files[0];
    updateProfilStore.$state = {image: file}
    

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${loginStore.token} `);

    let formdata = new FormData();    
    formdata.append("image",  updateProfilStore.image);
    formdata.append("userUuid", loginStore.userUuid);

    await fetch(`http://localhost:5000/api/auth/photo/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: formdata
    })
    .then((res) => res.json())

    await userStore.getUser();
    await userStore.getAll();
}

const {handleSubmit}= useForm();


// Mis à jour du mot de passe
const updatePassword = handleSubmit(async(values, {resetForm}) => {

    await fetch(`http://localhost:5000/api/auth/password/${id}`, {

        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            "Authorization": `Bearer ${loginStore.token} `,
            "Content-Type": "application/json"
        }
    })
    .then((res) => {
        
        if(res.ok){

           successUpdatePassword.value = true;
           setTimeout(() => {successUpdatePassword.value =  false},3000)
        }else if (!res.ok && res.status == 401){
            failedUpdatePassword.value = true;
            setTimeout(() => {failedUpdatePassword.value =  false},3000)
        }
        
        return res.json()})
    .catch((err) => console.log(err.message))

    resetForm();

})

const {value: newValue, errorMessage: newPasswordError, handleChange: handleNewPassword} = useField('newPassword', 
    yup.string()
    .required('Ce champ est obligatoire')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/, 
    {message:'Votre mot de passe doit comporter entre 8 et 30 caractères et contenir une majuscule, un symbole et un chiffre.'}), {validateOnValueUpdate: false});

const {value: currentValue, errorMessage: currentPasswordError, handleChange: handleCurrentPassword} = useField('currentPassword', 
    yup.string()
    .required('Ce champ est obligatoire'),{validateOnValueUpdate: false});



// Suppresion d'un compte
async function deleteAccount(){

    await fetch(`http://localhost:5000/api/auth/${id}`, {
       
       method: 'DELETE',
       headers: {
            "Authorization": `Bearer ${loginStore.token} `,
            "Content-Type": "application/json"
        }
    })
    .then(async(res) => {
        if(res.ok){
            successDeleteAccount.value = true;
            setTimeout(() => {successDeleteAccount.value =  false},2500)
            setTimeout(() => {router.push('/')},3500)
            await loginStore.$reset();
            userStore.$reset();
        }

    })
  
}

</script>

<style lang="scss" scoped>
form{
    
   
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

h4{
    color: var(--primary-2)
}
.profil{
    
    &_name{
        text-align: center;
        padding: 10px;
    }


    &_container{
        display: flex;
        flex-direction: column;
        background-color: var(--text-primary-color);
     
        margin: 10px auto;
        padding: 20px;
        border: 1px solid var(--gray-2);
        border-radius: 4px;
        max-width: 70%;

          @media screen and (max-width: 320px) {
          max-width: 95%;
    }
         
        
        hr{
            width: 80%;
            height: 2px;
            border: none;
            background-color: var(--gray-2);
        }

        h2{
            color: var(--primary-2);

            @media screen and (max-width: 320px) {
                 
                 font-size: 1.2rem ;
         
    }
        }
        
    }

    &_info{
        display: flex;
        justify-content: center;

       

        &_photo{
            text-align: center; 
        }

        &_image{
                

            img{
               border-radius: 50%;
               height: 200px;
               width: 200px;
               object-fit: center-cover;
               @media screen and (max-width: 320px) {
                height: 100px;
               width: 100px;
    }
               @media screen and (max-width: 768px) {
                height: 150px;
               width: 150px;
    }
           }
        }
    }

    &_modify{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width:100%;
        padding: 20px;
        margin-top: 10px;


          @media screen and (max-width: 768px) {
         flex-direction: column;
         padding: 0;
         
    }
         

        &_password{
            width: 50%;
            text-align: center;
            display: flex;
            align-items: center;
            flex-direction: column;

             @media screen and (max-width: 768px) {
             margin-bottom: 20px;
    }
             @media screen and (max-width: 320px) {
             margin-bottom: 20px;
              width: 100%;
    }

            h4{
                margin-bottom: 20px;
                text-transform: uppercase;
                font-size: 1rem;

                 @media screen and (max-width: 320px) {
                 width: 100%;  
                 padding: 0;
                 font-size: 0.8rem ;
         
    }
                
            }

            label{
                font-size: 0.825rem;
                margin-bottom: 10px;

            }

             input{
         padding:  5px;
         border-radius: 4px;
         border: 1px solid  rgba(52, 73, 94, 0.5);
         margin-bottom: 10px;

        
        
       }

       



        }
    }

    &_delete{
        width: 50%;
        display: flex;
        align-items: center;
        flex-direction: column;

        &_check{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 15px;

            p{
                font-size: 0.875rem;
            }

           button{
               margin:10px;
               padding:10px;

             @media screen and (max-width: 320px) {
                 width: 100%;  
                
         
    }   

           }
        }
    }
}

.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
   
}
    .inputfile + label {
    color: var(--text-primary-color);
    background-color: var(--primary-2);
    display: inline-block;
    cursor: pointer;
     font-size: 0.9rem;
      margin-top: 10px;
}

.inputfile:focus + label,
.inputfile + label:hover {
     background-color: var(--primary-1);
}


    .error{
        font-size: 0.8rem;
        color: var(--danger-2);
        max-width: 70%;
        margin: 10px 0;
        text-align: center;
    }


.delete{
      
     
      padding: 10px;
      background-color: var(--danger-2);
      color: var(--text-primary-color);
    &:hover {
      background-color: var(--danger-1);
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