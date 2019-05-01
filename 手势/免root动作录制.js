/**
 *作者QQ: 1811588980
 *完成时间: 2019年5月1日 下午7:00:59
 *测试机型: vivo PD1813D
  *Auto.js版本: 4.1.0 Alpha5
  *Android版本: 8.1.0
  *屏幕: 1080*2280
  *API: 27
 *备注: 使用方法。
 本脚本动作录制实现方法。
 (使用一个全屏覆盖的悬浮窗。接受你的触控操作。
 之后会自动帮你操作一遍。
 在此过程中记录你的动作。
 //这个功能默认开启可以用"录制开启"按钮关闭);
 (动作是以数组的形式存起来。
 //可以用"运行录制"按钮来运行。
 你可以生成代码来得到你的动作坐标代码。
 粘贴到一个脚本里面来运行。
 生成的代码实际上是一个循环运行数组内保存的每个动作。
 每一个动作是用。gestures(); 异步手势来执行的。因此可以录制一些多指操作。
 (但是三指及以上触控会被系统截屏等功能所拦截从而造成无法录制);
 每个动作完成都有一个时间间隔。

**/





function 绘布(view) {
  if (view.accessibilityClassName != "android.widget.ImageView") {
      //throw "我报错";
  };
  this.width = view.getWidth();
  this.height = view.getHeight();
  this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1000, this.height || 1000, android.graphics.Bitmap.Config.ARGB_8888);
  this.canvas = new Canvas(this.bitmap);
  this.matrix = new android.graphics.Matrix();
  //threads.start(new java.lang.Runnable(() => {}));
  this.isOK = () => {
      this.width = view.getWidth();
      this.height = view.getHeight();
      this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1000, this.height || 1000, android.graphics.Bitmap.Config.ARGB_8888);
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


