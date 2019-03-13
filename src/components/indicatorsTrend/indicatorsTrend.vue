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
            <v-highchart :options="defectiveRateOptions" :styles="styles" :selectDate="selectDate"></v-highchart>
          </div>
          <div class="content-bottom">
            <div class="left">
              <p>{{defectiveRate+(defectiveRate !=='—' ?'%':'')}}</p>
              <span>当月不良率</span>
            </div>
            <div class="center">
              <p :class="[baseRateShow>0?'top':'low',baseRateShow.length>6?'small':'']">{{baseRateShow+(baseRateShow !=='—' ?'%':'')}}</p>
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
            <v-highchart :options="marketShareOptions" :styles="styles" :selectDate="selectDate"></v-highchart>
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
                  <p>{{yearMarketShareRatio+(yearMarketShareRatio !=='—' ?'%':'')}}</p>
                  <span>当年累计市占率</span>
                </div>
              </li>
              <li>
                <div class="vary">
                  <p :class="[marketShareRatioYoyShow>0?'top':'low',{fontColor:marketShareRatioYoyShow=='—'}]">{{marketShareRatioYoyShow+(marketShareRatioYoyShow !=='—' ?'%':'')}}</p>
                  <span>当年同比变化</span>
                </div>
              </li>
            </ul>
            <div v-show="contactDate!=null" class="desc">*当年累计市占率截止{{contactDate}}末</div>
          </div>
        </div>
        <div class="page-bottom">
          <ul>
            <li v-for="(item,index) of brandArr">
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentCar(item)+(currentCar(item) !=='—' ?'%':'')}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>{{ item.brandName }}</span>
                  <p :class="{fontColor:comparedCar(item)=='—'}" :style='{color:comparedCar(item)>0?"#d0021b":"#30aa2d"}'>{{comparedCar(item)+(comparedCar(item) !=='—' ?'%':'')}}</p>
                </span>
            </li>
          </ul>
          <p v-show="brandArr.length > 0" class="desc">*方框内百分比为当月环比变动值</p>
        </div>
        <div class="bottomBox"></div>
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
        contactDate:'',
        defectiveRateOptions: {
          chart: {
            type: 'line'
          },
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
              color: 'rgb(48,194,174)',
              width: '2px',
              zIndex: 5
            },
            enableMouseTracking: false,
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
            enabled: true,
          },
          legend: {
            enabled: false
          },
          plotOptions: {},
          colors: ['rgb(48,194,174)', 'rgb(238,238,238)'],
          credits: {enabled: false},
          exporting: {enabled: false},
          series: [{
            allowPointSelect: false,
            enableMouseTracking:false,
            data: [null, null, null, null, null, null, null, null, null, null, null, null],
            color: 'rgb(238,238,238)',
            marker: {
              enabled: false
            },
            pointStart: 0,
            type: 'area'
          },
            {
              allowPointSelect: false,
              data: [null, null, null, null, null, null, null, null, null, null, null, null],
              color: 'rgb(48,194,174)',
              marker: {
                symbol: 'circle',
                enabled: true
              },
            }]
        },
        marketShareOptions: {
          chart: {
            type: 'line'
          },
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
              color: 'rgb(48,194,174)',
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
            enabled: true,
          },
          legend: {
            enabled: false
          },
          plotOptions: {},
          colors: ['rgb(48,194,174)', 'rgb(238,238,238)'],
          credits: {enabled: false},
          exporting: {enabled: false},
          series: [{
            enableMouseTracking:false,
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
                symbol: 'circle',
                enabled: true
              },
            }]
        },
        styles: {
          width: 100,
          height: 193
        },
        brandArr:[],
        marketShareRatioBrands: [],//10个品牌的当月市占率和上月市占率
        monthsDefectiveRatios: [],//图标中的数据
        defectiveRate: 0,//当月不良率
        baseRate: 0,//当月不良率同比变动值
        baseMonthRate: 0,//当月不良率环比变动值
        currentMonthMarketShare: 0,//当月市占率
        baseMonthMarketShareRate:0,//当月市占率环比变动值
        marketShareRatioYoy:0,//当年累计市占率
        yearMarketShareRatio:0//当年同比变化
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
            if(data.contactDate){
              this.contactDate = data.contactDate.substr(0,4)+'年'+data.contactDate.substr(4,2)+'月'
            }else{
              this.contactDate = data.contactDate
            }
            this.brandArr = data.marketShareRatioBrand
            this.marketShareRatioBrands = data.marketShareRatioBrand;
            this.monthsDefectiveRatios = data.monthsDefectiveRatio;
            //当年同比变化是否为null
            if(data.marketShareRatioYoy!==null){
              this.marketShareRatioYoy = (data.marketShareRatioYoy*100).toFixed(2)
            }else{
              this.marketShareRatioYoy = null
            }

            //判断当年累计是市占率是否为null
            if(data.yearMarketShareRatio !==null){
              this.yearMarketShareRatio = (data.yearMarketShareRatio*100).toFixed(2)
            }else{
              this.yearMarketShareRatio = '—'
            }
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
              this.defectiveRateOptions = JSON.parse(JSON.stringify(this.defectiveRateOptions))
              this.defectiveRateOptions.series[0].data = this.arrFormatter(monthsDefectiveRatio.lastYearRatio);
              this.defectiveRateOptions.series[1].data = this.arrFormatter(monthsDefectiveRatio.currentRatio);
            } else if (monthsDefectiveRatio.indexName == 'marketShare') {
              this.marketShareOptions = JSON.parse(JSON.stringify(this.marketShareOptions))
              this.marketShareOptions.series[0].data = this.arrFormatter(monthsDefectiveRatio.lastYearRatio);
              this.marketShareOptions.series[1].data = this.arrFormatter(monthsDefectiveRatio.currentRatio);
            }
          })
        }
      },
      //初始化上面三个框和下面四个框的数据
      initNum(month) {
        if (this.monthsDefectiveRatios) {
          this.monthsDefectiveRatios.forEach((monthsDefectiveRatio) => {
            if (monthsDefectiveRatio.indexName == 'defectiveRate') {
              let currentMonth = monthsDefectiveRatio.currentRatio[month-1];//当月
              let lastCurrentMonth = monthsDefectiveRatio.lastYearRatio[month-1];//去年当月
              //判断当月不良率是不是'null'
              if(currentMonth !== null){
                this.defectiveRate = (currentMonth*100).toFixed(2)
              }else{
                this.defectiveRate = '—'
              }
              //判断是否为Infinity
              if(lastCurrentMonth== 0||lastCurrentMonth==null||currentMonth==null){
                this.baseRate = '—';
              }else{
                this.baseRate = ((currentMonth - lastCurrentMonth) / lastCurrentMonth * 100).toFixed(0);
              }
              //环比变动
              if(month!=1){
                if(monthsDefectiveRatio.currentRatio[month - 1]==null||monthsDefectiveRatio.currentRatio[month - 2]==null){
                  this.baseMonthRate = '—'
                }else {
                  this.baseMonthRate =  ((monthsDefectiveRatio.currentRatio[month - 1]-monthsDefectiveRatio.currentRatio[month - 2])/(monthsDefectiveRatio.currentRatio[month - 2])*100).toFixed(2)
                }
              }else{
                if(monthsDefectiveRatio.currentRatio[month - 1]==null||monthsDefectiveRatio.lastYearRatio[11]==null){
                  this.baseMonthRate = '—'
                }else{
                  this.baseMonthRate =  ((monthsDefectiveRatio.currentRatio[month - 1]-monthsDefectiveRatio.lastYearRatio[11])/(monthsDefectiveRatio.lastYearRatio[11])*100).toFixed(2)
                }
              }
            } else if (monthsDefectiveRatio.indexName == 'marketShare') {
              //判断当月市占率是否为null
              if(monthsDefectiveRatio.currentRatio[month - 1]!==null){
                this.currentMonthMarketShare =(monthsDefectiveRatio.currentRatio[month - 1]*100).toFixed(2);
              }else{
                this.currentMonthMarketShare = '—'
              }
               if(month!=1){
                 if(monthsDefectiveRatio.currentRatio[month - 1]==null||monthsDefectiveRatio.currentRatio[month - 2]==null){
                   this.baseMonthMarketShareRate = '—'
                 }else{
                   this.baseMonthMarketShareRate = ((monthsDefectiveRatio.currentRatio[month - 1]-monthsDefectiveRatio.currentRatio[month - 2])/(monthsDefectiveRatio.currentRatio[month - 2])*100).toFixed(2)
                 }
               }else{
                 if(monthsDefectiveRatio.currentRatio[month - 1] == null||monthsDefectiveRatio.lastYearRatio[11] == null){
                   this.baseMonthMarketShareRate = '—'
                 }else{
                   this.baseMonthMarketShareRate = ((monthsDefectiveRatio.currentRatio[month - 1]-monthsDefectiveRatio.lastYearRatio[11])/(monthsDefectiveRatio.lastYearRatio[11])*100).toFixed(2)

                 }
               }
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
      },
      //数组数据乘以100
      arrFormatter:function(arr){
        return arr.map(function(item){
          if(item==null){
            return null
          }else{
            return Number((item*100).toFixed(4))
          }
        })
      },
      //数组数据乘以1000
      arrFormatterThousand:function(arr){
        return arr.map(function(item){
          if(item==null){
            return null
          }else{
            return Number((item*1000).toFixed(4))
          }
        })
      },
      //各品牌当月市占率
      currentCar: function (item) {
        let currentSum = item.current;
        return currentSum==0?'—':Math.round(currentSum*100);
      },
      //当月环比变动值
      comparedCar: function (item) {
        let synchronSum = item.synchron;
        let middle = +((this.currentCar(item)/100 - synchronSum) / synchronSum * 100).toFixed(0);
        if(isNaN(middle)==true||middle==Infinity){
          return '—'
        }
        return middle > 0 ? '+' + middle : middle;
      }
    },
    computed: {
      //当月不良率同比变动值(展示，添加了'+')
      baseRateShow: function () {
        return this.baseRate > 0 ? '+' + this.baseRate : this.baseRate;
      },
      //当月不良率环比变动值(展示，添加了'+')
      baseMonthRateShow: function () {
        if(this.baseMonthRate!='NaN'){
          return this.baseMonthRate > 0 ? '+' + this.baseMonthRate : this.baseMonthRate;
        }else{
          return '—'
        }
      },
      //当年市占率同比变动值(展示，添加了'+')
      baseYearMarketShareRateShow:function(){
        return this.baseYearMarketShareRate>0? '+'+this.baseYearMarketShareRate:this.baseYearMarketShareRate;
      },
      //当月市占率环比变动值(展示，添加了'+')
      baseMonthMarketShareRateShow:function(){
        return this.baseMonthMarketShareRate>0? '+'+this.baseMonthMarketShareRate:this.baseMonthMarketShareRate;
      },
      marketShareRatioYoyShow:function(){
        if(this.marketShareRatioYoy){
          return this.marketShareRatioYoy>0?'+'+this.marketShareRatioYoy:this.marketShareRatioYoy;
        }else{
          return '—'
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
              height: 45px;
              width: 100px;
              &:after {
                display: inline-block;
                content: '';
                width: 16px;
                height: 16px;
                border-top: 1px solid rgb(155, 155, 155);
                border-right: 1px solid rgb(155, 155, 155);
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                margin-bottom: 2px;
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
                font-size: 52px;
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
                font-size: 52px;
                line-height: 84px;
                margin-bottom: 16px;
                &.top {
                  color: rgb(208, 2, 27);
                }
                &.low {
                  color: rgb(48, 170, 45);
                }
                &.small {
                  font-size: 45px;
                }
              }
              span {
                font-size: 32px;
                color: rgb(155, 155, 155);
              }
            }
            .right {
              p {
                font-size: 52px;
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
                    font-size: 52px;
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
            .desc{
              font-size: 24px;
              text-align: right;
              padding: 0 40px;
              color: red;
            }
          }
        }
        .page-bottom {
          padding-bottom: 30px;
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
            color: red;
          }
        }
      }
    }
  }
</style>
