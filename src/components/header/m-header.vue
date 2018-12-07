<template>
  <div class="header">
    <div class="header-top">
      <div v-show ="backGlag === true"><img class="login_logo" src="../../image/login_logo.svg" alt=""></div>
      <div v-show = "backGlag === false"><img class="back" src="../../image/back_icon.svg" alt=""></div>
      <div>{{date}} <img class="date-choose" src="../../image/date_choose_icon.svg" alt=""></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  import bus from '../base/bus'
  export default {
    name: "m-header",
    data() {
      return {
        date: this.formatDate(new Date()),
        backGlag:true
      }
    },
    components: {
    },
    computed:{

    },
    mounted() {

    },
    watch:{
      $route(to,from){
       if(to.path === '/assetsSituation'||to.path === '/individualIoanSituation'||to.path === '/variousIndicators'||to.path === '/creditAvailability'){
         this.backGlag = true
       }else{
         this.backGlag = false
       }
      }
    },
    methods: {
      formatDate(date) {
        var o = {
          y: date.getFullYear(),
          m: date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1,
          d: date.getDate()
        }
        return o.y + '\/' + o.m + '\/' + o.d
      },
      dateUp() {
        bus.$emit('date', '222')
      }
    }
  }
</script>

<style lang="sass" scoped>
  .header
    height: 40px
    width: 100%
    .header-top
      display: flex
    .login_logo
      width: 68px
      height: 27px
    .back
      height: 22px
      width: 22px
    .date-choose
      height: 32px
      width: 28px
</style>
