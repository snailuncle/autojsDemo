/**
 * 作者:  家
 * QQ:    203118908
 * 功能:  保存imgView加载的图片
 */
'ui';
ui.layout(
  <vertical id='parent'>
    <button>123</button>
    <img  id='img' src='ic_android_eat_js' >
    </img>
  </vertical>
)
ui.post(
  function () {
    var imgView=ui.img
    var myBitmap=createBitmap(imgView)
    var imgPath=saveBitmap(myBitmap)
    log(imgPath)
  }, 1000
)
function createBitmap(view) {
  view.setDrawingCacheEnabled(true);
  view.buildDrawingCache();
  var bitmap = view.getDrawingCache();
  return bitmap;
}
function saveBitmap(bitmap) {
  var imgPath="/sdcard/1.png"
  var canvas = new Canvas(bitmap);
  var myimg = canvas.toImage();
  log('myimg=')
  log(myimg)
  images.save(myimg, imgPath );
  app.viewFile(imgPath);
  return imgPath
}
