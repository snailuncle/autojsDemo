'ui';
ui.layout(
  <vertical>
    <webview id="a" h="450" w="350" />
  </vertical>
)
var settings = ui.a.getSettings()
// settings.setJavaScriptEnabled(true);
settings.setJavaScriptCanOpenWindowsAutomatically(true);
var url = "https://www.baidu.com/"
ui.a.loadUrl(url);
var 要百度的内容 = '谁是世界上最美的女人'
var 百度搜索框id = 'index-kw'
// var js = "javascript:document.getElementById('" + 百度搜索框id + "').value = '" + 要百度的内容 + "';";

webView=ui.a

// var js = "javascript:document.querySelector('#logo > a > img').src;"





// var js = "javascript:alert(document.querySelector('#logo > a > img').src);"
var js = "javascript:src=document.querySelector('#logo > a > img').src;alert(src);src"







// view.loadUrl("javascript:window.location.assign('img://'+document.getElementsByTagName('img')[0].src)");
// var js = "javascript:document.getElementById('" + 百度搜索框id + "').value = '" + 要百度的内容 + "';";
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
            webView.loadUrl(s.replace(/"/g,''))
          }
        ))






        webView.post(
          new java.lang.Runnable(
            {
              run:function(){
                // webView.loadUrl("javascript:alert(123);")
                // webView.loadUrl("javascript:alert(document.getElementsByTagName('img')[0].src);")
                // webView.loadUrl("javascript:alert(document.querySelector('#logo > a > img').src);")
                // webView.loadUrl("javascript:window.navigate('https://www.qq.com/');")
                // webView.loadUrl("javascript:document.querySelector('#logo > a > img').src;")

                // window.navigate('http://shanghepinpai.com')
                // webView.loadUrl("javascript:document.querySelector('#logo > a > img').src;")
              }
            }
          )
        )

        // #logo > a > img

        // findElement(By.cssSelector("#logo > a > img"));

        // WebElement userName = driver.findElement(By.cssSelector("input"));

        // /html/body[@class=' switch-iphone ']/div[@id='page']/div[@id='index-card']/div[@id='header']/div[@id='logo']/a/img/@src


        // ui.a.loadUrl("javascript:window.location.assign('document.getElementsByTagName('img')[0].src);javascript:alert(document.getElementsByTagName('img')[0].src)");
        // ui.a.loadUrl("javascript:window.location.assign('img://'+document.getElementsByTagName('img')[0].src)");
      }, 1000
    )
  }
  clearInterval(setIntervalId)
}, 100);
