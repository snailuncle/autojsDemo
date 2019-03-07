var 绘布 = function(view) {
  if (view.accessibilityClassName != "android.widget.ImageView") {
      //throw "我报错";
  };
  this.width = view.getWidth();
  this.height = view.getHeight();
  this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
  this.canvas = new Canvas(this.bitmap);
  this.matrix = new android.graphics.Matrix();
  threads.start(new java.lang.Runnable(() => {}));
  this.isOK = () => {
      this.width = view.getWidth();
      this.height = view.getHeight();
      this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
      this.canvas = new Canvas(this.bitmap);
      if (this.width <= 0 || this.height <= 0) {
          return false;
      };
      return true;
  };

  this.Draw = function() {};
  this.setDraw = function(fun) {
      if (typeof fun == "function") {
          this.Draw = fun;
      };
  };
  this.Refresh = (fun) => {
      try {
          this.bitmap.eraseColor(0);
          this.canvas.setMatrix(this.matrix);
          if (typeof fun == "function") {
              fun(this.canvas);
          } else {
              this.Draw(this.canvas);
          };
          ui.run(() => {
              view.setImageBitmap(this.bitmap);
          });
      } catch (e) {
          toastLog(e);
      };
  };


};

//定义悬浮窗控制模块，命名为(悬块)。
var 悬块 = function(window, view) {
  //判断是否缺少构造参数。
  if (!window || !view) {
      //缺少构造参数，抛出错误。
      throw "缺参数";
  };
  //记录按键被按下时的触摸坐标
  this.x = 0, this.y = 0;
  //记录按键被按下时的悬浮窗位置
  this.windowX, this.windowY;
  //按下时长超过此值则执行长按等动作
  this.downTime = 500;
  //记录定时执行器的返回id
  this.Timeout = 0;
  //创建点击长按事件
  this.Click = function() {};
  this.LongClick = function() {};
  //可修改点击长按事件
  this.setClick = function(fun) {
      //判断参数类型是否为函数？
      if (typeof fun == "function") {
          this.Click = fun;
      };
  };
  this.setLongClick = function(fun, ji) {
      //判断参数类型是否为函数？
      if (typeof fun == "function") {
          this.LongClick = fun;
          //判断参数是否可为设置数字？
          if (parseInt(ji) <= 1000) {
              this.downTime = parseInt(ji);
          };
      };
  };

  view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
      //判断当前触控事件，以便执行操作。
      switch (event.getAction()) {
          //按下事件。
          case event.ACTION_DOWN:
              //按下记录各种坐标数据。
              this.x = event.getRawX();
              this.y = event.getRawY();
              this.windowX = window.getX();
              this.windowY = window.getY();
              //创建一个定时器用来定时执行长按操作。
              this.Timeout = setTimeout(() => {
                  this.LongClick();
                  this.Timeout = 0;
              }, this.downTime);
              return true;
              //移动事件。
          case event.ACTION_MOVE:
              //移动距离过大则判断为移动状态
              if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                  //移动状态清除定时器
                  if (this.Timeout) {
                      //定时器存在则清除定时器。
                      clearTimeout(this.Timeout);
                      this.Timeout = 0;
                  };
                  //移动手指时调整悬浮窗位置
                  window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
              };
              return true;
              //抬起事件。
          case event.ACTION_UP:
              if (this.Timeout) {
                  //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                  //清除定时器。
                  clearTimeout(this.Timeout);
                  this.Timeout = 0;
                  //执行点击事件。
                  this.Click();
              };
              return true;
      };
      //控件的触控事件函数必须要返回true。否则报错。
      return true;
  }));
};







if (!images.requestScreenCapture(true)) {
  toastLog("截图请求失败");
  exit();
};
console.show();

//var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];;

importClass(android.graphics.Paint);

var window = floaty.rawWindow(
  <ImageView id="img"/>
);

window.setSize(-1, -1);
window.setTouchable(false);

var paint = new android.graphics.Paint;
paint.setStrokeWidth(4);
paint.setStyle(Paint.Style.STROKE);
paint.setColor(colors.GREEN);
//paint.setTextAlign(Paint.Align.CENTER); //写字左右中心

var size = 60;
paint.setTextSize(size);
//paint.setStrokeWidth(5);
//paint.setStyle(Paint.Style.STROKE);

var ad = new 绘布(window.img);

