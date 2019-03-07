/**
*作者QQ: 1811588980
*完成时间: 2019年1月12日 下午7:39:29
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注:
转换为语音之后。在QQ按住说话界面，点QQ发送。悬浮窗不要遮挡录音按钮
可直接领取语音红包(点开语音红包之后直接点QQ发送。调整好手机音量不要太大，悬浮窗不要遮挡录音按钮)
**/


var 悬浮控制 = function(window, windowid, ar) {
  this.Orientation = context.resources.configuration.orientation;
  this.Width = this.Orientation == 1 ? device.width : device.height;
  this.Height = this.Orientation == 2 ? device.width : device.height;
  this.Click = function() {};
  this.Move=function(){};
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
                      var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
                      threads.start(new java.lang.Runnable(() => {
                          this.windowyidong([
                              [window.getX(), window.getY()],
                              [A.x, A.y]
                          ]);
                      }));
                      this.Tyidong = false;
                  };
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

var ButtonLayout = (function() {
  //继承至ui.Widget
  util.extend(ButtonLayout, ui.Widget);

  function ButtonLayout() {
      ui.Widget.call(this);
      this.defineAttr("text", (view, attr, value, defineSetter) => {
          view._but.setText(value);
      });
      this.defineAttr("sum", (view, attr, value, defineSetter) => {
          view._text.setText(value);
      });
      this.defineAttr("max", (view, attr, value, defineSetter) => {
          view._text1.setText(value);
      });
  }
  ButtonLayout.prototype.render = function() {
      return (
          <horizontal bg="#ffffff" margin="4">
                          <text id="_but" textSize="20sp" textColor="black"/>
                          <text id="_text" textSize="20sp" marginLeft="8"  textColor="black"/>
                          <text id="_text1" w="0" h="0"/>
                      </horizontal>
      );
  }
  ButtonLayout.prototype.onViewCreated = function(view) {
      this.view.on("click", () => {
          var m = parseInt(this.view._text1.getText());
          var s = parseInt(this.view._text.getText());
          s++;
          s = (s > m) ? 0 : s;
          this.view._text.setText(String(s));
      });
  }
  ButtonLayout.prototype.getSum = function() {
      return this.view._text.getText();
  };
  ui.registerWidget("button-layout", ButtonLayout);
  return ButtonLayout;
})();


auto();
setScreenMetrics(1080, 1920);


var window = floaty.window(
  <vertical w="500px" alpha="0.7" bg="#a0ffffff">
      <button id="butY" text="移动"/>
      <input id="input" maxLines="3" text=""/>
      <button-layout id="per" w="*" text="语音(0-5)" sum="1" max="5"/>
      <button-layout id="spd" w="*" text="语速(0-15)" sum="1" max="15"/>
      <button-layout id="pit" w="*" text="音调(0-15)" sum="8" max="15"/>
      <button id="but" text="转换"/>
      <button id="but1" text="播放"/>
      <button id="but2" text="QQ发送"/>
  </vertical>
);

var window_ = floaty.window(
  <button id="but_" w="150px" h="150px" text="▽" alpha="0.7"/>
);

var path = "/sdcard/脚本/文音.mp3";
var 转换线程 = null;
kg = false;
var ad = new 悬浮控制(window, window.butY);
var ad_ = new 悬浮控制(window_, window_.but_);
ad.setLongClick(exit);
ad_.setLongClick(exit);
var F = ad.OutScreen();
var F_ = ad_.OutScreen();

threads.start(function() {
  sleep(100);
  F_ = ad_.OutScreen();
  ad_.windowyidong(F_);
});
ad.setMove(function() {
  window.disableFocus();
  });
ad_.setMove(function() {
  window.disableFocus();
  });

ad.setClick(function() {
  window.disableFocus();
  threads.start(function() {
      F = ad.OutScreen();
      ad.windowyidong(F);
      ad_.windowyidong([F_[1], ad_.centerXY(ad.centerXY(F[0])[0])[1]]);
      ad_.windowyidong(ad_.toScreenEdge(0.2));
  });
});

ad_.setClick(function() {
  window.disableFocus();
  threads.start(function() {
      F_ = ad_.OutScreen();
      ad_.windowyidong(F_);
      ad.windowyidong([F[1], ad.centerXY(ad_.centerXY(F_[0])[0])[1]]);
      ad.autoIntScreen();
  });
});

window.input.on("key", function(keyCode, event) {
  if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
      window.disableFocus();
      event.consumed = true;
  }
});

