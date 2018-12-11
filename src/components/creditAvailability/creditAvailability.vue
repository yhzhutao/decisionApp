<!--信贷投放界面-->
<template>
  <div id="creditAvailability">
    <ul>
      <li>
        <v-creditCart :titleCode="0"></v-creditCart>
      </li>
      <li>
        <v-creditCart :titleCode="1"></v-creditCart>
      </li>
      <li>
        <v-creditCart :titleCode="2"></v-creditCart>
      </li>
    </ul>
  </div>
</template>

<script>
  import CreditCart from '@/components/creditCart/creditCart'
  export default {
    name: "creditAvailability",
    components:{
      'v-creditCart':CreditCart
    }
  }
</script>

<style lang="scss" scoped>
#creditAvailability{
  ul{
    li{
      margin-bottom: 32px;
      &:first-child{
        margin-top: -80px;
      }
    }
  }
}
</style>