//var img = images.read("./JB.jpg");
var data = {
  "color": "#ffcdd2ce",
  "ary": [
      [-21, 22, "#ffddd4d5"],
      [-22, -21, "#ffc2c4c3"],
      [-42, 1, "#ffd3d2ce"],
      [0, 2, "#ffd7d7d5"],
      [-23, 22, "#ffd9d0d1"],
      [-19, -21, "#ffc6c6c6"],
      [-42, -1, "#ffd5d6d1"],
      [0, -2, "#ffcdcfcc"],
      [-18, 22, "#ffdfd6d7"],
      [-24, -21, "#ffb6bfbc"],
      [-42, 3, "#ffd6d2cf"],
      [0, 5, "#ffdcd2d3"],
      [-25, 21, "#ffbfbbba"],
      [-17, -20, "#ffced2d1"],
      [-42, -4, "#ffdad5d2"],
      [-1, -5, "#ffe4d5da"],
      [-16, 21, "#ffcecdcb"],
      [-26, -20, "#ffd7dddb"],
      [-42, 6, "#ffcfd6cf"],
      [-1, 7, "#ffd3c9ca"],
      [-28, 21, "#ffdedadb"],
      [-15, -20, "#ffc6cfcc"],
      [-41, -6, "#ffe3d9da"],
      [-1, -7, "#ffe6d5dd"],
      [-14, 20, "#ffc7c3c2"],
      [-29, -19, "#ffdcdbd7"],
      [-41, 8, "#ffd8d8d6"],
      [-2, 9, "#ffdddbdc"],
      [-30, 20, "#ffe2e2e0"],
      [-12, -19, "#ffbfbfbf"],
      [-40, -8, "#ffddd4d5"],
      [-2, -9, "#ffd0cacc"],
      [-11, 19, "#ffd2cecd"],
      [-31, -18, "#ffd0d9d4"],
      [-40, 10, "#ffdad4d4"],
      [-3, 12, "#ffccd0cf"],
      [-32, 19, "#ffd3ded6"],
      [-10, -18, "#ffc6b7bc"],
      [-39, -11, "#ffd5cccd"],
      [-4, -11, "#ffd5d3d4"],
      [-9, 18, "#ffd1d0cc"],
      [-33, -17, "#ffc2d1cc"],
      [-39, 12, "#ffcdd3cf"],
      [-4, 13, "#ffc6ccca"],
      [-34, 17, "#ffd4d3d1"],
      [-8, -16, "#ffeddae0"],
      [-38, -13, "#ffdbe8df"],
      [-5, -13, "#fff5e6eb"],
      [-7, 17, "#ffe4dede"],
      [-35, -16, "#ffeae1e4"],
      [-37, 14, "#ffc7d0cb"]
  ]
};


// x 242 960 1682
// y 247 968
var pointsAry = {
  x: [242, 960, 1682],
  y: [247, 968]
};
//圆形点。
var CP = circlePoints(75, 2, 1);

var imgRect = new android.graphics.RectF(0, 0, 1920, 1080);
//多点找色返回的坐标偏差。
var cx = -20,
  cy = 1;


sleep(1000);
if (!ad.isOK()) {
  toastLog("初始化失败\n脚本已停止，请重新运行");
  exit();
};




//创建并生成一个悬浮窗。
var window_ = floaty.window(
  //创建一个按钮，并设置其id宽高文字等属性。
  <button  id="but" w="200px" h="200px" text="开始"/>
);
//输出提示信息。
toastLog("长按悬浮窗关闭本脚本");
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => {}, 500);
//声明一个变量用来控制线程。
var thread = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var w_ = new 悬块(window_, window_.but);
//设置长按事件。
w_.setLongClick(function() {
  //输出气泡信息。
  toast("脚本已关闭");
  //脚本停止代码。
  exit();
});
//设置点击事件。
w_.setClick(function() {
  //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
  if (thread ? !thread.isAlive() : true) { //线程没有运行。
      ui.run(() => {
          window_.but.setText("停止");
      });
      //新建一个线程，赋值给变量thread
      thread = threads.start(Main);
  } else {
      thread.interrupt();
      ui.run(() => {
          window_.but.setText("开始");
      });
  };
});


///～～～～～～～～～～～～～～～～～～～～～～～～

//主要运行的
function Main() {
  while (true) {

      var IMG = images.captureScreen();
      //var IMG = images.read("./245.jpg");

      //根据颜色数组，多点找色找到位置。
      var p = findMultiColors(IMG, data.color, data.ary, {
          region: [242, 247, 1682 - 242, 968 - 247],
          threshold: 40
      });

      //重新画图。
      ad.Refresh(function(canvas) {
          //canvas.drawARGB(127, 255, 0, 0);
          if (p) {
              //找到位置了。
              log(p);

              //计算出圆心坐标。//找到的坐标加上坐标偏差。
              var rx = p.x + cx,
                  ry = p.y + cy;

              var CTP = 找线(rx, ry, CP, IMG);
              //画圆。//画一个小圆，不要挡住原来的圆。
              canvas.drawCircle(rx, ry, 15, paint);

              /*
              for (var i = 0; i < CP.length; i += 2) {
                  let ary = getsd(30, [CP[i], CP[i + 1]]);
                  canvas.drawPoint(rx + ary[0], ry + ary[1], paint);
              };
              */

              //画出找到的线
              for (var i = 0; i < CTP.length; i += 2) {
                  let ary = getsd(100, [CTP[i] - rx, CTP[i + 1] - ry]);
                  let ary2 = getsd(500, [CTP[i] - rx, CTP[i + 1] - ry]);
                  canvas.drawLine(rx + ary[0], ry + ary[1], rx + ary2[0], ry + ary2[1], paint);
              };

              //～～～～～～～～～～～～～～～～～～～～～～～～
              return; //不继续往下画了。//你可以改成原来的划线方式。
              //画六条线。
              for (var iy in pointsAry.y) {
                  for (var ix in pointsAry.x) {
                      var x = pointsAry.x[ix],
                          y = pointsAry.y[iy];
                      var ary = getsd(30, [x - rx, y - ry]);
                      canvas.drawLine(rx + ary[0], ry + ary[1], x, y, paint);
                  };
              };

              //～～～～～～～～～～～～～～～～～～～～～～～～
          };

      });
      //回收释放截图图片内存。
      IMG.recycle();
  };
};
///～～～～～～～～～～～～～～～～～～～～～～～～


