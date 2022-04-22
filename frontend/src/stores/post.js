import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
    
    state: () => {
      return {
        body:"",
        image:null,
      }
    },

//  persist : true
  
    }); 
