<template>
<Transition name="toast">
    <ToastInfo v-if="showToast"  :notifyText="publication" @close-notif="closeToast"/>
</Transition>

<div :id="post.uuid" v-for="post in allPostsStore.posts" :key="post.uuid" class="post_container">

  <div class="post_header">
      <div class="post_header_img">
        <img v-if="post.user.image !== null" :src="post.user.image" />
        <img v-else src="../assets/images/default_profile_400x400.png"/>
        </div>
      <div class="post_header_info">
          <h4>{{post.user.prenom}} {{post.user.nom}} </h4>
          <p>Publié le {{post.createdAt}} </p>
      </div>
      <div v-if="post.user.uuid === userStore.uuid || userStore.role === 'admin'" class="post_dropdown">
           <div  class="post_menu">
              <button  v-if="post.user.uuid === userStore.uuid" @click="id = post.uuid; open();" class="post_menu_modifier"  ><i  class="fa-regular fa-pen-to-square"></i></button>
              <button @click="id = post.uuid; deletePost();" class="post_menu_supprimer" ><i class="fa-regular fa-trash-can"></i></button>
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
      <div class="post_likes_up"  >
        <button @click="changeColor"> <i class="fa-solid fa-thumbs-up" @click="id = post.uuid; like();" ></i></button> 
        
          <p>{{post.likes}}</p>
      </div>  
    </div>
  <div class="post_comments">
      <h4>Commentaires</h4>
      <div v-for="comment in allCommentsStore.comments" class="post_comments_get"  :key="comment.uuid" >
         <div v-if="comment.post.uuid === post.uuid"  :commentId="comment.uuid" class="post_comments_get_container" >
                <div class="post_comments_get_image">
                    <img v-if="comment.user.image !== null" :src="comment.user.image" />
                    <img v-else src="../assets/images/default_profile_400x400.png"/>
                </div>
           <div class="post_comments_get_message">
                <div class="post_comments_get_header">
                  <h4>{{comment.username}}</h4>
                  <p> le {{comment.createdAt}}</p>   
                </div>
                <div class="post_comments_get_body">
                    <p>{{comment.body}}</p>
                </div>
           </div>
            <div v-if="comment.user.uuid === userStore.uuid || userStore.role === 'admin' " class="post_comments_get_btn" >
           <div>
              <!-- <button  v-if="comment.user.uuid === userStore.uuid" @click="" class="post_comments_modifier"  ><i  class="fa-regular fa-pen-to-square"></i></button> -->
              <button @click="commentId = comment.uuid; deleteComment();" class="post_comments_get_btn_supprimer" ><i class="fa-regular fa-trash-can"></i></button>
           </div>
         </div>
         </div> 
      </div>
      <div class="post_comments_send">
           <input v-model="commentBody" id="comment" type="text" placeholder="Votre commentaire">
          <button @click="id = post.uuid; sendComment();"><i class="fa-solid fa-circle-plus"></i></button>
          
      </div>
    <div class="errorComment"><p >{{errorComment}}</p></div>  
  </div>

</div>

 

<Teleport to="body">
  <div v-if="openModal" class="modal">
    
      <form @submit.prevent="updateBody; updateImg;updatePost();" enctype="multipart/form-data">
          
          <div v-if="updateImage" class="modal_image" ><img :src="updateImage" ></div>
          <input v-model="updateContent" id="publication" type="text" @change="updateBody">
          <p v-if="errorUpdate" class="errorMessage">{{errorUpdate}}</p> 
          <div id="send">
              <div id="btn-wrapper">
                  <input type="file" id="updateImg" class="inputfile" accept=".jpg, .jpeg, .png, .gif" @change="updateImg"/>
                  <label class="btn" for="updateImg">Modifier image</label>    
              </div>
             
              <button class="btn btn-primary" >Actualiser !</button>
          </div>
         
         <button  @click="openModal = false" class="btn modal_button_close">Fermer</button>
      </form>
      
  
  </div>
</Teleport>

</template>


<script setup>
import { ref } from 'vue'

import { useAllPostsStore } from '../stores/allPosts';
import { useLoginStore } from '../stores/login';
import { useUserStore } from '../stores/user';
import { useGetOnePostStore } from '../stores/getOnePost';
import {useUpdatePostStore} from '../stores/updatePost';
import {useAllCommentsStore}from '../stores/allComments'
import ToastInfo from './ToastInfo.vue'


