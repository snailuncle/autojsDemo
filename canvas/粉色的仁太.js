/**
 * 原文链接:  https://blog.csdn.net/u014452224/article/details/55193542
 * 翻译:     家
 * QQ:      203118908
 * 功能:    autojs图标和波浪同时显示
 */
'ui';
var marginSize = '30'
var myMargin = marginSize + ' ' + marginSize + ' ' + marginSize + ' ' + marginSize
// <button id='button' >button</button>
bitmapWidth=666
bitmapHeight=666
ui.layout(
  <vertical gravity='center'>
    <frame margin= '{{myMargin}}' gravity='center'>
    <frame w="{{bitmapWidth}}px" h="{{bitmapHeight}}px" gravity='center'>
      <canvas id='board'></canvas>
    </frame>
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
importClass(android.animation.ObjectAnimator)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.Xfermode)
importClass(android.graphics.PorterDuff)
var myPath = new Path();
var myPaint = new Paint();
var myMatrix = new Matrix();
var myPoint = new Point(50, 300);
myPaint.setStrokeWidth(2);
myPaint.setTextAlign(Paint.Align.CENTER);
myPaint.setColor(-28707)
// myPaint.setColor(-65536)
// myPaint.setColor(13823224)
myPaint.setStyle(Paint.Style.FILL_AND_STROKE);
// myPaint.setStyle(Paint.Style.FILL);
// myPaint.setStyle(Paint.Style.STROKE);
// var bitmap = android.graphics.Bitmap.createBitmap(bitmapWidth, bitmapHeight, android.graphics.Bitmap.Config.ARGB_8888);
// var myCanvas = new Canvas(bitmap);
view = ui.board
var rect = new Rect;
view.getBoundsOnScreen(rect)
left=rect.left
top=rect.top
right=rect.right
bottom=rect.bottom
centerx = rect.centerX()
centery = rect.centerY()
ui.post(
  function(){
    w=view.getWidth()
    h=view.getHeight()
  }
)
w=0
黑洞圆的半径=50
var 半边宽度=w/2
myPath.reset();
mWaveHight = 150;//水波纹的高度
mWaveWidth = 100;//水波纹的宽度
mWaveSpeed = 10;
maxProgress = 100;
currentProgress = 0;
var currentY;
deviceHeightHalf=device.height/2
deviceWidthHalf=device.width/2
deviceWidth=device.width
deviceHeight=device.height
// 波峰加波谷算一浪
浪的个数=3
波浪宽度=bitmapWidth/浪的个数
波浪高度=100
振幅=300
左右移动的距离=0
angel=function(){
  var count=0
  return function(){
    count++;
    if(count>=360){
      count=0
    }
    return count;
  }
}()

var secondImgId = getResource('ic_android_eat_js')
log('第二种获取id的办法,能用')
log(secondImgId)
// img.setBackgroundResource(secondImgId);

myDrawableBitmap=context.getResources().getDrawable(secondImgId).bitmap // Drawable

mSrcRect = new Rect(0, 0, bitmapWidth, bitmapHeight);
mDestRect = new Rect(0, 0, bitmapWidth, bitmapHeight);

// 按照比例缩放图片
// 首先得到原bitmap 宽高
myDrawableBitmap原来的width = myDrawableBitmap.getWidth();
heimyDrawableBitmap原来的height = myDrawableBitmap.getHeight();

// 得到新的宽高与原宽高的比例
scaleWidth = (bitmapWidth)/myDrawableBitmap原来的width;
scaleHeight = (bitmapHeight)/heimyDrawableBitmap原来的height;
// 使用 Matrix 类
matrix = new Matrix();
matrix.postScale(scaleWidth,scaleHeight);
// 生成新的Bitmap
myDrawableBitmap = Bitmap.createBitmap(myDrawableBitmap,0,0,myDrawableBitmap原来的width,heimyDrawableBitmap原来的height,matrix,false);



ui.board.on("draw", function (canvas) {


  distance=Math.sin(angel()*0.017453293)*振幅



  canvas.drawARGB(255, 127, 127, 127);
  // xfermode = new PorterDuffXfermode(PorterDuff.Mode.SRC_IN);


  xfermode = new PorterDuffXfermode(PorterDuff.Mode.SRC_IN);
  myPaint.setXfermode(xfermode);
  canvas.drawBitmap(myDrawableBitmap, mSrcRect, mDestRect, myPaint);


  myPath.reset();
  第一个点={
    x:0-左右移动的距离,
    y:bitmapHeight/2+distance
  }
  myPath.moveTo(第一个点.x,第一个点.y);
  for(var i=0;i<浪的个数*2;i++){
    // 第一个波峰
    控制点坐标={
      x:波浪宽度*(1/4+i)-左右移动的距离,
      y:bitmapHeight/2-波浪高度+distance
    }
    终点坐标={
      x:波浪宽度*(1/4*2+i)-左右移动的距离,
      y:bitmapHeight/2+distance
    }
    myPath.quadTo(控制点坐标.x,控制点坐标.y,终点坐标.x,终点坐标.y);
    // 第一个波谷
    控制点坐标={
      x:波浪宽度*(1/4*3+i)-左右移动的距离,
      y:bitmapHeight/2+波浪高度+distance
    }
    终点坐标={
      x:波浪宽度*(1/4*4+i)-左右移动的距离,
      y:bitmapHeight/2+distance
    }
    myPath.quadTo(控制点坐标.x,控制点坐标.y,终点坐标.x,终点坐标.y);
  }

  myPath.lineTo(bitmapWidth,bitmapHeight);
  myPath.lineTo(0,bitmapHeight);
  myPath.close();
  canvas.drawPath(myPath, myPaint);



  myPaint.setXfermode(null);



  // canvas.drawBitmap (myDrawableBitmap, 0,0, myPaint )

  左右移动的距离 +=mWaveSpeed;
  左右移动的距离 = 左右移动的距离%(bitmapWidth);
  // log(左右移动的距离)
});


function getResource(imageName) {
  var resId = context.getResources().getIdentifier(imageName, "drawable", context.getPackageName());
  return resId;
}
