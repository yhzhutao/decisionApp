<template>
    <div class="assets">
      <v-asset :titleCode="0"></v-asset>
      <v-asset :titleCode="1"></v-asset>
    </div>
</template>

<script>
    import Asset from '@/components/assetCard/assetCard'
    export default {
        name: "assets",
      components:{
          'v-asset':Asset
      }
    }
</script>

<style scoped>

</style>
