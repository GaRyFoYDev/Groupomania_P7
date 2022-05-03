<template>
<TheHeader />
<div class="welcome">
    <h2 v-if="welcome"> Bienvenue {{userStore.prenom}} </h2>
</div>

<SendPost  /> 
<AllPosts />
</template>

<script setup>

import TheHeader from "../components/Header.vue";
import SendPost from "../components/SendPost.vue";
import AllPosts from "../components/AllPosts.vue";

import{useUserStore} from '@/stores/user';
import{useLoginStore} from '@/stores/login';
import {ref} from 'vue';

const userStore = useUserStore();
const loginStore = useLoginStore();
const welcome = ref('true')


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

setTimeout(() => {
    welcome.value = false
}, 5000);





</script>

<style lang="scss" scoped>

.welcome{
        display: flex;
        justify-content: center;
     
h2{
    padding: 10px;
}
}






</style>