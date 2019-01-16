<!--个贷情况界面-->
<template>
  <div class="individualIoan" ref="individualIoan-wrapper">
    <div class="content">
      <div class="target-card">
        <div class="target-head clearfix">
          <div class="target-head-left">
            <span>目标达成率</span><img src="../../image/aim_icon@2x.png" alt="">
          </div>
          <router-link to="/brand">
            <div class="target-head-right">
              <span>更多</span>
            </div>
          </router-link>
        </div>
        <div class="target-content">
          <ul>
            <li>
              <v-indicator :fontcolor="'rgb(245,161,1)'" :percent="yearRate" :index1="'全年达成率'"></v-indicator>
            </li>
            <li>
              <v-indicator :fontcolor="'rgb(245,161,1)'" :percent="monthRate" :index1="'当月达成率'"></v-indicator>
            </li>
          </ul>
          <div class="target-num">
            <div class="year-target">
              <p>{{individualLoanSituation.yearlyTarget||'—'}}</p>
              <span>全年目标</span>
              <p>{{individualLoanSituation.yearlyReach||'—'}}</p>
              <span>全年达成</span>
            </div>
            <div class="month-target">
              <p>{{individualLoanSituation.currentMonthTarget||'—'}}</p>
              <span>当月目标</span>
              <p>{{individualLoanSituation.currentMonthReach||'—'}}</p>
              <span>当月达成</span>
            </div>
          </div>
          <div class="unit">
            单位: 件
          </div>
        </div>
      </div>
      <div class="examine-card">
        <div class="examine-head">
          <span>审批日报</span><img src="../../image/day_infomation_icon@2x.png" alt="">
        </div>
        <div class="examine-content">
          <ul>
            <li>
                <span>
                  <p>{{individualLoanSituation.todayApplication||'—'}}</p>
                  <p>本日申请</p>
                </span>
            </li>
            <li>
                <span>
                  <p>{{individualLoanSituation.todayApproval||'—'}}</p>
                  <p>本日审批</p>
                </span>
            </li>
            <li>
                <span>
                  <p>{{individualLoanSituation.pendingApproval||'—'}}</p>
                  <p>待审批</p>
                </span>
            </li>
            <li>
                <span>
                  <p>{{individualLoanSituation.monthApplication||'—'}}</p>
                  <p>当月申请</p>
                </span>
            </li>
            <li>
                <span>
                  <p>{{individualLoanSituation.monthApproval||'—'}}</p>
                  <p>当月审批</p>
                </span>
            </li>
            <li>
                <span>
                  <p>{{individualLoanSituation.monthCheck||'—'}}</p>
                  <p>当月核准</p>
                </span>
            </li>
          </ul>
          <div class="unit">
            单位: 件
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Indicator from '@/components/indicator/indicator';
  import BScroll from 'better-scroll';
  import { host } from "@/common/base/baseHttp.js"
  import bus from '@/common/base/bus.js';
  import tokenInvalid from '@/common/base/tokenInvalid'
  import { Toast } from 'mint-ui';
  export default {
    name: "individualIoan",
    data() {
      return {
        date: 0,
        yearRate: 0,
        monthRate: 0,
        individualLoanSituation: {}
      }
    },
    props: ['selectDate'],
    components:
      {
        'v-indicator':
        Indicator
      }
    ,
    created(){
      let that = this
      bus.$off('selectDate')
      bus.$on('selectDate',function(date){
        that._initScroll(date);
      })
    },
    mounted() {
      this._initScroll(this.selectDate)
    }
    ,
    methods: {
      _initScroll(date) {
        let urlHost = host||'/api'
        this.$http.post(urlHost+'/Decision/individualLoanSituation',{date:date}).then((response) => {
          let code = JSON.parse(response.bodyText).code
          if(code==0){
            this.individualLoanSituation = Object.assign({}, this.individualLoanSituation, JSON.parse(response.bodyText).result);
            //判断不为Infinity
            if(this.individualLoanSituation.yearlyTarget == 0||this.individualLoanSituation.yearlyTarget==null){
              this.yearRate='—'
            }else{
              this.yearRate = this.individualLoanSituation.yearlyReach / this.individualLoanSituation.yearlyTarget * 100||0;
              this.yearRate = parseFloat(this.yearRate.toFixed(2));
            }

            if(this.individualLoanSituation.currentMonthTarget==0||this.individualLoanSituation.currentMonthTarget==null){
              this.monthRate='—'
            }else{
              this.monthRate = this.individualLoanSituation.currentMonthReach / this.individualLoanSituation.currentMonthTarget * 100||0;
              this.monthRate = parseFloat(this.monthRate.toFixed(2));
            }


          }else if(code ==20){
            tokenInvalid()
          }else{
            Toast(JSON.parse(response.bodyText).message)
          }
        });
        new BScroll(this.$refs['individualIoan-wrapper'], {click: true});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .individualIoan {
    position: absolute;
    width: 100%;
    top: 216px;
    bottom: 0;
    overflow: hidden;
    .content {
      .target-card {
        margin: 0px 32px;
        padding: 32px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        .target-head {
          .target-head-left {
            float: left;
            &:before {
              display: inline-block;
              content: '';
              width: 8px;
              height: 32px;
              background: rgb(244, 161, 0);
              margin-right: 16px;
              vertical-align: middle;
            }
            span, img {
              vertical-align: middle;
            }
            span {
              font-size: 32px;
              color: rgb(155, 155, 155);
              margin-right: 16px;
              line-height: 22px;
            }
            img {
              width: 36px;
              height: 36px;
            }
          }
          .target-head-right {
            float: right;
            &:after {
              display: inline-block;
              content: '';
              width: 16px;
              height: 16px;
              border-top: 1px solid rgb(155, 155, 155);
              border-right: 1px solid rgb(155, 155, 155);
              transform: rotate(45deg);
              -webkit-transform: rotate(45deg);
            }
            span {
              font-size: 32px;
              color: rgb(155, 155, 155);
            }
          }
        }
        .target-content {
          margin-top: 16px;
          ul {
            display: flex;
            li {
              width: 50%;
              .indicator {
                margin: 0 auto;
              }
            }
          }
          .target-num {
            display: flex;
            margin-top: 32px;
            .year-target {
              border-right: 2px solid rgb(151, 151, 151);
            }
            .year-target, .month-target {
              width: 50%;
              box-sizing: border-box;
              text-align: center;
              line-height: 48px;
              p {
                font-size: 32px;
                color: rgb(0, 0, 0);
                margin-bottom: 4px;
              }
              span {
                display: inline-block;
                font-size: 32px;
                color: rgb(245, 161, 1);
                margin-bottom: 12px;
              }
            }
          }
          .unit {
            margin-top: 24px;
            text-align: right;
            font-size: 24px;
            color: rgb(155, 155, 155);
          }
        }
      }
      .examine-card {
        margin: 32px 32px 0 32px;
        padding: 32px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        .examine-head {
          &:before {
            display: inline-block;
            content: '';
            width: 8px;
            height: 32px;
            background: rgb(245, 161, 1);
            margin-right: 16px;
            vertical-align: middle;
          }
          span, img {
            vertical-align: middle;
          }
          span {
            font-size: 32px;
            color: rgb(155, 155, 155);
            margin-right: 16px;
          }
          img {
            width: 24px;
            height: 32px;
          }
        }
        .examine-content {
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              display: inline-block;
              width: 33.33%;
              margin-top: 32px;
              span {
                display: inline-block;
                width: 200px;
                height: 200px;
                background: linear-gradient(rgb(251, 210, 73), rgb(255, 255, 255));
                p {
                  text-align: center;
                }
                p:first-child {
                  margin-top: 44px;
                  line-height: 56px;
                  font-size: 40px;
                }
                p:nth-child(2) {
                  margin-top: 16px;
                  line-height: 44px;
                  font-size: 32px;
                }
              }
            }
          }
          .unit {
            margin-top: 24px;
            text-align: right;
            font-size: 24px;
            color: rgb(155, 155, 155);
          }
        }
      }
      &:after {
        content: '';
        display: block;
        height: 32px;
        width: 100%;
      }
    }
  }
</style>
