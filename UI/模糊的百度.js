'ui';
ui.layout(
  <vertical id="main" marginTop='0'  padding="10 10 10 30"   bg="#ff1e90ff">
    <text id='path' ></text>
    <img id="b" h="200" w="150" layout_gravity="center"/>
    <ScrollView>
      <webview id="a" h="350" w="350" />
    </ScrollView>
  </vertical>
)
var webView = ui.a
var imgView = ui.b
var url = 'https://m.baidu.com'



var settings = webView.getSettings()
// settings.setUserAgentString("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36");
settings.setUserAgentString("Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Mobile Safari/537.36");






webView.loadUrl(url);
var setIntervalId = setInterval(
  function () {
    var P = webView.getProgress()
    if (P == 10) {
      setTimeout(
        function () {
          获取图片验证码()
        }, 1000
      )
      clearInterval(setIntervalId)
    }
  }, 100
)

function 获取图片验证码() {
  ui.run(
    function () {
      var webScript = {}
      webScript.getVerificationCodePicture = function getVerificationCodePicture() {

        var img = document.querySelector('#logo > a > img');
        // alert(img.alt);
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // var result={
        //   width:canvas.width ,
        //   height:canvas.height
        // }
        // return result;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        // 这里会遇到跨域问题
        // 跨域了不让操作canvas
        // www.baidu.com  m.baidu.com
        try{
          var imageData = ctx.getImageData(0,0,img.width,img.height);
        }catch(e){
          alert(e)
          return e
        }
        var dataArray = new Array(imageData.data.length);
        for (var i = 0; i < dataArray.length; i++)
          dataArray[i] = imageData.data[i];
        var result = {
          width: canvas.width,
          height: canvas.height,
          dataArray: dataArray,
        }
        return result;
      }
      var webViewScriptContent = packedAsWebScript(webScript.getVerificationCodePicture)

      function packedAsWebScript(script) {
        var value = value || ''
        var result = script.toString() + ';' + script.name + '();'
        log(result)
        return result
      }
      webView.evaluateJavascript(';' + webViewScriptContent + ';', function (s) {
        log('evaluateJavascript')
        s = JSON.parse(s)
        var width = s.width
        var height = s.height
        var dataArray = s.dataArray
        log('width=', width)
        log('height=', height)
        //把argb换成int
        var pixelColors = []
        for (var i = 0; i < dataArray.length; i = i + 4) {
          var red = dataArray[i]
          var green = dataArray[i + 1]
          var blue = dataArray[i + 2]
          var alpha = dataArray[i + 3]
          var pixelColor = colors.argb(red, green, blue, alpha)
          pixelColors.push(pixelColor)
        }
        //把像素放到bitmap中
        importClass(android.graphics.Bitmap)
        var bitmapTem = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        var index = 0
        //stride应该大于width
        var stride = width
        var x = 0
        var y = 0
        var width = width
        var length = height
        bitmapTem.setPixels(pixelColors, index, stride, x, y, width, length);
        imgView.setImageBitmap(bitmapTem)
        var verificationCodePath = files.getSdcardPath() + '/pictureVerificationCode.png'
        saveBitmapToSDCard(bitmapTem, verificationCodePath)
        var pathView = ui.path
        pathView.setText('图片保存路径' + verificationCodePath)

        function saveBitmapToSDCard(bitmap, path) {
          importClass(java.io.FileOutputStream)
          importClass(java.io.File)
          file = new File(path);
          if (file.exists()) {
            file.delete();
          }
          try {
            fileOutputStream = new FileOutputStream(file);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, (fileOutputStream)); //设置PNG的话，透明区域不会变成黑色
            fileOutputStream.close();
            log("----------save success-------------------");
          } catch (e) {
            console.log(e)
          }
        }
      })
    }
  )
}
