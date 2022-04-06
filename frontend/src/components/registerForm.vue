
<template>
 
        <div class="form-container">
            <form >
                <div class="logo"><img src="../assets/images/icon-left-font-monochrome-white.svg" alt=""></div>
                <h2>Inscrivez-vous</h2>
                <input  type="text" placeholder="Nom">
                <input  type="text" placeholder="Prénom">
                <input  type="email" placeholder="Adresse mail">
                <input  type="password" placeholder="Mot de passe">
                <button class="btn btn-primary" type="submit">S'inscrire</button>
                <p>Vous avez déja un compte ?<span><a href="">Connectez-vous</a></span></p>
            </form>
        </div>

  
</template>

<script setup>















</script>


<style lang="scss">

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
        
        @media screen and (max-width: 600px){
            min-height: 80vh;
            width: 85%;

           
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
                width: 25%;
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
                 min-width: 70%;}


               
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
           
    }
}




</style>