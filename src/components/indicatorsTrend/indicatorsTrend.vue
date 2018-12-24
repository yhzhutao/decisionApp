<!--各项指标趋势界面-->
<template>
  <div class="indicatorsTrend">
    <div class="indicatorsTrend-head clearfix">
      <div class="rejection-rate" @click="selectIndicators(0)">不良率</div>
      <div class="market-share" @click="selectIndicators(1)">市占率</div>
    </div>
    <div class="content" ref="indicatorsTrend-content-wrapper">
      <div class="indicatorsTrend-content">
        <div class="rejection-rate-content" ref="rejection-rate-content">
          <div class="title clearfix">
            <span class="indicators">不良率</span>
            <router-link to="/defectiveRatio">
              <span class="more">更多</span>
            </router-link>
          </div>
          <div class="tip-container clearfix">
            <div class="tip">
              <span>当前</span><span>同期</span>
            </div>
          </div>
          <div class="container">
            <v-highchart :options="options" :styles="styles"></v-highchart>
          </div>
          <div class="content-bottom">
            <div class="left">
              <p>10%</p>
              <span>当月不良率</span>
            </div>
            <div class="center">
              <p>+10%</p>
              <span>同比变动</span>
            </div>
            <div class="right">
              <p>-10%</p>
              <span>环比变动</span>
            </div>
          </div>
        </div>
        <div class="market-share-content" ref="market-share-content">
          <div class="title clearfix">
            <span class="indicators">市占率</span>
            <router-link to="/marketShare">
              <span class="more">更多</span>
            </router-link>
          </div>
          <div class="tip-container clearfix">
            <div class="tip">
              <span>当前</span><span>同期</span>
            </div>
          </div>
          <div class="container">
            <v-highchart :options="options" :styles="styles"></v-highchart>
          </div>
          <div class="content-bottom">
            <div class="left">
              <p>10%</p>
              <span>当月不良率</span>
            </div>
            <div class="center">
              <p>+10%</p>
              <span>同比变动</span>
            </div>
            <div class="right">
              <p>-10%</p>
              <span>环比变动</span>
            </div>
          </div>
        </div>
        <div class="page-bottom">
          <ul>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">10%</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安轿车</span>
                  <p>+10%</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">10%</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安轿车</span>
                  <p>+10%</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">10%</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安轿车</span>
                  <p>+10%</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">10%</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安轿车</span>
                  <p>+10%</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">10%</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安轿车</span>
                  <p>+10%</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">10%</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安轿车</span>
                  <p>+10%</p>
                </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Highchart from '@/components/highchartsComponent/HighchartsComponent';
  import BScroll from 'better-scroll';

  export default {
    name: "indicatorsTrend",
    data() {
      return {
        options: {
          title: {
            text: ''
          },
          xAxis: {
            title:{
              text:'(月)',
              align:'high'
            },
            categories: [
              '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
            ],
            crosshair: {
              color: 'rgb(110,90,200)',
              width: '2px',
              zIndex:5
            },
            tickPosition: 'inside',
            tickmarkPlacement: 'on',
            gridLineWidth: '1px',
            gridLineColor: 'rgb(213,228,236)'
          },
          yAxis: {
            title: {
              text: ''
            },
            visible: false,
            gridLineWidth: 0
          },
          tooltip: {
            backgroundColor: 'rgb(58,195,177)',
            headerFormat: '{point.y}%',
            pointFormat: '',
            shared:true
          },
          legend: {
            enabled: false
          },
          plotOptions: {},
          colors: ['rgb(48,194,174)', 'rgb(238,238,238)'],
          credits: {enabled: false},
          exporting: {enabled: false},
          series: [{
            data: [5,22,23,44,35,16,20,9,56,44,25,96],
            color: 'rgb(238,238,238)',
            marker:{
              enabled:false,
              states:{
                hover:{
                  enabled:false
                }
              }
            },
            pointStart: 0,
            type: 'area'
          },
            {
              data: [ 5,62,23,64,78,56,60,22,43,64,85,86],
              color:'rgb(48,194,174)',
              marker:{
                enabled:false,
                symbol:'circle',
                fillColor:'rgb(110,90,200)',
                states:{
                  hover:{
                    enabled:true
                  }
                }
              }
            }]
        },
        styles: {
          width: 100,
          height: 193
        }
      }
    },
    mounted() {
      this._initScorll();
    },
    methods: {
      _initScorll() {
        this.Scroll = new BScroll(this.$refs['indicatorsTrend-content-wrapper'], {click: true});
      },
      selectIndicators(index) {
        if (index == 0) {
          let ref = this.$refs['rejection-rate-content'];
          this.Scroll.scrollToElement(ref, 300);
        } else {
          let ref = this.$refs['market-share-content'];
          this.Scroll.scrollToElement(ref, 300);
        }
      }
    },
    components: {
      'v-highchart': Highchart
    }
  }