function 悬浮控制(window, windowid, ar) {
  this.Orientation = context.resources.configuration.orientation;
  this.Width = this.Orientation == 1 ? device.width : device.height;
  this.Height = this.Orientation == 2 ? device.width : device.height;
  this.isAutoIntScreen = true;
  this.Click = function() {};
  this.Move = function() {};
  this.LongClick = function() {};
  this.setClick = (fun) => {
      fun = fun || function() {};
      this.Click = fun;
  };
  this.setMove = (fun) => {
      fun = fun || function() {};
      this.Move = fun;
  };
  this.setLongClick = (fun, ji) => {
      fun = fun || function() {};
      this.LongClick = fun;
      if (parseInt(ji)) {
          this.Tjitime = parseInt(ji) / 50;
      };
  };
  setInterval(() => {
      if (context.resources.configuration.orientation != this.Orientation) {
          this.Orientation = context.resources.configuration.orientation;
          this.Width = this.Orientation == 1 ? device.width : device.height;
          this.Height = this.Orientation == 2 ? device.width : device.height;
          var xy = this.windowGXY(window.getX(), window.getY(), this.G(window));
          this.windowyidong([
              [window.getX(), window.getY()],
              [xy.x, xy.y]
          ]);
      };
  }, 100);
  this.TX = 0;
  this.TY = 0;
  this.Tx = 0;
  this.Ty = 0;
  this.Tyidong = false;
  this.Tkeep = false;
  this.Tjitime = 12;
  this.Ttime = 0;
  setInterval(() => {
      if (this.Tkeep) {
          this.Ttime++;
          if (!this.Tyidong && this.Ttime > this.Tjitime) {
              //非移动且按下时长超过1秒判断为长按
              this.Tkeep = false;
              this.Ttime = 0;
              this.LongClick();
          };
      };
  }, 50);
  if (windowid) {
      windowid.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
          this.Move(view, event);
          switch (event.getAction()) {
              case event.ACTION_DOWN:
                  this.Tx = event.getRawX();
                  this.Ty = event.getRawY();
                  this.TX = window.getX();
                  this.TY = window.getY();
                  this.Tkeep = true; //按下,开启计时
                  break;
              case event.ACTION_MOVE:
                  var sx = event.getRawX() - this.Tx;
                  var sy = event.getRawY() - this.Ty;
                  if (!this.Tyidong && this.Tkeep && this.weiyi(sx, sy) >= 10) {
                      this.Tyidong = true;
                  };
                  if (this.Tyidong && this.Tkeep) {
                      window.setPosition(this.TX + sx, this.TY + sy);
                  };
                  break;
              case event.ACTION_UP:
                  if (!this.Tyidong && this.Tkeep && this.Ttime < 7) {
                      this.Click();
                  };
                  this.Tkeep = false;
                  this.Ttime = 0;
                  if (this.Tyidong) {
                      if (this.isAutoIntScreen) {
                          threads.start(new java.lang.Runnable(() => {
                              this.windowyidong(this.IntScreen());
                          }));
                      } else {
                          threads.start(new java.lang.Runnable(() => {
                              this.windowyidong(this.ViewIntScreen());
                          }));

                      };
                      this.Tyidong = false;
                  };
                  break;
          };
          return true;
      }));
  };
  this.G = (win, view) => {
      //返回悬浮窗的坐标范围。
      var K = 36, //悬浮窗的隐形边矩
          H = 66; //手机通知栏的高度
      var ary;
      if (!ar) {
          if (view) {
              ary = [
                  [-view.getX(), -view.getY()],
                  [this.Width - (view.getX() + view.getWidth()), this.Height - (view.getY() + view.getHeight()) - H - K]
              ];

          } else {
              ary = [
                  [0, 0],
                  [this.Width - win.getWidth() + K * 2, this.Height - win.getHeight() - H + K * 2]
              ];
          }
      } else {
          if (view) {
              ary = [
                  [-view.getX(), H - view.getY()],
                  [this.Width - (view.getX() + view.getWidth()), this.Height - (view.getY() + view.getHeight())]
              ];

          } else {
              ary = [
                  [0, H],
                  [this.Width - win.getWidth(), this.Height - win.getHeight()]
              ];
          }
      };
      return ary;
  };
  this.weiyi = function() { //平方和开方
      var num = 0;
      for (var i = 0; i < arguments.length; i++) {
          num += arguments[i] * arguments[i];
      };
      return Math.round(Math.sqrt(num) * 1000) / 1000
  };
  this.windowGXY = function(x, y, k) {
      //修正坐标的所在范围。如果坐标超出了范围，则修正回来。
      x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
      y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
      return {
          x: x,
          y: y
      };
  };
  this.windowyidong = (A, s, w) => {
      //移动悬浮窗的动画效果。
      w = w || window;
      s = s || 10;
      var sx = A[1][0] - A[0][0],
          sy = A[1][1] - A[0][1];
      var sd = this.weiyi(sx, sy) / s;
      var X = sx / sd,
          Y = sy / sd;
      var x = 0,
          y = 0;
      for (var i = 0; i < sd; i++) {
          x += X;
          y += Y;
          sleep(1);
          w.setPosition(A[0][0] + x, A[0][1] + y);
      };
      w.setPosition(A[1][0], A[1][1]);
  };
  this.OutScreen = () => {
      //算出最短的距离到达屏幕之外。
      var F = this.G(window);
      var x = window.getX(),
          y = window.getY();
      var sx = window.getX() + window.getWidth() / 2,
          sy = window.getY() + window.getHeight() / 2 + 66;
      var cx = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? (sx < this.Width / 2 ? (F[0][0] - window.getWidth()) : (F[1][0] + window.getWidth())) : x,
          cy = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? y : (sy < this.Height / 2 ? (F[0][1] - window.getHeight()) : (F[1][1] + window.getHeight()));
      return [
          [x, y],
          [cx, cy]
      ];
  };
  this.toScreenEdge = (d) => {
      //返回到屏幕边缘的坐标。d为浮点数0.1~1之间。
      d = d || 0;
      var F = this.G(window);
      var x = window.getX(),
          y = window.getY();
      var sw = window.getWidth() * d;
      var sx = window.getX() + window.getWidth() / 2,
          sy = window.getY() + window.getHeight() / 2 + 66;
      var cx = sx < (this.Width - sx) ? -sw : (this.Width + sw - window.getWidth() + 72);
      return [
          [x, y],
          [cx, y]
      ];
  };
  this.centerXY = (F) => {
      //返回距离中心位置的一个方形两个坐标。
      var w = window.getWidth();
      var h = window.getHeight();
      return [
          [F[0] + w / 2, F[1] + h / 2],
          [F[0] - w / 2, F[1] - h / 2]
      ];
  };
  this.IntScreen = () => {
      //当悬浮超出屏幕之外之后进入的坐标。
      var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
      return [
          [window.getX(), window.getY()],
          [A.x, A.y]
      ];
  };
  this.ViewIntScreen = () => {
      //当悬浮超出屏幕之外之后进入的坐标。
      var A = this.windowGXY(window.getX(), window.getY(), this.G(window, windowid));
      return [
          [window.getX(), window.getY()],
          [A.x, A.y]
      ];
  };
  threads.start(new java.lang.Runnable(() => {
      this.windowyidong(this.IntScreen());
  }));
};


