/**
 * 作者:  家
 * QQ:   203118908
 * 功能:　刮刮卡　　（PorterDuff.Mode.DST_OUT　模式）
 */
'ui';
importClass(android.content.Context)
importClass(android.graphics.Bitmap)
importClass(android.graphics.BitmapFactory)
importClass(android.graphics.Bitmap.Config)
// importClass(android.graphics.Canvas)
importClass(android.graphics.Color)
importClass(android.graphics.Paint)
importClass(android.graphics.Path)
importClass(android.util.AttributeSet)
importClass(android.view.MotionEvent)
importClass(android.view.View)
importClass(android.animation.ObjectAnimator)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.Xfermode)
importClass(android.graphics.PorterDuff)
importClass(android.graphics.RectF)
importClass(android.graphics.Paint.Cap)
importClass(android.graphics.Paint.Join)
importClass(android.graphics.Paint.Style)
var textSize='30sp'
ui.layout(
  <vertical>
    <text text='刮刮卡之佐罗'  textStyle='bold|italic'  textSize='{{textSize}}' gravity='center'></text>
    <text text='什么事也没有发生'  textSize='{{textSize}}' ></text>
    <text text='      ---佐罗' textStyle='bold|italic'   textSize='{{textSize}}' gravity='right' ></text>
    <canvas id='board'></canvas>
  </vertical>
)
var mOutterPaint = new Paint();
mOutBmpPaint = new Paint();
mOutBmpPaint.setColor(rndColor());
mOutBmpPaint.setAntiAlias(true);
mOutBmpPaint.setDither(true);
mOutBmpPaint.setStrokeJoin(Paint.Join.ROUND);
mOutBmpPaint.setStrokeCap(Paint.Cap.ROUND);
mOutBmpPaint.setStyle(Paint.Style.FILL);
mOutBmpPaint.setStrokeWidth(20);
var mPath = new Path();
var mCanvas;
var mBitmap;
var mLastX;
var mLastY;
ui.post(
  function () {
    mPath = new Path();
    width = ui.board.getWidth();
    height = ui.board.getHeight();

    function getResource(imageName) {
      var resId = context.getResources().getIdentifier(imageName, "drawable", context.getPackageName());
      return resId;
    }
    var url = 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g1/M0B/0F/01/Cg-4jlSjXM6IGISwAARqzSkXVr0AAPpqwHgGlYABGrl783.jpg'
    imgPath = '/sdcard/m.png'
    http.get(
      url, {},
      function (res, err) {
        if (err) {
          console.error(err);
          return;
        }
        log("code = " + res.statusCode);
        files.writeBytes(imgPath, res.body.bytes())
        mOutterImg = images.read(imgPath)
        log(device.width)
        mOutterBitmap = mOutterImg.getBitmap()
        mBitmap = Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
        mBackPaint = new Paint();
        mCanvas = new Canvas(mBitmap);
        mOutterPaint.setColor(Color.RED);
        mOutterPaint.setAntiAlias(true);
        mOutterPaint.setDither(true);
        mOutterPaint.setStyle(Paint.Style.STROKE);
        mOutterPaint.setStrokeJoin(Paint.Join.ROUND); // 圆角
        mOutterPaint.setStrokeCap(Paint.Cap.ROUND); // 圆角
        mOutterPaint.setStrokeWidth(60);
        mCanvas.drawRoundRect(new RectF(0, 0, width, height), 30, 30, mOutBmpPaint);
        ui.board.on('draw', function (canvas) {
          canvas.drawBitmap(mOutterBitmap, 0, 0, null);
          drawPath();
          canvas.drawBitmap(mBitmap, 0, 0, null);
        })
      }
    )
  }, 300
)

function drawPath() {
  mOutterPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.DST_OUT));
  mCanvas.drawPath(mPath, mOutterPaint);
}
ui.board.setOnTouchListener(function (view, event) {
  action = event.getAction();
  x = event.getX();
  y = event.getY();
  switch (action) {
    case MotionEvent.ACTION_DOWN:
      mLastX = x;
      mLastY = y;
      mPath.moveTo(mLastX, mLastY);
      break;
    case MotionEvent.ACTION_MOVE:
      dx = Math.abs(x - mLastX);
      dy = Math.abs(y - mLastY);
      if (dx > 3 || dy > 3)
        mPath.lineTo(x, y);
      mLastX = x;
      mLastY = y;
      break;
  }
  view.invalidate();
  return true;
});

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
