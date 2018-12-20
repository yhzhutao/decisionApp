<template>
  <div class="conditionSelect">
    <div>品牌</div>
    <div class="brandSelect" @click="togglePanel">
      <div class="input_in">
        <input type="text" readonly value="长安轿车" v-model="brandName">
      </div>
      <div class="brandName" v-show="visible" ref="main">
        <ul>
          <li @click="selectBrand">长安轿车</li>
          <li @click="selectBrand">长安福特</li>
          <li @click="selectBrand">长安铃木</li>
          <li @click="selectBrand">长安DS</li>
          <li @click="selectBrand">长安轿车</li>
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
          <li @click="selectRegion">北区</li>
          <li @click="selectRegion">东区</li>
          <li @click="selectRegion">南区</li>
          <li @click="selectRegion">西区</li>
          <li @click="selectRegion">中区</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
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
    methods: {
      selectRegion(event) {
        this.region = event.target.innerText
      },
      selectBrand(event) {
        this.brandName = event.target.innerText
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
    display: flex;
    height: 88px;
    flex-direction: row;
    line-height: 88px;
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
      input {
        width: 100%;
        height: 100%;
        color: #FFFFFF;
        background-color: rgba(255, 255, 255, 0);
        outline: none;
        list-style: none;
        border: none;
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
        width: 60%;
        ul li {
          height: 50px;
          line-height: 50px;
          font-size: 30px;
          text-align: center;
          color: #FFFFFF;
          border-bottom: 0.5px solid #ccc;
        }
        ul li:hover {
          background-color: orange;
        }
        ul li:last-child {
          border-bottom: none;
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
