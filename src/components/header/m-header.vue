<template>
  <div class="header">
    <div class="header-top">
      <div v-show ="backGlag === true"><img class="login_logo" src="../../image/login_logo.svg" alt=""></div>
      <div v-show = "backGlag === false"><img class="back" src="../../image/back_icon.svg" alt=""></div>
      <div class="date"><el-date-picker
        v-model="date"
        align="right"
        type="date"
        :editable="false"
        :clearable="false"
        placeholder="选择日期">
      </el-date-picker> <img class="date-choose" src="../../image/date_choose_icon.svg" alt=""></div>
      <div class="my-icon"><img src="../../image/my_icon@2x.png" alt=""></div>
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
        backGlag:true,
        value14:''
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
    position: relative
    height: 80px
    width: 100%
    .header-top
    .login_logo
      width: 136px
      height: 54px
      margin-top: 20px
      margin-left: 32px
      float: left
    .date
       text-align: center
       position: absolute
       left: 50%
       top: 50%
       transform: translate(-50%,-50%)
       color: #ffffff
    .back
      height: 22px
      width: 22px
    .date-choose
      height: 32px
      width: 28px
    .my-icon
      float: right
      img
        width: 48px
        height: 48px
        margin-top: 13px
        margin-right: 16px


</style>
<style lang="sass">
  .el-input__prefix
    display: none
  .date
    img
      position: absolute
      right: 0
      top: 0
    .el-date-editor
      input
        background: rgba(255,255,255,0)
        color: #ffffff
        outline: none
        border: none
        font-size: 16px
        text-align: right
</style>
