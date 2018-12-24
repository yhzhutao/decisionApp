<!--信贷投放界面卡片-->
<template>
  <div class="credit-cart">
    <div class="cart-head">
      <span>{{title}}</span><img :src="url">
    </div>
    <div class="cart-content clearfix">
      <div class="content-left">
        <p class="unit">单位:万元</p>
        <div class="img">
          <img src="../../image/Group 6@2x.png" alt="">
          <span class="totalNum">349789</span>
        </div>
        <span class="desc">目前累计投放</span>
      </div>
      <div class="content-right">
        <div class="explain">
          <span class="current">目前</span><span class="synchronism">同期</span>
        </div>
        <div class="histogram">
          <canvas class="histogram-one" ref="histogram-one" width="40" height="100"></canvas>
          <canvas class="histogram-two"ref="histogram-two" width="20" height="100"></canvas>
        </div>
        <p>同期对比<span>+10%</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "creditCart",
    data(){
      return{
        title:'',
        url:''
      }
    },
    props:{
      titleCode:Number
    },
    mounted(){
      this.getTitle(this.titleCode);
      this.init();
    },
    methods:{
      getTitle(titleCode){
        if(titleCode==0){
          this.title='信贷投放总体情况';
          this.url=require('../../image/credit_icon@2x.png');
        }else if(titleCode==1){
          this.title='批售';
          this.url=require('../../image/wholesaler_icon@2x.png');
        }else if(titleCode==2){
          this.title='零售';
          this.url=require('../../image/retail_icon@2x.png');
        }else{
          return;
        }
      },
      init(){
        var canvas_1=this.$refs['histogram-one']
        var canvas_2 = this.$refs['histogram-two'];
        var ctx_1 = canvas_1.getContext('2d');
        var ctx_2 = canvas_2.getContext('2d');
        ctx_1.lineWidth = 80;
        ctx_1.strokeStyle = "rgb(89,129,198)";
        ctx_2.lineWidth = 40;
        ctx_2.strokeStyle = "rgb(218,223,236)"
        let heightOne=100;
        let heightTwo=100;
        let timer;
        let timer1;
        (function draw(){
          timer = requestAnimationFrame(draw);
          ctx_1.clearRect(0,0,canvas_1.width,canvas_1.height);
          ctx_1.beginPath();
          ctx_1.moveTo (0,100);
          ctx_1.lineTo(0,heightOne);
          heightOne--;
          if(heightOne<10){
            window.cancelAnimationFrame(timer);
          }
          ctx_1.stroke();
          ctx_1.closePath();
          ctx_1.save();
          ctx_1.restore();
        })();
        (function draw(){
          timer1 = requestAnimationFrame(draw);
          ctx_2.clearRect(0,0,canvas_2.width,canvas_2.height);
          ctx_2.beginPath();
          ctx_2.moveTo (0,100);
          ctx_2.lineTo(0,heightTwo);
          heightTwo--;
          if(heightTwo<50){
            window.cancelAnimationFrame(timer1);
          }
          ctx_2.stroke();
          ctx_2.closePath();
          ctx_2.save();
          ctx_2.restore();
        })();
        // ctx_2.lineWidth = 40;
        // ctx_2.moveTo (0,100);
        // ctx_2.lineTo (0,50);
        // ctx_2.strokeStyle = "rgb(218,223,236)";
        // ctx_2.stroke();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .credit-cart {
    margin: 0px 32px 0px 32px;
    padding: 32px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    .cart-head {
      &:before {
        display: inline-block;
        content: '';
        width: 8px;
        height: 32px;
        background: rgb(89, 129, 198);
        margin-right: 16px;
        vertical-align: middle;
      }
      span, img {
        vertical-align: middle;
      }
      span {
        font-size: 32px;
        color: rgb(155, 155, 155);
        margin-right: 16px;
      }
      img {
        width: 32px;
        height: 32px;
      }

    }
    .cart-content {
      margin-top: 32px;
      .content-left {
        float: left;
        .unit {
          color: rgb(155, 155, 155);
          font-size: 24px;
          line-height: 34px;
        }
        .img {
          position: relative;
          margin-top: 20px;
          width: 300px;
          height: 240px;
          /*background-image: url("../../image/Group 6@2x.png");*/
          img{
            width: 100%;
            height: 100%;
          }
          .totalNum{
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
        }
        .desc {
          display: block;
          margin-top: 32px;
          text-align: center;
          font-size: 32px;
          color: #000;
        }
      }
      .content-right {
        position: relative;
        float: right;
        height: 360px;
        width: 220px;
        color: rgb(151, 151, 151);
        font-size: 24px;
        .explain{
          text-align: right;
          .current {
            margin-right: 12px;
            line-height: 34px;
            &:before {
              display: inline-block;
              content: '';
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: rgb(89, 129, 198);
              vertical-align: middle;
              margin-right: 16px;
            }
          }
          .synchronism {
            line-height: 34px;
            &:before {
              display: inline-block;
              content: '';
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: rgb(218, 223, 236);
              vertical-align: middle;
              margin-right: 16px;
            }
          }
        }
        .histogram {
          margin-top:60px;
          display: flex;
          /*position: absolute;*/
          /*bottom: 0px;*/
          /*.histogram-one {*/
            /*display: inline-block;*/
            /*width: 80px;*/
            /*height: 180px;*/
            /*background: rgb(89, 129, 198);*/
            /*animation:mymove-one 0.8s;*/
          /*}*/
          /*@keyframes mymove-one {*/
            /*0%{height: 0}*/
            /*100%{height:180px}*/
          /*}*/
          /*@keyframes mymove-two {*/
            /*0%{height: 0}*/
            /*100%{height:112px}*/
          /*}*/
          /*.histogram-two {*/
            /*display: inline-block;*/
            /*width: 40px;*/
            /*height: 112px;*/
            /*background: rgb(218, 223, 236);*/
            /*animation:mymove-two 0.8s;*/
          /*}*/

        }
        p {
          margin-top: 32px;
          font-size: 32px;
          color: #000;
          span {
            color: rgb(208, 2, 27);
          }
        }
      }
    }
  }

</style>
