<template>
  <div id="app" class="border">
    <header></header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/assetsSituation">资产规模</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/individualIoanSituation">个贷情况</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/variousIndicators">各项指标</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/creditAvailability">信贷投放</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">

</style>
