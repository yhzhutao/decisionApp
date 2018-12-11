<template>
  <div id="app" class="border">
    <div class="topArea">
      <m-header></m-header>
      <tab v-if="false"></tab>
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
<style lang="scss">
  @import url('./common/css/reset.scss');
  @import url('./common/css/base.scss');
  .topArea{
    background-image:url("./image/home_header_back.svg")
  }
</style>
