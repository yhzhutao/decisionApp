<template>
  <div class="indicator">
    <div class="content">
      <span class="top" :style="{color:numcolor}">{{percent}}%</span>
      <div class="line"></div>
      <span class="bottom" :style="{color:fontcolor}">{{index}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "indicator",
    props: {
      numcolor:String,
      fontcolor: String,
      percent: Number,
      index: String
    }
  }
</script>

<style lang="scss" scoped>
  .indicator {
    position: relative;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    box-sizing: border-box;
    background: #fff;
    border: 12px solid #dadfec;
    text-align: center;
    .content {
      position: absolute;
      display: inline-block;
      width: 80%;
      margin: 0 auto;
      top: 50%;
      transform: translate(-50%, -50%);
      .top {
        font-size: 44px;
      }
      .line {
        border-top: 2px #adadad solid;
        width: 100%;
        margin: 16px 0;
      }
    }
  }
</style>
