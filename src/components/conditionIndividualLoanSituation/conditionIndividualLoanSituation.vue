<template>
  <div class="conditionIndividualLoanSituation">
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
            <Indicator :numcolor="'#ffffff'" :fontcolor="'#F5A101'" :percent="53.72" :index="'全年达成率'"></Indicator>
          </div>
        </div>
        <div class="situation ">
          <div>
            <div>122,166</div>
            <div>全年目标</div>
          </div>
          <div class="rlborder">
            <div>122,166</div>
            <div>全年达成</div>
          </div>
          <div>
            <div>60%</div>
            <div>时间进度</div>
          </div>
        </div>
      </div>
      <div class="module2">
        <monthsCharts :options="optionsYear" :styles="stylesYear"></monthsCharts>
      </div>
    </div>
    <div class="monthlyReachRate">
      <div class="module1 moduleBcolor">
        <div class="top">
          <div class="title">
            <span></span><span>当月达成率</span>
          </div>
          <div class="unit">
            <span>单位：件</span>
          </div>
          <div class="reachRate ">
            <Indicator :numcolor="'#ffffff'" :fontcolor="'#F5A101'" :percent="53.72" :index="'当月达成率'"></Indicator>
          </div>
        </div>
        <div class="situation ">
          <div>
          <div>122,166</div>
          <div>当月目标</div>
        </div>
          <div class="rlborder">
            <div>122,166</div>
            <div>当月达成</div>
          </div>
          <div>
            <div>60%</div>
            <div>时间进度</div>
          </div>
        </div>
      </div>
      <div class="module2">
        <monthsCharts :options="optionsYear" :styles="stylesYear"></monthsCharts>
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
      <div class="reportModule" ref="monthCharts">
          <monthsCharts :options="optionsMonth" :styles="stylesMonth"></monthsCharts>
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
      <div class="reportModule" ref="monthCharts">
        <monthsCharts :options="optionsMonthloan" :styles="stylesMonth"></monthsCharts>
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
</template>

<script>
  import Indicator from '@/components/indicator/indicator'
  import monthsCharts from '@/components/highchartsComponent/HighchartsComponent'
  import BScroll from 'better-scroll';
  export default {
    name: "conditionIndividualLoanSituation",
    data(){
      return {
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
            tooltip: {
              pointFormat: ''
            },
            color: '#DADFEC'
          }]
        },
        stylesYear: {width: 100, height: 180},
        optionsMonth: {
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
        stylesMonth: {width: 280, height: 180},
        optionsMonthloan: {
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
      }
    },
    methods:{
      monthArr(){
        let arr = []
        for(let i=1;i<=30;i++){
          arr.push(i)
        }
        return arr
      },
      _initScorll(){
        new BScroll(this.$refs['monthCharts'], {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })
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
  .module1 {
    background-color: #2F3543;
    height: 580px;
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
