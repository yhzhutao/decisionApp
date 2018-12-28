const Mock = require('mockjs')
const Random = Mock.Random

Mock.mock('/individualLoanFilter',{
  'yearlyTarget|10000-15000':100,
  'yearlyReach|10000-15000':100,
  'yearRegions':[
    {
      'region':'eastRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    },
    {
      'region':'norhRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    },{
      'region':'middleRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    },{
      'region':'westRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    },{
      'region':'southRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    }
  ],
  'monthRegions':[
    {
      'region':'eastRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    },
    {
      'region':'norhRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    },{
      'region':'middleRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    },{
      'region':'westRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    },{
      'region':'southRegion',
      'regionalGoals|100-150':100,
      'regionalReach|100-150':100
    }
  ],
  'currentMonthTarget|100-150':100,
  'currentMonthReach|100-150':100,
  'monthSales|100-150':100,
  'lysMonthSales|100-150':100,
  'chainSales|100-150':100,
  'salesData':[
    {
     "salesWay":'apply',
      'cumulativeMonth|1000-1500':100,
      'currentSy|1000-1500':100,
      'chainSales|1000-1500':100,
      'currentData':[4,2,32,10,4,2,32,10,4,2,32,10,4,2,32,10,4,2,32,10,4,2,32,10,4,2,32,10],
      'chainData':[5,6,22,10,23,5,6,22,10,23,10,4,5,6,22,10,23,5,6,22,10,23,10,4,3,22,13],
    },
    {
      "salesWay":'loan',
      'cumulativeMonth|1000-1500':100,
      'currentSy|1000-1500':100,
      'chainSales|1000-1500':100,
      'currentData':[4,2,32,10,4,2,32,10,4,2,32,10,4,2,32,10,4,2,32,10,4,2,32,10,4,2,32,10],
      'chainData':[5,6,22,10,23,5,6,22,10,23,10,4,5,6,22,10,23,5,6,22,10,23,10,4,3,22,13],
    },
  ]
})
Mock.mock('/defectiveRatio',[{
  'salesWay':'wholesaleSale',
  'saleRatio':0.0021,
  'saleRatioYoy':-0.002,
  'saleRatioMom':-0.01,
  'currentMonthsRatio':[0.03,0.011,0.03,0.014,0.04,0.03,0.05,0.001,0.01,0.011,0.03,0.014],
  'lastMonthsRatio':[0.05,0.001,0.03,0.011,0.03,0.012,0.01,0.011,0.03,0.014,0.04,0.03]
}, {
  'salesWay':'retail',
  'saleRatio':0.0011,
  'saleRatioYoy':-0.003,
  'saleRatioMom':-0.02,
  'currentMonthsRatio':[0.01,0.011,0.03,0.014,0.04,0.03,0.05,0.001,0.01,0.011,0.03,0.014],
  'lastMonthsRatio':[0.05,0.001,0.03,0.011,0.03,0.012,0.01,0.011,0.03,0.014,0.04,0.03]
}])
Mock.mock('/marketShareRatio',[{
  'brandName':'长安轿车',
  'currentMonthChainRatio':-0.001,
  'currentYearMarketShare':0.32,
  'currentYearChainRatio':0.0012,
  'monthsRatio':[0.03,0.011,0.03,0.014,0.04,0.03,0.05,0.001,0.01,0.011,0.03,0.014],
  'lastMonthsRatio':[0.05,0.001,0.03,0.011,0.03,0.012,0.01,0.011,0.03,0.014,0.04,0.03]
},{
  'brandName':'长安福特',
  'currentMonthChainRatio':-0.003,
  'currentYearMarketShare':0.31,
  'currentYearChainRatio':0.0012,
  'monthsRatio':[0.01,0.011,0.03,0.014,0.04,0.03,0.05,0.001,0.01,0.011,0.03,0.014],
  'lastMonthsRatio':[0.05,0.001,0.03,0.011,0.03,0.012,0.01,0.011,0.03,0.014,0.04,0.03]
},{
  'brandName':'长安铃木',
  'currentMonthChainRatio':-0.003,
  'currentYearMarketShare':0.31,
  'currentYearChainRatio':0.0012,
  'monthsRatio':[0.01,0.011,0.03,0.014,0.04,0.03,0.05,0.001,0.01,0.011,0.03,0.014],
  'lastMonthsRatio':[0.05,0.001,0.03,0.011,0.03,0.012,0.01,0.011,0.03,0.014,0.04,0.03]
},{
  'brandName':'长安马自达',
  'currentMonthChainRatio':-0.003,
  'currentYearMarketShare':0.31,
  'currentYearChainRatio':0.0012,
  'monthsRatio':[0.01,0.011,0.03,0.014,0.04,0.03,0.05,0.001,0.01,0.011,0.03,0.014],
  'lastMonthsRatio':[0.05,0.001,0.03,0.011,0.03,0.012,0.01,0.011,0.03,0.014,0.04,0.03]
},{
  'brandName':'长安欧尚',
  'currentMonthChainRatio':-0.003,
  'currentYearMarketShare':0.31,
  'currentYearChainRatio':0.0012,
  'monthsRatio':[0.01,0.011,0.03,0.014,0.04,0.03,0.05,0.001,0.01,0.011,0.03,0.014],
  'lastMonthsRatio':[0.05,0.001,0.03,0.011,0.03,0.012,0.01,0.011,0.03,0.014,0.04,0.03]
},{
  'brandName':'长安DS',
  'currentMonthChainRatio':-0.003,
  'currentYearMarketShare':0.31,
  'currentYearChainRatio':0.0012,
  'monthsRatio':[0.01,0.011,0.03,0.014,0.04,0.03,0.05,0.001,0.01,0.011,0.03,0.014],
  'lastMonthsRatio':[0.05,0.001,0.03,0.011,0.03,0.012,0.01,0.011,0.03,0.014,0.04,0.03]
}])
