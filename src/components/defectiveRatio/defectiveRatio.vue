<template>
 <div class="defectiveRatio">
   <div class="Wholesale">
     <div class="title">
       <div class="title-left">
         <span class="icon"></span>
         <span class="t-l-text">批售</span>
       </div>
       <div class="title-right">
        <span>更多</span>
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
     <monthsCharts :options="optionsYear" :styles="stylesYear"></monthsCharts>
   </div>
   <div class="retail"></div>
 </div>
</template>

<script>
  import monthsCharts from '@/components/highchartsComponent/HighchartsComponent'
    export default {
        name: "defectiveRatio",
      data(){
        return{
          optionsYear:{
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
            xAxis: {
              categories: [
                '01','02','03','04','05','06','07','08','09','10','11','12月'
              ],
              labels : {
                rotation:0,
              },
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
            tooltip:false,
            plotOptions: {
              line: {
                borderWidth: 0,
                dataLabels:{
                  enabled:true,
                }
              },
              series: {
                events: {
                  click: function (event) {
                    // console.log(event);
                    event.target.setAttribute('fill','rgb(241,155,58)');
                  }
                }
              }
            },
            series: [{
              data: [{'color':'rgb(218,223,236)','y':5},
                {'color':'rgb(218,223,236)','y':12},
                {'color':'rgb(218,223,236)','y':13},
                {'color':'rgb(218,223,236)','y':14},
                {'color':'rgb(218,223,236)','y':15},
                {'color':'rgb(218,223,236)','y':16},
                {'color':'rgb(218,223,236)','y':30},
                {'color':'rgb(218,223,236)','y':12},
                {'color':'rgb(218,223,236)','y':13},
                {'color':'rgb(218,223,236)','y':14},
                {'color':'rgb(218,223,236)','y':15},
                {'color':'rgb(218,223,236)','y':16}],
              pointStart: 0,
              type:'area'
            }]
          },
          stylesYear:{width: 100,height:250}
        }
      },
      components:{
        monthsCharts
      }
    }
</script>

<style lang="scss" scoped>
  .Wholesale{
    height: 770px;
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
      .title-right{
        float: right;
        &:after{
          display: inline-block;
          content: '';
          width: 16px;
          height: 16px;
          margin-right: 32px;
          border-top: 1px solid rgb(155,155,155);
          border-right: 1px solid rgb(155,155,155);
          transform: rotate(45deg);
        }
        span{
          display: inline-block;
          margin-top: 32px;
          font-size: 32px;
          color: rgb(155,155,155);
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
          background-color: #3AC3B1;
        }
        .icon-t{
          width: 20px;
          height: 20px;
          background-color: #596073;
        }
      }
    }
  }

</style>
