<template>
  <div class="conditionSelect">
    <div>品牌</div>
    <div class="brandSelect" @click="togglePanel">
      <div class="input_in">
        <input type="text" readonly value="长安轿车" v-model="brandName">
      </div>
      <div class="brandName" v-show="visible" ref="main">
        <ul>
          <li @click="selectBrand" data-code="carBrand9879">长安轿车</li>
          <li @click="selectBrand" data-code="carBrand9876">长安福特</li>
          <li @click="selectBrand" data-code="BRAND20180093">长安欧尚</li>
          <li @click="selectBrand" data-code="carBrand9877">长安马自达</li>
          <li @click="selectBrand" data-code="carSeries0029">长安DS</li>
          <li @click="selectBrand" data-code="carBrand9879">长安轿车</li>
        </ul>
      </div>
    </div>
    <div>区域</div>
    <div class="region" @click="togglePanel2">
      <div class="input_in">
        <input type="text" readonly value="长安轿车" v-model="region">
      </div>
      <div class="brandName" v-show="visible2" ref="main2">
        <ul>
          <li @click="selectRegion" data-code="0">全区域</li>
          <li @click="selectRegion" data-code="7247">北区</li>
          <li @click="selectRegion" data-code="4473">东区</li>
          <li @click="selectRegion" data-code="7245">南区</li>
          <li @click="selectRegion" data-code="6830">西区</li>
          <li @click="selectRegion" data-code="5534">中区</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '@/common/base/bus'
  export default {
    name: "conditionSelect",
    data() {
      return {
        visible: false,
        visible2:false,
        brandName: '长安轿车',
        region: '全区域'
      }
    },
    created(){
      let routerStr = this.$router.currentRoute.path
      let index = routerStr.substr(routerStr.length-1,1)
      let brandName = ['长安轿车','长安福特','长安欧尚','长安马自达','长安DS','长安铃木']
      this.brandName = brandName[index]
    },
    methods: {
      selectRegion(event) {
        this.region = event.target.innerText
        bus.$emit('getRegion',event.target.dataset.code)
      },
      selectBrand(event) {
        this.brandName = event.target.innerText
        bus.$emit('getBrandCode',event.target.dataset.code)
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
    flex-direction: row;
    line-height: 88px;
    z-index: 999;
    & > div:first-child {
      color: #F4A100;
      font-size: 32px;
      line-height: 88px;
      width: 20%;
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
        position: absolute;
        right: 40px;
        top: 30%;
        pointer-events: none;
      }
      .brandName {
        background-color: #2F3543;
        width: 75%;
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
    .region:after{
      content: "";
      width: 36px;
      height: 36px;
      background: url(../../image/more_option_icon.svg) no-repeat center;
      position: absolute;
      right: 80px;
      top: 30%;
      pointer-events: none;
    }
  }
</style>
