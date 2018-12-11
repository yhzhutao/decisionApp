<!--信贷投放界面卡片-->
<template>
  <div class="credit-cart">
    <div class="cart-head">
      <span>{{title}}</span><img :src="url">
    </div>
    <div class="cart-content clearfix">
      <div class="content-left">
        <p class="unit">单位:万元</p>
        <!--<div class="num">-->
        <!--1234567-->
        <!--</div>-->
        <img src="../../image/Group 6@2x.png" alt="">
        <span>目前累计投放</span>
      </div>
      <div class="content-right">
        <div class="explain">
          <span class="current">目前</span><span class="synchronism">同期</span>
        </div>
        <div class="histogram">
          <div class="histogram-one"></div><div class="histogram-two"></div>
          <p>同期对比<span>+10%</span></p>
        </div>
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
        img {
          margin-top: 20px;
          width: 300px;
          height: 240px;
          /*background: url("../../image/Group 6@2x.png");*/
        }
        span {
          display: block;
          margin-top: 32px;
          text-align: center;
          font-size: 32px;
          color: #000;
        }
      }
      .content-right {
        float: right;
        color: rgb(151, 151, 151);
        font-size: 24px;
        .explain{
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
          margin-top: 80px;
          .histogram-one {
            display: inline-block;
            width: 80px;
            height: 180px;
            background: rgb(89, 129, 198);
          }
          .histogram-two {
            display: inline-block;
            width: 40px;
            height: 112px;
            background: rgb(218, 223, 236);
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
  }

</style>
