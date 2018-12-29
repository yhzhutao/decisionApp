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
            <v-highchart :options="marketShareOptions" :styles="styles"></v-highchart>
          </div>
          <div class="content-bottom">
            <ul>
              <li>
                <div class="vary">
                  <p>10%</p>
                  <span>当月市占率</span>
                </div>
              </li>
              <li>
                <div class="vary">
                  <p>-10%</p>
                  <span>当月环比变化</span>
                </div>
              </li>
              <li>
                <div class="vary">
                  <p>10%</p>
                  <span>当月累计市占率</span>
                </div>
              </li>
              <li>
                <div class="vary">
                  <p>+10%</p>
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
                      <div class="top">{{currentCar+'%'}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安轿车</span>
                  <p>{{comparedCar+'%'}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentFord+'%'}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安福特</span>
                  <p>{{comparedFord+'%'}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentOs+'%'}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安欧尚</span>
                  <p>{{comparedOs+'%'}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentMazda+'%'}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安马自达</span>
                  <p>{{comparedMazda+'%'}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentDs+'%'}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安DS</span>
                  <p>{{comparedDs+'%'}}</p>
                </span>
            </li>
            <li>
                <span class="single-item">
                  <div class="circle">
                    <div class="content">
                      <div class="top">{{currentSuzuki+'%'}}</div>
                      <div class="line"></div>
                      <div class="bottom">当月</div>
                    </div>
                  </div>
                  <span>长安铃木</span>
                  <p>{{comparedSuzuki+'%'}}</p>
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
  import Bus from '@/common/base/bus.js';
  export default {
    name: "indicatorsTrend",
    data() {
      return {
        date:0,
        defectiveRateOptions: {
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
            data: [30,82,90,44,35,16,50,9,56,44,25,96],
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
              data: [ 35,62,23,64,78,56,60,22,43,64,85,86],
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
        marketShareOptions: {
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
            data: [30,82,90,44,35,16,50,9,56,44,25,96],
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
              data: [ 35,62,23,64,78,56,60,22,43,64,85,86],
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
        },
        marketShareRatioBrands:[],//10个品牌的当月市占率和上月市占率
        monthsDefectiveRatios:[],//图标中的数据
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        Bus.$on('selectDate',function(val){
            this.date = val;
          });
        // console.log(this.date);
        this.$http.post('/indicatorsClass?date='+this.date).then((response)=>{
          this.marketShareRatioBrands =response.body.data.marketShareRatioBrands;
          this.monthsDefectiveRatios = response.body.data.monthsDefectiveRatios;
          this.initChart();
        });
        this.Scroll = new BScroll(this.$refs['indicatorsTrend-content-wrapper'], {click: true});
      },
      initChart(){
        console.log(11);
        if(this.monthsDefectiveRatios){
          console.log(12);
          this.monthsDefectiveRatios.forEach((monthsDefectiveRatio)=>{
            if(monthsDefectiveRatio.indexName=='defectiveRate'){
              this.defectiveRateOptions.series[0].data = monthsDefectiveRatio.lastYearRatio;
              this.defectiveRateOptions.series[1].data = monthsDefectiveRatio.currentRatio;
              console.log(this.defectiveRateOptions.series[0].data);
            }else if(monthsDefectiveRatio.indexName=='marketShare'){
              this.marketShareOptions.series[0].data = monthsDefectiveRatio.lastYearRatio;
              this.marketShareOptions.series[1].data = monthsDefectiveRatio.currentRatio;
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
    computed:{
      //长安轿车当月市占率
      currentCar:function(){
        let currentSum=0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='BRAND20180128'||marketShareRatioBrand.brandName=='carBrand9879')){
            currentSum+=marketShareRatioBrand.current
          }
        });
        return currentSum;
      },
      //长安轿车当月环比变动值
      comparedCar:function(){
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='BRAND20180128'||marketShareRatioBrand.brandName=='carBrand9879')){
            synchronSum+=marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentCar - synchronSum)/synchronSum*100).toFixed(0);
        return middle>=0?'+'+middle:'-'+middle;
      },
      //长安福特当月市占率
      currentFord:function(){
        let currentSum=0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='carBrand9876')){
            currentSum+=marketShareRatioBrand.current
          }
        });
        return currentSum;
      },
      //长安福特当月环比变动值
      comparedFord:function(){
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='carBrand9876')){
            synchronSum+=marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentFord - synchronSum)/synchronSum*100).toFixed(0);
        return middle>=0?'+'+middle:'-'+middle;
      },
      //长安欧尚当月市占率
      currentOs:function(){
        let currentSum=0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='BRAND20180093'||marketShareRatioBrand.brandName=='BRAND20180094'||marketShareRatioBrand.brandName=='carBrand9875')){
            currentSum += marketShareRatioBrand.current;
          }
        });
        return currentSum;
      },
      //长安欧尚当月环比变动值
      comparedOs:function(){
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='BRAND20180093'||marketShareRatioBrand.brandName=='BRAND20180094'||marketShareRatioBrand.brandName=='carBrand9875')){
            synchronSum+=marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentOs - synchronSum)/synchronSum*100).toFixed(0);
        return middle>=0?'+'+middle:'-'+middle;
      },
      //长安马自达当月市占率
      currentMazda:function(){
        let currentSum=0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='carBrand9877')){
            currentSum+=marketShareRatioBrand.current
          }
        });
        return currentSum;
      },
      //长安马自达当月环比变动值
      comparedMazda:function(){
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='carBrand9877')){
            synchronSum+=marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentMazda - synchronSum)/synchronSum*100).toFixed(0);
        return middle>=0?'+'+middle:'-'+middle;
      },
      //长安DS当月市占率
      currentDs:function(){
        let currentSum=0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='carSeries0029')){
            currentSum+=marketShareRatioBrand.current
          }
        });
        return currentSum;
      },
      //长安DS当月环比变动值
      comparedDs:function(){
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='carSeries0029')){
            synchronSum+=marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentDs - synchronSum)/synchronSum*100).toFixed(0);
        return middle>=0?'+'+middle:'-'+middle;
      },
      //长安铃木当月市占率
      currentSuzuki:function(){
        let currentSum=0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='carBrand9878')){
            currentSum+=marketShareRatioBrand.current
          }
        });
        return currentSum;
      },
      //长安铃木当月环比变动值
      comparedSuzuki:function(){
        let synchronSum = 0;
        this.marketShareRatioBrands.forEach((marketShareRatioBrand)=>{
          if(marketShareRatioBrand&&(marketShareRatioBrand.brandName=='carBrand9878')){
            synchronSum+=marketShareRatioBrand.synchron;
          }
        });
        let middle = +((this.currentSuzuki - synchronSum)/synchronSum*100).toFixed(0);
        return middle>=0?'+'+middle:'-'+middle;
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

        }
        .rejection-rate-content{
          .content-bottom{
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
        .market-share-content{
          .content-bottom {
            /*margin-top: 40px;*/
            ul{
              display: flex;
              flex-wrap: wrap;
              li{
                width: 50%;
                box-sizing: border-box;
                padding: 20px;
                .vary{
                  margin: 0 auto;
                  border: 1px dashed #9f9f9f;
                  height: 160px;
                  width: 280px;
                  text-align: center;
                  p{
                    font-size: 60px;
                    line-height: 100px;
                    color: #3ac3b1;
                  }
                  span{
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
