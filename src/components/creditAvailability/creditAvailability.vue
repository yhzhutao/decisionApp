<!--信贷投放界面-->
<template>
  <div class="creditAvailability" ref="creditAvailability-wrapper">
    <div class="content">
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
  </div>
</template>

<script>
  import CreditCart from '@/components/creditCart/creditCart';
  import BScroll from 'better-scroll';
  export default {
    name: "creditAvailability",
    components:{
      'v-creditCart':CreditCart
    },
    mounted(){
      this._initScorll();
    },
    methods:{
      _initScorll(){
        new BScroll(this.$refs['creditAvailability-wrapper'],{click:true});
      }
    }
  }
</script>

<style lang="scss" scoped>
.creditAvailability{
  position: absolute;
  width: 100%;
  top: 216px;
  bottom: 0;
  overflow: hidden;
  .content{
    ul{
      li{
        margin-bottom: 32px;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
    &:after{
      content: '';
      display: block;
      height: 32px;
      width: 100%;
    }
  }
}
</style>
