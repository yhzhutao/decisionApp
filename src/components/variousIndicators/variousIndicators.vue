<!--各项指标界面-->
<template>
  <div class="variousIndicators" ref="variousIndicators-wrapper">
    <div class="content">
      <div class="variousIndicators-card">
      <div class="indicators-head clearfix">
        <div class="left">
          <span>各项指标</span><img src="../../image/target_icon@2x.png">
        </div>
        <router-link to="/indicatorsTrend">
          <div class="right">
            <span>更多</span>
          </div>
        </router-link>
      </div>
      <div class="content">
        <ul>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="indicators.assetliabilityRatio.toFixed(2)" :index1="'资产负债率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="indicators.defectiveRate.toFixed(2)" :index1="'不良率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="indicators.marketShare.toFixed(2)" :index1="'市占率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="indicators.permeability.toFixed(2)" :index1="'渗透率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="indicators.approvalRate.toFixed(2)" :index1="'核准率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="indicators.automaticRate.toFixed(2)" :index1="'自动审批率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import Indicator from '@/components/indicator/indicator'
  import BScroll from 'better-scroll';
  import { host } from "@/common/base/baseHttp.js"
  import bus from '@/common/base/bus.js';
  import tokenInvalid from '@/common/base/tokenInvalid'
  import { Toast } from 'mint-ui';
  export default {
    name: "variousIndicators",
    data(){
      return{
        indicators:{
          assetliabilityRatio:0,
          defectiveRate:0,
          marketShare:0,
          permeability:0,
          approvalRate:0,
          automaticRate:0
        }
      }
    },
    props:[
      'selectDate'
    ],
    components: {
      'v-indicator': Indicator
    },
    created(){
      let that = this
      bus.$off('selectDate')
      bus.$on('selectDate',function(date){
        that._initScorll(date);
      })
    },
    mounted(){
      this._initScorll(this.selectDate)
    },
    methods:{
      _initScorll(date){
        // console.log(this.selectDate);
        let urlHost = host||'/api'
        this.$http.post(urlHost+'/Decision/indicators',{date:date}).then((response)=>{
          let code = JSON.parse(response.bodyText).code
          if(code==0){
            this.indicators = Object.assign({},this.indicators,JSON.parse(response.bodyText).result);
          }else if(code ==20){
            tokenInvalid()
          }else{
            Toast(JSON.parse(response.bodyText).message)
          }
        })
        new BScroll(this.$refs['variousIndicators-wrapper'],{click:true});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .variousIndicators {
    position: absolute;
    width: 100%;
    top: 216px;
    bottom: 0;
    overflow: hidden;
    .content {
      .variousIndicators-card {
        margin: 0px 32px;
        padding: 32px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        .indicators-head {
          .left {
            float: left;
            /*margin-bottom: 32px;*/
            margin-bottom: 10%;
            span {
              margin-right: 16px;
              vertical-align: middle;
              font-size: 32px;
              color: #b2b2b2;
            }
            img {
              width: 32px;
              height: 18px;
              vertical-align: middle;
            }
            &:before {
              content: '';
              display: inline-block;
              width: 8px;
              height: 32px;
              background: #30c2ae;
              margin-right: 16px;
              vertical-align: middle;
            }
          }
          .right {
            float: right;
            span {
              font-size: 32px;
              color: #acacac;
            }
          ;
            &:after {
              display: inline-block;
              content: '';
              width: 16px;
              height: 16px;
              border-top: 2px solid #b0b0b0;
              border-right: 2px solid #b0b0b0;
              transform: rotate(45deg);
              -webkit-transform: rotate(45deg);
            }
          }
        }
        .content {
          ul {
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            li{
              margin-bottom: 10%;
              width: 50%;
            }
          }
        }
      }
      &:after{
        content: '';
        display: block;
        height: 32px;
        width: 100%;
      }
    }
  }
</style>
