<template>
  <div class="loading-overlay">
    <mt-spinner type="fading-circle"></mt-spinner>
  </div>
</template>

<script>
  import { Spinner } from 'mint-ui';
  import Vue from 'vue'
  Vue.component(Spinner.name, Spinner);
    export default {
        name: "loading"
    }
</script>

<style lang="scss">
 .loading-overlay{
   position: fixed;
   top: 0;
   right: 0;
   height: 100%;
   width: 100%;
   opacity: 0.5;
   .mint-spinner-fading-circle{
    position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%,-50%);
     -webkit-transform: translate(-50%,-50%);
     width: 100px!important;
     height: 100px!important;
     .mint-spinner-fading-circle-circle:before{
       background-color: black;
     }
   }
 }
</style>
