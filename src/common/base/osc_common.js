 let osc = {}
/*
* 千位分隔函数
* */
osc.formatterCount = function(count){
  let reg = /(?=(\B\d{3})+$)/g
  if(count){
    return (count.toString()).replace(reg,',')
  }else{
    return count
  }
}
export default osc
