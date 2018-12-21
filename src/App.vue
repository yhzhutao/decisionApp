<template>
  <div id="app" class="border">
    <div class="topArea">
      <m-header :backFlag="backFlag"></m-header>
      <tab v-show="tabFlag"></tab>
      <conditionSelect @getBrandCode='sendBrandCode' v-if="selecetFlag"></conditionSelect>
    </div>
    <router-view :brandCode="brandCode"></router-view>
  </div>
</template>

<script>
  import mHeader from './components/header/m-header.vue'
  import tab from './components/tab/tab'
  import conditionSelect from './components/conditionSelect/conditionSelect'

  export default {
    name: 'App',
    components: {
      mHeader,
      tab,
      conditionSelect
    },
    data() {
      return {
        message: '',
        tabFlag: true,
        backFlag: true,
        selecetFlag: false,
        brandCode:''
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
      let path = this.$router.currentRoute.path
      if (path === '/assetsSituation' || path === '/individualIoanSituation' || path === '/variousIndicators' || path === '/creditAvailability') {
        this.tabFlag = true
        this.backFlag = true
      } else {
        this.tabFlag = false
        this.backFlag = false
      }
      if (path.indexOf('/conditionIndividualLoanSituation') !== -1) {
        this.selecetFlag = true
      } else {
        this.selecetFlag = false
      }
      this.connectWebViewJavascriptBridge(function(){
        WebViewJavascriptBridge.registerHandler("outApp", function (data, responseCallback) {
          alert(path);
          if (path === '/assetsSituation' || path === '/individualIoanSituation' || path === '/variousIndicators' || path === '/creditAvailability') {
            alert('传值0')
            responseCallback('0');
          } else {
            alert('传值1')
            responseCallback('1');
          }
        });
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
        if (to.path.indexOf('/conditionIndividualLoanSituation') !== -1) {
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
    background-image: url("./image/home_header_back.svg")
  }
</style>
