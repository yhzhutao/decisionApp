<template>
  <div id="app" class="border">
    <div class="topArea">
      <m-header :backFlag="backFlag"></m-header>
      <tab v-show="tabFlag"></tab>
      <conditionSelect v-show="selecetFlag"></conditionSelect>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import mHeader from './components/header/m-header.vue'
  import tab from './components/tab/tab'
  import conditionSelect from './components/conditionSelect/conditionSelect'
export default {
  name: 'App',
  components:{
    mHeader,
    tab,
    conditionSelect
  },
  data(){
    return{
      message:'',
      tabFlag:true,
      backFlag:true,
      selecetFlag:false
    }
  },
  created(){
    let path = this.$router.currentRoute.path
    if(path === '/assetsSituation'||path === '/individualIoanSituation'||path === '/variousIndicators'||path === '/creditAvailability'){
      this.tabFlag = true
      this.backFlag = true
    }else{
      this.tabFlag = false
      this.backFlag = false
    }
    if(path === '/conditionIndividualLoanSituation'){
      this.selecetFlag = true
    }else{
      this.selecetFlag = false
    }
  },
  mounted(){

  },
  watch:{
    $route(to,from){
      if(to.path === '/assetsSituation'||to.path === '/individualIoanSituation'||to.path === '/variousIndicators'||to.path === '/creditAvailability'){
        this.tabFlag = true
        this.backFlag = true
      }else{
        this.tabFlag = false
        this.backFlag = false
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
