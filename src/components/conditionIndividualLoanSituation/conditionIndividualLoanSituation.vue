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
              <Indicator :numcolor="'#ffffff'" :maskBackground="'#2F3543'" :fontcolor="'#F5A101'" :percent="yearlyRatio" :index1="'全年达成率'"></Indicator>
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
              <Indicator :numcolor="'#ffffff'" :fontcolor="'#F5A101'" :maskBackground="'#353D51'" :percent="monthlyRatio" :index1="'当月达成率'"></Indicator>
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
            <div>{{monthSales}}</div>
            <div>当月累计</div>
          </div>
          <div class="rlborder">
            <div>{{chainSales}}</div>
            <div>当月同期</div>
          </div>
          <div>
            <div class="ratio" :style='{color:salesRatio>0?"#d0021b":"#30aa2d"}'>{{salesRatio>0?'+':''}}{{salesRatio}}{{salesRatio=='—'?'':'%'}}</div>
            <div>环比</div>
          </div>
        </div>
      </div>
      <div class="application">
        <div class="title">
          <div class="title-left">
            <span class="icon"></span>
            <span class="t-l-text">申请件</span>
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
            <div>{{applyCurrentMonth}}</div>
            <div>当月累计</div>
          </div>
          <div class="rlborder">
            <div>{{applyChain}}</div>
            <div>当月同期</div>
          </div>
          <div>
            <div class="ratio" :style='{color:applyRatio>0?"#d0021b":"#30aa2d"}'>{{applyRatio>0?'+':''}}{{applyRatio}}{{applyRatio=='—'?'':'%'}}</div>
            <div>环比</div>
          </div>
        </div>
      </div>
      <div class="loan">
        <div class="title">
          <div class="title-left">
            <span class="icon"></span>
            <span class="t-l-text">放款件</span>
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
            <div>{{loanCurrentMonth}}</div>
            <div>当月累计</div>
          </div>
          <div class="rlborder">
            <div>{{loanChain}}</div>
            <div>当月同期</div>
          </div>
          <div>
            <div class="ratio" :style='{color:loanRatio>0?"#d0021b":"#30aa2d"}'>{{loanRatio>0?'+':''}}{{loanRatio}}{{loanRatio=='—'?'':'%'}}</div>
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
  import osc from '@/common/base/osc_common'
  import bus from '@/common/base/bus'
  import { host } from "@/common/base/baseHttp.js"
  import tokenInvalid from '@/common/base/tokenInvalid'
  import { Toast } from 'mint-ui';
  export default {
    name: "conditionIndividualLoanSituation",
    props:{
      selectDate:String
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
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              dataLabels: {
                crop:false,
                overflow:'none',
                enabled: true,
                color: '#ffffff',
                formatter:function(){
                  return this.y+'%'
                }
              }
            }
          },
          xAxis: {
            categories: [
              '北区', '东区', '南区', '西区', '中区','东北区'
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
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'color': '#F19938', 'y': null}],
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
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              dataLabels: {
                crop:false,
                overflow:'none',
                enabled: true,
                color: '#ffffff',
                formatter:function(){
                  return this.y+'%'
                }
              }
            }
          },
          xAxis: {
            categories: [
              '北区', '东区', '南区', '西区', '中区','东北区'
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
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'color': '#F19938', 'y': null}],
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
              zIndex: 1
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
            pointFormat:'<p>{point.y}</p>'
          },
          series: [{
            enableMouseTracking:false,
            allowPointSelect: false,
            data: [{'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y':null}],
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
              data: [{'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null}],

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
              zIndex: 1
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
            pointFormat:'<p>{point.y}</p>',
            // shared: true
          },
          series: [{
            enableMouseTracking:false,
            allowPointSelect: false,
            data: [{'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null},
              {'y': null}],
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
              data: [{'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null},
                {'color': 'rgb(218,223,236)', 'y': null}],
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
        mProgress:0,
        monthSales:0,
        chainSales:0,
        salesRatio:0,
        applyCurrentMonth:0,
        applyChain:0,
        applyRatio:0,
        loanCurrentMonth:0,
        loanChain:0,
        loanRatio:0,
        brandCode:0,
        regionCode:0
      }
    },
    created(){
      let that = this
      this.getProgress(this.selectDate)
      this.createHttp(this.selectDate,that.getBrandCode(),0)
      bus.$off('selectDate')
      bus.$off('getBrandCode')
      bus.$off('getRegion')
      bus.$on('selectDate',function(date){
        that.getProgress(date)
        that.createHttp(date,that.brandCode,that.regionCode)
        let days = Number(date.substr(6,2))
        let width = that.$refs['monthCharts2'].children[0].clientWidth
        let MonthDays = that.getMonsthDays(date)

        if(days>10&&days<MonthDays-7){
          that.monthCharts1.scrollTo(-width/MonthDays*(days-7),0)
          that.monthCharts2.scrollTo(-width/MonthDays*(days-7),0)
        }else if(days>=MonthDays-7){
          that.monthCharts1.scrollTo(-width/MonthDays*20,0)
          that.monthCharts2.scrollTo(-width/MonthDays*20,0)
        }
      })
      bus.$on('getBrandCode',function(brandCode){
        that.brandCode = brandCode
        that.createHttp(that.selectDate,brandCode,that.regionCode)
      })
      bus.$on('getRegion',function(regionCode){
        if(regionCode !== '0'){
          that.regionFlag = false
        }else{
          that.regionFlag = true
        }
        that.createHttp(that.selectDate,that.brandCode,regionCode)
      })
    },
    methods:{
      getProgress(date){
        let year = date.substr(0,4)
        let month = date.substr(4,2)
        let day = date.substr(6,2)
        this.getYearProgress(year,month,day)
        this.getMonthProgress(year,month,day)
      },
      monthArr(){
        let arr = []
        for(let i=1;i<=31;i++){
          arr.push(i)
        }
        return arr
      },
      _initScorll(){
        let days = Number(this.selectDate.substr(6,2))
        let width = this.$refs['monthCharts2'].children[0].clientWidth
        let MonthDays = this.getMonsthDays(this.selectDate)
       this.monthCharts1 =  new BScroll(this.$refs['monthCharts1'], {
          scrollX: true,
          scrollY: false,
          click: true
        })
       this.monthCharts2=  new BScroll(this.$refs['monthCharts2'], {
          scrollX: true,
          scrollY: false,
          click: true
        })
        if(days<=10){
          this.monthCharts1.scrollTo(0,0)
          this.monthCharts2.scrollTo(0,0)
        }else if(days>10&&days<MonthDays-7){
          this.monthCharts1.scrollTo(-width/MonthDays*(days-7),0)
          this.monthCharts2.scrollTo(-width/MonthDays*(days-7),0)
        }else if(days>=MonthDays-7){
          this.monthCharts1.scrollTo(-width/MonthDays*20,0)
          this.monthCharts2.scrollTo(-width/MonthDays*20,0)
        }
        new BScroll(this.$refs['wrapper'], {
          scrollY: true,
          scrollX: false,
          click: true
        })
      },
      createHttp(date,brandCode,regionCode){
        let that = this
        let urlHost = host||'/api'
        let data = {
          date:date,
          brandName:brandCode,
          region:regionCode
        }
        if(regionCode == '0'){
          delete data.region
        }
        this.$http.post(urlHost+'/Decision/individualLoanFilter',data).then(function(res){
          let code = JSON.parse(res.bodyText).code
          let data =JSON.parse(res.bodyText).result
          if(code ==0 ){
            this.yearlyRatio = Number((data.yearlyReach/data.yearlyTarget*100).toFixed(2))||'—'
            this.yearlyReach=osc.formatterCount(data.yearlyReach)||'—'
            this.yearlyTarget=osc.formatterCount(data.yearlyTarget)||'—'
            this.monthlyRatio = Number((data.currentMonthReach/data.currentMonthTarget*100).toFixed(2))||'—'
            this.currentMonthTarget=osc.formatterCount(data.currentMonthTarget)||'—'
            this.currentMonthReach=osc.formatterCount(data.currentMonthReach)||'—'
            if(data.yearRegions !=null){
              this.optionsYear=JSON.parse(JSON.stringify(this.optionsYear))
              this.optionsYear.series[0].data = this.sortRegion(data.yearRegions)
            }
            if(data.monthRegions!=null){
              this.optionsMonth=JSON.parse(JSON.stringify(this.optionsMonth))
              this.optionsMonth.series[0].data = this.sortRegion(data.monthRegions)
            }
            this.monthSales = osc.formatterCount(data.monthSales)
            this.chainSales = osc.formatterCount(data.chainSales)
            //判断是否是Infinity和NaN
            let salesRatio = Math.round((data.monthSales-data.chainSales)/data.chainSales*100)
            if(salesRatio==Infinity||salesRatio==-Infinity||isNaN(salesRatio)){
              this.salesRatio = '—'
            }else{
              this.salesRatio = salesRatio
            }
            data.salesData.forEach(function(item,index){
              if(item.salesWay === 'apply'){
                that.applyCurrentMonth = osc.formatterCount(item.cumulativeMonth)
                that.applyChain = osc.formatterCount(item.currentSy)
                let applyRatio = Math.round((item.cumulativeMonth-item.chainSales)/item.chainSales*100)
                if(applyRatio==Infinity||applyRatio==-Infinity||isNaN(applyRatio)){
                  that.applyRatio = '—'
                }else{
                  that.applyRatio = applyRatio
                }
                that.optionsMonthSales = JSON.parse(JSON.stringify(that.optionsMonthSales))
                that.optionsMonthSales.series[0].data = item.chainData
                that.optionsMonthSales.series[1].data = item.currentData
              }
              if(item.salesWay === 'loan'){
                that.loanCurrentMonth = osc.formatterCount(item.cumulativeMonth)
                that.loanChain = osc.formatterCount(item.currentSy)
                let loanRatio = Math.round((item.cumulativeMonth-item.chainSales)/item.chainSales*100)
                if(loanRatio==Infinity||loanRatio==-Infinity||isNaN(loanRatio)){
                  that.loanRatio = '—'
                }else{
                  that.loanRatio = loanRatio
                }
                that.optionsMonthLoan = JSON.parse(JSON.stringify(that.optionsMonthLoan))
                that.optionsMonthLoan.series[0].data = item.chainData
                that.optionsMonthLoan.series[1].data = item.currentData
                that.chartsDateFomatter(item.currentData)
              }
            })
          }else if(code == 20){
            tokenInvalid()
          }else{
            Toast(JSON.parse(res.bodyText).message)
          }
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
      //获取当月天数
      getMonsthDays(date){
        let year = Number(date.substr(0,4))
        let month = Number(date.substr(4,2))
        //先将每个月份的天数存入数组中
        let arr = [31,28,31,30,31,30,31,31,30,31,30,31]
        //判断是否是闰年且看是否大于2月(小于2月没必要考虑闰年问题)
        if(this.isLeap(year)){
          arr[1] = 29
        }
        return arr[month-1]
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
      chartsDateFomatter(data){
        let arr = []
        data.map(function(item,index){
          return{
            x:index+1,
            y:item
          }
        })
      },
      isLeap(year){
        if (year % 400 == 0 || year % 4 === 0 && year % 100 !== 0){
          return true;
        }else{
          return false;
        }
      },
      getBrandCode(){
        let routerStr = this.$router.currentRoute.path
        let index = routerStr.substr(routerStr.length-1,1)
        let brandCodeArr = ['carBrand9879','carBrand9876','BRAND20180093','carBrand9877','carSeries0029','carBrand9879']
        this.brandCode = brandCodeArr[index]
        return brandCodeArr[index]
      },
      //区域排序并添加颜色
      sortRegion(arr){
        let regionValue = [0,0,0,0,0]
        let maxValueObj = {max:0,index:0}
         arr.forEach(function(item){
           switch (item.region) {
             case '7247':
               regionValue.splice(0,1,{y:parseFloat((item.regionalReach/item.regionalGoals*100).toFixed(2))})
               break;
             case '4473':
               regionValue.splice(1,1,{y:parseFloat((item.regionalReach/item.regionalGoals*100).toFixed(2))})
               break;
             case '7245':
               regionValue.splice(2,1,{y:parseFloat((item.regionalReach/item.regionalGoals*100).toFixed(2))})
               break;
             case '6830':
               regionValue.splice(3,1,{y:parseFloat((item.regionalReach/item.regionalGoals*100).toFixed(2))})
               break;
             case '5534':
               regionValue.splice(4,1,{y:parseFloat((item.regionalReach/item.regionalGoals*100).toFixed(2))})
               break;
             case '4001':
               regionValue.splice(5,1,{y:parseFloat((item.regionalReach/item.regionalGoals*100).toFixed(2))})
               break;
           }
         })
        regionValue.forEach(function(item,index){
          if(item.y==0){
            item.y = null
          }
          if(maxValueObj.max < item.y){
            maxValueObj.max = item.y
            maxValueObj.index = index
          }
        })
        regionValue[maxValueObj.index].color = "#F19938"
        return regionValue
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
    height: 710px;
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
    height: 710px;
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
