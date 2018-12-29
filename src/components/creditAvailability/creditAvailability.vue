<!--信贷投放界面-->
<template>
  <div class="creditAvailability" ref="creditAvailability-wrapper">
    <div class="content">
      <ul>
        <li>
          <v-creditCart :titleCode="0" :sum="totalNum" :list="list"></v-creditCart>
        </li>
        <li>
          <v-creditCart :titleCode="1" :sum="wholesaleNum" :list="list"></v-creditCart>
        </li>
        <li>
          <v-creditCart :titleCode="2" :sum="retailNum" :list="list"></v-creditCart>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import CreditCart from '@/components/creditCart/creditCart';
  import BScroll from 'better-scroll';
  import Bus from '@/common/base/bus.js';
  export default {
    name: "creditAvailability",
    data(){
      return{
        date:0,
        totalNum:5384950709,
        wholesaleNum:84797437,
        retailNum:4875945,
        list:[]
      }
    },
    components:{
      'v-creditCart':CreditCart
    },
    mounted(){
      this._initScorll();
    },
    methods:{
      _initScorll(){
        Bus.$on('selectDate',function(val){
          this.date = val;
        });
        this.$http.post('/creditInjection?date='+this.date).then((response)=>{
          this.list = response.body.data;
        });
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
