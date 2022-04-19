import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        // all these properties will have their type inferred automatically
        userUuid:null,
        token:null,
        isLogged: false,
      }
    },

    persist: true,
  
    }); 
