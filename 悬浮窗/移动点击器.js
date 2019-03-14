var 点击间隔时间=100
//定义悬浮窗控制模块，命名为(悬块)。
function 悬块(window, view) {
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
  this.Click = function () {};
  this.LongClick = function () {};
  //可修改点击长按事件
  this.setClick = function (fun) {
    //判断参数类型是否为函数？
    if (typeof fun == "function") {
      this.Click = fun;
    };
  };
  this.setLongClick = function (fun, ji) {
    //判断参数类型是否为函数？
    if (typeof fun == "function") {
      this.LongClick = fun;
      //判断参数是否可为设置数字？
      if (parseInt(ji) <= 1000) {
        this.downTime = parseInt(ji);
      };
    };
  };
  var that = this
  view.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
      case event.ACTION_DOWN:
        x = event.getRawX();
        y = event.getRawY();
        windowX = window.getX();
        windowY = window.getY();
        return true;
      case event.ACTION_MOVE:
        //移动手指时调整悬浮窗位置
        window.setPosition(windowX + (event.getRawX() - x),
          windowY + (event.getRawY() - y));
        return true;
      case event.ACTION_UP:
        //手指弹起时如果偏移很小则判断为点击
        if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
          log('点了点了点了')
          that.Click();
        }
        return true;
    }
    return true;
  });
};
//创建并生成一个悬浮窗。
var window = floaty.rawWindow(
  <vertical  bg="#00ffff00" layout_width="wrap_content" layout_height="wrap_content" >
    <button id="action" textSize="26" textColor="#66ffffff" style="Widget/AppCompat.Button.Borderless" text='开始' textStyle='bold' layout_gravity="right" layout_width="wrap_content" layout_height="wrap_content" gravity='center'  background='#3300ff00'/>
    <text id="准星" bg='#000000ff' textSize="30" textStyle="bold" textColor='#ff0000' text="↓" gravity='center' ></text>
  </vertical>
);
window.setPosition(device.width / 3, device.height / 5)
window.setTouchable(true);
//输出提示信息。
toastLog("长按悬浮窗关闭本脚本");
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => {}, 500);
//声明一个变量用来控制线程。
var thread = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var ad = new 悬块(window, window.action);
//设置长按事件。
ad.setLongClick(function () {
  //输出气泡信息。
  toast("脚本已关闭");
  //脚本停止代码。
  exit();
});
//设置点击事件。
ad.setClick(function () {
  //输出气泡信息。
  toast("点击");
  //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
  if (thread ? !thread.isAlive() : true) { //线程没有运行。
    log('线程不活着')
    ui.run(() => {
      //在ui线程中修改按钮的文字
      window.action.setText("停止");
    });
    //新建一个线程，赋值给变量thread
    thread = threads.start(function () {
      try {
        Main();
      } catch (e) {
        toastLog(e);
      };
      //运行完毕修改按钮文字
      ui.run(() => {
        //在ui线程中修改按钮的文字
        window.action.setText("开始");
      });
    });
  } else {
    log('线程要中断了')
    thread.interrupt();
    //中断线程;
    ui.run(() => {
      //在ui线程中修改按钮的文字
      window.action.setText("开始");
    });
  };
});

function Main() {
  //这里是主要运行的内容
  //获取箭头最下方的坐标,点击
  var x, y;
  var view = window
  log(view)
  // var p = /[0-9]/; var b = p.test(string);//true,说明有数字
  // for(var k in view){
  //   var v=view[k]
  //     var p = /[0-9]/; var b = p.test(v);//true,说明有数字
  //   if(b){
  //     log(k+'='+view[k])
  //   }
  // }
  log("view.x=%s", view.x)
  log("view.y=%s", view.y)
  log("view.width=%s", view.width)
  log("view.height=%s", view.height)
  //箭头最下面的坐标
  while (1) {
    x = view.x + view.width / 2
    y = view.y + view.height
    sleep(点击间隔时间)
    press(x, y + 10, 1)
  }
};
