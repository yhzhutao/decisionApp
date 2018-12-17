<template>
  <div class="brand">
    <div class="brand-head">
      <ul>
        <li>
          <div class="img">
            <img src="../../image/changan_logo@2x.png" alt="">
          </div>
          <p>长安汽车</p>
        </li>
        <li>
          <div class="img">
            <img src="../../image/ford_logo@2x.png" alt="">
          </div>
          <p>长安福特</p>
        </li>
        <li>
          <div class="img">
            <img src="../../image/suzuki_logo@2x.png" alt="">
          </div>
          <p>长安铃木</p>
        </li>
        <li>
          <div class="img">
            <img src="../../image/mazda_logo@2x.png" alt="">
          </div>
          <p>长安马自达</p>
        </li>
        <li>
          <div class="img">
            <img src="../../image/oushang_logo@2x.png" alt="">
          </div>
          <p>长安欧尚</p>
        </li>
        <li>
          <div class="img">
            <img src="../../image/ds_logo@2x.png" alt="">
          </div>
          <p>长安DS</p>
        </li>
      </ul>
    </div>
    <div class="content" ref="brand-content-wrapper">
      <div class="brand-content">
        <ul>
          <li v-for="(item,index) in list">
            <div class="title">
              <span>{{item}}</span>
            </div>
            <p v-if="index>1">单位：件</p>
            <v-highchart :options="getOptions(index)" :styles="stylesYear"></v-highchart>
          </li>
          <div class="bottom">
            <div class="line"></div>
            <p>已经到底了</p>
            <div class="line"></div>
          </div>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import Highchart from '@/components/highchartsComponent/HighchartsComponent';
  import BScroll from 'better-scroll';
  import Vue from 'vue';

  export default {
    name: "brand",
    data() {
      return {
        list: ['全年达成率', '当月达成率', '当月申请件', '当月放款件'],
        optionsYear: {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: [
              '长安轿车', '长安福特', '长安铃木', '长安马自达', '长安欧尚', '长安DS'
            ],
            tickLength: 0,
            labels: {
              autoRotation: false,
              formatter: function () {
                var labelVal = this.value;
                var reallyVal = labelVal;
                var lvl = labelVal.length;
                if (lvl > 2 && lvl < 5) {
                  reallyVal = labelVal.substr(0, 2) + "<br/>" + labelVal.substring(2, lvl);
                } else {
                  reallyVal = labelVal.substr(0, 2) + "<br/>" + labelVal.substr(2, 5) + "<br/>" + labelVal.substring(5, lvl);
                }
                return reallyVal;
              }
            }
          },
          yAxis: {
            visible: false,
            title: {
              text: ''
            }
          },
          credits: {enabled: false},
          legend: {enabled: false},
          exporting: {enabled: false},
          tooltip: false,
          plotOptions: {
            column: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
              }
            },
            series: {
              events: {
                show: function (event) {
                  // console.log(1);
                  // console.log(event)
                  // event.target.setAttribute('fill', 'rgb(241,155,58)');
                }
              }
            }
          },
          series: [{
            data: [
              {
                'color':'red',
                'y':12
              },
              {
                'selected':false,
                'y':24
              },
              {
                'selected':true,
                'y':36
              },
              {
                'selected':false,
                'y':35
              },
              {
                'selected':false,
                'y':80
              },
              {
                'selected':false,
                'y':70
              }
            ],
            color: 'rgb(218,223,236)'
          }]
        },
        optionsMonth: {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: [
              '长安轿车', '长安福特', '长安铃木', '长安马自达', '长安欧尚', '长安DS'
            ],
            tickLength: 0,
            labels: {
              autoRotation: false,
              formatter: function () {
                var labelVal = this.value;
                var reallyVal = labelVal;
                var lvl = labelVal.length;
                if (lvl > 2 && lvl < 5) {
                  reallyVal = labelVal.substr(0, 2) + "<br/>" + labelVal.substring(2, lvl);
                } else {
                  reallyVal = labelVal.substr(0, 2) + "<br/>" + labelVal.substr(2, 5) + "<br/>" + labelVal.substring(5, lvl);
                }
                return reallyVal;
              }
            }
          },
          yAxis: {
            visible: false,
            title: {
              text: ''
            }
          },
          credits: {enabled: false},
          legend: {enabled: false},
          exporting: {enabled: false},
          tooltip: false,
          plotOptions: {
            column: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
              }
            },
            series: {
              events: {
                click: function (event) {
                  event.target.setAttribute('fill', 'rgb(241,155,58)');
                }
              }
            }
          },
          series: [{
            data: [70, 12, 13, 14, 15, 16],
            color: 'rgb(218,223,236)'
          }]
        },
        optionsApplication:{
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: [
              '长安轿车', '长安福特', '长安铃木', '长安马自达', '长安欧尚', '长安DS'
            ],
            tickLength: 0,
            labels: {
              autoRotation: false,
              formatter: function () {
                var labelVal = this.value;
                var reallyVal = labelVal;
                var lvl = labelVal.length;
                if (lvl > 2 && lvl < 5) {
                  reallyVal = labelVal.substr(0, 2) + "<br/>" + labelVal.substring(2, lvl);
                } else {
                  reallyVal = labelVal.substr(0, 2) + "<br/>" + labelVal.substr(2, 5) + "<br/>" + labelVal.substring(5, lvl);
                }
                return reallyVal;
              }
            }
          },
          yAxis: {
            visible: false,
            title: {
              text: ''
            }
          },
          credits: {enabled: false},
          legend: {enabled: false},
          exporting: {enabled: false},
          tooltip: false,
          plotOptions: {
            column: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
              }
            },
            series: {
              events: {
                click: function (event) {
                  event.target.setAttribute('fill', 'rgb(241,155,58)');
                }
              }
            }
          },
          series: [{
            data: [70, 12, 13, 14, 15, 16],
            color: 'rgb(218,223,236)'
          }]
        },
        optionsLoan:{
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: [
              '长安轿车', '长安福特', '长安铃木', '长安马自达', '长安欧尚', '长安DS'
            ],
            tickLength: 0,
            labels: {
              autoRotation: false,
              formatter: function () {
                var labelVal = this.value;
                var reallyVal = labelVal;
                var lvl = labelVal.length;
                if (lvl > 2 && lvl < 5) {
                  reallyVal = labelVal.substr(0, 2) + "<br/>" + labelVal.substring(2, lvl);
                } else {
                  reallyVal = labelVal.substr(0, 2) + "<br/>" + labelVal.substr(2, 5) + "<br/>" + labelVal.substring(5, lvl);
                }
                return reallyVal;
              }
            }
          },
          yAxis: {
            visible: false,
            title: {
              text: ''
            }
          },
          credits: {enabled: false},
          legend: {enabled: false},
          exporting: {enabled: false},
          tooltip: false,
          plotOptions: {
            column: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
              }
            },
            series: {
              events: {
                click: function (event) {
                  event.target.setAttribute('fill', 'rgb(241,155,58)');
                }
              }
            }
          },
          series: [{
            data: [70, 12, 13, 14, 15, 16],
            color: 'rgb(218,223,236)'
          }]
        },
        stylesYear: {width: 100, height: 250}
      }
    },
    components: {
      'v-highchart': Highchart
    },
    mounted() {
      this._initHighcharts();
      this._initScorll();
    },
    methods: {
      getOptions(index) {
        if(index==0){
          return this.optionsYear;
        }else if(index==1){
          return this.optionsMonth;
        }else if(index==2){
          return this.optionsApplication;
        }else if(index==3){
          return this.optionsLoan;
        }else{
          return null;
        }
      },
      _initHighcharts(){
        var arrs = this.optionsYear.series[0].data;
        var num = arrs[0].y;
        // console.log(num);
        var index = 0;
        for(var i=0;i<arrs.length;i++){
          if(num < arrs[i].y){
            num = arrs[i].y
            index = i;
          }
        }
        this.optionsYear.series[0].data[index] = Object.assign({},this.optionsYear.series[0].data[index],{'selected':'red'})
        // console.log(this.optionsYear.series[0].data[index]);
      },
      _initScorll() {
        new BScroll(this.$refs['brand-content-wrapper'], {click: true});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .brand {
    .brand-head {
      background-color: rgb(238, 238, 238);
      ul {
        display: flex;
        justify-content: space-around;
        padding: 16px 0;
        li {
          .img {
            display: inline-block;
            width: 104px;
            height: 104px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            margin-top: 12px;
            text-align: center;
            font-size: 10px;
          }
        }
      }
    }
    .content {
      position: absolute;
      width: 100%;
      top: 256px;
      bottom: 0;
      overflow: hidden;
      .brand-content {
        ul {
          background: #fff;
          li {
            padding: 32px 32px 0 32px;
            border-bottom: 1px solid rgb(218, 223, 236);
            &:nth-child(4){
              border:none
            }
            .title {
              &:before {
                display: inline-block;
                content: '';
                width: 24px;
                height: 24px;
                background: #000;
                margin-right: 28px;
              }
            }
            p{
              font-size: 24px;
              margin: 32px 0 0 50px;
            }
          }
        }
      }
    }
    .bottom {
      margin: 0 32px;
      padding: 24px 0 48px 0;
      display: flex;
      p {
        padding: 0 10px;
        font-size: 24px;
        color: rgb(74,74,74);
      }
      .line {
        flex: 1;
        border-top: 1px dashed rgb(151, 151, 151);
        margin-top: 12px;
      }
    }
  }
</style>
