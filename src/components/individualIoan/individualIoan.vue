<template>
    <div class="individualIoan">
      个贷情况界面{{date}}
    </div>
</template>

<script>
  import bus from '../base/bus'
    export default {
        name: "individualIoan",
        data(){
          return {
          date:''
          }
        },
        created(){
          let _this = this
          bus.$on('date',function(val){
            _this.date = val
          })
        },
    }
</script>

<style scoped>

</style>
