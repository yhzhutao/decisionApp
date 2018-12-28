<template>
  <div class="header">
    <div class="header-top">
      <div v-show ="backFlag === true"><img class="login_logo" src="../../image/login_logo.svg" alt=""></div>
      <div @click="goBack" v-show = "backFlag === false"><img class="back" src="../../image/back_icon.svg" alt=""></div>
      <div @click="openPicker" class="date"><span >{{ selectDate }}</span>
        <img src="../../image/date_choose_icon.svg" alt=""></div>
      <div @click="gotoPersonal" class="my-icon"><img src="../../image/my_icon@2x.png" alt=""></div>
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
  import { DatetimePicker } from 'mint-ui';
  import Vue from 'vue'
  import bus from '@/components/base/bus'



  Vue.component(DatetimePicker.name, DatetimePicker);
  export default {
    name: "m-header",
    props:{
      backFlag:{

      }
    },
    data() {
      return {
        date: new Date(),
        dateValue:'',
        selectDate:this.formatDate(new Date()),
        isIos:false
      }
    },
    created(){
      /**
       * 判断是安卓还是ios
       */
      if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        this.isIos = true
      }else{
        this.isIos = false
      }

    },
    mounted() {
      bus.$emit('selectDate',this.formatDate(new Date()).replace(/\//g,''))
    },
    watch:{
      $route(to,from){
       if(to.path === '/assetsSituation'||to.path === '/individualIoanSituation'||to.path === '/variousIndicators'||to.path === '/creditAvailability'){
         this.backFlag = true
       }else{
         this.backFlag = false
       }
      }
    },
    methods: {
      gotoPersonal(){
          this.connectWebViewJavascriptBridge(function(bridge){
            bridge.callHandler(
              'gotoPersonal', {},
              function(res) {
              })
          })
      },
      //注册事件监听
      connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
          callback(WebViewJavascriptBridge)
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function () {
              callback(WebViewJavascriptBridge)
            },
            false
          );
        }
      },
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
        let selectDate = this.formatDate(date)
        this.selectDate = selectDate
        bus.$emit('selectDate',selectDate.replace(/\//g,''))
      },
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
   .picker-item
     font-size: 32px
     height: 40px
  .mint-datetime-action
   font-size: 32px
   height: 44px
  .picker-center-highlight:before,.picker-center-highlight:after
    background-color: #ccc
    height: 4px
</style>
