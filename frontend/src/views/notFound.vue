<template>
<div class="container">
<div><img src="../assets/images/icon-left-font-monochrome-black.svg" alt=""></div>
<h1> Oups, voilà qui n'était pas prévu</h1>
<h3>Erreur 404</h3>
<p>Désolé cette page est introuvable, dirigez vous vers la page d'accueil ou contacter-nous en cas de questions.</p>
<button class="btn btn-primary"><router-link to="/">Retour à la page d'accueil</router-link></button>

</div>

</template>


<style>
 .container{
     display: flex;
     flex-direction: column;
     align-items: center;
     gap: 20px;
     justify-content: flex;
     margin: 25% 0;
 }

a{
    color:white;
}

</style>