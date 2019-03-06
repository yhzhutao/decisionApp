// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import bus from '@/common/base/bus'
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next) => {
  bus.$emit('loading',true)
  next((response) => {
    bus.$emit('loading',false)
  })
})
//解决四舍五入toFixed问题
Number.prototype.toFixed=function (d) {
  var s=this+"";
  if(!d)d=0;
  if(s.indexOf(".")==-1)s+=".";
  s+=new Array(d+1).join("0");
  if(new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(d+1)+"})?)\\d*$").test(s)){
    var s="0"+RegExp.$2,pm=RegExp.$1,a=RegExp.$3.length,b=true;
    if(a==d+2){
      a=s.match(/\d/g);
      if(parseInt(a[a.length-1])>4){
        for(var i=a.length-2;i>=0;i--){
          a[i]=parseInt(a[i])+1;
          if(a[i]==10){
            a[i]=0;
            b=i!=1;
          }else break;
        }
      }
      s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");

    }if(b)s=s.substr(1);
    return (pm+s).replace(/\.$/,"");
  }return this+"";
};
require('./mock.js')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