const loginStore = useLoginStore();
const allPostsStore = useAllPostsStore();
const allCommentsStore = useAllCommentsStore();
const userStore = useUserStore();
const getOnePost = useGetOnePostStore();
const updatePostStore = useUpdatePostStore();

const openModal = ref(false)
const id = ref('')
const commentId = ref('')
const updateContent = ref('')
const updateImage = ref('')
const imgFile =ref('')
const errorUpdate = ref('')
const errorComment = ref('')
const likeData = ref(false)
const commentBody = ref('')
const showToast = ref(false)
const publication = ref('')

const closeToast = () => showToast.value = false;


 allPostsStore.refreshPosts();
 allCommentsStore.refreshComments();


// Suppression d'un post
async function deletePost(){
   
    await fetch(`https://groupomania-p7-oc.herokuapp.com/api/posts/${id.value}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginStore.token} `
      },
      body: JSON.stringify({'userUuid': userStore.uuid}),
      
    })
    .then((res) => {

      if(res.ok){
        publication.value = 'Publication supprimée '
        showToast.value = true
        setTimeout(() => {showToast.value = false }, 3500);

      }

      return res.json();
    }) 

  await allPostsStore.refreshPosts()
}

// Ouverture de la modal du modification d'un post et récupération des données du post dans le store
async function open() {

    await fetch(`https://groupomania-p7-oc.herokuapp.com/api/posts/${id.value}`, 
        {headers: { "Authorization": `Bearer ${loginStore.token}`}})
        .then((res) => res.json())
        .then((data) => {getOnePost.$state = { body: data.body, image: data.image} })

   
    updateContent.value = getOnePost.body
    updateImage.value = getOnePost.image
    updatePostStore.$state = {body: getOnePost.body}
    updatePostStore.$state = {image: getOnePost.image}
    openModal.value = true;
    
    
}

const updateImg = (e) => {
    
    imgFile.value =  e.target.files[0];
    console.log(imgFile.value);
    updateImage.value = URL.createObjectURL(imgFile.value);
    updatePostStore.$state = { image: imgFile.value}
    //   if(updatePostStore.image == null){
    //    updatePostStore.$state = {body: getOnePost.image}
    // }

    
   
}

const updateBody= async() => {
  updatePostStore.$state = { body: updateContent.value};
  console.log(updatePostStore.body);
    if(updatePostStore.body == null || ''){
       updatePostStore.$state = {body: getOnePost.body}
    }
    
}


// Modification d'un post
async function updatePost() {

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${loginStore.token} `);

    let formdata = new FormData();    
    formdata.append("image", updatePostStore.image);
    formdata.append("userUuid", userStore.uuid);
    formdata.append("body", updatePostStore.body);

   


    const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: formdata,
    
    };
    
    if(updateContent.value === ''  ){

            errorUpdate.value = "Votre publication est vide";

             setTimeout(() => {
             errorUpdate.value = null 
          }, 3000);
        
        
    }else{

        await fetch(`https://groupomania-p7-oc.herokuapp.com/api/posts/${id.value}`, requestOptions)
            .then(res => {
               if(res.ok){
                  publication.value = 'Publication modifiée'
                  showToast.value = true
                  setTimeout(() => {showToast.value = false }, 3500);

                    }
          
              return res.json()})
            .catch(err => console.log('error', err));

            
          allPostsStore.refreshPosts()
            openModal.value = false;
    }

       
}


// Like d'un post
async function like() {
  

    await fetch(`https://groupomania-p7-oc.herokuapp.com/api/posts/like/${id.value}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginStore.token} `
      },
      body: JSON.stringify({'userUuid': userStore.uuid}),
      
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.postUpdatelike){
          likeData.value = true
        }else if(data.postUpdateDislike){
          likeData.value = false
        }else{
          likeData.value = false
        }

    });

    
    allPostsStore.refreshPosts()
     
}

 function changeColor(e){
    let target = e.target;
   target.style.color = likeData.value === false ? " rgba(52, 73, 94, 1)" : 'rgba(52, 73, 94, 0.5)';
 
     }

