import { defineStore} from 'pinia';
import { useLoginStore } from '../stores/login';
const loginStore = useLoginStore();

export const useUserStore = defineStore('user', {
    
    state: () => {
      return {
        uuid: null,
        nom: null,
        prenom:null,
        role: null,
        image: null,
        users: null
       
      }
    },

    actions: {
      getUser(){

        fetch('https://groupomania-p7-oc.herokuapp.com/api/auth/' + loginStore.userUuid, {headers: {"Authorization": `Bearer ${loginStore.token}`}})
        .then((res) => res.json())
        .then((data) => this.$state = {
            uuid: data.uuid,
            nom: data.nom,
            prenom: data.prenom,
            role: data.role,
            image: data.image
        })  
      },

      getAll(){
        fetch('https://groupomania-p7-oc.herokuapp.com/api/auth/users', {headers: {"Authorization": `Bearer ${loginStore.token}`}})
        .then((res) => res.json())
        .then((data) => this.$state = {users: data})

      }

    },

     persist: true,
  
    }); 