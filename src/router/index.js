import Vue from 'vue'
import Router from 'vue-router'
import AssetsSituation from '@/components/assets/assets'
import IndividualIoanSituation from '@/components/individualIoan/individualIoan'
import VariousIndicators from '@/components/variousIndicators/variousIndicators'
import CreditAvailability from '@/components/creditAvailability/creditAvailability'
import Brand from '@/components/brand/brand'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/assetsSituation',component: AssetsSituation},
    {
      path: '/individualIoanSituation',
      component: IndividualIoanSituation
    },
    {path: '/variousIndicators',component: VariousIndicators},
    {path: '/creditAvailability',component: CreditAvailability},
    {path:'/brand',component:Brand},
    {path:'*',redirect:'/assetsSituation'}
  ]
})
