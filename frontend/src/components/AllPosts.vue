<template>
<div :id="post.uuid" v-for="post in allPostsStore.posts" :key="post.uuid" class="post_container">

  <div class="post_header">
      <div class="post_header_img">
        <img v-if="post.user.image !== null" :src="post.user.image" />
        <img v-else src="../assets/images/default_profile_400x400.png"/>
        </div>
      <div class="post_header_info">
          <h4>{{post.user.nom}} {{post.user.prenom}}</h4>
          <p>Publié le {{post.createdAt}} </p>
      </div>
      <div v-if="post.user.uuid === userStore.uuid || userStore.role === 'admin'   " class="post_dropdown">
           <div  class="post_menu">
              <button @click="open = true" class="post_menu_modifier"  ><i :updateId="post.uuid" class="fa-regular fa-pen-to-square"></i></button>
              <button @click="deletePost" class="post_menu_supprimer" ><i :deleteId="post.uuid" class="fa-regular fa-trash-can"></i></button>
           </div>
         </div>
  </div>

  <div v-if="post.image" class="post_image">
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
 

<Teleport to="body">
  <div v-if="open" class="modal">
    
      <form @submit.prevent="sendPost" enctype="multipart/form-data">
          
          <input v-model="content" id="publication" type="text" placeholder="Quoi de neuf ?" @change="contentChange">
          <div id="send">
              <div id="btn-wrapper">
                  <input type="file" name="file" id="file" class="inputfile" accept=".jpg, .jpeg, .png, .gif" @change="onFileChange"/>
                  <label class="btn" for="file">Modifier l'image</label>    
              </div>
              <button v-if="url" id="delete-img" class="btn btn-primary" @click.prevent="deleteFileChange">Supprimer une image</button>
              <button class="btn btn-primary" >Actualiser !</button>
          </div>
          
      
          <p v-if="errorMessage" class="errorMessage">{{errorMessage}}</p> 
          <button @click="open = false" class="btn btn-primary">Fermer</button>
      </form>
      
  
  </div>
</Teleport>

</template>


<script setup>
import { ref } from 'vue'
import { useAllPostsStore } from '../stores/allposts';
import { useLoginStore } from '../stores/login';
import { useUserStore } from '../stores/user';


const loginStore = useLoginStore();
const allPostsStore = useAllPostsStore();
const userStore = useUserStore();
const open = ref(false)



async function getAllPosts() {

             await fetch( 'http://localhost:5000/api/posts/all', 
            {headers: { "Authorization": `Bearer ${loginStore.token}`}})
            .then((res) => res.json())
            .then((data) => allPostsStore.posts = data) 

 
      }

  getAllPosts();




async function deletePost(){
    const deleteId = event.target.getAttribute('deleteId');
    console.log(deleteId);

    await fetch('http://localhost:5000/api/posts/' + deleteId, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginStore.token} `
      },
      body: JSON.stringify({'userUuid': userStore.uuid}),
      
    })
    .then((res) => res.json());

    allPostsStore.refreshPosts()
}


async function updatePost(){
    const updateId = event.target.getAttribute('updateId');
    console.log(updateId);

    // await fetch('http://localhost:5000/api/posts/' + deleteId, {
    //   method: 'UPDATE',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${loginStore.token} `
    //   },
    //   body: JSON.stringify({'userUuid': userStore.uuid}),
      
    // })
    // .then((res) => res.json());

    // allPostsStore.refreshPosts()
}



</script>

<style lang="scss">

.post{

  &_container
    {
    width: 40%;
    display:flex;
    flex-direction:column;
    row-gap:10px;
    margin: 30px auto;
    background-color: var(--text-primary-color);
   
    border: 1px solid rgba(52, 73, 94, 0.2);
    border-radius: 10px;
    position: relative;
    
    }
   
  &_header{
    display: flex;
    align-items: center;
  
    padding: 10px;
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
 
 &_dropdown{
   position: absolute;
   right: 20px;
   top: 10px;
   font-size: 1.5rem;
   color: var(--primary-2);


   
 }
  
  &_menu{ 
      
     
    margin: 5px 0;
    font-size:0.80rem;
    position: absolute;
    right: 10px;
    top: 40px;
    display: flex;
    gap:10px;
    

        
        &_modifier{
          background-color:#8e44ad;
          color: var(--text-primary-color);
          border:none;
          border-radius:4px;
          font-weight:700;
          padding: 5px;
          cursor: pointer;

           &:hover{
             background-color:#9b59b6;
          }
        
        }
        &_supprimer{
          background-color: var(--danger-2);
          color: var(--text-primary-color);
           border:none;
          border-radius:4px;
          font-weight:700;
          padding: 5px;
          cursor: pointer;

          &:hover{
             background-color: var(--danger-1);
          }
        }
    }


   


}

.modal {
  position: fixed;
  z-index: 999;
  background-color: rgb(0, 0,0, 0.3);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  
}

</style>