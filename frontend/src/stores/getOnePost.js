import { defineStore} from 'pinia'

export const useGetOnePostStore = defineStore('onePost', {
    
    state: () => {
      return {
       body: null,
       image: null,
      }
    },

    //persist: true,
  
    }); 

    