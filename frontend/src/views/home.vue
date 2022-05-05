<template>
<TheHeader />
<div class="welcome">
    <h2 v-if="welcome === true"> Bienvenue {{userStore.prenom}} </h2>
</div>

<SendPost  /> 
<AllPosts />
</template>

<script setup>

import TheHeader from "../components/Header.vue";
import SendPost from "../components/SendPost.vue";
import AllPosts from "../components/AllPosts.vue";

import{useUserStore} from '@/stores/user';
import {ref} from 'vue';

const userStore = useUserStore();

const welcome = ref('false')

userStore.getUser()

function hello(){

    let params = new URLSearchParams(document.location.search);
    let plan = params.get("plan")
   

    if(plan == "welcome"){
        welcome.value = true
        setTimeout(() => {
            welcome.value = false
        }, 5000);
        
    }

}

hello()



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