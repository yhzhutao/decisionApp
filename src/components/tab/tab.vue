<template>
  <div class="tap">
    <div class="tap-top">
      <router-link to="/assetsSituation">
        <span class="tap-item1">资产规模</span>
      </router-link>
      <router-link to="/individualIoanSituation" >
        <span class="tap-item2">个贷情况</span>
      </router-link>
      <router-link to="/variousIndicators">
        <span class="tap-item3">各项指标</span>
      </router-link>
      <router-link to="/creditAvailability">
        <span class="tap-item4">信贷投放</span>
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
        &.router-link-active

</style>
