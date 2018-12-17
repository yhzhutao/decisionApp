<!--资产规模卡片-->
<template>
    <div class="assetCard">
      <div class="assetCard-head">
        <span>{{title}}</span><img :src="url" alt="">
      </div>
      <div class="asset-content">
        <p class="unit">单位：亿元</p>
        <div class="current">
          <span>当前</span>
          <div class="progress">
            <div class="progress_bg">
              <div class="progress_bar"></div>
            </div>
            <div class="progress_btn"></div>
            <!--<div class="text">0%</div>-->
          </div>
        </div>
        <div class="synchronism">
          <span>同期</span>
        </div>
        <div class="content-bottom">
          <div class="left">
            <p>12.66</p>
            <span>当前收入</span>
          </div>
          <div class="center">
            <p>+10%</p>
            <span>同比变动</span>
          </div>
          <div class="right">
            <p>12.66</p>
            <span>集团指标</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "assetCard",
      data(){
        return{
          title:'',
          url:'',
          percent:50
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
            this.title='收入';
            this.url=require('../../image/income_icon@2x.png');
          }else if(titleCode==1){
            this.title='利润';
            this.url=require('../../image/profit_icon@2x.png');
          }else{
            return;
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.assetCard{
  margin: 0 32px;
  padding: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  .assetCard-head{
    &:before{
      display: inline-block;
      content: '';
      width: 8px;
      height: 32px;
      background: rgb(110,90,200);
      margin-right: 16px;
      vertical-align: middle;
    }
    span,img{
      vertical-align: middle;
    }
    span{
      font-size:32px;
      color: rgb(155,155,155);
      margin-right: 16px;
    }
    img{
      width: 32px;
      height: 32px;
    }
  }
  .asset-content{
    margin-top: 16px;
    .unit{
      margin-left: 18px;
      font-size: 24px;
      color: rgb(155,155,155);
    }
    .current{
      margin-top: 44px;
      span{
        display: inline-block;
        line-height: 40px;
        font-size: 24px;
        color: rgb(155,155,155);
        margin-right: 10px;
        vertical-align: middle;
      }
      .progress {
        display: inline-block;
        position: relative;
        width: 85%;
        .progress_bg {
          height: 8px;
          border-radius: 5px;
          overflow: hidden;
          background-color: rgb(218,223,236);
          .progress_bar {
            background: rgb(110,90,200);
            width: 50%;
            height: 8px;
            border-radius: 8px;
            position: relative;
            right: 0;
          }
        }
        .progress_btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgb(110,90,200);
          position: absolute;
          left: 46%;
          top: -18px;
          cursor: pointer;
          border: 2px #bbbbbb solid;
          box-sizing: border-box;
        }
      }
      /*&:after{*/
        /*display: inline-block;*/
        /*content: '';*/
        /*width: 90%;*/
        /*border-top: 2px solid rgb(218,223,236);*/
        /*vertical-align: middle;*/
      /*}*/
    }
    .synchronism{
      span{
        line-height: 40px;
        font-size: 24px;
        color: rgb(155,155,155);
        margin-right: 21px;
      }
      &:after{
        display: inline-block;
        content: '';
        width: 85%;
        border-top: 2px dashed rgb(110,90,200);
        vertical-align: middle;
      }
    }
    .content-bottom{
      display: flex;
      margin-top: 20px;
      .left,.center,.right{
        text-align: center;
        width: 33.3%;
      }
      .left{
        color: rgb(110,90,200);
        border-right: 1px solid rgb(151,151,151);
        p{
          font-size: 60px;
          line-height: 84px;
          margin-bottom: 16px;
        }
        span{
          font-size: 32px;
        }
      }
      .center{
        border-right: 1px solid rgb(151,151,151);
        p{
          font-size: 60px;
          line-height: 84px;
          margin-bottom: 16px;
          color: rgb(208,2,27);
        }
        span{
          font-size: 32px;
          color: rgb(155,155,155);
        }
      }
      .right{
        color: rgb(155,155,155);
        p{
          font-size: 60px;
          line-height: 84px;
          margin-bottom: 16px;
        }
        span{
          font-size: 32px;
        }
      }
    }
  }
}
</style>
