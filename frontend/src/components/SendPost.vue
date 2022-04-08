<template>
<form>
    <h3>Exprimez-vous ...</h3>
    <input id="publication" type="text" placeholder="Quoi de neuf ?">
    <div id="send">
        <div id="btn-wrapper">
            <input type="file" name="file" id="file" class="inputfile" />
            <label class="btn" for="file">Choisir une image</label> 
           
        </div>
             <button class="btn btn-primary">Publier !</button>
    </div>
</form>


 

  
</template>

<script>




</script>

<style lang="scss">



form{
    width: 40%;
    display:flex;
    flex-direction:column;
    row-gap:10px;
    margin: 30px auto;
    background-color: var(--text-primary-color);
    padding:20px;
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
    //  #btn-wrapper{
    //         position: relative;
    //        // overflow:hidden;

    //         &input[type="file"]{
    //         position: absolute;
    //         top:0;
    //         left:0;
    //         font-size:20px;
    //         background-color: blue;
    //         opacity:1;
    //         cursor: pointer;
        
    //         }

    //     }

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

}



</style>