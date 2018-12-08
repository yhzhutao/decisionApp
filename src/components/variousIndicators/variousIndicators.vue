<template>
    <div class="variousIndicators">
      各项指标界面
      <v-indicator :fontcolor="'red'" :percent="53.75" :index="'不良率'"></v-indicator>
    </div>
</template>

<script>
  import Indicator from '@/components/indicator/indicator'
    export default {
        name: "variousIndicators",
      components:{
          'v-indicator':Indicator
      }
    }
</script>

<style scoped>

</style>
