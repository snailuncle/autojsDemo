//将悬浮窗中心移动到所要点击的位置。
//然后点击悬浮窗，开始执行点击事件
//点击悬浮窗之后，悬浮窗会移出屏幕之外。点击事件完成后悬浮窗会回位
//长按悬浮窗，停止本桥本。



var 悬浮控制 = function(window, view, ar) {
  this.Orientation = context.resources.configuration.orientation;
  this.Width = this.Orientation == 1 ? device.width : device.height;
  this.Height = this.Orientation == 2 ? device.width : device.height;
  //按下时长超过此值则执行长按等动作
  this.downTime = 500;
  //记录定时执行器的返回id
  this.Timeout = 0;
  this.Click = function() {};
  this.LongClick = function() {};
  this.setClick = (fun) => {
      fun = fun || function() {};
      this.Click = fun;
  };
  this.setLongClick = (fun, ji) => {
      fun = fun || function() {};
      this.LongClick = fun;
      if (parseInt(ji)) {
          this.downTime = parseInt(ji);
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

  if (view) {
      view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
          switch (event.getAction()) {
              case event.ACTION_DOWN:
                  this.Tx = event.getRawX();
                  this.Ty = event.getRawY();
                  this.TX = window.getX();
                  this.TY = window.getY();
                  //创建一个定时器用来定时执行长按操作。
                  this.Timeout = setTimeout(() => {
                      this.LongClick();
                      this.Timeout = 0;
                  }, this.downTime);
                  break;
              case event.ACTION_MOVE:
                  var sx = event.getRawX() - this.Tx;
                  var sy = event.getRawY() - this.Ty;
                  if (!this.Tyidong && this.weiyi(sx, sy) >= 10) {
                      this.Tyidong = true;
                      //移动状态清除定时器
                      if (this.Timeout) {
                          //定时器存在则清除定时器。
                          clearTimeout(this.Timeout);
                          this.Timeout = 0;
                      };
                  };
                  if (this.Tyidong) {
                      window.setPosition(this.TX + sx, this.TY + sy);
                  };
                  break;
              case event.ACTION_UP:
                  if (!this.Tyidong) {
                      //清除定时器。
                      clearTimeout(this.Timeout);
                      this.Timeout = 0;
                      this.Click();
                  };
                  if (this.Tyidong) {
                      this.Tyidong = false;
                  };
                  threads.start(new java.lang.Runnable(() => {}));
                  break;
          };
          return true;
      }));
  };
  this.G = (win) => {
      var K = 35, //悬浮窗的隐形边矩
          H = 66; //手机通知栏的高度
      if (!ar) {
          return [
              [-K, -K],
              [this.Width - win.getWidth() + K, this.Height - win.getHeight() - H + K]
          ];
      } else {
          return [
              [0, H],
              [this.Width - win.getWidth(), this.Height - win.getHeight()]
          ];
      };
  };
  this.weiyi = function() { //平方和开方
      var num = 0;
      for (var i = 0; i < arguments.length; i++) {
          num += arguments[i] * arguments[i];
      };
      return Math.round(Math.sqrt(num) * 1000) / 1000
  };
  this.windowGXY = function(x, y, k) {
      x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
      y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
      return {
          x: x,
          y: y
      };
  };
  this.windowyidong = (A, s, w) => {
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
      d = d || 0;
      var F = this.G(window);
      var x = window.getX(),
          y = window.getY();
      var sw = window.getWidth() * d;
      var sx = window.getX() + window.getWidth() / 2,
          sy = window.getY() + window.getHeight() / 2 + 66;
      var cx = sx < (this.Width - sx) ? -sw : (this.Width + sw - window.getWidth());
      return [
          [x, y],
          [cx, y]
      ];
  };
  this.centerXY = (F) => {
      var w = window.getWidth();
      var h = window.getHeight();
      return [
          [F[0] + w / 2, F[1] + h / 2],
          [F[0] - w / 2, F[1] - h / 2]
      ];
  };
  this.autoIntScreen = () => {
      var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
      threads.start(new java.lang.Runnable(() => {
          this.windowyidong([
              [window.getX(), window.getY()],
              [A.x, A.y]
          ]);
      }));
  };
  this.autoIntScreen();
};

auto();

events.observeKey();
toastLog("音量下键停止此操作");

var window = floaty.rawWindow(
  <frame>
      <button id="but" w="100" h="100" alpha="0.7" text="○" bg="#888888"/>
  </frame>
);

var thread = null,
  F = new Array,
  xy = new Array;

var ad = new 悬浮控制(window, window.but, 1);

events.on("key", function(code, event) {
  if (event.keyCodeToString(code) == "KEYCODE_VOLUME_DOWN") {
      if (event.getAction() == event.ACTION_DOWN) {
          if (thread && thread.isAlive()) {
              threads.start(function() {
                  thread.interrupt();
                  thread = null;
                  toast("已停止点击");
              });
          };
      };
  };
});


ad.setClick(function() {
  threads.start(function() {
      F = ad.OutScreen();
      log(F);
      xy = ad.centerXY(F[0])[0];
      log(xy);
      ad.windowyidong(F);
      if (!thread || !thread.isAlive()) {
          thread = threads.start(function() {
              连点(xy[0], xy[1])
          });
      };
      thread.join();
      sleep(100);
      ad.windowyidong(F.reverse());
  });
});

ad.setLongClick(exit);

function 连点(x, y) {
  toastLog("点");
  while (true) {
      press(x, y, 1);

  };
};
