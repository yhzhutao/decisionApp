<template>
  <div class="indicator">
    <div class="centerBox">
      <div class="leftBox">
        <div class="roundLeft" :style="{'background':lineEndColor}"></div>
      </div>
      <div class="rightBox">
        <div class="roundRight" :style="{'background':'linear-gradient('+lineFirstColor+','+lineEndColor+')'}"></div>
      </div>
      <div class="roundMask">
        <div class="content">
          <span class="top" :style="{color:numcolor}">{{percent}}%</span>
          <div class="line"></div>
          <span class="bottom" :style="{color:fontcolor}">{{index}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "indicator",
    props: {
      numcolor:String,
      fontcolor: String,
      percent: Number,
      index: String,
      lineFirstColor:String,
      lineEndColor:String
    }
    // mounted(){
    //   this.init();
    // },
    // methods:{
    //   init(){
    //     var percent = this.percent;
    //     console.log(percent);
    //     var rightBtn = document.getElementsByClassName('roundRight')[0];
    //     var leftBtn = document.getElementsByClassName('roundLeft')[0];
    //     if(percent<=50){
    //       var rightDeg = (percent-50)*360/100;
    //       console.log(document.styleSheets[9]);
    //       document.styleSheets[9].deleteRule(11);
    //       document.styleSheets[9].deleteRule(11);
    //       document.styleSheets[9].deleteRule(9);
    //       document.styleSheets[9].deleteRule(9);
    //       var tt = document.styleSheets[9];
    //       tt.insertRule("@keyframes a-data-v-3cbf18af{0%{transform: rotateZ(-180deg)} 100%{transform:rotateZ("+rightDeg+"deg)}}",6);
    //     }else{
    //       var leftDeg = (percent-100)*360/100;
    //       console.log(document.styleSheets[9]);
    //       document.styleSheets[9].deleteRule(11);
    //       document.styleSheets[9].deleteRule(11);
    //       var tt = document.styleSheets[9];
    //       tt.insertRule("@keyframes b-data-v-3cbf18af{0%{transform: rotateZ(-180deg)} 100%{transform:rotateZ("+leftDeg+"deg)}}",6);
    //     }
    //   }
    // }
  }
</script>

<style lang="scss" scoped>
  .indicator {
    text-align: center;
  .centerBox{
    width: 264px;
    height: 264px;
    border-radius: 50%;
    position: relative;
    background: rgba(255, 255, 255, 0.4);
    margin: 0 auto;
    -webkit-box-sizing: content-box;
  .leftBox,
  .rightBox {
    width: 132px;
    height: 264px;
    overflow: hidden;
    float: left;
  }
  .leftBox{
  .roundLeft {
    width: 132px;
    height: 264px;
    border-radius: 132px 0 0 132px;
    overflow: hidden;
    transform: rotateZ(-180deg);
    animation: circleProgressLoad_left 0.3s linear 0.3s;
    animation-fill-mode: forwards;
    -webkit-transform-origin: right center;
    background: #F19938;
  }
  }
  .rightBox{
  .roundRight {
    width: 132px;
    height: 264px;
    border-radius: 0 132px 132px 0;
    overflow: hidden;
    animation: circleProgressLoad_right 0.3s linear;
    animation-fill-mode: forwards;
    -webkit-transform-origin: left center;
    background: linear-gradient(#F9C969, #F19938);
  }
  }
  .roundMask {
    position: relative;
    width: 246px;
    height: 246px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 9px;
    left: 9px;
    overflow: hidden;
  .content {
    position: absolute;
    display: inline-block;
    width: 80%;
    margin: 0 auto;
    top: 50%;
    transform: translate(-50%, -50%);
  .top {
    font-size: 44px;
  }
  .line {
    border-top: 2px #adadad solid;
    width: 100%;
    margin: 16px 0;
  }
  }
  }
  @keyframes circleProgressLoad_right {
    0% {
      transform: rotateZ(-180deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }

  @keyframes circleProgressLoad_left {
    0% {
      transform: rotateZ(-180deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
  }
  }
</style>
