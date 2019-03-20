'ui';
ui.layout(
  <vertical>
    <webview id="a" h="450" w="350" />
  </vertical>
)
webView=ui.a
var settings = webView.getSettings()
// settings.setJavaScriptEnabled(true);
settings.setJavaScriptCanOpenWindowsAutomatically(true);
var url = "https://www.baidu.com/"
webView.loadUrl(url);
var 要百度的内容 = '谁是世界上最美的女人'
var 百度搜索输入框id = 'index-kw'
var js = "javascript:document.getElementById('" + 百度搜索输入框id + "').value = '" + 要百度的内容 + "';";
setTimeout(
  function () {
    ui.a.evaluateJavascript(";"+inputContentThenSearch.toString() + ";inputContentThenSearch();", function(s) {
      log(s)
    })
  }, 1000)
function inputContentThenSearch(){
  document.getElementById('index-kw').value='谁是世界上最美的女人'
  document.getElementById('index-bn').click()
  return '点击了搜索按钮'
}
