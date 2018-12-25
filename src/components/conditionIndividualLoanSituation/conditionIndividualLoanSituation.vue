<template>
  <div class="conditionIndividualLoanSituation" ref="wrapper">
    <div>
      <div class="yearlyReachRate">
        <div class="module1">
          <div class="top">
            <div class="title">
              <span></span><span>全年达成率</span>
            </div>
            <div class="unit">
              <span>单位：件</span>
            </div>
            <div class="reachRate ">
              <Indicator :numcolor="'#ffffff'" :maskBackground="'#2F3543'" :fontcolor="'#F5A101'" :percent="yearlyRatio" :index="'全年达成率'"></Indicator>
            </div>
          </div>
          <div class="situation ">
            <div>
              <div>{{yearlyTarget}}</div>
              <div>全年目标</div>
            </div>
            <div class="rlborder">
              <div>{{yearlyReach}}</div>
              <div>全年达成</div>
            </div>
            <div>
              <div>{{yProgress}}%</div>
              <div>时间进度</div>
            </div>
          </div>
        </div>
        <div v-show="regionFlag" class="module2">
          <monthsCharts :options="optionsYear" :styles="stylesYear"></monthsCharts>
        </div>
      </div>
      <div class="monthlyReachRate moduleBcolor">
        <div class="module1">
          <div class="top">
            <div class="title">
              <span></span><span>当月达成率</span>
            </div>
            <div class="unit">
              <span>单位：件</span>
            </div>
            <div class="reachRate ">
              <Indicator :numcolor="'#ffffff'" :fontcolor="'#F5A101'" :maskBackground="'#353D51'" :percent="monthlyRatio" :index="'当月达成率'"></Indicator>
            </div>
          </div>
          <div class="situation ">
            <div>
              <div>{{currentMonthTarget}}</div>
              <div>当月目标</div>
            </div>
            <div class="rlborder">
              <div>{{currentMonthReach}}</div>
              <div>当月达成</div>
            </div>
            <div>
              <div>{{mProgress}}%</div>
              <div>时间进度</div>
            </div>
          </div>
        </div>
        <div v-show="regionFlag" class="module2">
          <monthsCharts :options="optionsMonth" :styles="stylesYear"></monthsCharts>
        </div>
      </div>
      <div class="sales">
        <div class="title">
          <span></span><span>销量</span>
        </div>
        <div class="situation">
          <div>
            <div>122,166</div>
            <div>当月累计</div>
          </div>
          <div class="rlborder">
            <div>122,166</div>
            <div>当月同期</div>
          </div>
          <div>
            <div class="ratio">+10%</div>
            <div>环比</div>
          </div>
        </div>
      </div>
      <div class="application">
        <div class="title">
          <div class="title-left">
            <span class="icon"></span>
            <span class="t-l-text">批售</span>
          </div>
        </div>
        <div class="chartIcon">
          <div class="Icon-right">
            <span class="icon-f"></span>
            <span>当前</span>
            <span class="icon-t"></span>
            <span>同期</span>
            <span>单位：件</span>
          </div>
        </div>
        <div class="reportModule" ref="monthCharts1">
          <monthsCharts :options="optionsMonthSales" :styles="stylesMonth"></monthsCharts>
        </div>
        <div class="situation ">
          <div>
            <div>122,166</div>
            <div>当月累计</div>
          </div>
          <div class="rlborder">
            <div>122,166</div>
            <div>当月同期</div>
          </div>
          <div>
            <div class="ratio">10%</div>
            <div>环比</div>
          </div>
        </div>
      </div>
      <div class="loan">
        <div class="title">
          <div class="title-left">
            <span class="icon"></span>
            <span class="t-l-text">批售</span>
          </div>
        </div>
        <div class="chartIcon">
          <div class="Icon-right">
            <span class="icon-f"></span>
            <span>当前</span>
            <span class="icon-t"></span>
            <span>同期</span>
            <span>单位：件</span>
          </div>
        </div>
        <div class="reportModule" ref="monthCharts2">
          <monthsCharts :options="optionsMonthLoan" :styles="stylesMonth"></monthsCharts>
        </div>
        <div class="situation ">
          <div>
            <div>122,166</div>
            <div>当月累计</div>
          </div>
          <div class="rlborder">
            <div>122,166</div>
            <div>当月同期</div>
          </div>
          <div>
            <div class="ratio">10%</div>
            <div>环比</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Indicator from '@/components/indicator/indicator'
  import monthsCharts from '@/components/highchartsComponent/HighchartsComponent'
  import BScroll from 'better-scroll'
  import osc from '@/components/base/osc_common'
  import bus from '@/components/base/bus'
  export default {
    name: "conditionIndividualLoanSituation",
    props:{
      brandCode:String,
      sDate:String
    },
    data(){
      return {
        yearlyRatio:0,
        monthlyRatio:0,
        yearlyTarget:'暂无',
        currentMonthTarget:'暂无',
        yearlyReach:0,
        currentMonthReach:0,
        optionsYear: {
          chart: {
            backgroundColor: '#2F3543',
            type: 'column'
          },
          title: {
            align: 'left',
            text: null,
            style: {
              fontWeight: 'bold'
            }
          },
          tooltip: {
            enabled:false
          },
          events: {
            click: function (e) {
              console.log(e)
            }
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                color: '#ffffff'
              }
            }
          },
          xAxis: {
            categories: [
              '北区', '东区', '南区', '西区', '中区'
            ],
            labels: {
              rotation: 0,
              style: {
                color: '#dadfec'
              }
            },
            enableMouseTracking: false,
            tickPosition: 'inside',
            tickmarkPlacement: 'on',
            startOnTick: true,
          },
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              enabled: false,
            },
            gridLineWidth: '0px',
            lineWidth: 1
          },
          credits: {enabled: false},
          legend: {enabled: false},
          exporting: {enabled: false},
          series: [{
            allowPointSelect: false,
            data: [
              {'y': 12},
              {'y': 13},
              {'y': 14},
              {'y': 15},
              {'color': '#F19938', 'y': 16}],
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
            color: '#DADFEC'
          }]
        },
        optionsMonth: {
          chart: {
            backgroundColor: '#353d51',
            type: 'column'
          },
          title: {
            align: 'left',
            text: null,
            style: {
              fontWeight: 'bold'
            }
          },
          tooltip: {
            enabled:false
          },
          events: {
            click: function (e) {
              console.log(e)
            }
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                color: '#ffffff'
              }
            }
          },
          xAxis: {
            categories: [
              '北区', '东区', '南区', '西区', '中区'
            ],
            labels: {
              rotation: 0,
              style: {
                color: '#dadfec'
              }
            },
            enableMouseTracking: false,
            tickPosition: 'inside',
            tickmarkPlacement: 'on',
            startOnTick: true,
          },
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              enabled: false,
            },
            gridLineWidth: '0px',
            lineWidth: 1
          },
          credits: {enabled: false},
          legend: {enabled: false},
          exporting: {enabled: false},
          series: [{
            allowPointSelect: false,
            data: [
              {'y': 12},
              {'y': 13},
              {'y': 14},
              {'y': 15},
              {'color': '#F19938', 'y': 16}],
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
            color: '#DADFEC'
          }]
        },
        stylesYear: {width: 100, height: 180},
        optionsMonthSales: {
          chart: {
            backgroundColor: '#353D51'
          },
          title: {
            align: 'left',
            text: null,
            style: {
              fontWeight: 'bold'
            }
          },
          xAxis: {
            categories:this.monthArr(),
            labels: {
              rotation: 0,
              style: {
                color: '#dadfec'
              }
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
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#3AC3B1',
            borderRadius: 10,
            headerFormat: '',
            style:{
              fontSize:'18px',
              fontWeight:'700'
            },
            pointFormat:'<p>{point.y}%</p>',
          },
          series: [{
            enableMouseTracking:false,
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
              {'y': 16},
              {'y': 5},
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
              {'y': 16},
              {'y': 5},
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
                {'color': 'rgb(218,223,236)', 'y': 18},
                {'color': 'rgb(218,223,236)', 'y': 0}],

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
            }]
        },
        stylesMonth: {width: 280, height: 180},
        optionsMonthLoan: {
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
            categories:this.monthArr(),
            labels: {
              rotation: 0,
              style: {
                color: '#dadfec'
              }
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
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#3AC3B1',
            borderRadius: 10,
            headerFormat: '',
            pointFormat:'<p>{point.y}%</p>',
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
              {'y': 16},
              {'y': 5},
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
              {'y': 16},
              {'y': 5},
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
                {'color': 'rgb(218,223,236)', 'y': 18},
                {'color': 'rgb(218,223,236)', 'y': 0}],
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
            }]
        },
        regionFlag:true,
        yProgress:0,
        mProgress:0
      }
    },
    created(){
      let that = this
      bus.$on('selectDate',function(date){
        that.getProgress(date)
      })
      bus.$on('getBrandCode',function(brandCode){
        console.log(brandCode)
      })
      bus.$on('getRegion',function(code){
        if(code !== '1'){
          that.regionFlag = false
        }else{
          that.regionFlag = true
        }
      })
      this.$http.post('/individualLoanFilter').then(function(res){
        let data = res.body
        console.log(data)
        this.yearlyRatio = Number((data.yearlyReach/data.yearlyTarget*100).toFixed(2))
        this.yearlyReach=osc.formatterCount(data.yearlyReach)
        this.yearlyTarget=osc.formatterCount(data.yearlyTarget)
        this.monthlyRatio = Number((data.currentMonthReach/data.currentMonthTarget*100).toFixed(2))
        this.currentMonthTarget=osc.formatterCount(data.currentMonthTarget)
        this.currentMonthReach=osc.formatterCount(data.currentMonthReach)
        if(data.yearRegions.length >0){
          console.dir(this.optionsYear)
        }
      })
    },
    methods:{
      getProgress(date){
        let dateArr = date.split('\/');
        this.getYearProgress(dateArr[1],dateArr[1],dateArr[2])
        this.getMonthProgress(dateArr[1],dateArr[1],dateArr[2])
      },
      monthArr(){
        let arr = []
        for(let i=1;i<=30;i++){
          arr.push(i)
        }
        return arr
      },
      _initScorll(){
        new BScroll(this.$refs['monthCharts1'], {
          scrollX: true,
          scrollY: false,
          click: true
        })
        new BScroll(this.$refs['monthCharts2'], {
          scrollX: true,
          scrollY: false,
          click: true
        })
        new BScroll(this.$refs['wrapper'], {
          scrollY: true,
          scrollX: false,
          click: true
        })
      },
      getMonthProgress(year,month,day){
        //先将每个月份的天数存入数组中
        let arr = [31,28,31,30,31,30,31,31,30,31,30,31]
        let days = Number(day)
        if(month == '1' && this.isLeap(year)){
          this.mProgress = Math.round(days/(arr[month-1]+1)*100)
        }else{
          this.mProgress = Math.round(days/arr[month-1]*100)
        }
      },
      getYearProgress(year,month,day){
        //先将每个月份的天数存入数组中
        let arr = [31,28,31,30,31,30,31,31,30,31,30,31]
        let yearDays = 365
        let days = Number(day)
        //将输入月份之前月份的天数累加
        for(let i = 0; i< month -1;i++){
          days += arr[i]
        }
        //判断是否是闰年且看是否大于2月(小于2月没必要考虑闰年问题)
        if(month > 2 && this.isLeap(year)){
          days ++
          yearDays++
        }
        this.yProgress =Math.round(days/yearDays*100)
      },
      isLeap(year){
        if (year % 400 == 0 || year % 4 === 0 && year % 100 !== 0){
          return true;
        }else{
          return false;
        }
      }
    },
    components:{
      Indicator,
      monthsCharts
    },
    mounted(){
      this._initScorll();
    },
  }
