<template>
  <div class="tap">
    <router-link to="/assetsSituation" class="tap-item1">
      <span>资产规模</span>
    </router-link>
    <router-link to="/individualIoanSituation" class="tap-item1">
      <span>个贷情况</span>
    </router-link>
    <router-link to="/variousIndicators" class="tap-item1">
      <span>各项指标</span>
    </router-link>
    <router-link to="/creditAvailability" class="tap-item1">
      <span>信贷投放</span>
    </router-link>
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
</style>
