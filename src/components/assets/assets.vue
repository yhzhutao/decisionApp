<!--资产规模界面-->
<template>
    <div class="assets">
      <div class="currentAssets">
        <div class="currentAssets-head">
          <span>当前资产规模</span><img src="../../image/capital_icon@2x.png" alt="">
        </div>
        <div class="currentAssets-content">
          <p class="unit">单位:亿元</p>
          <p class="num">888.88</p>
          <div class="line"></div>
          <div class="content-bottom clearfix">
            <div id="container" class="chart-container" style="width: 100px;height: 100px"></div>
            <div class="container-right">
              <div class="right-top">
                <span>222.22</span>
                <span>批售</span>
                <span>25%</span>
              </div>
              <div class="right-middle"></div>
              <div class="right-bottom">
                <span>666.66</span>
                <span>零售</span>
                <span>25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <li>
          <v-asset :titleCode="0"></v-asset>
        </li>
        <li>
          <v-asset :titleCode="1"></v-asset>
        </li>
      </ul>
      <div class="bottom">

      </div>
    </div>
</template>

<script>
    import Asset from '@/components/assetCard/assetCard';
    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsDrilldown from 'highcharts/modules/drilldown';
    import Highcharts3D from 'highcharts/highcharts-3d';
    import Highmaps from 'highcharts/modules/map';
    HighchartsMore(Highcharts)
    HighchartsDrilldown(Highcharts);
    Highcharts3D(Highcharts);
    Highmaps(Highcharts);
    export default {
        name: "assets",
      data(){
        return{
          chart:null
        }
      },
      components:{
          'v-asset':Asset
      },
      mounted(){
        this.moreChart();
      },
      methods:{
        moreChart() {
          this.chart = new Highcharts.Chart( 'container', {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            title: {
              text: ''
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
                }
              }
            },
            series: [{
              name: 'Brands',
              colorByPoint: true,
              data: [{
                name: '零售',
                y: 75,
                sliced: true,
                selected: true
              }, {
                name: '批售',
                y: 25
              }]
            }]
          });
        }
      }
    }
</script>

<style lang="scss" scoped>
  .assets{
    .currentAssets{
    margin: -80px 32px 0 32px;
    padding: 32px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    .currentAssets-head{
      &:before{
        display: inline-block;
        content: '';
        width: 8px;
        height: 32px;
        background: rgb(110,90,200);
        margin-right: 16px;
        vertical-align: middle;
      }
      span{
        font-size: 32px;
        color: rgb(170,170,170);
        vertical-align: middle;
        margin-right: 16px;
      }
      img{
        width: 32px;
        height: 32px;
        vertical-align: middle;
      }
    }
    .currentAssets-content{
      margin-top: 16px;
      .unit{
        color: rgb(155, 155, 155);
        font-size: 24px;
        line-height: 34px;
        margin-left: 18px;
      }
      .num{
        text-align: center;
        font-size: 88px;
        color: rgb(110,90,200);
        line-height: 124px;
        vertical-align: middle;
        &:after{
          display: inline-block;
          content: '';
          width: 0;
          height: 0;
          border-width: 20px 20px 20px 0;
          border-style: solid;
          border-color: transparent rgb(245,166,35) transparent transparent;
          vertical-align: middle;
        }
      }
      .line{
        width: 100%;
        height: 32px;
        border: 1px solid rgb(151,151,151);
        border-bottom: none;
      }
      .content-bottom{
        .chart-container{
          float: left;
        }
        .container-right{
          float: right;
          .right-top,.right-bottom{
            span:first-child{
              font-size: 48px;
              color:rgb(155,155,155)
            }
            span:nth-child(2),span:nth-child(3){
              font-size: 32px;
              color:rgb(155,155,155)
            }
          }
          .right-top{
            span:nth-child(2){
              &:before{
                display: inline-block;
                content: '';
                width: 20px;
                height: 20px;
                background: rgb(58,64,77);
              }
            }
          }
          .right-bottom{
            span:nth-child(2){
              &:before{
                display: inline-block;
                content: '';
                width: 20px;
                height: 20px;
                background: rgb(110,90,200);
              }
            }
          }
          .right-middle{
            border-top: 1px dashed rgb(155,155,155);
          }
        }
      }
    }
  }
    ul{
      li{
        margin-top: 32px;
      }
    }
  }
</style>
