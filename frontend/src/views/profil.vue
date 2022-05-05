<template>
<TheHeader />
<profilPanel />

</template>

<script setup>

import TheHeader from "../components/Header.vue";
import profilPanel from "../components/profilPanel.vue";


import{useUserStore} from '@/stores/user';
import{useLoginStore} from '@/stores/login';
//import {ref} from 'vue';

const userStore = useUserStore();
const loginStore = useLoginStore();











</script>

<style lang="scss" scoped>




</style>