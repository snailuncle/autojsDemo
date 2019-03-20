'ui';
ui.layout(
  <vertical>
    <webview id="a" h="450" w="350" />
  </vertical>
)
var settings = ui.a.getSettings()
settings.setJavaScriptEnabled(true);
var url = "https://www.baidu.com/"
ui.a.loadUrl(url);
var 要百度的内容 = '谁是世界上最美的女人'
var 百度搜索框id = 'index-kw'
var js = "javascript:document.getElementById('" + 百度搜索框id + "').value = '" + 要百度的内容 + "';";
var setIntervalId;
setIntervalId = setInterval(() => {
  var P = ui.a.getProgress();
  log(P)
  if (P == 10) {
    setTimeout(
      function () {
        ui.a.evaluateJavascript(js, new android.webkit.ValueCallback(
          function onReceiveValue(s) {
            log(s)
          }
        ))
      }, 1000
    )
  }
  clearInterval(setIntervalId)
}, 100);
