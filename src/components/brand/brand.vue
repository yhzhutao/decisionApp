<template>
  <div class="brand">
    <div class="brand-head">
      <ul>
          <li v-for="(item,index) in brandList">
            <router-link :to="'/conditionIndividualLoanSituation/'+index">
              <div class="img">
                <img :src="require('../../image/'+logoImgUrl[index]+'@2x.png')">
              </div>
            </router-link>
            <p>{{item}}</p>
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
  import bus from '@/common/base/bus';
  import { host } from "@/common/base/baseHttp.js"
  import osc from '@/common/base/osc_common.js';
  import tokenInvalid from '@/common/base/tokenInvalid'
  import { Toast } from 'mint-ui';

  export default {
    name: "brand",
    props:{
      selectDate:String
    },
    data() {
      return {
        brandList:['长安轿车', '长安福特', '长安欧尚', '长安马自达', '长安DS', '长安铃木'],
        logoImgUrl:['changan_logo','ford_logo','oushang_logo','mazda_logo','ds_logo','suzuki_logo'],
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
              '长安轿车', '长安福特', '长安欧尚', '长安马自达', '长安DS', '长安铃木'
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
                crop:false,
                overflow:'none',
                enabled: true,
                formatter:function(){
                  return this.y+'%'
                }
              }
            },
          },
          series: [{
            data: [
              {
                'color':'red',
                'y':null
              },
              {
                'y':null
              },
              {
                'y':null
              },
              {
                'y':null
              },
              {
                'y':null
              },
              {
                'y':null
              }
            ],
            enableMouseTracking:false,
            color: 'rgb(218,223,236)',
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
              '长安轿车', '长安福特', '长安欧尚', '长安马自达', '长安DS', '长安铃木'
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
                crop:false,
                overflow:'none',
                enabled: true,
                formatter:function(){
                  return this.y+'%'
                }
              }
            }
          },
          series: [{
            data: [null, null, null, null, null, null],
            color: 'rgb(218,223,236)',
            enableMouseTracking:false
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
              '长安轿车', '长安福特', '长安欧尚', '长安马自达', '长安DS', '长安铃木'
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
                crop:false,
                overflow:'none',
                enabled: true,
              }
            }
          },
          series: [{
            data: [null, null, null, null, null, null],
            color: 'rgb(218,223,236)',
            enableMouseTracking:false,
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
              '长安轿车', '长安福特', '长安欧尚', '长安马自达', '长安DS', '长安铃木'
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
                crop:false,
                overflow:'none',
                enabled: true,
              }
            }
          },
          series: [{
            data: [null, null, null, null, null, null],
            color: 'rgb(218,223,236)',
            enableMouseTracking:false
          }]
        },
        stylesYear: {width: 100, height: 250}
      }
    },
    components: {
      'v-highchart': Highchart
    },
    created(){
      let that = this
      this.createHttp(this.selectDate)
      bus.$off('selectDate')
      bus.$on('selectDate',function(date){
        that.createHttp(date)
      })
    },
    mounted() {
      this._initHighcharts();
      this._initScorll();
    },
    methods: {
      createHttp(date){
        let that = this
        let urlHost = host||'/api'
        let month =Number(date.substr(4,2))
        that.$http.post(urlHost+'/Decision/individualLoanbrand',{date:date}).then(function (res) {
          let code =JSON.parse(res.bodyText).code
          if(code == 0){
            let data =JSON.parse(res.bodyText).result
            let newData = that.dataHand(data)
            let yearlyReachRatio = []
            let monthlyReachRatio= []
            let monthlyApplication = []
            let monthlyLoan = []
            newData.forEach(function(item,index){
              if(item.yearTarget == 0||item.yearTarget == null){
                yearlyReachRatio.push(null)
              }else{
                yearlyReachRatio.push(Math.round(item.yearReached/item.yearTarget*100));
              }
              if(item.monthTarget == 0||item.monthTarget == null){
                monthlyReachRatio.push(null)
              }else{
                monthlyReachRatio.push(Math.round(item.monthReached/item.monthTarget*100));
              }
              monthlyApplication.push(item.monthlyApplication);
              monthlyLoan.push(item.monthlyLoanitems)
            })
            that.optionsYear = JSON.parse(JSON.stringify(that.optionsYear))
            that.optionsMonth = JSON.parse(JSON.stringify(that.optionsMonth))
            that.optionsApplication = JSON.parse(JSON.stringify(that.optionsApplication))
            that.optionsLoan = JSON.parse(JSON.stringify(that.optionsLoan))
            that.optionsYear.series[0].data = that.formatterColumanData(yearlyReachRatio)
            that.optionsMonth.series[0].data = that.formatterColumanData(monthlyReachRatio)
            that.optionsApplication.series[0].data = that.formatterColumanData(monthlyApplication)
            that.optionsLoan.series[0].data = that.formatterColumanData(monthlyLoan)
          }else if(code == 20){
            tokenInvalid()
          }else{
            Toast(JSON.parse(res.bodyText).message)
          }
        })
      },
      formatterColumanData(arr){
        let maxValueObj = {max:0,index:0};
        let formatterArr = []
        arr.forEach(function(item,index){
          formatterArr.push({'y':item==0?null:item})
          if(maxValueObj.max < item){
            maxValueObj.max = item
            maxValueObj.index = index
          }
        })
        formatterArr[maxValueObj.index].color = "#F19938"
        return formatterArr
      },
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
        var index = 0;
        for(var i=0;i<arrs.length;i++){
          if(num < arrs[i].y){
            num = arrs[i].y
            index = i;
          }
        }
        this.optionsYear.series[0].data[index] = Object.assign({},this.optionsYear.series[0].data[index],{'selected':'red'})
      },
      _initScorll() {
        new BScroll(this.$refs['brand-content-wrapper'], {click: true});
      },
      dataHand(data){
        let newData = [0,0,0,0,0,0]
        let carBrand9879 = [0,0]
        let BRAND20180093 = [0,0,0]
        data.forEach(function (item, index) {
          switch (item.brandName) {
            case '长安轿车':
              carBrand9879.splice(0,1,item)
              break;
            case '长安新能源':
              carBrand9879.splice(1,1,item)
              break;
            case '长安欧尚汽车':
              BRAND20180093.splice(0,1,item)
              break;
            case '长安轻型车':
              BRAND20180093.splice(1,1,item)
              break;
            case '长安微车':
              BRAND20180093.splice(2,1,item)
              break;
            case '长安福特':
              newData.splice(1,1,item)
              break;
            case '长安马自达':
              newData.splice(3,1,item)
              break;
            case '长安DS':
              newData.splice(4,1,item)
              break
            case '长安铃木':
              newData.splice(5,1,item)
          }
        })
        newData.splice(0,1,this.arrMerge(carBrand9879))
        newData.splice(2,1,this.arrMerge(BRAND20180093))
        return newData
      },
      arrMerge(args){
        let obj = {}
        obj.brandName = args[0].brandName
        obj.monthReached =0
        obj.monthTarget =0
        obj.monthlyApplication =0
        obj.monthlyLoanitems =0
        obj.yearReached =0
        obj.yearTarget =0
        for(let i=0;i<args.length;i++){
          obj.monthReached=obj.monthReached+args[i].monthReached
          obj.monthTarget=obj.monthTarget+args[i].monthTarget
          obj.monthlyApplication=obj.monthlyApplication+args[i].monthlyApplication
          obj.monthlyLoanitems=obj.monthlyLoanitems+args[i].monthlyLoanitems
          obj.yearReached=obj.yearReached+args[i].yearReached
          obj.yearTarget=obj.yearTarget+args[i].yearTarget
        }
        return obj
      },
      formatterAreaDate(lastMonthsRatio){
        return lastMonthsRatio.map(function(item,index){
          return {'color':'rgb(218,223,236)',y:Number((item*100).toFixed(2))}
        })
      },
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
            font-size: 24px;
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
