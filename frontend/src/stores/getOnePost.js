import { defineStore} from 'pinia'

export const useGetOnePostStore = defineStore('onePost', {
    
    state: () => {
      return {
       body: null,
       image: null,
       likes: null
      }
    },

    //persist: true,
  
    }); 

    