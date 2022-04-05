<script setup>

</script>

<template>
 
        <div class="form-container">
            <form >
                <div class="logo"><img src="" alt=""></div>
                <h2>Se connecter à Groupomania</h2>
                <input  type="email" placeholder="Adresse mail">
                <input  type="password" placeholder="Mot de passe">
                <button type="submit">Connexion</button>
            </form>
        </div>

  
</template>

<style lang="scss">

.form-container{
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;


    form{
        background-color: var(--text-primary-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40%;
        height: 40vh;
        border-radius: 10px;

            div,h2,input{
                margin-bottom: 10px;
            }
    }
}




</style>