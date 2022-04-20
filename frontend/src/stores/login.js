import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    
    state: () => {
      return {
      
        userUuid:null,
        token:null,
        isLogged: false,
      }
    },

    persist: true,
  
    }); 