var win = floaty.rawWindow(
  <frame>
      <img id="img"w="*"h="*"/>
  </frame>
);
win.setSize(-1, -1);

var win_ = floaty.rawWindow(
  <vertical>
      <button id="but_f" layout_weight="1" text="重指"/>
      <button id="but_q" layout_weight="1" text="清空"/>
      <button id="but_c" layout_weight="1" text="撤销"/>
      <button id="but_l" layout_weight="1" text="录制开启"/>
      <button id="but_p" layout_weight="1" text="运行录制"/>
      <button id="but_s" layout_weight="1" text="生成代码"/>
      <button id="but_b" layout_weight="1" text="保存至文件"/>
      <button id="but_y" layout_weight="1" text="移动"/>
      <button id="but_g" layout_weight="1" text="关闭"/>
  </vertical>
);
var af = new 绘布(win.img);
var ad = new 悬浮控制(win, null, true);
var ad_ = new 悬浮控制(win_, win_.but_y, true);
ad_.setLongClick(exit);

var F = ad.OutScreen();
var F_ = ad_.OutScreen();


/*
ad_.setClick(function() {
  threads.start(function() {
      F_ = ad_.OutScreen();
      ad_.windowyidong(F_);
      ad.windowyidong([F[1], ad.centerXY(ad_.centerXY(F_[0])[0])[1]]);
      ad.windowyidong(ad.IntScreen());
  });
});
*/


var paint = new Paint;
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
paint.setARGB(255, 255, 0, 0);
var textSize = 50;
paint.setTextSize(textSize);


var storage = storages.create("AJ动作录制");

//每次动作。
var MainGesturesAry = storage.get("gestures", new Array); //↓↓↓↓
//一次中的手指动作。
var gesturesAry = new Array; //↓↓↓↓[[0,100,[x1,y1],[x2,y2],[x3,y3],[x4,y4],………],………]
//每个手指的动作。
var TouchPointRecord = new Array; //[[0,1000,[x1,y1],………],………]

var TouchPointStart = new Array; //[[x1,y1],[x2,y2],[x3,y3],[x4,y4],………]
var TouchPointCurrent = new Array; //[[x1,y1],[x2,y2],[x3,y3],[x4,y4],………]

var vrx = 0,
  vry = 0; //屏幕坐标差。

threads.start(function() {
  //console.show();
  sleep(500);
  af.isOK();
  af.Refresh(reDraw);

});


var Ts = 50; //动作精度。越小精度越高。//但实际上没卵用。自动操作函数gestures会自动缩减
var Tss = 400; //动作间隔
var kg = false;
var jishi = 0;
//new android.graphics.RectF

