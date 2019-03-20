'ui';
ui.layout(
  <vertical>
    <img id="b"/>
    <webview id="a" h="450" w="350" />
  </vertical>
)
var settings = ui.a.getSettings()
settings.setJavaScriptEnabled(true);
ui.a.getSettings().setUserAgentString("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36");
var url = "https://www.baidu.com/"
ui.a.loadUrl(url);
var 要百度的内容 = '谁是世界上最美的女人'
var 百度搜索框id = 'index-kw'
var js = "javascript:document.getElementById('" + 百度搜索框id + "').value = '" + 要百度的内容 + "';";
setTimeout(
  function () {
    ui.a.evaluateJavascript(";"+getBase64Image.toString() + ";getBase64Image('s_lg_img_new');", function(s) {
      log(s)
      if(s.length>10) {
          ui.b.setSource(eval(s))
      }
    })
  }, 1000)

function getBase64Image(id) {
  img=document.getElementsByTagName('img')[0]
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL;
  //return dataURL.replace("data:image/png;base64,", "");
}
