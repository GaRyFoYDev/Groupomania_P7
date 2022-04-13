<template>
<TheHeader />
<h2>Bienvenue {{user.value.prenom}} </h2>
<SendPost /> 
</template>

<script setup>
import TheHeader from "../components/Header.vue";
import SendPost from "../components/SendPost.vue";
import {reactive} from 'vue'

const API_URL = 'http://localhost:5000/api/auth/';
const userUuid = localStorage.getItem('id')
const user = reactive({})

 fetch(API_URL + userUuid)
      .then((res) => res.json())
      .then(data => user.value = data)
      .catch(err => console.log(err.message))
      



    

</script>

<style lang="scss" scoped>

h2{
    padding: 10px;
}





</style>