<template>
    <div class="header">
      <div class="header-top">
        <div></div>
        <div>{{date}} <button @click="dateUp">日历</button> </div>
        <div></div>
      </div>
      <div class="header-tap">
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
      <div class="header-top"></div>
    </div>
</template>

<script>
  import bus from '../base/bus'
    export default {
        name: "m-header",
      data () {
        return {
          date:this.formatDate(new Date())
        }
      },
      mounted() {
        bus.$emit('date','111')
      },
      methods:{
          formatDate(date) {
            var o = {
              y: date.getFullYear(),
              m: date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1,
              d: date.getDate()
            }
            return o.y + '\/' + o.m + '\/' + o.d
          },
        dateUp(){
          bus.$emit('date','222')
        }
      }
    }
</script>

<style scoped>

</style>
