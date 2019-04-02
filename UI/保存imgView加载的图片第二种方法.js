/**
 * 作者:  家
 * QQ:    203118908
 * 功能:  保存imgView加载的图片  bitmap.compress
 */
'ui';
ui.layout(
  <vertical id='parent'>
    <button>123</button>
    <img  id='img' src='ic_android_eat_js' >
    </img>
  </vertical>
)
// view=ui.img
// log(view.draw.toString())
// exit()
// var newArr=[]
// for(var k in ui.img){
//   newArr.push(k)
// }
// newArr.sort()
// log(newArr)
// exit()
ui.post(
  function () {
    var imgView = ui.img
    // var myBitmap = createBitmap(imgView)
    // var imgPath = saveBitmap(myBitmap)
    var imgPath = 保存imgView的图片资源(imgView)
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
  var imgPath = "/sdcard/1.png"
  var canvas = new android.graphics.Canvas(bitmap);
  var myimg = canvas.toImage();
  log('myimg=')
  log(myimg)
  images.save(myimg, imgPath);
  app.viewFile(imgPath);
  return imgPath
}

function 保存imgView的图片资源(view) {
  importClass(android.graphics.Bitmap)
  importClass(java.io.FileOutputStream)
  importClass(java.io.File)
  var imgPath = "/sdcard/1.png"
  var bitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(), Bitmap.Config.ARGB_8888);
  bitmap.setDensity(context.getResources().getDisplayMetrics().densityDpi);
  var canvas = new android.graphics.Canvas(bitmap);
  //把view中的内容绘制在画布上
  view.draw(canvas);
  file = new File(imgPath);
  if (file.exists()) {
    file.delete();
  }
  fileOutputStream = new FileOutputStream(file);
  bitmap.compress(Bitmap.CompressFormat.PNG, 100, (fileOutputStream)); //设置PNG的话，透明区域不会变成黑色
  fileOutputStream.close();
  canvas.setBitmap(null);
  app.viewFile(imgPath);
  return imgPath
}
