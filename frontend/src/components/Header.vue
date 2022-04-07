<template>
    <nav>
        <div class="logo"><img src="../assets/images/icon-left-font-monochrome-white.svg" alt=""></div>
        <div class="logout">
          <i class="fa-solid fa-user"></i>
        </div>
    </nav>
</template>

<script>



</script>

<style lang="scss">

nav{
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 20px;
    background-color: var(--danger-2);

    .logo img {
        width: 150px;

        
    }

    .logout{
        font-size: 1.2rem;
        color: var(--text-primary-color);
    
    &:hover{
        color: var(--primary-1);
       
    }
}

}

</style>