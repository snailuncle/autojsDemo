/**
 * @作者: 家
 * @qq:   203118908
 * @功能:  提取webview中的图片
 * @感谢:  攀登大佬的指定
 * @备注:  返回图片var dataURL = canvas.toDataURL("image/png");
 * @备注:  转化为base64 var img = images.fromBase64(eval(s));
 * @备注:  使图片清晰canvas.width = img.width * k
 */
'ui';
var url = "https://m.baidu.com"
ui.layout(
  <vertical id="main" marginTop='0'  padding="10 10 10 30"   bg="#ff1e90ff">
    <img id="b" h="160" w="200" layout_gravity="center"/>
    <ScrollView>
      <webview id="a" h="450" w="350" />
    </ScrollView>
  </vertical >
);
var imgView = ui.b
var webView = ui.a
var imgPath = files.getSdcardPath() + "/1.png"
var settings = webView.getSettings()
settings.setJavaScriptEnabled(true);
settings.setUseWideViewPort(true);
settings.setLoadWithOverviewMode(true);
webSettings = settings
webSettings.setLayoutAlgorithm(android.webkit.WebSettings.LayoutAlgorithm.NARROW_COLUMNS);
webSettings.setUseWideViewPort(true);
settings.setDefaultZoom(android.webkit.WebSettings.ZoomDensity.FAR);
metrics = new android.util.DisplayMetrics();
activity.getWindowManager().getDefaultDisplay().getMetrics(metrics);
mDensity = metrics.densityDpi;
log('mDensity=')
log(mDensity)
height = metrics.heightPixels;
width = metrics.widthPixels;
log('height=', height)
log('width=', width)
webView.loadUrl(url);
webViewScriptContent = getBase64Image.toString() + ";getBase64Image();"

function getBase64Image() {
  var k = 4
  var img = document.querySelector('#logo > a > img')
  var canvas = document.createElement("canvas");
  canvas.width = img.width * k;
  canvas.height = img.height * k;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width * k, img.height * k);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL;
  //return dataURL.replace("data:image/png;base64,", "");
}
threads.start(
  function () {
    sleep(2000)
    ui.run(
      function () {
        ui.a.evaluateJavascript(';' + webViewScriptContent + ';', function (s) {
          log('evaluateJavascript')
          // log(s)
          var img = images.fromBase64(eval(s))
          images.save(img, imgPath);
          imgLZ = images.read(imgPath)
          imgView.attr('src', util.format("file://%s", imgPath))
        })
      }
    )
  }
)
