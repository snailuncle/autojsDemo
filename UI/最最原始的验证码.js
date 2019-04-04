/**
 * 作者:　家
 * ＱＱ：　203118908
 * 功能:   生成随机验证码--最最原始的验证码
 * 
 */
'ui';
importClass(android.graphics.Bitmap)
importClass(java.io.FileOutputStream)
importClass(java.io.File)
importClass(android.graphics.Bitmap)
importClass(android.graphics.Paint)
importClass(android.graphics.Path)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.PorterDuff)
importClass(android.graphics.RectF)
ui.layout(
  <vertical>
    <button id='generateVerificationCode' >生成验证码</button>
    <button id='saveVerificationCode' >保存验证码</button>
    <frame gravity='center'
            h='100'
            margin= '6 6 6 6'
    >
      <canvas id='board'
      ></canvas>
    </frame>
  </vertical>
)
ui.generateVerificationCode.on('click', function () {
  generateVerificationCode(ui.board)
})
ui.saveVerificationCode.on('click', function () {
  saveVerificationCode(ui.board)
})
var myBitmap = Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var myCanvas = new Canvas(myBitmap);
myCanvas.drawARGB(255, 127, 127, 127);
var myPaint = new Paint();
设置画笔属性(myPaint)
var myPath = new Path();
ui.board.on('draw', function (canvas) {
  canvas.drawBitmap(myBitmap, 0, 0, null);
})
function generateVerificationCode(view) {
  var verificationCode = null;
  var str = 随机字符串()
  var w = view.getWidth();
  var h = view.getHeight();
  log(w,h)
  var left = view.left
  var right = view.right
  var top = view.top
  var bottom = view.bottom
  log(left, top, right, bottom)
  var rectF = new RectF(left, top, right, bottom);
  fontMetrics = myPaint.getFontMetrics();
  distance = (fontMetrics.bottom - fontMetrics.top) / 2 - fontMetrics.bottom;
  baseline = rectF.centerY() + distance;
  myPaint.setColor(rndColor());
  myCanvas.drawARGB(255, 127, 127, 127)

  myCanvas.drawText(str, rectF.centerX(), baseline, myPaint);


  // myCanvas.drawText(str, rectF.centerX(), baseline, myPaint);
}
function rndNum(max,min){
  var min=min || 0
  return (Math.random()*(max-min+1)+min);
}
function 设置画笔属性(myPaint) {
  myPaint.setColor(rndColor());
  myPaint.setAntiAlias(true);
  myPaint.setDither(true);
  myPaint.setStrokeJoin(Paint.Join.ROUND);
  myPaint.setStrokeCap(Paint.Cap.ROUND);
  myPaint.setStyle(Paint.Style.FILL);
  myPaint.setTextSize('333');
  myPaint.setTextAlign(Paint.Align.CENTER);
}
function saveVerificationCode(view){
  var bitmap=view.getBitmap()
  saveBitmap(bitmap)
}
function createBitmap(view) {
  view.setDrawingCacheEnabled(true);
  // view.buildDrawingCache();
  var bitmap = view.getDrawingCache();
  return bitmap;
}

function saveBitmap(bitmap) {
  var imgPath = "/sdcard/1.png"
  var canvas = new Canvas(bitmap);
  var myimg = canvas.toImage();
  log('myimg=')
  log(myimg)
  images.save(myimg, imgPath);
  app.viewFile(imgPath);
  return imgPath
}
function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}
function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function 随机字符串(PassLength) {
  var PassLength = PassLength || 4
  var str = 'abcdefghijklmnopqrstuvwxyz';
  var STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var text = str.split('').concat(STR.split(''))
  var pw = '';
  for (i = 0; i < PassLength; i++) {
    var strpos = random(0, text.length - 1);
    pw += text[strpos].charAt(random(0, text[strpos].length - 1));
  }
  return pw;
}