function 找线(x, y, ary, img) {
  var w = img.getWidth();
  var h = img.getHeight();
  var Ary = new Array;
  for (let i = 0; i < ary.length; i += 2) {
      var ax = Math.floor(x + ary[i]),
          ay = Math.floor(y + ary[i + 1]);
      try {
          if (imgRect.contains(ax, ay)) {

              var color = img.pixel(ax, ay);
              if (colors.isSimilar("#ffdedadb", color, 63)) {
                  Ary.push(ax, ay);
              };
          };
      } catch (e) {
          log(e);
          log(ax, ay);
      };
  };
  return Ary;
};

function inon(a, b, c) {
  return (a >= b || a < c) ? a : (a > b ? c - 1 : b);
};


function 颜色(color) {
  var r = colors.red(color),
      g = colors.green(color),
      b = colors.blue(color);

  if (weiyi([r - g, g - b, b - r]) < 60) {
      return true;
  };
  return false;
};


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

function ydfx(ary) {
  var ary = this.getsd(1, ary);
  var x = ary[0],
      y = ary[1];
  var Y = Math.asin(y) / (2 * Math.PI) * 360;
  if (x < 0) {
      Y = 180 - Y;
  };
  return Y;
};


function circlePoints(r, s, g) {
  //半径,点距,是否边框
  let S = Math.floor(r / s) + 1;
  //以中心基本点正负循环总量
  let Ary = new Array;
  if (g) {
      let c = Math.floor(Math.PI * r / 2 / s / 2) + 1;
      //循环量。
      let cR = s / r;
      //差值弧度。
      let AR = Math.PI / 2;
      //90度弧度。
      for (let i = 0; i < c; i++) {
          if (i == 0) {
              let xy = getsd(r, RToxy(0));
              let xy1 = getsd(r, RToxy(AR));
              let xy2 = getsd(r, RToxy(-AR));
              let xy3 = getsd(r, RToxy(AR * 2));
              Ary = Ary.concat(xy, xy1, xy2, xy3);
          } else {
              let xy = getsd(r, RToxy(cR * i));
              let xy1 = getsd(r, RToxy(cR * i + AR));
              let xy2 = getsd(r, RToxy(cR * i - AR));
              let xy3 = getsd(r, RToxy(cR * i + AR * 2));
              Ary = Ary.concat(xy, xy1, xy2, xy3);
              xy = getsd(r, RToxy(-cR * i));
              xy1 = getsd(r, RToxy(-cR * i + AR));
              xy2 = getsd(r, RToxy(-cR * i - AR));
              xy3 = getsd(r, RToxy(-cR * i + AR * 2));
              Ary = Ary.concat(xy, xy1, xy2, xy3);
          };
      };
  } else {
      for (let iy = 0; iy < S; iy++) {
          for (let ix = 0; ix < S; ix++) {
              if (iy == 0 && ix == 0) {
                  Ary.push(0, 0);
              } else if ((iy == 0 && ix != 0) || (iy != 0 && ix == 0)) {
                  Ary.push(-ix * s, -iy * s, ix * s, iy * s);
              } else {
                  let AX = -ix * s;
                  let AY = -iy * s;
                  let BX = ix * s;
                  let BY = iy * s;
                  if (weiyi([AX, AY]) <= r) {
                      Ary.push(AX, AY);
                  };
                  if (weiyi([BX, BY]) <= r) {
                      Ary.push(BX, BY);
                  };
                  if (weiyi([AX, BY]) <= r) {
                      Ary.push(AX, BY);
                  };
                  if (weiyi([BX, AY]) <= r) {
                      Ary.push(BX, AY);
                  };
              };
          };
      };
  };
  return Ary;

  function weiyi(ary) {
      var sum = 0;
      for (var i = 0; i < ary.length; i++) {
          sum += Math.pow(ary[i], 2);
      };
      return Math.sqrt(sum);
  };

  function RToxy(R) {
      var x = Math.cos(R);
      var y = Math.sin(R);
      return [x, y];
  };


  function getsd(s, ary) {
      var sum = weiyi(ary);
      var S = s / sum;
      for (var i = 0; i < ary.length; i++) {
          ary[i] = ary[i] * S;
      };
      return ary;
  };

};
