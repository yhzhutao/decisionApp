<template>
    <div class="brand">
      <div class="brand-head">
        <ul>
          <li>
            <div class="img">
              <img src="../../image/changan_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/ford_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/suzuki_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/mazda_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/oushang_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/ds_logo@2x.png" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="brand-content">
        <v-highchart :options="optionsYear" :styles="stylesYear"></v-highchart>
        <hr>
        <v-highchart :options="optionsYear" :styles="stylesYear"></v-highchart>
        <hr>
        <v-highchart :options="optionsYear" :styles="stylesYear"></v-highchart>
        <hr>
        <v-highchart :options="optionsYear" :styles="stylesYear"></v-highchart>
      </div>
    </div>
</template>

<script>
  import Highchart from '@/components/highchartsComponent/HighchartsComponent';
    export default {
        name: "brand",
      data(){
          return{
            optionsYear:{
              chart: {
                type: 'column'
              },
              title: {
                text: '全年达成率',
                align:'left',
                style: {
                  fontWeight: 'bold'
                }
              },
              xAxis: {
                categories: [
                  '长安','长安','长安','长安','长安','长安'
                ]
              },
              yAxis: {
                min: 0,
                title: {
                  text: ''
                },
                gridLineWidth:0
              },
              credits:{enabled:false},
              legend:{enabled:false},
              exporting:{enabled:false},
              tooltip:false,
              plotOptions: {
                column: {
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
                data: [{'color':'rgb(218,223,236)','y':70},
                  {'color':'rgb(218,223,236)','y':12},
                  {'color':'rgb(218,223,236)','y':13},
                  {'color':'rgb(218,223,236)','y':14},
                  {'color':'rgb(218,223,236)','y':15},
                  {'color':'rgb(218,223,236)','y':16}]
              }]
            },
            stylesYear:{width: 100,height:250}
          }
      },
      components:{
          'v-highchart':Highchart
      }
    }
</script>

<style lang="scss" scoped>
.brand{
  .brand-head{
    ul{
      display: flex;
      justify-content: space-around;
      margin: 26px 0;
      li{
        .img{
          display: inline-block;
          width: 104px;
          height: 104px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .brand-content{
    hr{
      margin: 0;
    }
  }
}
</style>
