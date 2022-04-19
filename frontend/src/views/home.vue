<template>
<TheHeader />
<h2>Bienvenue {{currentUser.prenom}} </h2>
<SendPost /> 
</template>

<script setup>
import TheHeader from "../components/Header.vue";
import SendPost from "../components/SendPost.vue";
import {useLoginStore} from "@/stores/login";
import {ref} from 'vue'

const store =useLoginStore();

const API_URL = 'http://localhost:5000/api/auth/';
const userUuid = store.userUuid;
const currentUser = ref('')

 fetch(API_URL + userUuid)
      .then((res) => res.json())
      .then(data => currentUser.value = data)
      .catch(err => console.log(err.message))

console.log(currentUser.value)

    

</script>

<style lang="scss" scoped>

h2{
    padding: 10px;
}





</style>