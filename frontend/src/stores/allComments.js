import { defineStore} from 'pinia'
import { useLoginStore } from '../stores/login';
const loginStore = useLoginStore();



export const useAllCommentsStore = defineStore('allcomments', {
    
    state: () => {
      return {
       comments:null,
      }
    },

    actions: {
      refreshComments(){

        fetch( 'https://groupomania-p7-oc.herokuapp.com/api/comments/all', 
        {headers: { "Authorization": `Bearer ${loginStore.token}`}})
        .then((res) => res.json())
        .then((data) => this.comments = data) 
      }

    },

    //persist: true,
  
    }); 

    