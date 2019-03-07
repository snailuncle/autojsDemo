/**
*作者QQ: 1811588980
*完成时间: 2019年1月27日 下午2:51:02
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 暂无备注
**/

var 绘布 = function(view) {
  if (view.accessibilityClassName != "android.widget.ImageView") {
      throw "我报错";
  };
  this.width = view.getWidth();
  this.height = view.getHeight();
  this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
  this.canvas = new android.graphics.Canvas(this.bitmap);
  this.matrix = new android.graphics.Matrix();
  threads.start(new java.lang.Runnable(() => {
      while (true) {
          if (view.getWidth() != this.width || view.getHeight() != this.height) {
              this.width = view.getWidth();
              this.height = view.getHeight();
              this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
              this.canvas = new android.graphics.Canvas(this.bitmap);
          };
          sleep(500);
      };
  }));
  this.Draw = function() {};
  this.setDraw = function(fun) {
      if (typeof fun == "function") {
          this.Draw = fun;
      };
  };
  setInterval(() => {
      try {
          this.bitmap.eraseColor(0);
          this.canvas.setMatrix(this.matrix);
          this.Draw(this.canvas);
          ui.run(() => {
              view.setImageBitmap(this.bitmap);
          });
      } catch (e) {
          toastLog(e);
      };
  }, 50);
};

var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];;

importClass(android.graphics.Paint);
auto();
var csx = device.width / 1080;
var csy = device.height / 1920;
var UiObject = selector().findOne();
var activity = currentActivity();
setInterval(() => {
  if (currentActivity() != activity) {
      UiObject = selector().findOne();
  };
}, 250);
var window = floaty.rawWindow(
  <ImageView id="img" bg="#40000000"/>
);
window.setSize(-1, -1);
window.setTouchable(false);
var paint = new android.graphics.Paint;
paint.setStrokeWidth(2);
paint.setStyle(Paint.Style.STROKE);
paint.setColor(colors.GREEN);
//paint.setTextAlign(Paint.Align.CENTER); //写字左右中心

var size = 30;
paint.setTextSize(size);
var xy = {
  y: size
};

var ad = new 绘布(window.img);
ad.setDraw(function(canvas) {
  xy.x=0;
  xy.y = size;
  //生成(UiObject, canvas);
  绘制(UiObject, canvas, 0);
});

function getsd(s, ary) {
  var sum = weiyi(ary);
  var S = s / sum;
  for (var i = 0; i < ary.length; i++) {
      ary[i] = ary[i] * S;
  };
  return ary;
};

function weiyi(ary) {
  var sum = 0;
  for (var i = 0; i < ary.length; i++) {
      sum += Math.pow(ary[i], 2);
  };
  return Math.sqrt(sum);
};

function kdfx(Y) {
  var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
  var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
  return {
      x: x,
      y: y
  };
};


function 绘制(UiObject, canvas, x, C, D) {
  D = D || 0;
  if (UiObject) {
      //var r=UiObject.bounds();
      var r = UiObject.bounds();
      paint.setColor(rainbowColor[Math.floor(D % 7)]);
      paint.setStyle(Paint.Style.STROKE);
      canvas.drawRect(r, paint);
      paint.setStyle(Paint.Style.FILL);
      canvas.drawText(UiObject.className(), x, xy.y, paint);
      canvas.drawLine(r.left, r.top, x, xy.y, paint);
      xy.y += size;
      //paint.setStrokeWidth(3);
      //canvas.drawText(String(D), Math.floor(r.centerX()), r.centerY() + 0.365 * size, paint);
      if (UiObject.childCount() && ((!C && C != 0) || C > 0)) {
          for (var i = 0; i < UiObject.childCount(); i++) {
              arguments.callee(UiObject.child(i), canvas, x + size, C - 1, D + 1);
          };
      };
  };
};



function 生成(UiObject, canvas, C, D) {
  D = D || 0;
  if (UiObject) {
      var r = UiObject.bounds();
      paint.setColor(rainbowColor[Math.floor(D % 7)]);
      canvas.drawRect(r, paint);
      //paint.setStrokeWidth(3);
      //paint.setStyle(Paint.Style.FILL);
      //canvas.drawText(String(D), Math.floor(r.centerX()), r.centerY() + 0.365 * size, paint);
      // if (UiObject.childCount() && ((!C && C != 0) || C > 0)) {
      for (var i = 0; i < UiObject.childCount(); i++) {
          arguments.callee(UiObject.child(i), canvas, C - 1, D + 1);
      };
      // };
  };
};