setInterval(() => {
  if (kg) {
      jishi++;
      for (let i = 0; i < TouchPointRecord.length; i++) {
          try{
              let x = Math.floor(TouchPointCurrent[i][0] + vrx);
              let y = Math.floor(TouchPointCurrent[i][1] + vry);
              TouchPointRecord[i].push([x, y]);
              TouchPointRecord[i][1] += Ts;
          }catch(e){
              break;
          };
      };
  };
}, Ts);




win_.but_f.click(function() {
  for (let ii = 0; ii < TouchPointRecord.length; ii++) {
      let x = Math.floor(TouchPointCurrent[ii][0] + vrx);
      let y = Math.floor(TouchPointCurrent[ii][1] + vry);
      gesturesAry.push(TouchPointRecord[ii]);
      TouchPointRecord[ii] = [jishi * Ts, 0, [x, y]]
  };
});

win_.but_q.click(function() {
  MainGesturesAry = new Array;
  af.Refresh(reDraw);
});
win_.but_c.click(function() {
  MainGesturesAry.pop();
  af.Refresh(reDraw);
});
win_.but_l.click(function(v) {
  if (v.getText() == "录制开启") {
      v.setText("录制关闭");
      win.setTouchable(false);
  } else {
      v.setText("录制开启");
      win.setTouchable(true);
  };

});
win_.but_p.click(function(v) {
  threads.start(function() {
      ui.run(() => {
          v.setText("运行中…");
          win.setTouchable(false);
          win_.setTouchable(false);
      });
      sleep(250);
      for (let i = 0; i < MainGesturesAry.length; i++) {
          //log(MainGesturesAry[i]);
          gestures.apply(null, MainGesturesAry[i]);
          sleep(Tss);
      };
      ui.run(() => {
          win_.setTouchable(true);
          if (win_.but_l.getText() == "录制开启") {
              win.setTouchable(true);
          } else {
              win.setTouchable(false);
          };
          v.setText("运行录制");
      });
      toastLog("运行完毕");
  });
});



win_.but_s.click(function() {
  setClip("var gesturesAry=" + JSON.stringify(MainGesturesAry) + ";\nfor(let i=0;i<gesturesAry.length;i++){\n   gestures.apply(null, gesturesAry[i]);\n   sleep(" + Tss + ");\n};\n");
  toast("已复制");
});




win_.but_b.click(function() {
  threads.start(function() {
      var p = dialogs.prompt("保存路径", storage.get("savePath", "/sdcard/脚本/LZ动作.js"));

      if (p) {
          storage.put("savePath", p);

          files.write(p, "var gesturesAry=" + JSON.stringify(MainGesturesAry) + ";\nfor(let i=0;i<gesturesAry.length;i++){\n   gestures.apply(null, gesturesAry[i]);\n   sleep(" + Tss + ");\n};\n");
      };
  });
});

win_.but_g.click(function() {
  exit();
});

events.on("exit", function() {
  storage.put("gestures", MainGesturesAry);

  //files.write(storage.get("savePath", "/sdcard/脚本/LZ动作.js"), "var gesturesAry=" + JSON.stringify(MainGesturesAry) + ";\nfor(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(" + Tss + ");}");
});



