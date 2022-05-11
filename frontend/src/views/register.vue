
<template>
        <Transition name="toast">
            <Toast v-if="showNotif" />
        </Transition>
        <div class="form-container">
           
            <form @submit="mySubmit">
                <div class="logo"><img src="../assets/images/icon-left-font-monochrome-white.svg" alt=""></div>
                    <h2>Inscrivez-vous</h2>
                        <input  @blur="handlePrenom" v-model="prenomValue" type="text" placeholder="Prénom">
                        <p v-if="prenomError"  class="error">{{prenomError}}</p>

                        <input  @blur="handleNom"  v-model="nomValue" type="text" placeholder="Nom">
                        <p v-if="nomError" class="error">{{nomError}}</p>

                        <input @blur="handleEmail"  v-model="emailValue" type="email" placeholder="Adresse mail">
                        <p v-if="emailError"  class="error">{{emailError}}</p>

                        <input @blur="handlePassword" v-model="passwordValue" type="password" placeholder="Mot de passe">
                        <p v-if="passwordError" class="error">{{passwordError}}</p>

                      <div v-if="errorMail">{{errorMail}}</div>
                    <button class="btn btn-primary" type="submit" :disabled="isSubmitting">S'inscrire</button>
                    <p id="redirect">Vous avez déja un compte ?<span><router-link to="/">Connectez-vous</router-link></span></p>
            </form>
        </div>


</template>

<script setup>

import {useForm, useField} from 'vee-validate';
import {ref} from 'vue';
import Toast from '../components/Toast.vue';

import router from '../router';
import * as yup from 'yup';

const errorMail = ref('')
const showNotif = ref(false)

const {handleSubmit, isSubmitting}= useForm();


const mySubmit = handleSubmit(async(values, {resetForm}) =>{
  

        await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json'} 
        })
        .then(async(res) => {

            if(res.ok){
                
        
                showNotif.value = true;
                setTimeout(() => {showNotif.value =  false},2500)
                setTimeout(() => {router.push('/')},3500)
                
                resetForm()

                
                return res.json() 
              
            }
            else if(!res.ok && res.status == 409){
                errorMail.value = "L'email est déja utilisé";

                setTimeout(() => {errorMail.value = null}, 4000);
            }
            else{
                throw error
            }



            
        })
        .catch((err) => console.log(err))
       
    
})

const {value: nomValue, errorMessage: nomError, handleChange: handleNom} = useField('nom',
     yup.string()
     .required('Ce champ est obligatoire')
     .matches(/^[a-zA-Z-éèàäêîïë]{3,}$/, 
     {message:'Votre nom ne doit comporter au moins 3 caractères et contenir uniquement des lettres séparés par des espaces si nécéssaires.'}), {validateOnValueUpdate: false});

const {value: prenomValue,  errorMessage: prenomError, handleChange: handlePrenom} = useField('prenom', 
     yup.string()
     .required('Ce champ est obligatoire') 
     .matches(/^[a-zA-Z-éèàäêîïë]{3,}$/, 
     {message:'Votre prénom ne doit comporter au moins 3 caractères et contenir uniquement des lettres séparés par des espaces si nécéssaires.'}), {validateOnValueUpdate: false});

 const {value: emailValue, errorMessage: emailError, handleChange: handleEmail} = useField('email',
    yup.string()
    .required('Ce champ est obligatoire')
    .email('Veuillez entrer une adresse e-mail valide'), {validateOnValueUpdate: false} );

const {value: passwordValue, errorMessage: passwordError, handleChange: handlePassword} = useField('password', 
    yup.string()
    .required('Ce champ est obligatoire')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/, 
    {message:'Votre mot de passe doit comporter entre 8 et 30 caractères et contenir une majuscule, un symbole et un chiffre.'}), {validateOnValueUpdate: false});











</script>


<style lang="scss" scoped>
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


.form-container{
position:absolute;
left: 0;
right: 0;
bottom:0;
top:0;
display: flex;
align-items: center;
justify-content: center;


    form{
        background-color: var(--danger-2);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 30%;
        min-height: 70vh;
        border-radius: 20px;
        color: var(--text-primary-color);
        padding: 10px;
        
        @media screen and (max-width: 768px){
            min-height: 80vh;
            width: 85%;
            padding: 20px;

           
        }

        #logo{
           display: flex;
           justify-content: center;

           img{
            @media screen and (max-width: 768px){
            max-width: 70%;
            
           
        }}
        }
        

            div,h2,input{
                margin: 10px 0;
            }

            button{
                padding: 12px;
                width: 25%;
                font-size: 1rem;
                margin-top: 15px;

                 @media screen and (max-width: 768px){
                 min-width: 50%;}

            }

            input{
               border-radius: var(--border-radius);
               border: none;
               padding: 12px;
               width: 50%;

               &::placeholder{
                   font-size: 0.9rem;
               }

                 @media screen and (max-width: 768px){
                 min-width: 70%;}


               
            }

            #redirect{
                
                margin-top: 50px;
                 a{
                margin-left: 10px;
                color: var(--primary-1);
                &:hover{
                    color: var(--primary-2)
                }
            
            }
                @media screen and (max-width: 768px){
                 text-align: center;
                  
                 
                 }

            }

            .error{
                width: 50%;
                font-size: 0.875rem;
                padding:10px;
                margin: 0;
               
            }

           

           
    }
}




</style>