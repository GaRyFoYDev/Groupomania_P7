
<template>
 
        <div class="form-container">
            <form @submit.prevent="mySubmit" >
                <div class="logo"><img src="../assets/images/icon-left-font-monochrome-white.svg" alt=""></div>
                <h2>Connectez-vous</h2>
                <input  v-model="emailValue" type="email" placeholder="Adresse mail">
                <input v-model="passwordValue" type="password" placeholder="Mot de passe">
                <p class="error" v-if="errorMessage">{{errorMessage}}</p>
                <button class="btn btn-primary" type="submit">Se connecter</button>
                <p >Vous avez déja un compte ?<span><router-link to="/register">Inscrivez-vous</router-link></span></p>
            </form>
        
        </div>

  
</template>

<script setup>

import {useForm, useField} from 'vee-validate';
import router from '../router';
import {ref} from 'vue';
import {useLoginStore} from '@/stores/login';


const loginStore = useLoginStore();


const API_URL = 'http://localhost:5000/api/auth/';


const {handleSubmit}= useForm()
const errorMessage = ref('')

// Login avec vee-validate
const mySubmit = handleSubmit(async(data, {resetForm}) =>{
 
    try {
        const res = await fetch( API_URL + 'login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        }).then(res => res.json())
        
        if(res.userUuid && res.token){
            
         loginStore.$state = {
             userUuid : res.userUuid,
             token : res.token, 
             isLogged : true 
             };

         
          await router.push({path: '/home', query: {plan: 'welcome'}});
          resetForm();
        
           
        
          
        } else {

          errorMessage.value = res.error

          setTimeout(() => {
             errorMessage.value = null 
          }, 3500);
        
        }
       
    } catch (error) {
        console.log(error);
    }
})

const {value: emailValue} = useField('email')
const {value: passwordValue} = useField('password');







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
        min-height: 50vh;
        border-radius: 20px;
        color: var(--text-primary-color);
        padding: 10px;
        
        @media screen and (max-width: 600px){
            min-height: 50vh;
            width: 85%;
            padding: 20px

           
        }

        #logo{
           display: flex;
           justify-content: center;

           img{
            @media screen and (max-width: 600px){
            max-width: 70%;
            
           
        }}
        }
        

            div,h2,input{
                margin-bottom: 20px;
            }

            button{
                padding: 12px;
                width: 30%;
                font-size: 1rem;
                margin-top: 15px;

                 @media screen and (max-width: 600px){
                 min-width: 50%;}

            }

            input{
               border-radius: var(--border-radius);
               border: none;
               padding: 8px;
               width: 40%;

               &::placeholder{
                   font-size: 0.9rem;
               }

                 @media screen and (max-width: 600px){
                 min-width: 50%;}


               
            }

            p{
                
                margin-top: 50px;
                 a{
                margin-left: 10px;
                color: var(--primary-1);
                &:hover{
                    color: var(--primary-2)
                }
            
            }
                @media screen and (max-width: 600px){
                 text-align: center;
                  
                 
                 }

            }
            .error{
                width: 50%;
                font-size: 0.875rem;
                text-align: center;
                margin: 0;
                padding-bottom: 20px;
              
            }

  
    }
}




</style>