<template>
  <div v-for="post in allPostsStore.posts">
  {{post}}
  <!-- <img :src="'post.image" /> -->
 
   
  </div>
</template>


<script setup>
import { useAllPostsStore } from '../stores/allposts';
import { useLoginStore } from '../stores/login';
import {ref} from 'vue'
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

console.log(allPostsStore.posts[0].image);

const image = ref(allPostsStore.posts[0].image);
console.log(image.value);


</script>

<style lang="scss">



</style>