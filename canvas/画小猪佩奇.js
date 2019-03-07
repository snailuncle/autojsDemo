// 设置画笔的样式，为FILL，FILL_AND_STROKE，或STROKE
var Feis = {
  Color: android.graphics.Color,
  Color_toARGB: function(color) {
      return [Feis.Color.alpha(color), Feis.Color.red(color), Feis.Color.green(color), Feis.Color.blue(color)];
  }
}
var width = device.width
var height = device.height
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var BG_COLOR = '#ff00ff00'
BG_COLOR = colors.parseColor(BG_COLOR)
var window = floaty.rawWindow(
  <canvas id = "board"
  h = "{{device.height}}"
  w = "{{device.width}}"
  />
);
window.setTouchable(false);
setInterval(() => {}, 3000)
var path = new android.graphics.Path();
var paint = new android.graphics.Paint;
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER);
paint.setColor(-28707)
paint.setStyle(Paint.Style.STROKE);
var bitmap = android.graphics.Bitmap.createBitmap(1080,1920, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new Canvas(bitmap);

window.board.on("draw",function(canvas){
  canvas.drawBitmap(bitmap,0,0, paint);
  });
threads.start(function(){asd(mcanvas);});
function asd(canvas) {
  var argb = Feis.Color_toARGB(BG_COLOR)
sleep(100);
  canvas.drawARGB(argb[0], argb[1], argb[2], argb[3]);
  path.reset();
  path.moveTo(75, 15);
  path.quadTo(220, 26, 220, 160);
sleep(100);
  canvas.drawPath(path, paint);
  path.moveTo(219, 141);
  path.quadTo(240, 300, 70, 250);
sleep(100);
  canvas.drawPath(path, paint);
  path.moveTo(76, 253);
  path.quadTo(16, 220, 74, 111);
sleep(100);
  canvas.drawPath(path, paint);
  quadraticCurveTo(canvas, [
      73, 112, 60, 112, 31, 83
  ])
  quadraticCurveTo(canvas, [
      31, 83, 23, 26, 75, 15
  ])
  quadraticCurveTo(canvas, [
      75, 15, 108, 32, 99, 61
  ])
  quadraticCurveTo(canvas, [
      99, 61, 66, 101, 31, 81
  ])
  color = '#E47A8B'
  color = colors.parseColor(color)
  paint.setColor(color)
  paint.setStyle(Paint.Style.FILL_AND_STROKE);
  arcRect = new android.graphics.RectF(42, 42, 54, 54);
sleep(100);
  canvas.drawArc(arcRect, 180 / Math.PI * 0 * Math.PI, 180 / Math.PI * 2.5 * Math.PI, false, paint)
  arcRect = new android.graphics.RectF(71, 42, 83, 54);
sleep(100);
  canvas.drawArc(arcRect, 180 / Math.PI * 0 * Math.PI, 180 / Math.PI * 2.5 * Math.PI, false, paint)
  paint.setStyle(Paint.Style.STROKE);
  quadraticCurveTo(canvas, [
      149, 31, 155, 0, 189, 6
  ])
  quadraticCurveTo(canvas, [
      189, 6, 188, 30, 170, 44
  ])
  quadraticCurveTo(canvas, [
      188, 59, 198, 24, 222, 32
  ])
  quadraticCurveTo(canvas, [
      222, 32, 255, 54, 199, 75
  ])
  arcRect = new android.graphics.RectF(63, 148, 123, 208);
sleep(100);
  canvas.drawArc(arcRect, 180 / Math.PI * 0 * Math.PI, 180 / Math.PI * 2.5 * Math.PI, false, paint)
  color = '#E47A8B'
  paint.setColor(colors.parseColor(color))
  arcRect = new android.graphics.RectF(127, 53, 155, 81);
sleep(100);
  canvas.drawArc(arcRect, 180 / Math.PI * 0 * Math.PI, 180 / Math.PI * 2.5 * Math.PI, false, paint)
  color = "#E47A8B"
  paint.setColor(colors.parseColor(color))
  arcRect = new android.graphics.RectF(156, 74, 184, 102);
sleep(100);
  canvas.drawArc(arcRect, 180 / Math.PI * 0 * Math.PI, 180 / Math.PI * 2.5 * Math.PI, false, paint)
  color = "#000000"
  paint.setColor(colors.parseColor(color))
  paint.setStyle(Paint.Style.FILL);
  arcRect = new android.graphics.RectF(130, 58, 142, 70);
sleep(100);
  canvas.drawArc(arcRect, 180 / Math.PI * 0 * Math.PI, 180 / Math.PI * 2.5 * Math.PI, false, paint)
  color = "#000000"
  paint.setColor(colors.parseColor(color))
  arcRect = new android.graphics.RectF(159, 81, 171, 93);
sleep(100);
  canvas.drawArc(arcRect, 180 / Math.PI * 0 * Math.PI, 180 / Math.PI * 2.5 * Math.PI, false, paint)
  color = "#CD8C95"
  paint.setColor(colors.parseColor(color))
  arcRect = new android.graphics.RectF(158, 127, 198, 167);
sleep(100);
  canvas.drawArc(arcRect, 180 / Math.PI * 0 * Math.PI, 180 / Math.PI * 2.5 * Math.PI, false, paint)
  paint.setStyle(Paint.Style.STROKE);
  quadraticCurveTo(canvas, [
      195, 245, 215, 215, 244, 410
  ])
  quadraticCurveTo(canvas, [
      244, 410, 244, 410, 38, 410
  ])
  quadraticCurveTo(canvas, [
      38, 410, 11, 410, 76, 251
  ])
  color = "#FFB2E0"
  paint.setColor(colors.parseColor(color))
  quadraticCurveTo(canvas, [
      58, 294, 50, 288, 12, 238
  ])
  quadraticCurveTo(canvas, [
      56, 300, 56, 300, 16, 260
  ])
sleep(100);
  canvas.drawLine(16, 260, 3, 269, paint);
sleep(100);
  canvas.drawLine(3, 269, 11, 250, paint);
sleep(100);
  canvas.drawLine(11, 250, 3, 228, paint);
sleep(100);
  canvas.drawLine(3, 228, 15, 241, paint);
  quadraticCurveTo(canvas, [
      223, 292, 266, 288, 287, 271
  ])
  quadraticCurveTo(canvas, [
      287, 271, 236, 233, 279, 245
  ])
  quadraticCurveTo(canvas, [
      279, 245, 255, 200, 295, 247
  ])
  quadraticCurveTo(canvas, [
      295, 247, 288, 200, 306, 226
  ])
  quadraticCurveTo(canvas, [
      306, 226, 311, 250, 308, 248
  ])
  quadraticCurveTo(canvas, [
      308, 248, 344, 200, 334, 245
  ])
  quadraticCurveTo(canvas, [
      334, 245, 311, 280, 300, 280
  ])
  quadraticCurveTo(canvas, [
      300, 280, 311, 280, 224, 303
  ])
  quadraticCurveTo(canvas, [
      94, 409, 94, 409, 96, 451
  ])
  quadraticCurveTo(canvas, [
      96, 451, 53, 429, 56, 461
  ])
  quadraticCurveTo(canvas, [
      56, 461, 56, 461, 107, 464
  ])
sleep(100);
  canvas.drawLine(107, 464, 106, 409, paint);
sleep(100);
  canvas.drawLine(106, 409, 183, 411, paint);
sleep(100);
  canvas.drawLine(183, 411, 182, 447, paint);
  quadraticCurveTo(canvas, [
      182, 447, 124, 434, 136, 464
  ])
sleep(100);
  canvas.drawLine(136, 464, 196, 463, paint);
sleep(100);
  canvas.drawLine(196, 463, 195, 409, paint);
  paint.setStrokeWidth(7);
  paint.setColor(-25398)
  quadraticCurveTo(canvas, [
      238, 360, 266, 380, 267, 360
  ])
  quadraticCurveTo(canvas, [
      267, 360, 254, 330, 250, 380
  ])
  quadraticCurveTo(canvas, [
      250, 380, 254, 420, 290, 369
  ])
}

function printObj(obj) {
  for (var k in obj) {
      log(k)
  }
}

function quadraticCurveTo(canvas, xyArr) {
  path.moveTo(xyArr[0], xyArr[1]);
  path.quadTo(xyArr[2], xyArr[3], xyArr[4], xyArr[5]);
sleep(100);
  canvas.drawPath(path, paint);
}
