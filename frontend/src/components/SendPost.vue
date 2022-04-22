<template>
<form @submit.prevent="sendPost" enctype="multipart/form-data">
    <h3>Exprimez-vous ...</h3>
    <input v-model="content" id="publication" type="text" placeholder="Quoi de neuf ?" @change="contentChange">
    <div id="send">
        <div id="btn-wrapper">
            <input type="file" name="file" id="file" class="inputfile" accept=".jpg, .jpeg, .png, .gif" @change="onFileChange"/>
            <label class="btn" for="file">Choisir une image</label>    
        </div>
        <button v-if="url" id="delete-img" class="btn btn-primary" @click.prevent="deleteFileChange">Supprimer une image</button>
        <button class="btn btn-primary" >Publier !</button>
    </div>
   
    <div id="preview">
        <img  v-if="url" :src="url" />
    </div>

   <p v-if="errorMessage" class="errorMessage">{{errorMessage}}</p> 
</form>

   


 

  
</template>

<script setup>

import {ref} from 'vue';
import {useLoginStore} from '@/stores/login';
import {usePostStore} from '@/stores/post';
import { useAllPostsStore } from "../stores/allposts";


const loginStore = useLoginStore();
const postStore = usePostStore();
const allPostsStore = useAllPostsStore();

const content = ref(null);
const url = ref('');
const file = ref('')
const errorMessage = ref('')


const onFileChange = (e) => {
    file.value =  e.target.files[0];
    url.value = URL.createObjectURL(file.value)
    postStore.$state = { image : file.value};
    
   
}

   
const deleteFileChange = () =>{
    url.value = null
    postStore.$state = { image : null};

  
}

const contentChange = () => {
    postStore.$state = { body: content.value};
    
}



const sendPost = async() => {

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${loginStore.token} `);

    let formdata = new FormData();    
    formdata.append("image", postStore.image);
    formdata.append("userUuid", loginStore.userUuid);
    formdata.append("body", postStore.body);



    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    
    };

    if(content.value === null ){

            errorMessage.value = "Votre post est vide";

             setTimeout(() => {
             errorMessage.value = null 
          }, 4000);
        
        
    }else{

        await fetch("http://localhost:5000/api/posts", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

        function resetForm(){
        content.value = null;
        url.value = null;
       
}
     resetForm()
    
     allPostsStore.refreshPosts()
    

}






</script>

<style lang="scss">



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
   
    h3{
        margin-bottom: 20px;
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

 #preview {
    
     
     
     img{
         width: 60px;
         height: 60px;
         object-fit: cover-center;
        border-radius: 50%;
        border: 1px solid #ddd;
    
     }
 }
 
 #delete-img{
    width: 35%;

 }
 
 .errorMessage{
     color: var(--danger-1);
     text-align: center;
 }

}



</style>