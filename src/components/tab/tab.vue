<template>
  <div class="tap">
    <div class="tap-top">
      <router-link to="/assetsSituation">
        <span class="tap-item1">资产规模 <img src="../../image/down_arrow_icon.svg" alt=""></span>
      </router-link>
      <router-link to="/individualIoanSituation" >
        <span class="tap-item2">个贷情况<img src="../../image/orange_down_arrow_icon.svg" alt=""></span>
      </router-link>
      <router-link to="/variousIndicators">
        <span class="tap-item3">各项指标<img src="../../image/green_down_arrow_icon.svg" alt=""></span>
      </router-link>
      <router-link to="/creditAvailability">
        <span class="tap-item4">信贷投放<img src="../../image/blue_down_arrow_icon.svg" alt=""></span>
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tab"
    }
</script>

<style lang="sass" scoped>
  .tap
    height: 216px
    width: 100%
    .tap-top
      display: flex
      padding-left: 32px
      padding-right: 32px
      a
        flex: 1
        line-height: 80px
        text-decoration: none
        color: #FFFFFF
        text-align: center
        font-size: 32px
        padding-top: 20px
        box-sizing: border-box
        span
          display: inline-block
          height: 50px
          line-height: 50px
          width: 150px
          border-radius: 16px
          position: relative
          img
            display: none
        &.router-link-active
          .tap-item1
            background-color: #6E5AC8
            img
              display: block
              position: absolute
              top: 60px
              left: 65px
              height: 20px
              width: 20px
          .tap-item2
            background-color: #F4A100
            img
              display: block
              position: absolute
              top: 60px
              left: 65px
              height: 20px
              width: 20px
          .tap-item3
            background-color: #30C2AE
            img
              display: block
              position: absolute
              top: 60px
              left: 65px
              height: 20px
              width: 20px
          .tap-item4
            background-color: #5981C6
            img
              display: block
              position: absolute
              top: 60px
              left: 65px
              height: 20px
              width: 20px

</style>
