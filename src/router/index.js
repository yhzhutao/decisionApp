import Vue from 'vue'
import Router from 'vue-router'
import AssetsSituation from '@/components/assets/assets'
import IndividualIoanSituation from '@/components/individualIoan/individualIoan'
import VariousIndicators from '@/components/variousIndicators/variousIndicators'
import CreditAvailability from '@/components/creditAvailability/creditAvailability'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/assetsSituation',component: AssetsSituation},
    {path: '/individualIoanSituation',component: IndividualIoanSituation},
    {path: '/variousIndicators',component: VariousIndicators},
    {path: '/creditAvailability',component: CreditAvailability},
    {path:'*',redirect:'/assetsSituation'}
  ]
})
