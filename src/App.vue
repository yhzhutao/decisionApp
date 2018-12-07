<template>
  <div id="app" class="border">
    <div class="topArea">
      <m-header></m-header>
      <tab></tab>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import mHeader from './components/header/m-header.vue'
  import tab from './components/tab/tab'
export default {
  name: 'App',
  components:{
    mHeader,
    tab
  },
  data(){
    return{
      message:''
    }
  },
  mounted(){
  }
}
</script>
<style lang="sass">
  .topArea
     background-image:url("./image/home_header_back.svg")
</style>
