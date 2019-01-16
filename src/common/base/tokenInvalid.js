/**
 * 判断是安卓还是ios
 */
if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
  var isIos = true
}else{
  var isIos = false
}
//注册事件监听安卓
function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(WebViewJavascriptBridge)
      },
      false
    );
  }
}
//注册事件监听ios
function setupWebViewJavascriptBridge(callback) {
  if(window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if(window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}
export default function tokenInvalid(){
  if(isIos){
    setupWebViewJavascriptBridge(function(bridge){
      bridge.callHandler(
        'tokenInvalid', {},
        function(res) {
        })
    })
  }else{
    connectWebViewJavascriptBridge(function(bridge){
      bridge.callHandler(
        'tokenInvalid', {},
        function(res) {
        })
    })
  }
}
