<template >
<div class="profil_container">
    <h2 class="profil_name">{{userStore.prenom}} {{userStore.nom}}</h2>
    <hr>
    <div class="profil_info">
            <div class="profil_info_photo" >
                <div class="profil_info_image">
                     <img v-if="userStore.image !== null" :src="userStore.image" />
                     <img v-else src="../assets/images/default_profile_400x400.png"/>
                    </div>
               <div>
                   
                        <input type="file" name="file" id="file" class="inputfile" accept=".jpg, .jpeg, .png, .gif" @change="updateProfilImage"/>
                        <label class="btn" for="file">Changer ma photo de profil</label>    
                      
               </div>
            </div>

        
    </div>
    <div class="profil_modification"></div>
</div>
</template>


<script setup>
import{useUserStore} from '@/stores/user';
import{useLoginStore} from '@/stores/login';
import { useUpdateProfilStore } from '../stores/updateProfil';
import {ref} from 'vue'

const userStore = useUserStore();
const loginStore = useLoginStore();
const updateProfilStore = useUpdateProfilStore();
const file = ref('');
const id = userStore.uuid




async function updateProfilImage() {

    file.value = document.getElementById('file').files[0];
    updateProfilStore.$state = {image: file}
    

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${loginStore.token} `);

    let formdata = new FormData();    
    formdata.append("image",  updateProfilStore.image);
    formdata.append("userUuid", loginStore.userUuid);

    await fetch(`http://localhost:5000/api/auth/photo/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: formdata
    })
    .then((res) => res.json())

    await userStore.getUser();
}



</script>

<style lang="scss">

.profil{
    
    &_name{
        text-align: center;
        padding: 10px;
    }


    &_container{

        background-color: var(--text-primary-color);
        height: 60vh;
        margin: 10px;
        padding: 20px;
        border: 1px solid var(--gray-2);
        border-radius: 4px;
        
        hr{
            width: 80%;
            height: 2px;
            border: none;
            background-color: var(--gray-2);
        }

        h2{
            color: var(--primary-2)
        }
        
    }

    &_info{
        display: flex;
        justify-content: center;

        &_photo{
            text-align: center; 
        }

        &_image{
                

            img{
               border-radius: 50%;
               max-width: 200px;
              
           }
        }
    }

 
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
      margin-top: 10px;
}

.inputfile:focus + label,
.inputfile + label:hover {
     background-color: var(--primary-1);
}

</style>