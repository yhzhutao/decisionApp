<template>
 <div class="defectiveRatio" ref="content-wrapper">
   <div>
     <div class="Wholesale">
       <div class="title">
         <div class="title-left">
           <span class="icon"></span>
           <span class="t-l-text">批售</span>
         </div>
         <!--<div class="title-right">-->
         <!--<span>更多</span>-->
         <!--</div>-->
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
         <monthsCharts :options="wholesaleSale" :styles="stylesYear"></monthsCharts>
       </div>
       <div class="ratio">
         <div>
           <div class="itemColor1">{{wSaleRatio}}%</div>
           <div>当月不良率</div>
         </div>
         <div class="rlborder itemColor2">
           <div :style='{color:wSaleRatioYoy>0?"#d0021b":"#30aa2d"}'>{{wSaleRatioYoy>0?"+":""}}{{wSaleRatioYoy}}%</div>
           <div>同比变动</div>
         </div>
         <div>
           <div class="itemColor3" :style='{color:wSaleRatioMom>0?"#d0021b":"#30aa2d"}'>{{wSaleRatioMom>0?"+":""}}{{wSaleRatioMom}}%</div>
           <div>环比变动</div>
         </div>
       </div>
     </div>
     <div class="retail">
       <div class="title">
         <div class="title-left">
           <span class="icon"></span>
           <span class="t-l-text">零售</span>
         </div>
         <!--<div class="title-right">-->
           <!--<span>更多</span>-->
         <!--</div>-->
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
         <monthsCharts :options="retail" :styles="stylesYear"></monthsCharts>
       </div>
       <div class="ratio">
         <div>
           <div class="itemColor1">{{rSaleRatio}}%</div>
           <div>当月不良率</div>
         </div>
         <div class="rlborder itemColor2">
           <div :style='{color:rSaleRatioYoy>0?"#d0021b":"#30aa2d"}'>{{rSaleRatioYoy>0?"+":""}}{{rSaleRatioYoy}}%</div>
           <div>同比变动</div>
         </div>
         <div>
           <div class="itemColor3" :style='{color:rSaleRatioMom>0?"#d0021b":"#30aa2d"}'>{{rSaleRatioMom>0?"+":""}}{{rSaleRatioMom}}%</div>
           <div>环比变动</div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
  import monthsCharts from '@/components/highchartsComponent/HighchartsComponent'
  import BScroll from 'better-scroll';
  import { host } from "@/common/base/baseHttp.js"
  import bus from '@/common/base/bus'
  import tokenInvalid from '@/common/base/tokenInvalid'
  import { Toast } from 'mint-ui';
  export default {
        name: "defectiveRatio",
      props:[
        'selectDate'
      ],
      data(){
        return{
          wholesaleSale:{
            chart: {
              backgroundColor:'#2F3543'
            },
            title: {
              align:'left',
              text:null,
              style: {
                fontWeight: 'bold'
              }
            },
            events:{
              click:function(e){
                console.log(e)
              }
            },
            xAxis: {
              categories: [
                '01','02','03','04','05','06','07','08','09','10','11','12'
              ],
              labels : {
                rotation:0,
              },
              crosshair:{
                color:"#FFFFFF",
                dashStyle:'solid',
                width:1,
                zIndex:999
              },
              enableMouseTracking:false,
              type:'line',
              tickPosition:'inside',
              tickmarkPlacement:'on',
              startOnTick:true,
              gridLineWidth:1,
              gridLineDashStyle:'Dash'
            },
            yAxis: {
              title: {
                text: ''
              },
              visible:false,
              gridLineWidth:0
            },
            credits:{enabled:false},
            legend:{enabled:false},
            exporting:{enabled:false},
            plotOptions: {
              line: {
                borderWidth: 0,
                dataLabels:{
                  enabled:true,
                }
              },
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
              data: [{'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null}],
              marker:{
                enabled:false,
                states:{
                  hover:{
                    enabled:false
                  },
                  select:{
                    enabled:false
                  }
                }
              },
              tooltip:{
                pointFormat:''
              },
              type:'area',
              color:'#596073'
            },
              {
                allowPointSelect: false,
                data: [{'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null}],
                pointStart: 0,
                type:'line',
                marker:{
                  symbol:'circle',
                  enabled:true
                },
                dataLabels:{
                  enabled:false,
                },
                color:'#30C2AE',
                events: {
                  click: function (event) {
                    // event.target.setAttribute('fill','rgb(241,155,58)');
                  }
                }
              }]
          },
          retail:{
            chart: {
              backgroundColor:'#353d51'
            },
            title: {
              align:'left',
              text:null,
              style: {
                fontWeight: 'bold'
              }
            },
            events:{
              click:function(e){
                console.log(e)
              }
            },
            xAxis: {
              categories: [
                '01','02','03','04','05','06','07','08','09','10','11','12'
              ],
              labels : {
                rotation:0,
              },
              crosshair:{
                color:"#FFFFFF",
                dashStyle:'solid',
                width:1,
                zIndex:999
              },
              enableMouseTracking:false,
              type:'line',
              tickPosition:'inside',
              tickmarkPlacement:'on',
              startOnTick:true,
              gridLineWidth:1,
              gridLineDashStyle:'Dash'
            },
            yAxis: {
              title: {
                text: ''
              },
              visible:false,
              gridLineWidth:0
            },
            credits:{enabled:false},
            legend:{enabled:false},
            exporting:{enabled:false},
            plotOptions: {
              line: {
                borderWidth: 0,
                dataLabels:{
                  enabled:true,
                }
              },
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
              data: [{'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null},
                {'y':null}],
              marker:{
                enabled:false,
                states:{
                  hover:{
                    enabled:false
                  },
                  select:{
                    enabled:false
                  }
                }
              },
              tooltip:{
                pointFormat:''
              },
              type:'area',
              color:'#596073'
            },
              {
                allowPointSelect: false,
                data: [{'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null},
                  {'color':'rgb(218,223,236)','y':null}],
                pointStart: 0,
                type:'line',
                marker:{
                  symbol:'circle',
                  enabled:true
                },
                dataLabels:{
                  enabled:false,
                },
                color:'#30C2AE',
                events: {
                  click: function (event) {
                    // event.target.setAttribute('fill','rgb(241,155,58)');
                  }
                }
              }]
          },
          stylesYear:{width: 95,height:180},
          wSaleRatio:0,
          wSaleRatioYoy:0,
          wSaleRatioMom:0,
          rSaleRatio:0,
          rSaleRatioYoy:0,
          rSaleRatioMom:0,
        }
      },
    created() {
       this.createHttp(this.selectDate)
      let that = this
      bus.$off('selectDate')
      bus.$on('selectDate',function(date){
        that.createHttp(date)
      })
    },
      mounted(){
        this._initScorll();
      },
      methods:{
        createHttp(date){
          let urlHost = host||'/api'
          this.$http.post(urlHost+'/Decision/defectiveRatio',{date:date}).then(function (res) {
            let that = this
            let data = JSON.parse(res.bodyText).result
            let code = JSON.parse(res.bodyText).code
            if(code ==0){
              data.forEach(function (item, index) {
                if (item.salesWay === "wholesaleSale") {
                  that.wSaleRatio = (item.saleRatio * 100).toFixed(2)
                  that.wSaleRatioYoy = (item.saleRatioYoy * 100).toFixed(2)
                  that.wSaleRatioMom = (item.saleRatioMom * 100).toFixed(2)
                  that.wholesaleSale = JSON.parse(JSON.stringify(that.wholesaleSale))
                  that.wholesaleSale.series[0].data = that.formatterAreaDate(item.lastMonthsRatio)
                  that.wholesaleSale.series[1].data = that.formatterLineDate(item.currentMonthsRatio)
                }
                if(item.salesWay === "retail") {
                  that.rSaleRatio = (item.saleRatio * 100).toFixed(2)
                  that.rSaleRatioYoy = (item.saleRatioYoy * 100).toFixed(2)
                  that.rSaleRatioMom = (item.saleRatioMom * 100).toFixed(2)
                  that.retail = JSON.parse(JSON.stringify(that.retail))
                  that.retail.series[0].data = that.formatterAreaDate(item.lastMonthsRatio)
                  that.retail.series[1].data = that.formatterLineDate(item.currentMonthsRatio)
                }
              })
            }else if(code ==20){
              tokenInvalid()
            }else{
              Toast(JSON.parse(res.bodyText).message)
            }

          })
        },
        _initScorll(){
          new BScroll(this.$refs['content-wrapper'],{click:true});
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
        }
      },
      components:{
        monthsCharts
      }
    }
</script>

<style lang="scss" scoped>
  .defectiveRatio{
    position: absolute;
    top: 80px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    background-color: #2F3543;
  }
  .Wholesale,.retail{
    height: 750px;
    background-color: #2F3543;
    overflow: hidden;
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
          background-color: #3AC3B1;
        }
        .t-l-text{
          color: #FFFFFF;
          font-size: 32px;
        }
      }
      /*.title-right{*/
        /*float: right;*/
        /*&:after{*/
          /*display: inline-block;*/
          /*content: '';*/
          /*width: 16px;*/
          /*height: 16px;*/
          /*margin-right: 32px;*/
          /*border-top: 1px solid rgb(155,155,155);*/
          /*border-right: 1px solid rgb(155,155,155);*/
          /*transform: rotate(45deg);*/
        /*}*/
        /*span{*/
          /*display: inline-block;*/
          /*margin-top: 32px;*/
          /*font-size: 32px;*/
          /*color: rgb(155,155,155);*/
        /*}*/
      /*}*/
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
          background-color: #3AC3B1;
        }
        .icon-t{
          width: 20px;
          height: 20px;
          background-color: #596073;
        }
      }
    }
    .charts{
      position: relative;
      width: 100%;
      height: 460px;
      >div{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
      }
    }
    .ratio{
      display:flex;
      >div{
        flex: 1;
        text-align: center;
        :first-child{
          font-size: 60px;
          line-height: 84px;
        }
        :last-child{
          font-size: 32px;
          color: #FFFFFF;
          margin-top: 16px;
        }
      }
     .itemColor1{
       color: #3AC3B1;
     }
      .itemColor2{
      color: #D0021B;
      }
      .itemColor3{
      color: #30AA2D;
      }
      .rlborder{
        border-left: 2px solid #ccc;
       border-right: 2px solid #ccc;
     }
    }
  }
  .retail{
    background-color: #353d51;
  }
</style>
