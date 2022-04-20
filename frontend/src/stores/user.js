import { defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
    
    state: () => {
      return {
        uuid: null,
        nom: null,
        prenom:null,
        role: null
       
      }
    },

     persist: true,
  
    }); 