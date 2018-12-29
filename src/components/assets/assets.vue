<!--资产规模界面-->
<template>
  <div class="assets" ref="assets-wrapper">
    <div class="content">
      <div class="currentAssets">
        <div class="currentAssets-head">
          <span>当前资产规模</span><img src="../../image/capital_icon@2x.png" alt="">
        </div>
        <div class="currentAssets-content">
          <p class="unit">单位: 亿元</p>
          <p class="num">{{assetsScale.totalAssetsAmount}}</p>
          <div class="line"></div>
          <div class="content-bottom">
            <div class="chart-container">
              <canvas id="drawing" width="96" height="96"></canvas>
            </div>
            <div class="container-right">
              <div class="right-top">
                <span>{{assetsScale.salesAmount}}</span>
                <span>批售</span>
                <span>{{(wholesalePercent*100).toFixed(0)+'%'}}</span>
              </div>
              <div class="right-middle"></div>
              <div class="right-bottom">
                <span>{{assetsScale.retailAmount}}</span>
                <span>零售</span>
                <span>{{(retailPercent*100).toFixed(0)+'%'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <li>
          <v-asset :titleCode="0" :assetsScale="assetsScale"></v-asset>
        </li>
        <li>
          <v-asset :titleCode="1" :assetsScale="assetsScale"></v-asset>
        </li>
      </ul>
      <div class="bottom">
        <div class="line"></div>
        <p>已经到底了</p>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Asset from '@/components/assetCard/assetCard';
  import HighchartsComponent from '@/components/highchartsComponent/HighchartsComponent';
  import BScroll from 'better-scroll';
  import bus from '@/common/base/bus.js'

  export default {
    name: "assets",
    data() {
      return {
        chart: null,
        options: {
          chart: {
            type: 'pie',
            spacing: [0, 0, 0, 0],
            margin: 0
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: ['批售', '零售']
          },
          credits: {enabled: false},
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: false
              }
            }
          },
          series: [{
            data: [{'color': 'rgb(58,64,77)', 'y': 25.0},
              {'color': 'rgb(110,90,200)', 'y': 75.0}]
          }]
        },
        styles: {},
        wholesalePercent:0,
        retailPercent:0,
        assetsScale:{
          totalAssetsAmount:0,
          salesAmount:0,
          retailAmount:0,
          currentIncome:0,
          syIncome:0,
          groupIncomeIndex:0,
          currentProfit:0,
          syProfit:0,
          groupProfitIndex:0
        }
      }
    },
    methods: {
      _initScroll() {
        new BScroll(this.$refs['assets-wrapper'], {
          click: true
        });
      },
      //绘制饼图
      drawCircle(canvasId, data_arr, color_arr) {
        var drawing = document.getElementById(canvasId);
        let windowWidth = document.body.clientWidth;
        if(windowWidth<330){
          drawing.width = 81;
          drawing.height = 81;
        }else if(windowWidth<370){
          drawing.width = 92;
          drawing.height = 92;
        }else if(windowWidth<380){
          drawing.width = 96;
          drawing.height = 96;
        }else if(windowWidth<420){
          drawing.width = 106;
          drawing.height = 106;
        }else if(windowWidth<770){
          drawing.width = 196;
          drawing.height = 196;
        }else{
          drawing.width = 262;
          drawing.height = 262;
        }
        if (drawing.getContext) {
          let context = drawing.getContext('2d');
          let radius = drawing.height / 2,//半径
            ox = drawing.width / 2, oy = drawing.height / 2;//圆心
          let startAngle = 0, endAngle = 0;//起始、结束弧度
          for (let i = 0, len = data_arr.length; i < len; i++) {
            //绘制饼图
            endAngle += data_arr[i] * 2 * Math.PI;
            context.fillStyle = color_arr[i];
            context.beginPath();
            context.moveTo(ox, oy);
            context.arc(ox, oy, radius, startAngle, endAngle, false);
            context.closePath();
            context.fill();
            startAngle = endAngle;
          }

        }
      },
      init() {
        this.$http.post('/assetsScale?date='+20180510).then((response)=>{
          this.assetsScale = Object.assign({},this.assetsScale,response.body.data);
          this.wholesalePercent = this.assetsScale.salesAmount/this.assetsScale.totalAssetsAmount;
          this.retailPercent = this.assetsScale.retailAmount/this.assetsScale.totalAssetsAmount;
          let data_arr = [this.wholesalePercent, this.retailPercent,1-this.wholesalePercent-this.retailPercent];
          let color_arr = ['#3A404D', '#6E5AC8','#DADFEC'];
          this.drawCircle('drawing', data_arr, color_arr);
        })
      }
    },
    components: {
      'v-asset': Asset,
      'v-highchart': HighchartsComponent
    },
    mounted() {
      this.init();
      this.$nextTick(() => {
        this._initScroll();
      })
    }
  }
</script>

<style lang="scss" scoped>
  .assets {
    position: absolute;
    width: 100%;
    top: 216px;
    bottom: 0;
    overflow: hidden;
    .content {
      .currentAssets {
        margin: 0 32px;
        padding: 32px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        .currentAssets-head {
          &:before {
            display: inline-block;
            content: '';
            width: 8px;
            height: 32px;
            background: rgb(110, 90, 200);
            margin-right: 16px;
            vertical-align: middle;
          }
          span {
            font-size: 32px;
            color: rgb(170, 170, 170);
            vertical-align: middle;
            margin-right: 16px;
          }
          img {
            width: 32px;
            height: 32px;
            vertical-align: middle;
          }
        }
        .currentAssets-content {
          margin-top: 16px;
          .unit {
            color: rgb(155, 155, 155);
            font-size: 24px;
            line-height: 34px;
            margin-left: 18px;
          }
          .num {
            text-align: center;
            font-size: 88px;
            color: rgb(110, 90, 200);
            line-height: 124px;
            vertical-align: middle;
          }
          .line {
            width: 100%;
            height: 32px;
            border: 1px solid rgb(151, 151, 151);
            border-bottom: none;
          }
          .content-bottom {
            padding-left: 10px;
            .chart-container {
              display: inline-block;
              width: 192px;
              height: 192px;
              vertical-align: middle;
            }
            .container-right {
              display: inline-block;
              margin-left: 30px;
              vertical-align: middle;
              .right-top, .right-bottom {
                span:first-child {
                  font-size: 48px;
                  color: rgb(155, 155, 155);
                  margin-right: 32px;
                }
                span:nth-child(2), span:nth-child(3) {
                  font-size: 32px;
                  color: rgb(155, 155, 155)
                }
              }
              .right-top {
                span:nth-child(2) {
                  &:before {
                    display: inline-block;
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: rgb(58, 64, 77);
                    margin-right: 9px;
                  }
                }
              }
              .right-bottom {
                span:nth-child(2) {
                  &:before {
                    display: inline-block;
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: rgb(110, 90, 200);
                    margin-right: 9px;
                  }
                }
              }
              .right-middle {
                border-top: 1px dashed rgb(155, 155, 155);
                margin: 14px 0;
              }
            }
          }
        }
      }
      ul {
        li {
          margin-top: 32px;
        }
      }
      .bottom {
        margin: 16px 32px;
        display: flex;
        p {
          padding: 0 10px;
          font-size: 24px;
          color: rgb(155, 155, 155);
        }
        .line {
          flex: 1;
          border-top: 1px dashed rgb(151, 151, 151);
          margin-top: 12px;
        }
      }
      &:after {
        content: '';
        display: block;
        height: 16px;
        width: 100%;
      }
    }
  }
</style>
