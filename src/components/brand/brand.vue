<template>
    <div class="brand">
      <div class="brand-head">
        <ul>
          <li>
            <div class="img">
              <img src="../../image/changan_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/ford_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/suzuki_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/mazda_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/oushang_logo@2x.png" alt="">
            </div>
          </li>
          <li>
            <div class="img">
              <img src="../../image/ds_logo@2x.png" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="brand-content">

      </div>
    </div>
</template>

<script>
    export default {
        name: "brand"
    }
</script>

<style lang="scss" scoped>
.brand{
  .brand-head{
    ul{
      display: flex;
      justify-content: space-around;
      margin: 26px 0;
      li{
        .img{
          display: inline-block;
          width: 104px;
          height: 104px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