function reDraw(canvas) {
  //canvas.drawARGB(255, 127, 127, 127);
  var w = canvas.getWidth();
  var h = canvas.getHeight();
  var AX = w / 2;
  var AY = h / 2;
  paint.setStyle(Paint.Style.STROKE);
  canvas.drawText(String(MainGesturesAry.length + "个动作"), 0, textSize, paint)

  if (TouchPointStart.length) {

      for (let i = 0; i < TouchPointStart.length; i++) {
          try {
              let X = TouchPointStart[i][0];
              let Y = TouchPointStart[i][1];
              let x = TouchPointCurrent[i][0];
              let y = TouchPointCurrent[i][1];
              X = X || 0;
              Y = Y || 0;
              x = x || 0;
              y = y || 0;
              let a = X - (x - X);
              let b = Y - (y - Y);
              //let rect = new android.graphics.RectF(X, Y, x, y);
              //canvas.drawRect(rect, paint);
              //let rect2 = new android.graphics.RectF(X, Y, a, b);
              //canvas.drawRect(rect2, paint);
              //let rect3 = new android.graphics.RectF(x, y, a, b);
              //canvas.drawRect(rect3, paint);
              //canvas.drawLine(X, Y, x, y, paint);
              //canvas.drawLine(X, Y, a, b, paint);
              canvas.drawText(String("A"), X, Y, paint)
              canvas.drawText(String("B"), x, y, paint);
              canvas.drawCircle(X, Y, 10, paint);
              canvas.drawCircle(x, y, 10, paint);
              //canvas.drawCircle(a, b, 10, paint);
          } catch (e) {};
      };
      for (let ii = 0; ii < TouchPointRecord.length; ii++) {
          let ge = TouchPointRecord[ii];
          canvas.drawText(String("▽"), ge[0] / 10 * ii + jishi * Ts / 25, textSize * (ii + 2), paint)
          for (let i = 2; i < ge.length - 1; i++) {

              let X = ge[i][0] - vrx;
              let Y = ge[i][1] - vry;
              let x = ge[i + 1][0] - vrx;
              let y = ge[i + 1][1] - vry;
              X = X || 0;
              Y = Y || 0;
              x = x || 0;
              y = y || 0;
              //let a = X - (x - X);
              //let b = Y - (y - Y);
              //let rect = new android.graphics.RectF(X, Y, x, y);
              //canvas.drawRect(rect, paint);
              //let rect2 = new android.graphics.RectF(X, Y, a, b);
              //canvas.drawRect(rect2, paint);
              //let rect3 = new android.graphics.RectF(x, y, a, b);
              //canvas.drawRect(rect3, paint);
              canvas.drawLine(X, Y, x, y, paint);
              //canvas.drawLine(X, Y, a, b, paint);
              //canvas.drawText(String("A"), X, Y, paint)
              //canvas.drawText(String("B"), x, y, paint);
              //canvas.drawCircle(X, Y, 10, paint);
              //canvas.drawCircle(x, y, 10, paint);
              //canvas.drawCircle(a, b, 10, paint);
          };
      };
  };

};



win.img.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
  try {
      var W = view.getWidth();
      var H = view.getHeight();
      var PC = event.getPointerCount();
      switch (event.getActionMasked()) {
          case event.ACTION_MOVE:
              for (let i = 0; i < PC; i++) {
                  let id = event.getPointerId(i);
                  let X = event.getX(i);
                  let Y = event.getY(i);
                  TouchPointCurrent[i][0] = X;
                  TouchPointCurrent[i][1] = Y;
              };


              break;
          case event.ACTION_CANCEL:
              //log("CANCEL");
              kg = false;
              jishi = 0;
              TouchPointStart = new Array;
              TouchPointCurrent = new Array;
              TouchPointRecord = new Array;

              break;
          case event.ACTION_OUTSIDE:
              //log("OUTSIDE");

              break;
          default:
              var I = Math.floor(event.getAction() / 256);
              var ID = event.getPointerId(I);
              var X = event.getX(I);
              var Y = event.getY(I);
              var RX = event.getRawX();
              var RY = event.getRawY();
              switch (event.getActionMasked()) {
                  case event.ACTION_DOWN:
                      //第一个手指按下。
                      //log("down");
                      vrx = RX - X, vry = RY - Y;
                      kg = true;
                      TouchPointRecord.splice(I, 0, [0, 1, [Math.floor(X + vrx), Math.floor(Y + vry)]]);
                      TouchPointStart.splice(I, 0, [X, Y]);
                      TouchPointCurrent.splice(I, 0, [X, Y]);

                      break;
                  case event.ACTION_UP:
                      //最后一个手指抬起。
                      //log("up");
                      kg = false;
                      jishi = 0;


                      gesturesAry.push(TouchPointRecord[I]);
                      MainGesturesAry.push(gesturesAry);
                      gesturesAry = new Array;


                      TouchPointStart = new Array;
                      TouchPointCurrent = new Array;
                      TouchPointRecord = new Array;

                      threads.start(function() {
                          ui.run(() => {
                              win.setTouchable(false);
                              win_.setTouchable(false);
                          });
                          //log(MainGesturesAry[MainGesturesAry.length - 1]);
                          sleep(250);
                          gestures.apply(null, MainGesturesAry[MainGesturesAry.length - 1]);
                          sleep(250);
                          ui.run(() => {
                              win_.setTouchable(true);
                              if (win_.but_l.getText() == "录制开启") {
                                  win.setTouchable(true);
                              } else {
                                  win.setTouchable(false);
                              };
                          });
                      });

                      break;
                  case event.ACTION_POINTER_DOWN:
                      //log("POINTER_DOWN");
                      TouchPointRecord.splice(I, 0, [jishi * Ts, 1, [Math.floor(X + vrx), Math.floor(Y + vry)]]);
                      TouchPointStart.splice(I, 0, [X, Y]);
                      TouchPointCurrent.splice(I, 0, [X, Y]);


                      break;
                  case event.ACTION_POINTER_UP:
                      //log("POINTER_UP");
                      gesturesAry.push(TouchPointRecord[I]);

                      TouchPointStart.splice(I, 1);
                      TouchPointCurrent.splice(I, 1);
                      TouchPointRecord.splice(I, 1);

                      break;
              };
      };
  } catch (e) {
      log("0: " + e);
  };
  af.Refresh(reDraw);
  return true;
}));


