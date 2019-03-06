<template>
  <div id="app" class="border">
    <div class="topArea">
      <m-header :backFlag="backFlag"></m-header>
      <tab v-show="tabFlag"></tab>
      <conditionSelect @getBrandCode='sendBrandCode' v-if="selecetFlag"></conditionSelect>
    </div>
      <router-view v-if="routerFlag" :selectDate="selectDate" :brandCode="brandCode"></router-view>
    <loading v-show="loadingFlag"></loading>
  </div>
</template>

<script>
  import mHeader from './components/header/m-header.vue'
  import tab from './components/tab/tab'
  import conditionSelect from './components/conditionSelect/conditionSelect'
  import bus from './common/base/bus'
  import loading from './components/loading/loading'
  export default {
    name: 'App',
    components: {
      mHeader,
      tab,
      conditionSelect,
      loading
    },
    data() {
      return {
        message: '',
        tabFlag: true,
        backFlag: true,
        selecetFlag: false,
        brandCode:'',
        selectDate:'',
        loadingFlag:true,
        routerFlag:true
      }
    },
    methods: {
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
      sendBrandCode(code){
        this.brandCode = code
      }
    },
    created() {
      let that = this
      bus.$on('getDate',function(date){
        that.selectDate = date
      })
      bus.$on('loading',function(flag){
          that.loadingFlag = flag
      })
      let path = this.$router.currentRoute.path
      if (path === '/assetsSituation' || path === '/individualIoanSituation' || path === '/variousIndicators' || path === '/creditAvailability') {
        this.tabFlag = true
        this.backFlag = true
      } else {
        this.tabFlag = false
        this.backFlag = false
      }
      //将date传入view
      if (path === '/conditionIndividualLoanSituation') {
        this.selecetFlag = true
      } else {
        this.selecetFlag = false
      }
      this.connectWebViewJavascriptBridge(function(bridge){
        bridge.init(function(message, responseCallback) {
          let path = that.$router.currentRoute.path
          if (message ==="outApp" && responseCallback) {
            if (path === '/assetsSituation' || path === '/individualIoanSituation' || path === '/variousIndicators' || path === '/creditAvailability') {
              responseCallback('0')
            } else {
              responseCallback('1')
            }
          }
        })
      })
    },
    mounted() {

    },
    watch: {
      $route(to, from) {
        if (to.path === '/assetsSituation' || to.path === '/individualIoanSituation' || to.path === '/variousIndicators' || to.path === '/creditAvailability') {
          this.tabFlag = true
          this.backFlag = true
        } else {
          this.tabFlag = false
          this.backFlag = false
        }
        if (to.path === '/conditionIndividualLoanSituation') {
          this.selecetFlag = true
        } else {
          this.selecetFlag = false
        }
      }
    },
  }
</script>
<style lang="scss">
  @import url('./common/css/reset.scss');
  @import url('./common/css/base.scss');

  .topArea {
    width: 100%;
    background: #313743;
  }
  .fontColor{
    color: #9b9b9b!important;
  }
  body{
    font-family:"PingFang SC", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "Hiragino Sans GB", "Source Han Sans CN Normal", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  }
  *{

    -webkit-touch-callout:none; /*系统默认菜单被禁用*/

    -webkit-user-select:none; /*webkit浏览器*/

    -khtml-user-select:none; /*早期浏览器*/

    -moz-user-select:none;/*火狐*/

    -ms-user-select:none; /*IE10*/

    user-select:none;
  }
  @media only screen and (-webkit-device-pixel-ratio: 3) and (device-height: 812px) and (device-width: 375px){
   .bottomBox{
     display: block;
     height: 68px;
   }
  }
  @media only screen and (-webkit-device-pixel-ratio: 3) and (device-height: 896px) and (device-width: 414px){
    .bottomBox{
      display: block;
      height: 68px;
    }
  }
</style>
