<template>
<TheHeader />
    <Transition name="toast">
        <ToastInfo v-if="welcome"  :notifyText=" 'Bienvenue ' + userStore.prenom" @close-notif="close" />       
    </Transition>
<SendPost  /> 
<AllPosts />
</template>

<script setup>

import TheHeader from "../components/Header.vue";
import SendPost from "../components/SendPost.vue";
import AllPosts from "../components/AllPosts.vue";

import{useUserStore} from '@/stores/user';
import {ref} from 'vue';

import ToastInfo from "../components/ToastInfo.vue";

const userStore = useUserStore();

const welcome = ref(false);

const close = () => {welcome.value = false};


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