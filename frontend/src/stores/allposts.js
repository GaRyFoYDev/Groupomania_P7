import { defineStore} from 'pinia'
import { useLoginStore } from '../stores/login';
const loginStore = useLoginStore();



export const useAllPostsStore = defineStore('allposts', {
    
    state: () => {
      return {
       posts:null,
      }
    },

    actions: {
      refreshPosts(){

        fetch( 'http://localhost:5000/api/posts/all', 
        {headers: { "Authorization": `Bearer ${loginStore.token}`}})
        .then((res) => res.json())
        .then((data) => this.posts = data) 
      }

    },

    //persist: true,
  
    }); 

    