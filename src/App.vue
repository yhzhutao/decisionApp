<template>
  <div id="app" class="border">
    <div class="topArea">
      <m-header :backGlag="backGlag"></m-header>
      <tab v-show="tabGlag"></tab>
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
      message:'',
      tabGlag:true,
      backGlag:true
    }
  },
  created(){
    let path = this.$router.currentRoute.path
    if(path === '/assetsSituation'||path === '/individualIoanSituation'||path === '/variousIndicators'||path === '/creditAvailability'){
      this.tabGlag = true
      this.backGlag = true
    }else{
      this.tabGlag = false
      this.backGlag = false
    }
  },
  mounted(){

  },
  watch:{
    $route(to,from){
      if(to.path === '/assetsSituation'||to.path === '/individualIoanSituation'||to.path === '/variousIndicators'||to.path === '/creditAvailability'){
        this.tabGlag = true
        this.backGlag = true
      }else{
        this.tabGlag = false
        this.backGlag = false
      }
    }
  },
}
</script>
<style lang="scss">
  @import url('./common/css/reset.scss');
  @import url('./common/css/base.scss');
  .topArea{
    background-image:url("./image/home_header_back.svg")
  }
</style>