async function sendComment(){


    if(commentBody.value == null || '' ){

            errorComment.value = "Votre commentaire est vide";

             setTimeout(() => {
             errorComment.value = null 
          }, 3000);
        
        
    }else{

        

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
          body: commentBody.value,
          username: `${userStore.prenom} ${userStore.nom}`,
          postUuid: id.value,
          userUuid: userStore.uuid
      }),
      headers: {
        "Authorization": `Bearer ${loginStore.token} `,
        "Content-Type": "application/json"
      }
    }

    await fetch('https://groupomania-p7-oc.herokuapp.com/api/comments',requestOptions)
        .then((res) => res.json())


    allCommentsStore.refreshComments();
    allPostsStore.refreshPosts();
    commentBody.value = null
    
}
}


// Suppression d'un commentaire
async function deleteComment(){

    const requestOptions = {
      method: 'DELETE',
      body: JSON.stringify({
          userUuid: userStore.uuid
      }),
      headers: {
        "Authorization": `Bearer ${loginStore.token} `,
        "Content-Type": "application/json"
      }
    }

    await fetch(`https://groupomania-p7-oc.herokuapp.com/api/comments/${commentId.value}`, requestOptions)
        .then((res) => res.json())


    allCommentsStore.refreshComments();
    allPostsStore.refreshPosts();
  
    
}



</script>

