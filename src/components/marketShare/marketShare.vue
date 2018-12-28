<template>
  <div class="marketShare"  ref="content-wrapper">
    <div>
      <div v-for="(item,index) in marketData" v-show="index < showNumber" class="changan" :class="{ double:index % 2 === 0 }">
        <div class="title">
          <div class="title-left">
            <span class="icon"></span>
            <span class="t-l-text">{{ item.brandName }}市占率</span>
          </div>
        </div>
        <div class="chartIcon">
          <div class="Icon-right">
            <span class="icon-f"></span>
            <span>当前</span>
            <span class="icon-t"></span>
            <span>同期</span>
          </div>
        </div>
        <div class="charts">
          <monthsCharts :options="item.options" :styles="stylesYear"></monthsCharts>
        </div>
        <div class="ratio">
          <div>
            <div>
              <div class="itemColor1">10%</div>
              <div>当月市占率</div>
            </div>
            <div>
              <div class="itemColor1">{{item.currentYearMarketShare}}%</div>
              <div>当年累计市占率</div>
            </div>
          </div>
          <div>
            <div class="lborder itemColor2">
              <div>{{item.currentMonthChainRatio}}%</div>
              <div>当月环比变化</div>
            </div>
            <div class="lborder">
              <div class="itemColor3">{{item.currentYearChainRatio}}%</div>
              <div>当年同比变化</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-show="bottomFlag">
        <div class="line"></div>
        <p>{{pullText}}</p>
        <div class="line"></div>
      </div>
      <div class="tip" v-show="bottomFlag === false">下拉载入更多数据</div>
      <div class="triangleBox" v-show="bottomFlag === false">
        <div class="triangle"></div>
      </div>

    </div>
  </div>
</template>

<script>
  import monthsCharts from '@/components/highchartsComponent/HighchartsComponent'
  import BScroll from 'better-scroll';
  import bus from '@/components/base/bus'
  export default {
    name: "marketShare",
    props:[
      'selectDate'
    ],
    data() {
      return {
        options: {
          chart: {
            backgroundColor: '#2F3543'
          },
          title: {
            align: 'left',
            text: null,
            style: {
              fontWeight: 'bold'
            }
          },
          xAxis: {
            categories: [
              '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
            ],
            labels: {
              rotation: 0,
            },
            crosshair: {
              color: "#FFFFFF",
              dashStyle: 'solid',
              width: 1,
              zIndex: 999
            },
            enableMouseTracking: false,
            type: 'line',
            tickPosition: 'inside',
            tickmarkPlacement: 'on',
            startOnTick: true,
            gridLineWidth: 1,
            gridLineDashStyle: 'Dash'
          },
          yAxis: {
            title: {
              text: ''
            },
            visible: false,
            gridLineWidth: 0
          },
          credits: {enabled: false},
          legend: {enabled: false},
          exporting: {enabled: false},
          plotOptions: {
            line: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
              }
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#3AC3B1',
            borderRadius: 10,
            headerFormat: '',
            pointFormat: '<b>{point.y:.1f}%</b>',
            shared: true
          },
          series: [{
            allowPointSelect: false,
            data: [{'y': 5},
              {'y': 12},
              {'y': 13},
              {'y': 14},
              {'y': 15},
              {'y': 16},
              {'y': 30},
              {'y': 12},
              {'y': 13},
              {'y': 14},
              {'y': 15},
              {'y': 16}],
            marker: {
              enabled: false,
              states: {
                hover: {
                  enabled: false
                },
                select: {
                  enabled: false
                }
              }
            },
            tooltip: {
              pointFormat: ''
            },
            type: 'area',
            color: '#596073'
          },
            {
              allowPointSelect: false,
              data: [{'color': 'rgb(218,223,236)', 'y': 7},
                {'color': 'rgb(218,223,236)', 'y': 15},
                {'color': 'rgb(218,223,236)', 'y': 23},
                {'color': 'rgb(218,223,236)', 'y': 15},
                {'color': 'rgb(218,223,236)', 'y': 16},
                {'color': 'rgb(218,223,236)', 'y': 20},
                {'color': 'rgb(218,223,236)', 'y': 16},
                {'color': 'rgb(218,223,236)', 'y': 12},
                {'color': 'rgb(218,223,236)', 'y': 16},
                {'color': 'rgb(218,223,236)', 'y': 16},
                {'color': 'rgb(218,223,236)', 'y': 12},
                {'color': 'rgb(218,223,236)', 'y': 18}],
              pointStart: 0,
              type: 'line',
              marker: {
                symbol: 'circle',
                enabled: true
              },
              dataLabels: {
                enabled: false,
              },
              color: '#30C2AE',
              events: {
                click: function (event) {
                  // event.target.setAttribute('fill','rgb(241,155,58)');
                }
              }
            }]
        },
        stylesYear: {width: 95, height: 180},
        marketData:[],
        showNumber:4,
        bottomFlag:false
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this._initScorll();
      })
    },
    created(){
      let that = this
      that.createHttp(this.selectDate)
      bus.$on('selectDate',function(date){
       that.createHttp(date)
      })
    },
    methods: {
      _initScorll() {
         this.scroll = new BScroll(this.$refs['content-wrapper'], {click: true, probeType: 3});
         let flag = false
        this.scroll.on('scroll',(pos)=>{
          if(pos.y<this.scroll.maxScrollY-50){
            if(flag!==true){
              flag = true
              this.showNumber = 6
              this.scroll.refresh()
              this.pullText="没有更多数据了"
              this.bottomFlag = true
            }
          }
        })
      },
      formatterLineDate(lastMonthsRatio){
        return lastMonthsRatio.map(function(item,index){
          return {y:Number((item*100).toFixed(2))}
        })
      },
      formatterAreaDate(lastMonthsRatio){
        return lastMonthsRatio.map(function(item,index){
          return {'color':'rgb(218,223,236)',y:Number((item*100).toFixed(2))}
        })
      },
      createHttp(date){
        let that = this
        let month =Number(date.substr(4,2))
        that.$http.post('/marketShareRatio').then(function (res) {
          let data = res.body
          let optionsSelect = []
          that.marketData =data.map(function (item, index) {
            let currentMonthChainRatio = Number((item.currentMonthChainRatio*100).toFixed(2))
            let currentYearChainRatio = Number((item.currentYearChainRatio*100).toFixed(2))
            let currentYearMarketShare = Number((item.currentYearMarketShare*100).toFixed(2))
            let options = JSON.parse(JSON.stringify(that.options))
            options.chart.backgroundColor = index % 2 === 0 ?'#2f3543':'#353d51'
            options.series[0].data = that.formatterAreaDate(item.lastMonthsRatio)
            options.series[1].data = that.formatterLineDate(item.monthsRatio)
            return {
              brandName:item.brandName,
              currentMonthChainRatio:currentMonthChainRatio,
              currentYearChainRatio:currentYearChainRatio,
              currentYearMarketShare:currentYearMarketShare,
              currentMonthMarketShare:item.monthsRatio[month],
              options:options
            }
          })
        })
      },
      getProgress(date){
        let year = date.substr(0,4)
        let month = date.substr(4,2)
        let day = date.substr(6,2)
        this.getYearProgress(year,month,day)
        this.getMonthProgress(year,month,day)
      },
    },
    components: {
      monthsCharts
    }
  }