</script>

<style lang="scss" scoped>
  .indicatorsTrend {
    .indicatorsTrend-head {
      background-color: rgb(238, 238, 238);
      padding: 32px 0;
      .rejection-rate, .market-share {
        margin-left: 32px;
        float: left;
        width: 128px;
        height: 60px;
        background-color: rgb(216, 216, 216);
        font-size: 32px;
        color: rgb(74, 74, 74);
        text-align: center;
        line-height: 60px;
        border-radius: 8px;
      }
    }
    .content {
      background-color: #fff;
      position: absolute;
      width: 100%;
      top: 208px;
      bottom: 0;
      overflow: hidden;
      .indicatorsTrend-content {
        .rejection-rate-content {
          border-bottom: 2px solid rgb(218, 223, 236);
        }
        .rejection-rate-content, .market-share-content {
          /*margin-top: 32px;*/
          padding: 52px 32px 34px 32px;
          .title {
            line-height: 44px;
            .indicators {
              display: block;
              float: left;
              font-size: 32px;
              color: rgb(50, 55, 67);
              font-weight: bold;
              &:before {
                display: inline-block;
                content: '';
                width: 24px;
                height: 24px;
                background-color: rgb(50, 55, 67);
                margin-right: 28px;
              }
            }
            .more {
              display: block;
              float: right;
              font-size: 32px;
              color: rgb(155, 155, 155);
              &:after {
                display: inline-block;
                content: '';
                width: 16px;
                height: 16px;
                border-top: 1px solid rgb(155, 155, 155);
                border-right: 1px solid rgb(155, 155, 155);
                transform: rotate(45deg);
              }
            }
          }
          .tip-container {
            .tip {
              margin-top: 32px;
              float: right;
              line-height: 34px;
              span {
                color: rgb(155, 155, 155);
                font-size: 32px;
              }
              span:first-child {
                margin-right: 32px;
                &:before {
                  display: inline-block;
                  content: '';
                  width: 20px;
                  height: 20px;
                  background-color: rgb(58, 195, 177);
                  margin-right: 32px;
                }
              }
              span:nth-child(2) {
                &:before {
                  display: inline-block;
                  content: '';
                  width: 20px;
                  height: 20px;
                  background-color: rgb(238, 238, 238);
                  margin-right: 32px;
                }
              }
            }
          }
          .container {
            margin-top: 32px;
          }
          .content-bottom {
            display: flex;
            margin-top: 40px;
            .left, .center, .right {
              text-align: center;
              width: 33.3%;
            }
            .left {
              color: rgb(58, 195, 177);
              border-right: 1px solid rgb(151, 151, 151);
              p {
                font-size: 60px;
                line-height: 84px;
                margin-bottom: 16px;
              }
              span {
                font-size: 32px;
              }
            }
            .center {
              border-right: 1px solid rgb(151, 151, 151);
              p {
                font-size: 60px;
                line-height: 84px;
                margin-bottom: 16px;
                color: rgb(208, 2, 27);
              }
              span {
                font-size: 32px;
                color: rgb(155, 155, 155);
              }
            }
            .right {
              color: rgb(48, 170, 45);
              p {
                font-size: 60px;
                line-height: 84px;
                margin-bottom: 16px;
              }
              span {
                font-size: 32px;
              }
            }
          }
        }
        .page-bottom {
          ul {
            margin-top: 46px;
            display: flex;
            flex-wrap: wrap;
            text-align: center;
            padding: 0 40px 54px;
            li {
              width: 33.33%;
              margin-bottom: 32px;
              .single-item {
                .circle {
                  position: relative;
                  margin: 0 auto;
                  width: 160px;
                  height: 160px;
                  border: 4px solid rgb(58, 195, 177);
                  border-radius: 50%;
                  .content {
                    width: 120px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    .top {
                      font-size: 40px;
                    }
                    .line {
                      border-top: 1px solid rgb(151, 151, 151);
                      margin-bottom: 10px;
                    }
                    .bottom {
                      font-size: 28px;
                      color: rgb(155, 155, 155);
                    }
                  }
                }
                span {
                  display: inline-block;
                  margin-top: 16px;
                  line-height: 44px;
                  font-size: 32px;
                  color: rgb(155, 155, 155);
                }
                p {
                  margin: 24px auto 0 auto;
                  width: 160px;
                  height: 48px;
                  background-color: rgb(216, 216, 216);
                  color: rgb(208, 2, 7);
                  font-size: 28px;
                  line-height: 48px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
