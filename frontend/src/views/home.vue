<template>
<TheHeader />
<h2>Bienvenue {{userStore.prenom}} </h2>
<SendPost  /> 
<AllPosts />
</template>

<script setup>

import TheHeader from "../components/Header.vue";
import SendPost from "../components/SendPost.vue";
import AllPosts from "../components/AllPosts.vue";

import{useUserStore} from '@/stores/user';
import{useLoginStore} from '@/stores/login';


const userStore = useUserStore();
const loginStore = useLoginStore();


 async function getUser() {
            
            const user = await fetch('http://localhost:5000/api/auth/' + loginStore.userUuid)
            .then((res) => res.json())
            .then((data) => userStore.$state = {
                uuid: data.uuid,
                nom: data.nom,
                prenom: data.prenom,
                role: data.role
            })  
            
      }

getUser()







</script>

<style lang="scss" scoped>

h2{
    padding: 10px;
}





</style>