<style lang="scss" scoped>

 body{
   min-width: 320px;
 }
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

    @media screen and (max-width: 900px) {
       width: 60%;
    }
    @media screen and (max-width: 320px) {
       width: 95%;
    }
    
    }
   
  &_header{
    display: flex;
    align-items: center;

      @media screen and (max-width: 320px) {
       padding: 10px 0;
    }
  
    &_img{
     width: 15%;
  
      img{
      
      width: 60px;
      height: 60px;
      margin: 10px 10px 0 10px;
      border-radius: 50%;
     
      }

    }

    &_info{
     margin-left: 20px;

      h4{
        color: var(--primary-2);
        margin-bottom: 5px;
        @media screen and (max-width: 320px) {
       font-size: 0.8rem;
    }
      }

      p{
        font-style: italic;
        font-size: 0.875rem;

      @media screen and (max-width: 320px) {
       font-size: 0.75rem;
    }
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
    padding: 5px;
    background-color: rgba(34, 109, 159, 0.2);
    border-top: 1px solid rgba(34, 109, 159, 0.4);
    border-bottom: 1px solid rgba(34, 109, 159, 0.4);
    
   

    &_up{
      display: flex;
      gap:10px;
      align-items: center;

      i{
        color: rgba(52, 73, 94, 0.5);
        cursor: pointer;
        font-size: 1.1rem;
        padding: 2px;

         @media screen and (max-width: 320px) {
       font-size: 0.9rem;
    }
       
      }

      
       
     }
    
  }
 
 &_dropdown{
   position: absolute;
   right: 20px;
   top: 20px;
   
   
 }
  
  &_menu{ 
      
     
   
    //font-size: 2rem;
    display: flex;
    gap:10px;
     @media screen and (max-width: 768px) {
       flex-direction: column;
    }
     @media screen and (max-width: 768px) {
       flex-direction: row;
    }
   
    
        &_modifier{
          background-color:#8e44ad;
          color: var(--text-primary-color);
          border:none;
          border-radius:4px;
          padding: 3px;
          font-size: 1.1rem;

           @media screen and (max-width: 768px) {
              font-size: 0.9rem;
         }
         
          cursor: pointer;

           &:hover{
             background-color:#9b59b6;
          }
        
        }
        &_supprimer{
          background-color: var(--danger-2);
          color: var(--text-primary-color);
          font-size: 1.1rem;
           border:none;
          border-radius:4px;
          padding: 3px;
          
           @media screen and (max-width: 768px) {
              font-size: 0.9rem;
           }
          cursor: pointer;

          &:hover{
             background-color: var(--danger-1);
          }
        }
    }

&_comments{
    padding: 10px;

    h4{
      font-size: 0.875rem;
      margin-bottom: 5px;
    }
    &_send{
      display: flex;
      align-items: center;
      margin-top: 5px;
      
       button{
        
        width: 8%;
        border: 1px solid  rgba(52, 73, 94, 0.5);
        padding: 6px;
        border-top-right-radius: 4px ;
        border-bottom-right-radius: 4px ;
        color: rgba(52, 73, 94, 0.9);
        font-size: 1.2rem;
        background-color:rgba(34, 109, 159, 0.2);
       cursor: pointer;
       display: flex;
       justify-content: center;

        &:hover{
              background-color:rgba(34, 109, 159, 0.4);
        }
        
        // margin-right: 20px;
       }

       input{
         padding:  8px;
         width: 92%;
         border: 1px solid  rgba(52, 73, 94, 0.5);
         border-right: none;
        border-top-left-radius: 4px ;
        border-bottom-left-radius: 4px ;
         
         &::placeholder{
           opacity: 0.7;
         }
        
       }

    }

    &_get{
       

        &_container{
          padding: 7px;
        //  margin-left: 10px;
          display: flex;
          align-items: center;
         
        }

        &_image{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 10%;
          margin-right: 10px;

          @media screen and (max-width: 320px) {
              width: 15%;
            }
            img{
              border-radius: 50%
            }
          
        }

      
        &_header{
          display: flex;
          align-items: baseline;
          font-style: italic;
          font-size: 0.825rem;
          width: 100%;
          
           
          @media screen and (max-width: 1150px) {
              flex-direction: column;
            }
          
        

              h4{
                color: var(--primary-2);
                margin-bottom: 3px;
                 @media screen and (max-width: 1150px) {
                 font-size: 0.8rem;
                  margin-bottom: 5px;
            }

              }
              p{
                
                margin-left: 5px;
              @media screen and (max-width: 1150px) {
              font-size: 0.75rem;
              margin-bottom: 5px;
            }
              
              }
        }
        &_body{
            font-size: 1rem;
            margin-left: 3px;  
            font-size: 0.875rem;
            font-weight: 500;
           
        }

          &_btn {

        margin-left: 30%;

        &_supprimer{
          background-color: var(--danger-2);
          color: var(--text-primary-color);
          font-size: 0.8rem;
          border:none;
          border-radius:4px;
          padding: 3px;
           
          
          cursor: pointer;

          &:hover{
             background-color: var(--danger-1);
          }
        }
      }  
}
    }

    
   


}
 

.modal {


    position: fixed;
    z-index: 999;
    background-color: rgb(0, 0,0, 0.7);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;  


    form{
    width: 40%;
    display:flex;
    flex-direction:column;
    row-gap:10px;
    margin: 30px auto;
    background-color: var(--text-primary-color);
    padding: 20px;
    border: 1px solid rgba(52, 73, 94, 0.2);
    border-radius: 10px;

      .inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
    .inputfile + label {
    color: var(--text-primary-color);
    background-color: var(--primary-2);
    display: inline-block;
    cursor: pointer;
     font-size: 0.9rem;
}

.inputfile:focus + label,
.inputfile + label:hover {
     background-color: var(--primary-1);
}


  #publication{
        height: 10vh;
        border: 1px solid rgba(52, 73, 94, 0.2);
        border-radius: 10px;
        margin-bottom: 10px;
        padding: 0 0 60px 10px;
        font-size: 0.9rem;

        &::placeholder{
            opacity: 0.7;
        }
    }

    #send{
        display:flex;
        justify-content: space-between;
      

       
    }
    
   
    }




  &_image{
     img{
       width: 100%;
       height : 30vh;
     }
  }


    &_button_close{
      width: 25%;
      margin: 10px auto 0;
      background-color: var(--danger-2);
      color: var(--text-primary-color);
    &:hover {
      background-color: var(--danger-1);
    }
  }
  
  
    }

.errorComment{
  color: var(--danger-1);
  padding: 5px;
  font-size: 0.825rem;
}



.toast-enter-from{
    opacity: 0;
    transform: translateY(-60px);
}
.toast-enter-to{
    opacity: 1;
    transform: translateY(0);
}
.toast-enter-active{
    transition: all 0.3s ease;
}
.toast-leave-from{
    opacity: 1;
    transform: translateY(0);
}
.toast-leave-to{
    opacity: 0;
    transform: translateY(-60px);
}
.toast-leave-active{
    transition: all 0.3s ease;
}

</style>