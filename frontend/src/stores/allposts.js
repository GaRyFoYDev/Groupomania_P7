import { defineStore} from 'pinia'
import { useLoginStore } from './login';
const loginStore = useLoginStore();

export const useAllPostsStore = defineStore('allposts', {
    
    state: () => {
      return {
       posts:null,
       
      }
    },

    persist: true,
  
    }); 

    