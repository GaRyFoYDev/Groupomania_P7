import { defineStore} from 'pinia'

export const useUpdatePostStore = defineStore('updatePost', {
    
    state: () => {
      return {
       body: null,
       image: null,
      }
    },

    //persist: true,
  
    }); 

    