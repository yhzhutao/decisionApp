import Vue from 'vue'
import Router from 'vue-router'
// const AssetsSituation = () => import('@/components/assets/assets')
const AssetsSituation = () => import('@/components/assets/assets')
const IndividualIoanSituation = () => import('@/components/individualIoan/individualIoan')
const VariousIndicators = () => import('@/components/variousIndicators/variousIndicators')
const CreditAvailability = () => import('@/components/creditAvailability/creditAvailability')
const Brand = () => import('@/components/brand/brand')
const IndicatorsTrend = () => import('@/components/indicatorsTrend/indicatorsTrend')
const DefectiveRatio = () => import('@/components/defectiveRatio/defectiveRatio')
const MarketShare = () => import('@/components/marketShare/marketShare')
const ConditionIndividualLoanSituation = () => import('@/components/conditionIndividualLoanSituation/conditionIndividualLoanSituation')
// import AssetsSituation from '@/components/assets/assets'
// import IndividualIoanSituation from '@/components/individualIoan/individualIoan'
// import VariousIndicators from '@/components/variousIndicators/variousIndicators'
// import CreditAvailability from '@/components/creditAvailability/creditAvailability'
// import Brand from '@/components/brand/brand'
// import IndicatorsTrend from '@/components/indicatorsTrend/indicatorsTrend'
// import DefectiveRatio from '@/components/defectiveRatio/defectiveRatio'
// import MarketShare from '@/components/marketShare/marketShare'
// import ConditionIndividualLoanSituation from '@/components/conditionIndividualLoanSituation/conditionIndividualLoanSituation'
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
    {path:'/indicatorsTrend',component:IndicatorsTrend},
    {path:'/defectiveRatio',component:DefectiveRatio},
    {path:'/marketShare',component:MarketShare},
    {path:'/conditionIndividualLoanSituation/:brandId',component:ConditionIndividualLoanSituation},
    {path:'*',redirect:'/assetsSituation'}
  ]
})
