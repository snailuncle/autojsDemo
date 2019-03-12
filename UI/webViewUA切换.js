/**
 * 作者: 家
 * QQ: 203118908
 * 功能: webViewUA切换
 */
"ui";
ui.layout(
  <vertical id="yidong1" margin="0" gravity="center"  bg="#881e90ff">
    <text id="ua">ua</text>
    <horizontal>
      <button id="切换UA">切换UA</button>
      <button id="清除缓存">清除缓存</button>
      <button id="刷新">刷新</button>
    </horizontal>
    <webview id="a" h="450" w="350" margin="0 0"/>
  </vertical>
);
http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
var cookieManager = android.webkit.CookieManager.getInstance();
ui.a.getSettings().setJavaScriptEnabled(true);
// var url = "https://www.baidu.com/"
var url="http://www.fynas.com/ua/view"
ui.a.loadUrl(url);
var CookieStr = cookieManager.getCookie(url);
ui.切换UA.on("click", () => {
  toastLog('点击了\n切换UA')
  var webView = ui.a
  webView.getSettings().setUserAgentString(随机UA());
  setTimeout(显示手机UA,1000)
})
function 显示手机UA(){
  threads.start(
    function(){
      ui.run(
        function(){
          var ua=获取手机ua()
          ui.ua.setText(ua)
        }
      )
    }
  )
}
function 获取手机ua(){
  var webView = ui.a
  var ua=webView.settings.getUserAgentString();
  return ua
}
ui.清除缓存.on("click", () => {
  toastLog('点击了\n清除缓存')
  var CookieStr = cookieManager.getCookie(url);
  log('清除缓存前cookie=')
  log(CookieStr)
  cookieManager.removeAllCookie();
  var webView = ui.a
  webView.getSettings().setCacheMode(webView.settings.LOAD_NO_CACHE);
  context.deleteDatabase("WebView.db");
  context.deleteDatabase("WebViewCache.db");
  webView.clearCache(true);
  webView.clearFormData();
  webView.setWebChromeClient(null);
  webView.setWebViewClient(null);
  // webView.getSettings().setJavaScriptEnabled(false);
  webView.clearCache(true);
  var CookieStr = cookieManager.getCookie(url);
  log('清除缓存后cookie=')
  log(CookieStr)
})
ui.刷新.on("click", () => {
  toastLog('点击了\n刷新')
  ui.run(() => {
    var webView = ui.a
    webView.reload()
    setTimeout(显示手机UA,1000)
  });
})

function 随机UA(){
  var uas = [
    "Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn; U8800 Build/HuaweiU8800) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    "Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn) AppleWebKit/530.17 (KHTML, like Gecko) FlyFlow/2.2 Version/4.0 Mobile Safari/530.17",
    "Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn; U8800 Build/HuaweiU8800) UC AppleWebKit/534.31 (KHTML, like Gecko) Mobile Safari/534.31",
    "Mozilla/5.0 (Linux; Android 4.0.3; M031 Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
  ]
  var uasLen = uas.length
  var n = 随机数(uasLen)
  var ua = uas[n]
  return ua
  function 随机数(max) {
    var r = parseInt(max * Math.random())
    return r
  }
}
