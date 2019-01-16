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
            <v-highchart :options="defectiveRateOptions" :styles="styles"></v-highchart>
          </div>
          <div class="content-bottom">
            <div class="left">
              <p>{{currentMonthDefectiveRate+(currentMonthDefectiveRate !=='—' ?'%':'')}}</p>
              <span>当月不良率</span>
            </div>
            <div class="center">
              <p :class="baseYearRateShow>0?'top':'low'">{{baseYearRateShow+(baseYearRateShow !=='—' ?'%':'')}}</p>
              <span>同比变动</span>
            </div>
            <div class="right">
              <p :class="baseMonthRate>0?'top':'low'">{{baseMonthRateShow+(baseMonthRateShow !=='—' ?'%':'')}}</p>
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
            <v-highchart :options="marketShareOptions" :styles="styles"></v-highchart>
          </div>
          <div class="content-bottom">
            <ul>
              <li>
                <div class="vary">
                  <p>{{currentMonthMarketShare+(currentMonthMarketShare !=='—' ?'%':'')}}</p>
                  <span>当月市占率</span>
                </div>
              </li>
              <li>
                <div class="vary">
                  <p :class="[baseMonthMarketShareRate>0?'top':'low',{fontColor:baseMonthMarketShareRate=='—'}]">{{baseMonthMarketShareRate>0?'+':''}}{{baseMonthMarketShareRate+(baseMonthMarketShareRate !=='—' ?'%':'')}}</p>
                  <span>当月环比变化</span>
                </div>
              </li>
              <li>
                <div class="vary">
                  <p>{{currentMonthMarketShareSum+(currentMonthMarketShareSum !=='—' ?'%':'')}}</p>
                  <span>当年累计市占率</span>
                </div>
              </li>
              <li>
                <div class="vary">
                  <p :class="[baseYearMarketShareRate>0?'top':'low',{fontColor:baseYearMarketShareRate=='—'}]">{{baseYearMarketShareRate+(baseYearMarketShareRate !=='—' ?'%':'')}}</p>
                  <span>当年同比变化</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="page-bottom">
          <ul>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentCar+(currentCar !=='—' ?'%':'')}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安轿车</span>
                  <p :class="{fontColor:comparedCar=='—'}" :style='{color:comparedCar>0?"#d0021b":"#30aa2d"}'>{{comparedCar+(comparedCar !=='—' ?'%':'')}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentFord+(currentFord !=='—' ?'%':'')}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安福特</span>
                  <p :style='{color:comparedFord>0?"#d0021b":"#30aa2d"}'>{{comparedFord+(comparedFord !=='—' ?'%':'')}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentOs+(currentOs !=='—' ?'%':'')}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安欧尚</span>
                  <p :style='{color:comparedOs>0?"#d0021b":"#30aa2d"}'>{{comparedOs+(comparedOs !=='—' ?'%':'')}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentMazda+(currentMazda !=='—' ?'%':'')}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安马自达</span>
                  <p :style='{color:comparedMazda>0?"#d0021b":"#30aa2d"}'>{{comparedMazda+(comparedMazda !=='—' ?'%':'')}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentDs+(currentDs !=='—' ?'%':'')}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安DS</span>
                  <p :class="{fontColor:comparedCar=='—'}" :style='{color:comparedDs>0?"#d0021b":"#30aa2d"}'>{{comparedDs+(comparedDs !=='—' ?'%':'')}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentSuzuki+(currentSuzuki !=='—' ?'%':'')}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安铃木</span>
                  <p :style='{color:comparedSuzuki>0?"#d0021b":"#30aa2d"}'>{{comparedSuzuki+(comparedSuzuki !=='—' ?'%':'')}}</p>
                </span>
            </li>
          </ul>
          <p class="desc">*方框内百分比为当月环比变动值</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Highchart from '@/components/highchartsComponent/HighchartsComponent';
  import BScroll from 'better-scroll';
  import { host } from "@/common/base/baseHttp.js"
  import bus from '@/common/base/bus'
  import tokenInvalid from '@/common/base/tokenInvalid'
  import { Toast } from 'mint-ui';
  export default {
    name: "indicatorsTrend",
    data() {
      return {
        date: 0,
        defectiveRateOptions: {
          title: {
            text: ''
          },
          xAxis: {
            title: {
              text: '(月)',
              align: 'high'
            },
            categories: [
              '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
            ],
            crosshair: {
              color: 'rgb(110,90,200)',
              width: '2px',
              zIndex: 5
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
            data: [null, null, null, null, null, null, null, null, null, null, null, null],
            color: 'rgb(238,238,238)',
            marker: {
              enabled: false,
              states: {
                hover: {
                  enabled: false
                }
              }
            },
            pointStart: 0,
            type: 'area'
          },
            {
              data: [null, null, null, null, null, null, null, null, null, null, null, null],
              color: 'rgb(48,194,174)',
              marker: {
                enabled: false,
                symbol: 'circle',
                fillColor: 'rgb(110,90,200)',
                states: {
                  hover: {
                    enabled: true
                  }
                }
              }
            }]
        },
        marketShareOptions: {
          title: {
            text: ''
          },
          xAxis: {
            title: {
              text: '(月)',
              align: 'high'
            },
            categories: [
              '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
            ],
            crosshair: {
              color: 'rgb(110,90,200)',
              width: '2px',
              zIndex: 5
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
            shared: true
          },
          legend: {
            enabled: false
          },
          plotOptions: {},
          colors: ['rgb(48,194,174)', 'rgb(238,238,238)'],
          credits: {enabled: false},
          exporting: {enabled: false},
          series: [{
            data: [null, null, null, null, null, null, null, null, null, null, null, null],
            color: 'rgb(238,238,238)',
            marker: {
              enabled: false,
              states: {
                hover: {
                  enabled: false
                }
              }
            },
            pointStart: 0,
            type: 'area'
          },
            {
              data: [null, null, null, null, null, null, null, null, null, null, null, null],
              color: 'rgb(48,194,174)',
              marker: {
                enabled: false,
                symbol: 'circle',
                fillColor: 'rgb(110,90,200)',
                states: {
                  hover: {
                    enabled: true
                  }
                }
              }
            }]
        },
        styles: {
          width: 100,
          height: 193
        },
        marketShareRatioBrands: [],//10个品牌的当月市占率和上月市占率
        monthsDefectiveRatios: [],//图标中的数据
        currentMonthDefectiveRate: 0,//当月不良率
        baseYearRate: 0,//当年不良率同比变动值
        baseMonthRate: 0,//当月不良率环比变动值
        currentMonthMarketShare: 0,//当月市占率
        currentMonthMarketShareSum: 0,//当月累计市占率
        baseYearMarketShareRate:0,//当年市占率同比变动值
        baseMonthMarketShareRate:0//当月市占率环比变动值
      }
    },
    created() {
      let that = this;
      that.init(this.selectDate)
      bus.$off('selectDate')
      bus.$on('selectDate', function (date) {
        that.init(date);
      })
    },
    props: [
      'selectDate'
    ],
    mounted() {
      this.Scroll = new BScroll(this.$refs['indicatorsTrend-content-wrapper'], {click: true});
    },
    methods: {
      init(date) {
        let urlHost = host||'/api'
        let month = date.substring(4, 6);
        this.$http.post(urlHost+'/Decision/indicatorsClass',{date:date}).then((response) => {
          let data =JSON.parse(response.bodyText).result
          let code = JSON.parse(response.bodyText).code
          if(code==0){
            this.marketShareRatioBrands = data.marketShareRatioBrand;
            this.monthsDefectiveRatios = data.monthsDefectiveRatio;
            this.initChart();
            this.initNum(month);
          }else if(code ==20){
            tokenInvalid()
          }else{
            Toast(JSON.parse(res.bodyText).message)
          }
        });
      },
      //初始化两条折线图
      initChart() {
        if (this.monthsDefectiveRatios) {
          this.monthsDefectiveRatios.forEach((monthsDefectiveRatio) => {
            if (monthsDefectiveRatio.indexName == 'defectiveRate') {
              console.log(monthsDefectiveRatio)
              this.defectiveRateOptions = JSON.parse(JSON.stringify(this.defectiveRateOptions))
              this.defectiveRateOptions.series[0].data = monthsDefectiveRatio.lastYearRatio;
              this.defectiveRateOptions.series[1].data = monthsDefectiveRatio.currentRatio;
            } else if (monthsDefectiveRatio.indexName == 'marketShare') {
              this.marketShareOptions = JSON.parse(JSON.stringify(this.marketShareOptions))
              this.marketShareOptions.series[0].data = monthsDefectiveRatio.lastYearRatio;
              this.marketShareOptions.series[1].data = monthsDefectiveRatio.currentRatio;
            }
          })
        }
      },
      //初始化上面三个框和下面四个框的数据
      initNum(month) {
        if (this.monthsDefectiveRatios) {
          this.monthsDefectiveRatios.forEach((monthsDefectiveRatio) => {
            if (monthsDefectiveRatio.indexName == 'defectiveRate') {
              // this.defectiveRateOptions.series[0].data = monthsDefectiveRatio.lastYearRatio;
              let currentMonthDefectiveRate = monthsDefectiveRatio.currentRatio[month - 1]
              this.currentMonthDefectiveRate = currentMonthDefectiveRate?currentMonthDefectiveRate.toFixed(2):currentMonthDefectiveRate||'—';
              let currentSum = 0;//从第一个月到当前月的累计值（当年不良率）
              let lastYearSum = 0;//从第一个月到当前月的累计值（去年不良率）
              for (let i = 0; i < month; i++) {
                currentSum += monthsDefectiveRatio.currentRatio[i];
                lastYearSum += monthsDefectiveRatio.lastYearRatio[i];
              }
              //判断是否为Infinity
              if(((currentSum - lastYearSum) / lastYearSum * 100).toFixed(0)==Infinity||((currentSum - lastYearSum) / lastYearSum * 100).toFixed(0) =='NaN'){
                this.baseYearRate = '—';
              }else{
                this.baseYearRate = ((currentSum - lastYearSum) / lastYearSum * 100).toFixed(0);
              }
              this.baseMonthRate = +((monthsDefectiveRatio.currentRatio[month - 1] - monthsDefectiveRatio.currentRatio[month - 2]) / monthsDefectiveRatio.currentRatio[month - 2] * 100).toFixed(0)||'—'
            } else if (monthsDefectiveRatio.indexName == 'marketShare') {
              this.currentMonthMarketShare = monthsDefectiveRatio.currentRatio[month - 1].toFixed(2)||"—";
              let currentmarketShareSum = 0;//从第一个月到当前月的累计值（当年市占率）
              let lastYearmarketShareSum = 0;//从第一个月到当前月的累计值（去年市占率）
              for (let i = 0; i < month; i++) {
                currentmarketShareSum += monthsDefectiveRatio.currentRatio[i];
                lastYearmarketShareSum +=monthsDefectiveRatio.lastYearRatio[i];
              }
              if(lastYearmarketShareSum==0){
                this.baseYearMarketShareRate = '—'
              }else{
                this.baseYearMarketShareRate=+((currentmarketShareSum-lastYearmarketShareSum)/lastYearmarketShareSum*100).toFixed(0)||'—';
              }
              //判断是否为Infinity和Nan
              if((monthsDefectiveRatio.currentRatio[month - 2]*100).toFixed(0)==0||(monthsDefectiveRatio.currentRatio[month - 2]*100).toFixed(0)=='NaN'){
                this.baseMonthMarketShareRate = '—'
  }else{
                this.baseMonthMarketShareRate =
                  +((monthsDefectiveRatio.currentRatio[month - 1]-monthsDefectiveRatio.currentRatio[month - 2])/monthsDefectiveRatio.currentRatio[month - 2]*100).toFixed(0)||'—';
              }

              this.currentMonthMarketShareSum = currentmarketShareSum == 0 ?'—':currentmarketShareSum.toFixed(2);
            }
          })
        }
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
    computed: {
      //长安轿车当月市占率
      currentCar: function () {
        let currentSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'BRAND20180128' || marketShareRatioBrand.brandName == 'carBrand9879')) {
            currentSum += marketShareRatioBrand.current
          }
        });
        return currentSum==0?'—':currentSum.toFixed(2);
      },
      //长安轿车当月环比变动值
      comparedCar: function () {
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'BRAND20180128' || marketShareRatioBrand.brandName == 'carBrand9879')) {
            synchronSum += marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentCar - synchronSum) / synchronSum * 100).toFixed(0);
        if(!middle||middle==Infinity){
          return '—'
        }
        return middle >= 0 ? '+' + middle : middle;
      },
      //长安福特当月市占率
      currentFord: function () {
        let currentSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'carBrand9876')) {
            currentSum += marketShareRatioBrand.current
          }
        });
        return currentSum==0?'—':currentSum.toFixed(2);
      },
      //长安福特当月环比变动值
      comparedFord: function () {
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'carBrand9876')) {
            synchronSum += marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentFord - synchronSum) / synchronSum * 100).toFixed(0);
        if(!middle||middle==Infinity){
          return '—'
        }
        return middle >= 0 ? '+' + middle : middle;
      },
      //长安欧尚当月市占率
      currentOs: function () {
        let currentSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'BRAND20180093' || marketShareRatioBrand.brandName == 'BRAND20180094' || marketShareRatioBrand.brandName == 'carBrand9875')) {
            currentSum += marketShareRatioBrand.current;
          }
        });
        return currentSum==0?'—':currentSum.toFixed(2);
      },
      //长安欧尚当月环比变动值
      comparedOs: function () {
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'BRAND20180093' || marketShareRatioBrand.brandName == 'BRAND20180094' || marketShareRatioBrand.brandName == 'carBrand9875')) {
            synchronSum += marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentOs - synchronSum) / synchronSum * 100).toFixed(0);
        if(!middle||middle==Infinity){
          return '—'
        }
        return middle >= 0 ? '+' + middle : middle;
      },
      //长安马自达当月市占率
      currentMazda: function () {
        let currentSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'carBrand9877')) {
            currentSum += marketShareRatioBrand.current
          }
        });
        return currentSum==0?'—':currentSum.toFixed(2);
      },
      //长安马自达当月环比变动值
      comparedMazda: function () {
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'carBrand9877')) {
            synchronSum += marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentMazda - synchronSum) / synchronSum * 100).toFixed(0);
        if(!middle||middle==Infinity){
          return '—'
        }
        return middle >= 0 ? '+' + middle : middle;
      },
      //长安DS当月市占率
      currentDs: function () {
        let currentSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'carSeries0029')) {
            currentSum += marketShareRatioBrand.current
          }
        });
        return currentSum==0?'—':currentSum.toFixed(2);
      },
      //长安DS当月环比变动值
      comparedDs: function () {
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'carSeries0029')) {
            synchronSum += marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentDs - synchronSum) / synchronSum * 100).toFixed(0);
        if(!middle||middle==Infinity){
          return '—'
        }
        return middle >= 0 ? '+' + middle :  middle;
      },
      //长安铃木当月市占率
      currentSuzuki: function () {
        let currentSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'carBrand9878')) {
            currentSum += marketShareRatioBrand.current
          }
        });
        return currentSum==0?'—':currentSum.toFixed(2);
      },
      //长安铃木当月环比变动值
      comparedSuzuki: function () {
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand) => {
          if (marketShareRatioBrand && (marketShareRatioBrand.brandName == 'carBrand9878')) {
            synchronSum += marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentSuzuki - synchronSum) / synchronSum * 100).toFixed(0);
        if(!middle||middle==Infinity){
          return '—'
        }
        return middle >= 0 ? '+' + middle : middle;
      },
      //当年不良率同比变动值(展示，添加了'+')
      baseYearRateShow: function () {
        return this.baseYearRate > 0 ? '+' + this.baseYearRate : this.baseYearRate;
      },
      //当月不良率环比变动值(展示，添加了'+')
      baseMonthRateShow: function () {
        return this.baseMonthRate > 0 ? '+' + this.baseMonthRate : this.baseMonthRate;
      },
      //当年市占率同比变动值(展示，添加了'+')
      baseYearMarketShareRateShow:function(){
        return this.baseYearMarketShareRate>0? '+'+this.baseYearMarketShareRate:this.baseYearMarketShareRate;
      },
      //当月不良率环比变动值(展示，添加了'+')
      baseMonthMarketShareRateShow:function(){
        return this.baseMonthMarketShareRate>0? '+'+this.baseMonthMarketShareRate:this.baseMonthMarketShareRate;
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
                -webkit-transform: rotate(45deg);
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

        }
        .rejection-rate-content {
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
                word-break: break-word;
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
                &.top {
                  color: rgb(208, 2, 27);
                }
                &.low {
                  color: rgb(48, 170, 45);
                }
              }
              span {
                font-size: 32px;
                color: rgb(155, 155, 155);
              }
            }
            .right {
              p {
                font-size: 60px;
                line-height: 84px;
                margin-bottom: 16px;
                &.top {
                  color: rgb(208, 2, 27);
                }
                &.low {
                  color: rgb(48, 170, 45);
                }
              }
              span {
                font-size: 32px;
                color: rgb(155, 155, 155);
              }
            }
          }
        }
        .market-share-content {
          .content-bottom {
            /*margin-top: 40px;*/
            ul {
              display: flex;
              flex-wrap: wrap;
              li {
                width: 50%;
                box-sizing: border-box;
                padding: 20px;
                .vary {
                  margin: 0 auto;
                  border: 1px dashed #9f9f9f;
                  height: 160px;
                  width: 280px;
                  text-align: center;
                  p {
                    font-size: 60px;
                    line-height: 100px;
                    color: #3ac3b1;
                    &.top {
                      color: rgb(208, 2, 27);
                    }
                    &.low {
                      color: rgb(48, 170, 45);
                    }
                  }
                  span {
                    font-size: 32px;
                    line-height: 50px;
                    color: #9b9b9b;
                  }
                }
              }
            }
          }
        }
        .page-bottom {
          ul {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            text-align: center;
            padding: 0 40px;
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
                    -webkit-transform: (-50%,-50%);
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
                  font-size: 28px;
                  line-height: 48px;
                }
              }
            }
          }
          .desc{
            font-size: 24px;
            text-align: right;
            padding: 0 40px;
            color: #9b9b9b;
          }
        }
      }
    }
  }
</style>