function 反色(color) {
  return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};

function toJavaArray(type, ary) {
  //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
  var Ary = util.java.array(type, ary.length);
  for (let i in ary) {
      Ary[i] = ary[i];
  };
  return Ary;
};

function SolvePos(a, b, r, k, c) {
  let a1 = k * k + 1;
  let b1 = 2 * k * (c - b) - 2 * a;
  let c1 = a * a + (c - b) * (c - b) - r * r;
  let delta = b1 * b1 - 4 * a1 * c1;
  let result = [];
  if (delta == 0) {
      let x0 = Math.sqrt(delta);
      let x1 = -b1 / (2 * a1);
      let y1 = k * x1 + c;
      result.push(x1, y1);
  } else if (delta > 0) {
      let x0 = Math.sqrt(delta);
      let x1 = (-b1 - x0) / (2 * a1);
      let y1 = k * x1 + c;
      result.push(x1, y1);
      let x2 = (-b1 + x0) / (2 * a1);
      let y2 = k * x2 + c;
      result.push(x2, y2);
  }
  return result;
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

function ydfx(obj) {
  var ary = getsd(1, [obj.x, obj.y]);
  var x = ary[0],
      y = ary[1];
  var Y = Math.asin(y) / (2 * Math.PI) * 360;
  if (x < 0) {
      Y = 180 - Y;
  };
  return Y;
};

function getsd(s, ary) {
  var sum = weiyi(ary);
  var S = s / sum;
  for (var i = 0; i < ary.length; i++) {
      ary[i] = ary[i] * S;
  };
  return ary;
};

function XYTOAB(x, y, x1, y1) {
  var A = (y1 - y) / (x1 - x);
  var B = y - A * x;
  return [A, B];
};




/*
int getPointerCount() //手势操作所包含的点的个数
int findPointerIndex(int pointerId) //根据pointerId找到pointer在MotionEvent中的index
int getPointerId(int pointerIndex) //根据MotionEvent中的index返回pointer的唯一标识
float getX(int pointerIndex) //返回手势操作点的x坐标
float getY(int pointerIndex) //返回手势操作点的y坐标
final int getActionMasked () //获取特殊点的action
final int getActionIndex()//  用来获取当前按下／抬起的点的标识。如果当前没有任何点抬起／按下，该函数返回0。比如事件类型为ACTION_MOVE时，该值始终为0。

*/
