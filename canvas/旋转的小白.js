/**
 * 作者:     家
 * QQ:      203118908
 * 功能:    canvas的旋转
 */
'ui';
var marginSize = '10'
var myMargin = marginSize + ' ' + marginSize + ' ' + marginSize + ' ' + marginSize
// <button id='button' >button</button>

ui.layout(
  <vertical>
    <frame margin= '{{myMargin}}' >
      <canvas id='board'></canvas>
    </frame>
  </vertical>
)
importClass(java.io.File);
importClass(java.io.FileFilter);
importClass(android.graphics.Path);
importClass(android.graphics.RectF);
importClass(android.graphics.Rect);
importClass(android.graphics.Paint);
importClass(android.graphics.BitmapFactory);
importClass(android.graphics.Bitmap);
importClass(android.graphics.Matrix);
importClass(android.graphics.Color);
importClass(android.graphics.ColorMatrix);
importClass(android.graphics.ColorFilter);
var path = new Path();
var myPaint = new Paint();
var matrix = new Matrix();



myPaint.setStrokeWidth(2);
myPaint.setTextAlign(Paint.Align.CENTER);
myPaint.setColor(-28707)
// myPaint.setColor(-65536)
// myPaint.setColor(13823224)
myPaint.setStyle(Paint.Style.FILL);
// myPaint.setStyle(Paint.Style.STROKE);
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new Canvas(bitmap);


var 弧度360=function(){
  var 角度=0
  return function(){
    if(角度>360){角度=0}
    角度=角度+10
    return 角度;
  }
}()
view = ui.board
var rect = new Rect;
view.getBoundsOnScreen(rect)
left=rect.left
top=rect.top
right=rect.right
bottom=rect.bottom
centerx = rect.centerX()
centery = rect.centerY()
w=view.getWidth()
h=view.getHeight()
log(centerx,centery,w, h)

黑洞圆的半径=50
var 半边宽度=w/2

ui.board.on("draw", function (canvas) {
  canvas.drawARGB(255, 127, 127, 127);
  // canvas.translate(centerx,centery)
  var r=弧度360()
  // log(r)
  canvas.rotate(r,centerx,centery)
  canvas.drawBitmap(bitmap, 0, 0, myPaint);
});
// path.moveTo(500,300);
// path.lineTo(378,230);
// mcanvas.drawPath(path, myPaint);
ui.post(
  function () {
    threads.start(function () {
      asd(mcanvas, myPaint, path);
    });
  }
)

function asd(myCanvas, myPaint, path) {
  画黑洞(myCanvas, myPaint)
}


function 画黑洞(myCanvas, myPaint){
  // 中间黑,啥也不画
  function 画点(x,y,r){
    var r=r || 6
    myPaint.setColor(rndColor());
    myCanvas.drawCircle(x,y, r, myPaint)
  }
  view = ui.board
  var rect = new Rect;
  view.getBoundsOnScreen(rect)
  left=rect.left
  top=rect.top
  right=rect.right
  bottom=rect.bottom
  centerx = rect.centerX()
  centery = rect.centerY()
  w=view.getWidth()
  h=view.getHeight()
  log(centerx,centery,w, h)

  黑洞圆的半径=50
  var 半边宽度=w/2
  myPaint.setStyle(Paint.Style.STROKE);
  myCanvas.drawCircle(centerx,centery, 半边宽度, myPaint)
  myPaint.setStyle(Paint.Style.FILL);


  根号2=1.4142
  圆内正方形边长=根号2*半边宽度
  圆内正方形左上角的坐标=[centerx-圆内正方形边长/2,centery-圆内正方形边长/2]
  圆内正方形右下角的坐标=[centerx+圆内正方形边长/2,centery+圆内正方形边长/2]

  var 随机出来的坐标集合=在圆内正方形里面随机生成指定数量的坐标(300)
  for(var i=0;i<随机出来的坐标集合.length;i++){
    var x=随机出来的坐标集合[i][0]
    var y=随机出来的坐标集合[i][1]
    画点(x,y)
  }

  // 画点(centerx,centery,黑洞圆的半径)
  myPaint.setColor(-10);
  myCanvas.drawCircle(centerx,centery,黑洞圆的半径, myPaint)
}

function rndBoolean(){
  var r=(Math.random()>0.495)
  return r
}
function 在圆内正方形里面随机生成指定数量的坐标(n){
  var xMin=圆内正方形左上角的坐标[0]
  var xMax=圆内正方形右下角的坐标[0]
  var yMin=圆内正方形左上角的坐标[1]
  var yMax=圆内正方形右下角的坐标[1]

  var xyArr=[]
  for(var i=0;i<n;i++){
    var x=rndNum(xMin, xMax)
    var y=rndNum(yMin, yMax)
    xyArr.push([x,y])
  }
  return xyArr

}






function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
