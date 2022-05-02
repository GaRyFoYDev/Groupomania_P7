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

        fetch( 'http://localhost:5000/api/comments/all', 
        {headers: { "Authorization": `Bearer ${loginStore.token}`}})
        .then((res) => res.json())
        .then((data) => this.comments = data) 
      }

    },

    //persist: true,
  
    }); 

    