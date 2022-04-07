<template>

<div class="container">
    <div class ="container_post">
        <img src="/src/assets/images/default_profile_400x400.png" alt=""> 
        <input type="text" placeholder="Quoi de neuf ?" />
    </div>
    <div class ="container_send">
        <i class="fa-regular fa-image"></i>
        <button class="btn btn-primary">Envoyer</button>
    </div>
</div>
  
</template>

<script>




</script>

<style lang="scss">

.container{
    display:flex;
    flex-direction: column;
    row-gap: 20px;
    width: 40%;
    height: 20vh;
    background-color: var(--text-primary-color);
    border-radius: 10px;
    border: 1px solid var(--gray-2);
    margin: 10px auto;
    padding: 10px 20px;

    img{
        width:50px;
        border-radius: 50%;
        justify-self: center;
    }

    input{
        width:85%;
        height:100%;;
        font-size: 1.1rem;
        margin-left:20px;
        border:2px solid var(--gray-2);
        border-radius:5px;
        padding:10px;
    
    &:focus{
        border: 1px solid var(--primary-1);
        outline: 1px solid var(--primary-1);
    }
       
       
    }

    &_post{
        display:flex;
        justify-content: space-between;
        align-items: center;
        height:80%;
    }

    &_send{
        display:flex;
        justify-content: space-between;
        align-items:center;
        height:20%;
     
        

    i{
        font-size: 25px;
        color: var(--primary-1)
        }

    button{
        width: 25%
    }
        
        
    }

}



</style>