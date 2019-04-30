'ui';
importClass(android.animation.ObjectAnimator)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.Xfermode)
importClass(android.graphics.Paint)
importClass(android.graphics.Bitmap)
importClass(android.graphics.PorterDuff)
ui.layout(
  <vertical>
    <vertical id='parent'>
      <canvas id='board'></canvas>
    </vertical>
  </vertical>
)
var path = new android.graphics.Path();
var paint = new android.graphics.Paint();
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER);
paint.setColor(-28707)
paint.setStyle(Paint.Style.FILL);
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new android.graphics.Canvas(bitmap);
ui.board.on("draw", function (canvas) {
  canvas.drawBitmap(bitmap, 0, 0, paint);
});
threads.start(function () {
  asd(mcanvas);
});

function asd(canvas) {
  canvas.drawARGB(0, 139, 197, 186);
  canvasWidth = canvas.getWidth();
  canvasHeight = canvas.getHeight();
  layerId = canvas.saveLayer(0, 0, canvasWidth, canvasHeight, null, android.graphics.Canvas.ALL_SAVE_FLAG);
  r = canvasWidth / 3;
  //绘制黄色的圆形
  paint.setColor(rndColor());
  canvas.drawCircle(r, r, r, paint);
  xfermode = new PorterDuffXfermode(PorterDuff.Mode.XOR);
  // xfermode=new PorterDuffXfermode(PorterDuff.Mode.SRC_IN);
  // 在Android的PorterDuff.Mode类中列举了他们制定的规则：
  // android.graphics.PorterDuff.Mode.SRC:只绘制源图像
  // android.graphics.PorterDuff.Mode.DST:只绘制目标图像
  // android.graphics.PorterDuff.Mode.DST_OVER:在源图像的顶部绘制目标图像
  // android.graphics.PorterDuff.Mode.DST_IN:只在源图像和目标图像相交的地方绘制目标图像
  // android.graphics.PorterDuff.Mode.DST_OUT:只在源图像和目标图像不相交的地方绘制目标图像
  // android.graphics.PorterDuff.Mode.DST_ATOP:在源图像和目标图像相交的地方绘制目标图像，在不相交的地方绘制源图像
  // android.graphics.PorterDuff.Mode.SRC_OVER:在目标图像的顶部绘制源图像
  // android.graphics.PorterDuff.Mode.SRC_IN:只在源图像和目标图像相交的地方绘制源图像
  // android.graphics.PorterDuff.Mode.SRC_OUT:只在源图像和目标图像不相交的地方绘制源图像
  // android.graphics.PorterDuff.Mode.SRC_ATOP:在源图像和目标图像相交的地方绘制源图像，在不相交的地方绘制目标图像
  // android.graphics.PorterDuff.Mode.XOR:在源图像和目标图像重叠之外的任何地方绘制他们，而在不重叠的地方不绘制任何内容
  // android.graphics.PorterDuff.Mode.LIGHTEN:获得每个位置上两幅图像中最亮的像素并显示
  // android.graphics.PorterDuff.Mode.DARKEN:获得每个位置上两幅图像中最暗的像素并显示
  // android.graphics.PorterDuff.Mode.MULTIPLY:将每个位置的两个像素相乘，除以255，然后使用该值创建一个新的像素进行显示。结果颜色=顶部颜色*底部颜色/255
  // android.graphics.PorterDuff.Mode.SCREEN:反转每个颜色，执行相同的操作（将他们相乘并除以255），然后再次反转。结果颜色=255-(((255-顶部颜色)*(255-底部颜色))/255)
  paint.setXfermode(xfermode);
  //绘制蓝色的矩形
  paint.setColor(rndColor());
  canvas.drawRect(r, r, r * 2.7, r * 2.7, paint);
  //最后将画笔去除Xfermode
  paint.setXfermode(null);
  canvas.restoreToCount(layerId);
}

function getAttr(obj) {
  var attrs = []
  for (var k in obj) {
    attrs.push(k)
  }
  attrs.sort()
  log(attrs)
}

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
