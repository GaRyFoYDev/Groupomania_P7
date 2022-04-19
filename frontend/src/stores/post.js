import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
    
    state: () => {
      return {
        body:null,
        image:null,
      }
    },

   persist : true
  
    }); 
