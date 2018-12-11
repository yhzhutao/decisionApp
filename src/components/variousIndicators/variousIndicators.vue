<!--各项指标界面-->
<template>
  <div id="variousIndicators">
    <div class="indicators-head clearfix">
      <div class="left">
        <span>各项指标</span><img src="../../image/target_icon@2x.png">
      </div>
      <div class="right">
        <span>更多</span>
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <v-indicator :fontcolor="'#3ac5b2'" :percent="53.72" :index="'资产负率'"></v-indicator>
        </li>
        <li>
          <v-indicator :fontcolor="'#3ac5b2'" :percent="53.72" :index="'不良率'"></v-indicator>
        </li>
        <li>
          <v-indicator :fontcolor="'#3ac5b2'" :percent="53.72" :index="'市占率'"></v-indicator>
        </li>
        <li>
          <v-indicator :fontcolor="'#3ac5b2'" :percent="53.72" :index="'渗透率'"></v-indicator>
        </li>
        <li>
          <v-indicator :fontcolor="'#3ac5b2'" :percent="53.72" :index="'核准率'"></v-indicator>
        </li>
        <li>
          <v-indicator :fontcolor="'#3ac5b2'" :percent="53.72" :index="'自动审批率'"></v-indicator>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Indicator from '@/components/indicator/indicator'

  export default {
    name: "variousIndicators",
    components: {
      'v-indicator': Indicator
    }
  }
</script>

<style lang="scss" scoped>
  #variousIndicators {
    margin: -80px 32px 0 32px;
    padding: 32px;
    border-radius: 4px;
    height: 1036px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    .indicators-head {
      .left {
        float: left;
        margin-bottom: 32px;
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
        }
      }
    }
    .content {
      ul {
        display: flex;
        flex-wrap: wrap;
        li:nth-child(odd) {
          margin-right: 88px;
          margin-bottom: 40px;
        }
      }
    }
  }
</style>
