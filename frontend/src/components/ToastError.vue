<template>
    <div class="toast_wrapper">
        <div class="toast">
           {{notifyText}}
            <div class="close" @click="$emit('closeNotif')"><i class="fa-solid fa-circle-xmark"></i></div>
        </div>
    </div>
</template>

<script setup>


const props = defineProps(['notifyText'])

</script>

<style lang="scss" scoped>
.toast{
    padding: 20px;
    color: var(--text-primary-color);
    font-weight: 500;
    text-align: center;
    background-color: var(--danger-1);
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.5);
    max-width: 400px;
    margin: 0 auto;
    border: 2px solid var(--danger-2);
    position: relative;

    &_wrapper{
        position: fixed;
        width: 100%;
        top: 20px;
    }
}
.close{
    position:absolute;
    right: 5px;
    top:5px;
    font-size:20px;
    cursor: pointer;
}
</style>