window.input.on("touch_down", () => {
  window.requestFocus();
  window.input.requestFocus();
});

function getData() {
  var text = String(window.input.getText());
  var per = String(window.per.widget.getSum());
  var spd = String(window.spd.widget.getSum());
  var pit = String(window.pit.widget.getSum());
  per = (0 <= per && per <= 5) ? per : (0 <= per ? 5 : 0);
  spd = (0 <= spd && spd <= 15) ? spd : (0 <= spd ? 15 : 0);
  pit = (0 <= pit && pit <= 15) ? pit : (0 <= pit ? 15 : 0);

  return {
      text: text,
      per: per,
      spt: spd,
      pit: pit
  };
};


window.but.click(function() {
  window.disableFocus();
  if (转换线程 && 转换线程.isAlive()) {
      toast("正在转换");
      return;
  };
  转换线程 = threads.start(function() {
var obj=getData();
      if (!obj.text) {
          toast("不行");
          转换线程 = null;
          return;
      };
      try {
          if (转音(obj.text, path, obj)) {
              kg = true;
              media.playMusic(path);
              toast("OK");
          };
      } catch (e) {
          toastLog(e);
      };
      转换线程 = null;
  });
});

window.but1.click(function() {
  window.disableFocus();
  if (kg) {
      media.playMusic(path);
  } else {
      toast("不行");
  };
});

window.but2.click(function() {
  window.disableFocus();

  threads.start(function() {
      if (textContains("按住说话").boundsInside(400, 1200, 700, 1400).exists()) {
          if (kg) {
              media.playMusic(path);
              media.pauseMusic();
              threads.start(function() {
                  press(540, 1600, media.getMusicDuration() + 500);
              });
              sleep(250);
              media.resumeMusic();
          } else {
              toast("不行");
          };
      } else if (textEndsWith("口令红包").exists() && desc("录音按钮 按住录音").exists()) {
          var text = textMatches(/“[^“”]+”/).findOne().text();
          setClip(text);
          var r = desc("录音按钮 按住录音").findOne().bounds();
          var obj=getData();
          obj.vol=4;
          if (转音(text, path,obj)) {
              media.playMusic(path);
              media.pauseMusic();
              threads.start(function() {
                  press(r.centerX(), r.centerY(), media.getMusicDuration() + 500);
              });
              sleep(250);
              media.resumeMusic();
          };

      } else {
          toast("请进入，按住说话 界面");
      };
  });
});

events.on("exit", function() {
  //files.remove(path);
});




function 转音(text, path, obj) {
  obj = obj || {};

  var API_KEY = "t3V9LBZ8R6dFP6x1FubDe3EY";
  var SECRET_KEY = "nmyiWd8KuHG1y6OncV0kCUOyU8vpra5e";
  try {
      //获取token
      var url_getToken = 'https://aip.baidubce.com/oauth/2.0/token';
      var Token_html = http.post(url_getToken, {
          'grant_type': 'client_credentials', //固定值
          'client_id': API_KEY, //填写你的 APIKey
          'client_secret': SECRET_KEY, //填写你的 SecretKey
      });
  } catch (e) {
      toastLog("未联网");
      return false;
  };
  //log(h.body.json());

  var TOKEN = Token_html.body.json().access_token;

  var ocr_post_url = http.post("http://tsn.baidu.com/text2audio", {
      'lan': "zh",
      'ctp': "1",
      'cuid': "863281030228548",
      'tok': TOKEN,
      'tex': encodeURI(text),
      'spd': obj.spd || 5, //语速0-15 5
      'pit': obj.pit || 5, //音调0-15 5
      'vol': obj.vol || 15, //音量0-15 5
      'per': obj.per || 4, //	发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
      'aue': '3', //	3为mp3格式(默认)； 4为pcm-16k；5为pcm-8k；6为wav（内容同pcm-16k）; 注意aue=4或者6是语音识别要求的格式，但是音频内容不是语音识别要求的自然人发音，所以识别效果会受影响。
  });
  var file = ocr_post_url.body.bytes();

  files.writeBytes(path, file);
  return true;
};

//申请地址 http://ai.baidu.com/tech/speech/tts
//apikey=t3V9LBZ8R6dFP6x1FubDe3EY
//key=nmyiWd8KuHG1y6OncV0kCUOyU8vpra5e
//识别http://vop.baidu.com/server_api
//合成http://tsn.baidu.com/text2audio
