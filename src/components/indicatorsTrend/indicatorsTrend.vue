<!--各项指标趋势界面-->
<template>
    <div class="indicatorsTrend">
      <div class="indicatorsTrend-head clearfix">
        <div class="rejection-rate">不良率</div>
        <div class="market-share">市占率</div>
      </div>
      <div class="indicatorsTrend-content">
        <div class="rejection-rate-content">

        </div>
        <div class="market-share-content"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "indicatorsTrend"
    }
</script>

<style lang="scss" scoped>
.indicatorsTrend{
  .indicatorsTrend-head{
    background-color: rgb(238,238,238);
    padding: 32px 0;
    .rejection-rate,.market-share{
      margin-left: 32px;
      float: left;
      width: 128px;
      height: 60px;
      background-color: rgb(216,216,216);
      font-size: 32px;
      color: rgb(74,74,74);
      text-align: center;
      line-height: 60px;
      border-radius: 8px;
    }
  }
}
</style>
