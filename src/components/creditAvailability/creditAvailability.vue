<!--信贷投放界面-->
<template>
  <div class="creditAvailability" ref="creditAvailability-wrapper">
    <div class="content">
      <ul>
        <li>
          <v-creditCart :unit="unit" :titleCode="0" :sum="totalNum" :list="list"></v-creditCart>
        </li>
        <li>
          <v-creditCart :unit="unit" :titleCode="1" :sum="wholesaleNum" :list="list"></v-creditCart>
        </li>
        <li>
          <v-creditCart :unit="unit" :titleCode="2" :sum="retailNum" :list="list"></v-creditCart>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import CreditCart from '@/components/creditCart/creditCart';
  import BScroll from 'better-scroll';
  import {host} from "@/common/base/baseHttp.js"
  import bus from '@/common/base/bus.js';
  import tokenInvalid from '@/common/base/tokenInvalid'
  import { Toast } from 'mint-ui';
  export default {
    name: "creditAvailability",
    data() {
      return {
        date: 0,
        totalNum: 5384950709,
        wholesaleNum: 84797437,
        retailNum: 4875945,
        list: [],
        unit: '',
      }
    },
    props: [
      'selectDate'
    ],
    components: {
      'v-creditCart': CreditCart
    },
    created() {
      let that = this
      bus.$off('selectDate')
      bus.$on('selectDate', function (date) {
        that._initScorll(date);
      })
    },
    mounted() {
      this._initScorll(this.selectDate);
    },
    methods: {
      _initScorll(date) {
        // Bus.$on('selectDate',function(val){
        //   this.date = val;
        // });
        let urlHost = host || '/api'
        this.$http.post(urlHost + '/Decision/creditInjection', {date: date}).then((response) => {
          let code = JSON.parse(response.bodyText).code
          if(code ==0){
            this.list = this.dataFormate(JSON.parse(response.bodyText).result);
          }else if(code ==20){
            tokenInvalid()
          }else{
            Toast(JSON.parse(response.bodyText).message)
          }

        });
        new BScroll(this.$refs['creditAvailability-wrapper'], {click: true});
      },
      dataFormate(data) {
        let that = this
        let carryFlag = 0
        data.forEach(function (item) {
          if (item.syRelease > 10e3) {
            that.unit = '万'
            carryFlag = 1
          }
        })
        return data.map(function (item) {
          if (carryFlag = 1) {
            return {
              currentRelease: Math.round(item.currentRelease / 10e3),
              salesWay: item.salesWay,
              syRelease: Math.round(item.syRelease / 10e3)
            }
          } else {
            return item
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .creditAvailability {
    position: absolute;
    width: 100%;
    top: 216px;
    bottom: 0;
    overflow: hidden;
    .content {
      ul {
        li {
          margin-bottom: 32px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      &:after {
        content: '';
        display: block;
        height: 32px;
        width: 100%;
      }
    }
  }
</style>
