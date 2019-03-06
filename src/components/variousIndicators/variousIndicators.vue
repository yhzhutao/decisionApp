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
            <v-indicator :fontcolor="'#3ac5b2'" :percent="(indicators.assetliabilityRatio*100).toFixed(2)==0?'—':(indicators.assetliabilityRatio*100).toFixed(2)" :index1="'资产负债率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="(indicators.defectiveRate*100).toFixed(2)==0?'—':(indicators.defectiveRate*100).toFixed(2)" :index1="'不良率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="(indicators.approvalRate*100).toFixed(2)==0?'—':(indicators.approvalRate*100).toFixed(2)" :index1="'核准率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li>
            <v-indicator :fontcolor="'#3ac5b2'" :percent="(indicators.automaticRate*100).toFixed(2)==0?'—':(indicators.automaticRate*100).toFixed(2)" :index1="'自动审批率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li class="bottomLi">
            <v-indicator :fontcolor="'#3ac5b2'" :percent="(indicators.marketShare*100).toFixed(2)==0?'—':(indicators.marketShare*100).toFixed(2)" :index1="'市占率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
          <li class="bottomLi">
            <v-indicator :fontcolor="'#3ac5b2'" :percent="(indicators.permeability*100).toFixed(2)==0?'—':(indicators.permeability*100).toFixed(2)" :index1="'渗透率'" :lineFirstColor="'#008572'" :lineEndColor="'#57C2B3'"></v-indicator>
          </li>
        </ul>
        <div class="bottomTip">
          <div class="tip"><div v-show="indicators.contactDate!=null">*市占率截止到 <br/> {{contactDate}}末</div></div>
          <div class="tip"><div  v-show="indicators.salesDate!=null">*渗透率截止到 <br/> {{salesDate}}末</div></div>
        </div>
      </div>
    </div>
      <div class="bottomBox"></div>
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
          automaticRate:0,
        },
        salesDate:'',
        contactDate:''
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
        let urlHost = host||'/api'
        this.$http.post(urlHost+'/Decision/indicators',{date:date}).then((response)=>{
          let code = JSON.parse(response.bodyText).code
          if(code==0){
            this.indicators = Object.assign({},this.indicators,JSON.parse(response.bodyText).result);
            //市占率截止日期
            if(this.indicators.contactDate){
              this.contactDate = this.indicators.contactDate.substr(0,4)+'年'+this.indicators.contactDate.substr(4,2)+'月'
            }else{

              this.contactDate = this.indicators.contactDate
            }
            //渗透率截止日期
            if(this.indicators.contactDate){
              this.salesDate = this.indicators.salesDate.substr(0,4)+'年'+this.indicators.salesDate.substr(4,2)+'月'
            }else{
              this.salesDate = this.indicators.salesDate
            }
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
        box-shadow: 0 0px 24px rgba(0, 0, 0, 0.5);
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
            height: 40px;
            span {
              font-size: 32px;
              color: #acacac;
              line-height: 40px;
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
              margin-bottom: 2px;
            }
          }
        }
        .content {
          ul {
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            li {
              margin-bottom: 10%;
              width: 50%;
            }
            .bottomLi {
              margin-bottom: 5%;
            }
          }
        }
        .bottomTip{
          display: flex;
          .tip{
            height: 100px;
            flex: 1;
            font-size: 24px;
            color:red;
            text-align: center;
            line-height: 40px;
            position: relative;
            div{
              background-color: #30C2AE;
              width: 200px;
              height: 100px;
              color: white;
              position: absolute;
              left: 50%;
              top:50%;
              transform: translate(-50%,-50%);
              -webkit-transform: translate(-50%,-50%);
              border-radius: 20px;
              text-align: center;
              line-height: 50px;
              z-index: 2;
            }
            div:before{
              content: '';
              width:0;
              height:0;
              border-width:0 30px 30px;
              border-style:solid;
              border-color:transparent transparent #30C2AE;/*透明 透明  灰*/
              margin:40px auto;
              position:absolute;
              left: 50%;
              top: -60px;
              transform: translateX(-50%);
              -webkit-transform:translateX(-50%);
              z-index: 1;
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
