<template>
  <div class="marketShare"  ref="content-wrapper">
    <div>
      <div v-show="contactDate!=null" class="nodeTip">
        *当年累计市占率截止{{contactDate}}末
      </div>
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
          <monthsCharts :options="item.options" :styles="stylesYear" :selectDate="selectDate"></monthsCharts>
        </div>
        <div class="ratio">
          <div>
            <div>
              <div class="itemColor1">{{item.currentMonthMarketRate}}{{ item.currentMonthMarketRate == '—'?'':'%' }}</div>
              <div>当月市占率</div>
            </div>
            <div>
              <div class="itemColor1">{{item.currentYearMarketShare}}{{ item.currentYearMarketShare == '—'?'':'%' }}</div>
              <div>当年累计市占率</div>
            </div>
          </div>
          <div>
            <div class="lborder itemColor2">
              <div :style='{color:item.currentMonthChainRatio>0?"#d0021b":"#30aa2d"}'>{{item.currentMonthChainRatio>0?"+":""}}{{item.currentMonthChainRatio}}{{ item.currentMonthChainRatio == '—'?'':'%' }}</div>
              <div>当月环比变化</div>
            </div>
            <div class="lborder">
              <div class="itemColor3" :style='{color:item.currentYearChainRatio>0?"#d0021b":"#30aa2d"}'>{{item.currentYearChainRatio>0?"+":""}}{{item.currentYearChainRatio}}{{ item.currentYearChainRatio == '—'?'':'%' }}</div>
              <div>当年同比变化</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="bottom">
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
    <div class="bottomBox"></div>
  </div>
</template>

<script>
  import monthsCharts from '@/components/highchartsComponent/HighchartsComponent'
  import BScroll from 'better-scroll';
  import bus from '@/common/base/bus'
  import { host } from "@/common/base/baseHttp.js"
  import tokenInvalid from '@/common/base/tokenInvalid'
  import { Toast } from 'mint-ui';
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
              color: "#30C2AE",
              dashStyle: 'solid',
              width: 1,
              zIndex:3
            },
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
          },
          series: [{
            allowPointSelect: false,
            enableMouseTracking:false,
            data: [{'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null}],
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
              data: [{'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null}],
              pointStart: 0,
              type: 'line',
              marker: {
                symbol: 'circle',
                enabled: true,
              },
              dataLabels: {
                enabled: false,
              },
              color: '#30C2AE'
            }]
        },
        stylesYear: {width: 95, height: 180},
        marketData:[],
        showNumber:4,
        bottomFlag:false,
        pullText:'',
        contactDate:null,
        bottom:false,
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
      bus.$off('selectDate')
      bus.$on('selectDate',function(date){
       that.createHttp(date)
      })
    },
    methods: {
      _initScorll() {
         this.scroll = new BScroll(this.$refs['content-wrapper'], {click: true, probeType: 3});
         let flag = false
        let that  = this
        this.scroll.on('scroll',(pos)=>{
          if(pos.y<this.scroll.maxScrollY-50){
            if(flag!==true){
              flag = true
              this.showNumber = Infinity
              setTimeout(function(){
                that.scroll.refresh()
              },0)
              this.pullText="没有更多数据了"
              this.bottomFlag = true
            }
          }
        })
      },
      formatterLineDate(lastMonthsRatio){
        return lastMonthsRatio.map(function(item,index){
          if(item!==null){
            return {y:Number((item*100).toFixed(2))}
          }else{
            return null
          }
        })
      },
      formatterAreaDate(lastMonthsRatio){
        return lastMonthsRatio.map(function(item,index){
          if(item !== null){
            return {'color':'rgb(218,223,236)',y:Number((item*100).toFixed(2))}
          }else{
            return null
          }

        })
      },
      createHttp(date){
        let that = this
        let month =Number(date.substr(4,2))
        let urlHost = host||'/api'
        that.$http.post(urlHost+'/Decision/marketShareRatio',{date:date}).then(function (res) {
          let data = JSON.parse(res.bodyText).result
          let code = JSON.parse(res.bodyText).code
          if(code ==0){
            if(data.length==0){
              that.marketData = [];
              Toast('未查到数据')
              return
            }else{
              this.contactDate = true
            }
            if(data[0].contactDate){
              this.contactDate = data[0].contactDate.substr(0,4)+'年'+data[0].contactDate.substr(4,2)+'月'
            }else{
              this.contactDate = data[0].contactDate
            }
            let optionsSelect = []
            that.marketData =data.map(function (item, index) {
              let currentMonthChainRatio  //当月环比
              let currentYearChainRatio   //当年同比
              let currentMonthMarketRate //当月市占率
              let currentYearMarketShare //当年累计市占率
              if(item.currentMonthChainRatio === null ){
                currentMonthChainRatio = '—'
              }else{
                 currentMonthChainRatio = Number((item.currentMonthChainRatio*100).toFixed(2))
              }
              if(item.currentYearChainRatio === null ){
                currentYearChainRatio = '—'
              }else{
                currentYearChainRatio = Number((item.currentYearChainRatio*100).toFixed(2))
              }
              if(item.monthsRatio[month-1] === null ){
                currentMonthMarketRate = '—'
              }else{
                currentMonthMarketRate = Number((item.monthsRatio[month-1]*100).toFixed(2))
              }
              if(item.currentYearMarketShare === null){
                currentYearMarketShare = '—'
              }else{
                currentYearMarketShare = Number((item.currentYearMarketShare*100).toFixed(2))
              }
              let options = JSON.parse(JSON.stringify(that.options))

              options.chart.backgroundColor = index % 2 === 0 ?'#2f3543':'#353d51'
              options.series[0].data = that.formatterAreaDate(item.lastMonthsRatio)
              options.series[1].data = that.formatterLineDate(item.monthsRatio)
              return {
                brandName:item.brandName,
                currentMonthMarketRate:currentMonthMarketRate,
                currentMonthChainRatio:currentMonthChainRatio,
                currentYearChainRatio:currentYearChainRatio,
                currentYearMarketShare:currentYearMarketShare,
                currentMonthMarketShare:item.monthsRatio[month],
                options:options
              }
            })
            this.bottom = true
          }else if(code ==20){
            that.marketData = []
            tokenInvalid()
          }else{
            that.marketData = []
            Toast(JSON.parse(res.bodyText).message)
          }
        })
      },
      getProgress(date){
        let year = date.substr(0,4)
        let month = date.substr(4,2)
        let day = date.substr(6,2)
        this.getYearProgress(year,month,day)
        this.getMonthProgress(year,month,day)
      }
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
    .nodeTip{
      font-size: 24px;
      text-align: left;
      padding: 20px 40px 0px;
      color: red;
    }
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
  .changan {
    height: 1020px;
    background-color: #353D51;
    overflow: hidden;
    &.double {
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
        -webkit-transform: translate(-50%, -50%);
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
