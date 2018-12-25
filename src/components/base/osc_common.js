 let osc = {}
/*
* 千位分隔函数
* */
osc.formatterCount = function(count){
  let reg = /(?=(\B\d{3})+$)/g
  return (count.toString()).replace(reg,',')
}
export default osc
