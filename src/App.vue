<template>
  <div id="app" class="border">
    <m-header></m-header>
    <router-view/>
  </div>
</template>

<script>
  import mHeader from './components/header/m-header.vue'
export default {
  name: 'App',
  components:{
    mHeader
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
<style lang="scss">

</style>
