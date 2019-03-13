<template>
  <div class="conditionSelect">
    <div>品牌</div>
    <div class="brandSelect" @click="togglePanel">
      <div class="input_in">
        <input :style="{ textAlign:brandName.length<5?'center':'left' }" type="text" readonly value="长安轿车" v-model="brandName">
      </div>
      <div class="brandName" v-show="visible" ref="main">
        <ul>
          <li  v-for="(item,index) in brandList" @click="selectBrand" :data-code="item.brandCode">{{item.brandName}}</li>
        </ul>
      </div>
    </div>
    <div>区域</div>
    <template v-if="isShow ===false">
      <div class="regionAll">
        <div class="input_in">
          <input type="text" readonly  value="全区域">
        </div>
      </div>
    </template>
    <template v-if="isShow">
    <div class="region" @click="togglePanel2">
      <div class="input_in">
        <input type="text" readonly  v-model="region">
      </div>
      <div class="brandName" v-show="visible2" ref="main2">
        <ul>
          <li @click="selectRegion" data-code="0">全区域</li>
            <li v-for="(item,index) in regionList" @click="selectRegion" :data-code="item.regionCode">{{item.regionName}}</li>
        </ul>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
  import bus from '@/common/base/bus'
  import { host } from "@/common/base/baseHttp.js"
  export default {
    name: "conditionSelect",
    data() {
      return {
        visible: false,
        visible2:false,
        brandName: '长安轿车',
        region: '全区域',
        brandList:[],
        regionList:[],
        isShow:true
      }
    },
    created(){
      this.brandName = this.$router.currentRoute.query.brandName
      let routerStr = this.$router.currentRoute.path
      let index = routerStr.substr(routerStr.length-1,1)
      this.brandList = JSON.parse(sessionStorage.getItem('brandStorage'))
      this.getRegion(this.$router.currentRoute.query.brandCode)
    },
    methods: {
      selectRegion(event) {
        this.region = event.target.innerText
        bus.$emit('getRegion',event.target.dataset.code)
      },
      getRegion(code){
        //获取区域
        let urlHost = host||'/api'
        let that = this
        this.$http.post(urlHost+'/Decision/queryRegionList',{brandCode:code}).then(function (res) {
          let data =JSON.parse(res.bodyText).result
          that.regionList = data
           if(data === null||data.length<=1){
             that.isShow = false
           }else{
             that.isShow = true
           }
          bus.$emit('isShowRegion',that.isShow)
        })
      },
      selectBrand(event) {
        this.brandName = event.target.innerText
        this.region = '全区域'
        let brandCode =event.target.dataset.code
        this.getRegion(brandCode)
        bus.$emit('getBrandCode',brandCode)
      },
      togglePanel() {
        this.visible ? this.hide() : this.show()
      },
      show() {
        setTimeout(() => {
          this.visible = true
          document.addEventListener('click', this.hidePanel, false)
        }, 0)
      },
      hide() {
        setTimeout(() => {
          this.visible = false
          document.removeEventListener('click', this.hidePanel, false)
        })
      },
      hidePanel(e) {
        if (!this.$refs.main.contains(e.target)) {
          this.hide()
        }
      },
      togglePanel2() {
        this.visible2 ? this.hide2() : this.show2()
      },
      show2() {
        this.$nextTick(()=>{
          this.visible2 = true
          document.addEventListener('click', this.hidePanel2, false)
        })
      },
      hide2() {
        this.$nextTick(()=>{
          this.visible2 = false
          document.removeEventListener('click', this.hidePanel2, false)
        })
      },
      hidePanel2(e) {
        if (!this.$refs.main2.contains(e.target)) {
          this.hide2()
        }
      }
    },
    beforeDestroy() {
      this.hide()
      this.hide2()
    }
  }
</script>

<style lang="scss" scoped>
  .conditionSelect {
    position: relative;
    display: flex;
    height: 88px;
    width: 100%;
    line-height: 88px;
    z-index: 999;
    & > div:first-child {
      color: #F4A100;
      font-size: 32px;
      line-height: 88px;
      width: 15%;
      text-align: center;
    }
    & > div:nth-child(3) {
      color: #F4A100;
      font-size: 32px;
      line-height: 88px;
      width: 20%;
      text-align: center;
    }
    .brandSelect, .region {
      position: relative;
      width: 30%;
      font-size: 32px;
      input {
        width: 100%;
        height: 100%;
        color: #FFFFFF;
        background-color: rgba(255, 255, 255, 0);
        outline: none;
        list-style: none;
        border: none;
        font-size: 32px;
      }
      &:after {
        content: "";
        width: 36px;
        height: 36px;
        background: url(../../image/more_option_icon.svg) no-repeat center;
        background-size: contain;
        position: absolute;
        right: 0;
        top: 30%;
        pointer-events: none;
      }
      .brandName {
        background-color: #2F3543;
        width: 98%;
        ul{
          border-left:1px solid #ccc;
          border-right:1px solid #ccc;
          border-bottom:1px solid #ccc;
          li {
            height: 50px;
            line-height: 50px;
            font-size: 30px;
            text-align: center;
            color: #FFFFFF;
            border-bottom: 0.5px solid #ccc;
          }
          li:hover {
            background-color: orange;
          }
          li:last-child {
            border-bottom: none;
          }
        }

      }
    }
    .brandSelect{
     width: 35%;
    }
    .regionAll{
      position: relative;
      width: 30%;
      font-size: 32px;
      overflow: hidden;
      input {
        width: 100%;
        height: 100%;
        color: #FFFFFF;
        background-color: rgba(255, 255, 255, 0);
        outline: none;
        list-style: none;
        border: none;
        font-size: 32px;
      }
    }
    .region:after{
      content: "";
      width: 36px;
      height: 36px;
      background: url(../../image/more_option_icon.svg) no-repeat  center;
      background-size: contain;
      position: absolute;
      right: 30%;
      top: 30%;
      pointer-events: none;
    }
  }
</style>