</script>

<style lang="scss" scoped>
  .marketShare {
    position: absolute;
    top: 80px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    background-color: #2F3543;
    .bottom {
      margin: 0 32px;
      padding: 24px 0 48px 0;
      display: flex;
      p {
        padding: 0 10px;
        font-size: 24px;
        color: #cccccc;
      }
      .line {
        flex: 1;
        border-top: 1px dashed rgb(151, 151, 151);
        margin-top: 12px;
      }
    }
    .tip{
      text-align: center;
      color: #cccccc;
      margin-top: 30px;
    }
    .triangleBox{
      margin-bottom: 20px;
      .triangle{
        width:0;
        height:0;
        border-width:30px 30px 0;
        border-style:solid;
        border-color:#cccccc transparent transparent;
        margin:40px auto;
        margin-bottom: 20px;
        /*position:relative;*/
      }
    }
  }
  .changan{
    height: 1020px;
    background-color: #353D51;
    overflow: hidden;
    &.double{
      background-color: #2F3543;
    }
    .title {
      height: 108px;
      .title-left {
        float: left;
        .icon {
          display: inline-block;
          margin-left: 32px;
          margin-top: 42px;
          margin-right: 28px;
          width: 24px;
          height: 24px;
          background-color: #3AC3B1;
        }
        .t-l-text {
          color: #FFFFFF;
          font-size: 32px;
        }
      }
    }
    .chartIcon {
      height: 34px;
      .Icon-right {
        float: right;
        span {
          margin-right: 32px;
          display: inline-block;
          color: #ffffff;
          font-size: 24px;
        }
        .icon-f {
          width: 20px;
          height: 20px;
          background-color: #3AC3B1;
        }
        .icon-t {
          width: 20px;
          height: 20px;
          background-color: #596073;
        }
      }
    }
    .charts {
      position: relative;
      width: 100%;
      height: 480px;
      > div {
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .ratio {
      display: flex;
      > div {
        flex: 1;
        text-align: center;
        :first-child {
          font-size: 60px;
          line-height: 84px;
        }
        :last-child {
          font-size: 32px;
          color: #FFFFFF;
          margin-top: 16px;
          line-height: 84px;
        }
      }
      .itemColor1 {
        color: #3AC3B1;
      }
      .itemColor2 {
        color: #D0021B;
      }
      .itemColor3 {
        color: #30AA2D;
      }
      .lborder {
        border-left: 2px solid #ccc;
      }
    }
  }
</style>
