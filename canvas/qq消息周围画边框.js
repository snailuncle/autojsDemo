/**
 * @功能 在qq消息周围画个框
 * @作者 家
 * @QQ   刷勋章被封了一天,203118908
 */
var window, paint, bitmap, bitmapCanvas;
启动app('QQ')
var 消息列表 = 获取QQ消息列表()
消息列表.map(
  (消息) => {
    showView(消息)
  }
)
sleep(10000)

function 获取QQ消息列表() {
  var 大图消息 = idEndsWith('big_image_layout').find()
  var 正常消息 = idEndsWith('chat_item_content_layout').find()
  var 列表 = []
  if (大图消息) {
    列表 = 列表.concat(大图消息)
  }
  if (正常消息) {
    列表 = 列表.concat(正常消息)
  }
  return 列表
}

function 启动app(appName) {
  var packageName = getPackageName(appName);
  var currentPackageName = currentPackage()
  if (packageName == currentPackageName) {
    log('当前app是', appName)
    return true
  } else {
    launchApp(appName);
    var flag = null;
    for (let i = 0; i < 10; i++) {
      flag = 是不是聊天窗口()
      if (flag) {
        log('当前是聊天窗口')
        return true;
      } else {
        sleep(1000)
      }
    }
    var msg = util.format('请在聊天窗口运行本脚本,脚本停止', appName)
    alert(msg)
    exit()
  }
}

function 是不是聊天窗口() {
  for (let i = 0; i < 3; i++) {
    var 发送 = text('发送').findOnce()
    var 输入框 = idEndsWith('input').findOnce()
    if (发送 && 输入框) {
      return true
    }
  }
  return false
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

function showView(view) {
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
