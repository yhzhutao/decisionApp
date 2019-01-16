<!--资产规模卡片-->
<template>
    <div class="assetCard">
      <div class="assetCard-head">
        <span>{{title}}</span><img :src="url" alt="">
      </div>
      <div class="asset-content">
        <p class="unit">单位：{{unit}}元</p>
        <div class="current">
          <span>当前</span>
          <div class="progress">
            <div class="progress_bg">
              <div class="progress_bar" :style="{'width':percentCurrent+'%'}"></div>
            </div>
            <div class="progress_btn" :style="{'left':percentCurrent*0.96+'%'}">
              <div class="percent">{{percentCurrent}}%</div>
            </div>
          </div>
        </div>
        <div class="synchronism">
          <span>同期</span>
        </div>
        <div class="line" :style="{'width':percentSynchronism*0.85+'%'}"></div>
        <div class="content-bottom">
          <div class="left">
            <p>{{currentSum}}</p>
            <span>{{text}}</span>
          </div>
          <div class="center">
            <p :class="[fluctuation<0?'low':'top',{fontColor:fluctuation=='—'}]" >{{fluctuation}}</p>
            <span>同比变动</span>
          </div>
          <div class="right">
            <p>{{index}}</p>
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
          text:'',
          percent:0,
          percentCurrent:0,
          percentSynchronism:0,
          currentSum:0, //当前收入/利润
          fluctuation:0, //同比变动
          index:0  //集团指标
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
            this.text='当前收入';
            this.currentSum = this.assetsScale.currentIncome;
            if(this.assetsScale.syIncome != 0){
              this.fluctuation =
                ((this.assetsScale.currentIncome-this.assetsScale.syIncome)/this.assetsScale.syIncome*100).toFixed(0);
              if(this.fluctuation>0){
                this.fluctuation='+'+this.fluctuation+'%'
              }else{
                this.fluctuation=this.fluctuation+'%'
              }

            }else{
              this.fluctuation = '—'
            }
            this.index = this.assetsScale.groupIncomeIndex;
            if((this.assetsScale.currentIncome/this.assetsScale.groupIncomeIndex*100).toFixed(0)=='NaN'){
              this.percent = 0
            }else{
              this.percent = (this.assetsScale.currentIncome/this.assetsScale.groupIncomeIndex*100).toFixed(0);
            }
            this.percentCurrent = this.percent>100?100:this.percent;
            this.percentSynchronism = (this.assetsScale.syIncome/this.assetsScale.groupIncomeIndex*100).toFixed(0);
          }else if(titleCode==1){
            this.title='利润';
            this.url=require('../../image/profit_icon@2x.png');
            this.text = '当前利润';
            this.currentSum = this.assetsScale.currentProfit;
            if(this.assetsScale.syIncome != 0){
              this.fluctuation =
                ((this.assetsScale.currentProfit-this.assetsScale.syProfit)/this.assetsScale.syProfit*100).toFixed(0);
              if(this.fluctuation>0){
                this.fluctuation='+'+this.fluctuation+'%'
              }else{
                this.fluctuation=this.fluctuation+'%'
              }
            }else{
              this.fluctuation = '—'
            }
            this.index = this.assetsScale.groupProfitIndex;
            if((this.assetsScale.currentIncome/this.assetsScale.groupIncomeIndex*100).toFixed(0)=='NaN'){
              this.percent = 0
            }else{
              this.percent = (this.assetsScale.currentIncome/this.assetsScale.groupIncomeIndex*100).toFixed(0);
            }
            this.percentCurrent = this.percent>100?100:this.percent || 0;
            this.percentSynchronism = (this.assetsScale.syProfit/this.assetsScale.groupProfitIndex*100).toFixed(0);
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
      float: right;
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
        width: 65%;
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
      /*&:after{*/
        /*display: inline-block;*/
        /*content: '';*/
        /*width: 90%;*/
        /*border-top: 2px solid rgb(218,223,236);*/
        /*vertical-align: middle;*/
      /*}*/
    }
    .synchronism{
      display: inline-block;
      span{
        line-height: 40px;
        font-size: 24px;
        color: rgb(155,155,155);
        margin-right: 8px;
      }
      /*&:after{*/
        /*display: inline-block;*/
        /*content: '';*/
        /*width: 85%;*/
        /*border-top: 2px dashed rgb(110,90,200);*/
        /*vertical-align: middle;*/
      /*}*/
    }
    .line{
      display: inline-block;
      width: 85%;
      border-top: 2px dashed rgb(110,90,200);
      vertical-align: middle;
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
