
/**
 * 原文链接: https://blog.csdn.net/foruok/article/details/52456281
 * 翻译:     家
 * QQ:      203118908
 * 功能:    拖尾效果
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
importClass(android.graphics.Point);
importClass(android.graphics.BitmapFactory);
importClass(android.graphics.Bitmap);
importClass(android.graphics.Matrix);
importClass(android.graphics.Color);
importClass(android.graphics.ColorMatrix);
importClass(android.graphics.ColorFilter);
var myPath = new Path();
var myPaint = new Paint();
var myMatrix = new Matrix();
var myPoint = new Point();
var myRect = new Rect;
myPaint.setStrokeWidth(1);
myPaint.setTextAlign(Paint.Align.CENTER);
myPaint.setColor(-28707)
// myPaint.setColor(-65536)
// myPaint.setColor(13823224)
myPaint.setStyle(Paint.Style.FILL_AND_STROKE);
// myPaint.setStyle(Paint.Style.FILL);
// myPaint.setStyle(Paint.Style.STROKE);
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var myCanvas = new Canvas(bitmap);
var 超过多少个坐标就不保存了旧坐标了=20
var 手指触摸的圆的半径=30
var 保存滑动过的点的坐标数组=[]
var 每个坐标的半径=手指触摸的圆的半径/超过多少个坐标就不保存了旧坐标了
var 每个坐标的透明度=255/超过多少个坐标就不保存了旧坐标了
// 每一个坐标和前一个坐标组成矩形,实际上就是画矩形
function rndColor(alpha) {
  return colors.argb(alpha,11,111,11)
}
function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function 画拖尾(canvas,myPath,myPaint){
  for(var i=0;i<保存滑动过的点的坐标数组.length;i++){
    var alpha=i*每个坐标的透明度
    // 黑线的斜率是：
    // var xy1=保存滑动过的点的坐标数组[i-1]
    // var xy2=保存滑动过的点的坐标数组[i]
    // var x1=xy1.x
    // var y1=xy1.y
    // var x2=xy2.x
    // var y2=xy2.y
    // var k = (y2 - y1) / (x2 - x1)
    // // 垂直相交的两条线的斜率的关系是：
    // // k1 * k2 = -1
    // var 蓝线1的斜率k=-1/k
    // var 蓝线1点斜式中的b=y1-蓝线1的斜率*x1
    // var 蓝线2的斜率k=-1/k
    // var 蓝线2点斜式中的b=y2-蓝线1的斜率*x2
    // // 每个坐标的半径
    // 数学忘完了
    // 就画个正方形算了
    myPaint.setStrokeWidth(每个坐标的半径*i);
    myPaint.setColor(rndColor(alpha))
    var xy=保存滑动过的点的坐标数组[i]
    var x=xy.x
    var y=xy.y
    var left=x-每个坐标的半径*i
    var top=y-每个坐标的半径*i
    var right=x+每个坐标的半径*i
    var bottom=y+每个坐标的半径*i
    canvas.drawRect( left,  top,  right,  bottom,  myPaint)
  }
}
var view=ui.board
ui.board.on("draw", function (canvas) {
  canvas.drawARGB(255, 127, 127, 127);
  myPath.reset();
  var myLength=保存滑动过的点的坐标数组.length;
  if(myLength>=3){
    try{
      画拖尾(canvas,myPath,myPaint)
    }catch(e){
    }
  }
});
view.setOnTouchListener(function(view, event){
  switch(event.getAction()){
      case event.ACTION_DOWN:
          x = event.getRawX();
          y = event.getRawY();
          downTime = new Date().getTime();
          // toastLog('down')
          return true;
      case event.ACTION_MOVE:
          //如果按下的时间超过5秒判断为长按，退出脚本
          // if(new Date().getTime() - downTime > 5500){
          //     exit();
          // }
          // toastLog('world')
          currentX =  event.getX();
          currentY =  event.getY();
          if(保存滑动过的点的坐标数组.length>=超过多少个坐标就不保存了旧坐标了){
            保存滑动过的点的坐标数组.shift()
          }
          保存滑动过的点的坐标数组.push({
            x:currentX,
            y:currentY
          })
          // log(myPoint)
          // youWannaDo(myCanvas, myPaint,myPath,myPoint)
          return true;
      case event.ACTION_UP:
          log('ACTION_UP')
          log(保存滑动过的点的坐标数组.length)
          //手指弹起时如果偏移很小则判断为点击
          if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
            threads.start(
              function(){
                while(保存滑动过的点的坐标数组.length>0){
                  保存滑动过的点的坐标数组.shift()
                  sleep(50)
                }
              }
            )
          }
          return true;
  }
  return true;
});
threads.start(
  function(){
    while(1){
      var 之前=JSON.stringify(保存滑动过的点的坐标数组)
      sleep(100)
      var 之后=JSON.stringify(保存滑动过的点的坐标数组)
      if(之前===之后){
        while(保存滑动过的点的坐标数组.length>0){
          保存滑动过的点的坐标数组.shift()
          sleep(50)
        }
      }
    }
  }
)
