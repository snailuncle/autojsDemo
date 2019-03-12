/**
 * @功能 在指定控件周围画个框
 * @作者 家
 * @QQ   刷勋章被封了一天,203118908
 */
var window, paint, bitmap, bitmapCanvas;
var 显示时长=10000  // 毫秒
var 消息View = text('消息').findOnce()
if (消息View) {
  showView(消息View,显示时长)
} else {
  alert('请测消息页面测试本脚本')
}

function 创建悬浮窗() {
  window = floaty.rawWindow( <canvas id = "board"
    h = "{{device.height}}"
    w = "{{device.width}}" />
  );
  // setInterval(() => {}, 3000)
  window.setSize(device.width, device.height)
  window.setTouchable(false);
  // window.setPosition(0, 110)
  // var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
  bitmap = android.graphics.Bitmap.createBitmap(device.width, device.height, android.graphics.Bitmap.Config.ARGB_8888);
  bitmapCanvas = new Canvas(bitmap);
  paint = new Paint()
  paint.setStrokeWidth(10);
  var color = '#00ff00'
  color = colors.parseColor(color)
  paint.setColor(color)
  paint.setStyle(Paint.Style.STROKE);
  paint.setTextAlign(Paint.Align.CENTER);
  paint.setTextSize(35);
  window.board.on("draw", function (canvas) {
    canvas.drawBitmap(bitmap, 0, 0, paint);
  });
}

function showView(view,显示时长) {
  创建悬浮窗()
  var bounds = view.bounds()
  var left = bounds.left
  var top = bounds.top
  var right = bounds.right
  var bottom = bounds.bottom
  if (left > right) {
    left = device.width / 3
    right = device.width / 3 * 2
  }
  log(left, top, right, bottom)
  var originalStrokeWidth = paint.getStrokeWidth()
  var originalColor = paint.getColor()
  var rndColor = getRndColor()
  var color = colors.parseColor(rndColor)
  paint.setColor(color)
  paint.setStrokeWidth(20)
  画矩形(left, top, right, bottom)
  sleep(显示时长)
  paint.setColor(originalColor)
  paint.setStrokeWidth(originalStrokeWidth)

}

function 画矩形(left, top, right, bottom) {
  bitmapCanvas.drawRect(left, top, right, bottom, paint)
}

function getRndColor() {
  var a, r, g, b;
  a = Math.floor(0), r = Math.floor(随机0_255()), g = Math.floor(随机0_255()), b = Math.floor(随机0_255());
  // var 反色 = -1 - colors.argb(0, r, g, b);
  var color = colors.argb(0, r, g, b);
  color = colors.toString(color)
  log(color)
  return color
}

function 随机0_255() {
  var r = parseInt(255 * Math.random())
  return r
}
