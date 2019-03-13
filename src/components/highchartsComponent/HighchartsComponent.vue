<!--highcharts组件-->
<template>
  <div class="highcharts-container"></div>
</template>

<script>
  import Highcharts from 'highcharts/highstock';
  import HighchartsMore from 'highcharts/highcharts-more';
  import HighchartsDrilldown from 'highcharts/modules/drilldown';
  import Highcharts3D from 'highcharts/highcharts-3d';
  HighchartsMore(Highcharts)
  HighchartsDrilldown(Highcharts);
  Highcharts3D(Highcharts);

  export default {
    props: ['options','styles','selectDate'],
    name: 'highcharts',
    data() {
      return {
        chart: null
      }
    },
    mounted() {
        this.initChart();
    },
    watch:{
      'options.series':function(newQuestion,oldQuestion){
        setTimeout(()=>{
          if(this.options.chart.type == 'column'){
            let style = {}
            style.width =this.$el.clientWidth
            style.height = this.styles.height
            this.chart.update({chart:style,xAxis:{categories:this.options.xAxis.categories},series:newQuestion})
          }else{
            this.chart.update({xAxis:{categories:this.options.xAxis.categories},series:newQuestion})
            if(newQuestion[1].data.length>12){
              let index = Number(this.selectDate.substr(6))-1
              if(this.chart.series[1].data[index].options.y !== null){
                this.chart.tooltip.refresh(this.chart.series[1].data[index])
              }
            }else{
              let index = Number(this.selectDate.substr(4,2))-1
             if(this.chart.series[1].data[index].options.y !== null){
               this.chart.tooltip.refresh(this.chart.series[1].data[index])
             }
            }
          }
        },0)
      }
    },
    methods: {
      initChart() {
        this.$el.style.width = (this.styles.width || 100) + '%';
        this.$el.style.height = (this.styles.height || 90) + 'px';
        this.chart = new Highcharts.Chart(this.$el, this.options);
      }
    }
  }
</script>

<style lang="scss">
  .highcharts-container {
  }
</style>
