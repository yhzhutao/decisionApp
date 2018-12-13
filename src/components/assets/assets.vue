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
          <p class="num">888.88</p>
          <div class="line"></div>
          <div class="content-bottom">
            <div class="chart-container">
              <v-highchart :options="options" :styles="styles"></v-highchart>
            </div>
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
        styles: {}
      }
    },
    methods: {
      _initScroll() {
        // let wrapper = this.$refs['assets-wrapper']
        // console.log(wrapper)
        // new BScroll(wrapper)
        new BScroll(this.$refs['assets-wrapper'], {
          click: true
        });
        // console.log(this.assetsScorll);
      },
      moreChart() {
      }
    },
    components: {
      'v-asset': Asset,
      'v-highchart': HighchartsComponent
    },
    mounted() {
      this.moreChart();
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
            &:after {
              display: inline-block;
              content: '';
              width: 0;
              height: 0;
              border-width: 20px 20px 20px 0;
              border-style: solid;
              border-color: transparent rgb(245, 166, 35) transparent transparent;
              vertical-align: middle;
            }
          }
          .line {
            width: 100%;
            height: 32px;
            border: 1px solid rgb(151, 151, 151);
            border-bottom: none;
          }
          .content-bottom {
            .chart-container {
              display: inline-block;
              width: 192px;
              height: 192px;
              vertical-align: middle;
            }
            .container-right {
              display: inline-block;
              margin-left: 50px;
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
    }
  }
</style>
