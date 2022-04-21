<template>
<div v-for="post in allPostsStore.posts" class="post_container">

  <div class="post_header">
      <div class="post_header_img"><img src="https://media.vanityfair.fr/photos/60d36b2e9ae7c95386a6d961/1:1/w_718,h_718,c_limit/compl__tement_nu__francky_vincent_nous_offre_le_pire_statut_facebook_de_la_semaine_8250.jpeg"/></div>
      <div class="post_header_info">
          <h4>Francky Vincent</h4>
          <p>Publié le {{post.createdAt}} </p>
      </div>
  </div>

  <div class="post_image">
      <img :src="post.image" alt="" >
  </div>

  <div class="post_body">
      <p>{{post.body}}</p>
  </div>

  <div class="post_likes">
      <div class="post_likes_up">
          <i class="fa-solid fa-thumbs-up"></i>
          <p>0</p>
      </div>
      <div class="post_likes_down">
          <i class="fa-solid fa-thumbs-down"></i>
          <p>0</p>
      </div>
      
    </div>
  <div class="post_comments"></div>

</div>
 
   

</template>


<script setup>
import { useAllPostsStore } from '../stores/allposts';
import { useLoginStore } from '../stores/login';

const loginStore = useLoginStore();
const allPostsStore = useAllPostsStore();


async function getAllPosts() {

            const posts =await fetch('http://localhost:5000/api/posts/all', 
            {headers: { "Authorization": `Bearer ${loginStore.token}`}})
            .then((res) => res.json())
            .then((data) => allPostsStore.posts = data) 

            return posts      
      }

  getAllPosts()

console.log(allPostsStore.posts);




</script>

<style lang="scss">

.post{

  &_container
    {
    width: 50%;
    display:flex;
    flex-direction:column;
    row-gap:10px;
    margin: 30px auto;
    background-color: var(--text-primary-color);
   
    border: 1px solid rgba(52, 73, 94, 0.2);
    border-radius: 10px;
    
    }
   
  &_header{
    display: flex;
    align-items: center;
  
    
   // background-color: blue;
    overflow: hidden;
    

    &_img{
     width: 15%;
    
    
    
    

      img{
      
      width: 80%;
      margin: 10px 10px 0 10px;
      border-radius: 50%;
     
      }

    }

    &_info{
     margin-left: 20px;

      h4{
        color: var(--primary-2);
        margin-bottom: 5px;
      }

      p{
        font-style: italic;
        font-size: 0.875rem;
      }

    }





  }

  &_image{

    height: 40vh;
    
    img
    {
      width: 100%;
      height: 100%;
     object-fit: center-cover;

      }
  }

  &_body{
    padding: 5px 10px;
     
  }

  &_likes{
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: rgba(34, 109, 159, 0.2);
    border-top: 1px solid rgba(34, 109, 159, 0.4);
    border-bottom: 1px solid rgba(34, 109, 159, 0.4);
    
   

    &_up, &_down{
      display: flex;
      gap:10px;
      
        i{
          color: rgba(52, 73, 94, 0.5);

          &:active {
            color:  rgba(52, 73, 94, 1) ;
          }
        }
      

     
    }
    
  }
 

}



</style>