<!--资产规模卡片-->
<template>
    <div class="assetCard">
      <div class="assetCard-head">
        <span>{{title}}</span><img :src="url" alt="">
      </div>
      <div class="asset-content">
        <div class="current">
          <span>当前</span>
          <div class="progress">
            <div class="progress_bg">
              <div  class="progress_bar" :style="{'width':percentCurrent+'%'}"></div>
            </div>
            <div class="progress_btn" :style="{'left':percentCurrent*0.96+'%'}">
              <div v-show="percentCurrent!=0" class="percent">{{percentShow}}%</div>
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <div class="left">
            <p>{{ currentMonthNumber }}</p>
            <span>{{text2}}</span>
          </div>
          <div class="center">
            <p>{{currentSum}}</p>
            <span>{{text}}</span>
          </div>
          <div class="right">
            <p>{{index}}</p>
            <span>集团指标</span>
          </div>
        </div>
      </div>
      <p class="unit">单位：{{unit}}元</p>
    </div>
</template>

<script>
    export default {
      name: "assetCard",
      data(){
        return{
          title:'',
          url:'',
          text:'',
          text2:'',
          percent:0,
          percentCurrent:0,
          // percentSynchronism:0,  //同期对比
          currentSum:0, //当前收入/利润
          currentMonthNumber:'—',
          // fluctuation:0, //同比变动
          index:0,  //集团指标
          percentShow:0
        }
      },
      props:{
          titleCode:Number,
          assetsScale:Object,
          unit:String
      },
      mounted(){
        this.getTitle(this.titleCode);
      },
      methods:{
        getTitle(titleCode){
          if(titleCode==0){
            this.title='收入';
            this.url=require('../../image/income_icon@2x.png');
            this.text2 = '当月收入';
            this.text='当年累计收入';
            this.currentSum = this.assetsScale.currentIncome||'—';
            this.currentMonthNumber = this.assetsScale.currentMonthIncome||'—'
            this.index = this.assetsScale.groupIncomeIndex||'—';
            if((this.assetsScale.currentIncome/this.assetsScale.groupIncomeIndex*100).toFixed(0)=='NaN'||(this.assetsScale.currentIncome/this.assetsScale.groupIncomeIndex*100).toFixed(0)==Infinity){
              this.percent = 0
            }else{
              this.percent = (this.assetsScale.currentIncome/this.assetsScale.groupIncomeIndex*100).toFixed(0);
            }
            this.percentShow = this.percent
            this.percentCurrent = this.percent>100?100:this.percent;
          }else if(titleCode==1){
            this.title='利润';
            this.url=require('../../image/profit_icon@2x.png');
            this.text2 = '当月利润';
            this.text = '当年累计利润';
            this.currentSum = this.assetsScale.currentProfit||'—';
            this.currentMonthNumber = this.assetsScale.currentMonthProfit||'—'
            this.index = this.assetsScale.groupProfitIndex||'—';
            if((this.assetsScale.currentProfit/this.assetsScale.groupProfitIndex*100).toFixed(0)=='NaN'||(this.assetsScale.currentProfit/this.assetsScale.groupProfitIndex*100).toFixed(0)==Infinity){
              this.percent = 0
            }else{
              this.percent = (this.assetsScale.currentProfit/this.assetsScale.groupProfitIndex*100).toFixed(0);
            }
            this.percentShow = this.percent
            this.percentCurrent = this.percent>100?100:this.percent || 0;
          }else{
            return;
          }
        }
      },
      watch:{
        assetsScale:function(){
          this.getTitle(this.titleCode);
        }
      }
    }
</script>

<style lang="scss" scoped>
.assetCard{
  margin: 0 32px;
  padding: 32px 32px 42px 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0px 24px rgba(0, 0, 0, 0.5);
  .unit{
    text-align: right;
    margin-top: 38px;
    margin-left: 18px;
    font-size: 24px;
    color: rgb(155,155,155);
  }
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
    .current{
      margin-top: 70px;
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
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgb(110,90,200);
          position: absolute;
          left: 46%;
          top: -18px;
          cursor: pointer;
          box-sizing: border-box;
          box-shadow: 0 0px 6px rgba(0,0,0,.5);
          .percent{
            position: absolute;
            line-height: 48px;
            width: 96px;
            height: 48px;
            background: rgb(110,90,200);
            top: -64px;
            left:-30px;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
    .line{
      display: inline-block;
      width: 85%;
      height: 7px;
      background: #f4a100;
      vertical-align: middle;
      border-radius: 4px;
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
          font-size: 52px;
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
          font-size: 52px;
          line-height: 84px;
          margin-bottom: 16px;
          color: rgb(155,155,155);
          &.top{
            color: rgb(208,2,27);
          }
          &.low{
            color:rgb(0,128,0);
          }
        }
        span{
          font-size: 32px;
          color: rgb(155,155,155);
        }
      }
      .right{
        color: rgb(155,155,155);
        p{
          font-size: 52px;
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