</script>

<style lang="scss" scoped>
  .conditionIndividualLoanSituation{
    overflow: hidden;
    position: absolute;
    top: 168px;
    bottom: 0;
    width: 100%;
    background-color: #2F3543;
  }
  .module1 {
    height: 550px;
    overflow: hidden;
    .top{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        position: absolute;
        left: 0;
        top: 0;
        > span:first-child {
          display: inline-block;
          width: 24px;
          height: 24px;
          background-color: #F4A100;
          margin-left: 32px;
          margin-top: 32px;
          margin-right: 32px;
        }
        > span:last-child {
          color: #DADFEC;
          font-size: 32px;
        }
      }
      .unit {
        position: absolute;
        right: 0;
        top: 0;
        span {
          display: inline-block;
          color: #FFFFFF;
          font-size: 12px;
          margin-right: 32px;
          margin-top: 32px;
        }
      }
      .reachRate {
        width: 274px;
        height: 274px;
        padding-top: 60px;
      }
    }
    .situation{
      display: flex;
      margin-left: 32px;
      margin-right: 32px;
      height: 176px;
      .rlborder{
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
      }
      div{
        flex: 1;
        text-align: center;
        margin-top: 22px;
        div:first-child{
          font-size: 44px;
          color: #ffffff;
        }
        div:last-child{
          font-size: 32px;
          color: #F19938;
          margin-top: 26px;
        }
      }
    }
  }
  .moduleBcolor{
    background-color: #353D51;

  }
  .sales{
    background-color: #2F3543;
    height: 300px;
    .title{
      height: 96px;
      color: #DADFEC;
      >span:first-child{
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: #F4A100;
        margin-left: 32px;
        margin-top: 32px;
        margin-right: 32px;
      }
    }
    .situation{
      display: flex;
      margin-left: 32px;
      margin-right: 32px;
      height: 176px;
      .rlborder{
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
      }

      div{
        flex: 1;
        text-align: center;
        margin-top: 22px;
        div:first-child{
          font-size: 44px;
          color: #ffffff;
        }
        div.ratio{
          color: #D0021B;
        }
        div:last-child{
          font-size: 32px;
          color: #F19938;
          margin-top: 26px;
        }
      }

    }
  }
  .application{
    background-color: #353D51;
    height: 770px;
    .title{
      height: 108px;
      .title-left{
        float: left;
        .icon{
          display: inline-block;
          margin-left: 32px;
          margin-top: 42px;
          margin-right: 28px;
          width: 24px;
          height: 24px;
          background-color: #F4A100;
        }
        .t-l-text{
          color: #FFFFFF;
          font-size: 32px;
        }
      }
    }
    .chartIcon{
      height: 34px;
      .Icon-right{
        float: right;
        span{
          margin-right: 32px;
          display:inline-block;
          color: #ffffff;
          font-size: 24px;
        }
        .icon-f{
          width: 20px;
          height: 20px;
          background-color: #F19B3A;
        }
        .icon-t{
          width: 20px;
          height: 20px;
          background-color: #596073;
        }
      }
    }
    .situation{
      display: flex;
      margin-left: 32px;
      margin-right: 32px;
      height: 176px;
      .rlborder{
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
      }

      div{
        flex: 1;
        text-align: center;
        margin-top: 22px;
        div:first-child{
          font-size: 44px;
          color: #ffffff;
        }
        div.ratio{
          color: #D0021B;
        }
        div:last-child{
          font-size: 32px;
          color: #F19938;
          margin-top: 26px;
        }
      }

    }
  }
  .loan{
    background-color: #2F3543;
    .title{
      height: 108px;
      .title-left{
        float: left;
        .icon{
          display: inline-block;
          margin-left: 32px;
          margin-top: 42px;
          margin-right: 28px;
          width: 24px;
          height: 24px;
          background-color: #F4A100;
        }
        .t-l-text{
          color: #FFFFFF;
          font-size: 32px;
        }
      }
    }
    .chartIcon{
      height: 34px;
      .Icon-right{
        float: right;
        span{
          margin-right: 32px;
          display:inline-block;
          color: #ffffff;
          font-size: 24px;
        }
        .icon-f{
          width: 20px;
          height: 20px;
          background-color: #F19B3A;
        }
        .icon-t{
          width: 20px;
          height: 20px;
          background-color: #596073;
        }
      }
    }
    .situation{
      display: flex;
      margin-left: 32px;
      margin-right: 32px;
      height: 176px;
      .rlborder{
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
      }

      div{
        flex: 1;
        text-align: center;
        margin-top: 22px;
        div:first-child{
          font-size: 44px;
          color: #ffffff;
        }
        div.ratio{
          color: #D0021B;
        }
        div:last-child{
          font-size: 32px;
          color: #F19938;
          margin-top: 26px;
        }
      }

    }
  }
  .reportModule{
    width: 100%;
    overflow: hidden;
  }
</style>
<style lang="scss" scoped>
  .indicator{
    background-color: rgba(255,255,255,0)!important;
    .top{
      color: #FFFFFF;
    }
    .line{
      border-top:4px solid #ccc!important;
    }
    .bottom{
      color: #F5A101;
    }
  }
</style>
