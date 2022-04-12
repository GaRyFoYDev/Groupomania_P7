
<template>
 
        <div class="form-container">
            <form @submit="mySubmit">
                <div class="logo"><img src="../assets/images/icon-left-font-monochrome-white.svg" alt=""></div>
                    <h2>Inscrivez-vous</h2>
                        <input  v-model="nomValue" type="text" placeholder="Nom">
                        <p v-if="nomError" class="error">{{nomError}}</p>

                        <input v-model="prenomValue" type="text" placeholder="Prénom">
                        <p v-if="prenomError"  class="error">{{prenomError}}</p>

                        <input  v-model="emailValue" type="email" placeholder="Adresse mail">
                        <p v-if="emailError"  class="error">{{emailError}}</p>

                        <input  v-model="passwordValue" type="password" placeholder="Mot de passe">
                        <p v-if="passwordError" class="error">{{passwordError}}</p>

                    <button class="btn btn-primary" type="submit" :disabled="isSubmitting">S'inscrire</button>
                    <p id="redirect">Vous avez déja un compte ?<span><router-link to="/">Connectez-vous</router-link></span></p>

            </form>
        </div>


</template>

<script setup>

import {useForm, useField} from 'vee-validate';
import router from '../router';
import * as yup from 'yup';

const API_URL = 'http://localhost:5000/api/auth/'

const {handleSubmit, isSubmitting}= useForm();


const mySubmit = handleSubmit(async(values, {resetForm}) =>{
    try {

        
        const res = await fetch( API_URL + 'signup', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json'} 
        })
        
       
        await router.push({path: '/'});
         resetForm();
    } catch (error) {
        JSON.parse(error);
    }
})

const {value: nomValue, errorMessage: nomError} = useField('nom',
     yup.string().required('Ce champ est obligatoire')
     .matches(/^[a-zA-Z.-éèàäêîïë]{3,}$/, 
     {message:'Votre nom ne doit comporter au moins 3 caractères et contenir uniquement des lettres séparés par des espaces si nécéssaires.'}));

const {value: prenomValue,  errorMessage: prenomError} = useField('prenom', 
     yup.string()
     .required('Ce champ est obligatoire') 
     .matches(/^[a-zA-Z.-éèàäêîïë]{3,}$/, 
     {message:'Votre prénom ne doit comporter au moins 3 caractères et contenir uniquement des lettres séparés par des espaces si nécéssaires.'}));

 const {value: emailValue, errorMessage: emailError} = useField('email',
    yup.string()
    .required('Ce champ est obligatoire')
    .email('Veuillez entrer une adresse e-mail valide'));

const {value: passwordValue, errorMessage: passwordError} = useField('password', 
    yup.string()
    .required('Ce champ est obligatoire')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/, 
    {message:'Votre mot de passe doit comporter entre 8 et 30 caractères et contenir une majuscule, un symbole et un chiffre.'}));











</script>


<style lang="scss" scoped>

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
                font-size: 14px;
                padding:10px;
                margin: 0;
               
            }

           

           
    }
}




</style>