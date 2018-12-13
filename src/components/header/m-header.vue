<template>
  <div class="header">
    <div class="header-top">
      <div v-show ="backGlag === true"><img class="login_logo" src="../../image/login_logo.svg" alt=""></div>
      <div @click="goBack" v-show = "backGlag === false"><img class="back" src="../../image/back_icon.svg" alt=""></div>
      <div @click="openPicker" class="date"><span >{{ selectDate }}</span>
        <img src="../../image/date_choose_icon.svg" alt=""></div>
      <div class="my-icon"><img src="../../image/my_icon@2x.png" alt=""></div>
    </div>
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="date"
        @confirm="handleConfirm"
      >
      </mt-datetime-picker>
  </div>
</template>

<script>
  import bus from '../base/bus'
  import { DatetimePicker } from 'mint-ui';
  import Vue from 'vue'
  Vue.component(DatetimePicker.name, DatetimePicker);
  export default {
    name: "m-header",
    props:{
      backGlag:{

      }
    },
    data() {
      return {
        date: new Date(),
        dateValue:'',
        selectDate:this.formatDate(new Date())
      }
    },
    components: {
    },
    computed:{

    },
    mounted() {
     console.log(this)
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
          m: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
          d: date.getDate()
        }
        return o.y + '\/' + o.m + '\/' + o.d
      },
      goBack(){
        this.$router.go(-1)
      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(date){
        this.selectDate = this.formatDate(date)
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
       font-size: 32px
       text-align: center
       position: absolute
       left: 50%
       top: 50%
       transform: translate(-50%,-50%)
       color: #ffffff
    .back
      height: 42px
      width: 24px
      margin-left: 32px
      margin-top: 20px
      float: left
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
  .picker-toolbar
    height: 70px
    span
     line-height: 75px
  .picker-items
   width: 100%
</style>
