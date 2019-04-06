/**
 * 作者:  大柒
 * QQ:  531310591
 * 功能:  Auto.js悬浮按钮样例(补间动画)
 * 备注:
 *    补间动画指的是做flash动画时，在两个关键帧中间需要做“补间动画”
 * 才能实现图画的运动；插入补间动画后两个关键帧之间的插补帧是由计算机自动运算而得到的。
 * 也就是说在使用补间动画时，我们开发者指定了动画开始、结束的关键帧
 * 中间的变化是计算机自动帮助我们补齐的。
 */

importClass(java.lang.Runnable);
importClass(android.animation.ObjectAnimator)
importClass(android.animation.PropertyValuesHolder)
importClass(android.animation.ValueAnimator)
importClass(android.animation.AnimatorSet)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.TranslateAnimation)
importClass(android.animation.ObjectAnimator)
importClass(android.animation.TimeInterpolator)
importClass(android.os.Bundle)
importClass(android.view.View)
importClass(android.view.Window)
importClass(android.view.WindowManager)
importClass(android.view.animation.AccelerateDecelerateInterpolator)
importClass(android.view.animation.AccelerateInterpolator)
importClass(android.view.animation.AnticipateInterpolator)
importClass(android.view.animation.AnticipateOvershootInterpolator)
importClass(android.view.animation.BounceInterpolator)
importClass(android.view.animation.CycleInterpolator)
importClass(android.view.animation.DecelerateInterpolator)
importClass(android.view.animation.LinearInterpolator)
importClass(android.view.animation.OvershootInterpolator)
importClass(android.view.animation.PathInterpolator)
importClass(android.widget.Button)
importClass(android.widget.ImageView)
importClass(android.widget.TextView)

var logo_switch = false;//全局: 悬浮窗的开启关闭检测
var logo_buys = false;//全局: 开启和关闭时占用状态 防止多次点击触发
var logo_ms = 200//全局:  动画播放时间
var win = floaty.rawWindow(
  <frame >//子菜单悬浮窗
    <frame id="id_logo" w="150" h="210" alpha="0" >
      <frame id="id_0" w="44" h="44" margin="33 0 0 0" alpha="1">
        <img w="44" h="44" src="#009687" circle="true" />
        <img w="28" h="28" src="@drawable/ic_perm_identity_black_48dp" tint="#ffffff" gravity="center" layout_gravity="center" />
        <img id="id_0_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
      </frame>
      <frame id="id_1" w="44" h="44" margin="86 28 0 0" alpha="1">
        <img w="44" h="44" src="#ee534f" circle="true" />
        <img w="28" h="28" src="@drawable/ic_assignment_black_48dp" tint="#ffffff" gravity="center" layout_gravity="center" />
        <img id="id_1_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
      </frame>
      <frame id="id_2" w="44" h="44" margin="0 83 0 0" alpha="1" gravity="right" layout_gravity="right">
        <img w="44" h="44" src="#40a5f3" circle="true" />
        <img w="28" h="28" src="@drawable/ic_play_arrow_black_48dp" tint="#ffffff" margin="8" />
        <img id="id_2_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
      </frame>
      <frame id="id_3" w="44" h="44" margin="86 0 0 28" alpha="1" gravity="bottom" layout_gravity="bottom">
        <img w="44" h="44" src="#fbd834" circle="true" />
        <img w="28" h="28" src="@drawable/ic_clear_black_48dp" tint="#ffffff" margin="8" />
        <img id="id_3_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
      </frame>
      <frame id="id_4" w="44" h="44" margin="33 0 0 0" alpha="1" gravity="bottom" layout_gravity="bottom">
        <img w="44" h="44" src="#bfc1c0" circle="true" />
        <img w="28" h="28" src="@drawable/ic_settings_black_48dp" tint="#ffffff" margin="8" />
        <img id="id_4_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
      </frame>
    </frame>
    <frame id="logo" w="44" h="44" marginTop="83" alpha="1" >
    </frame>
  </frame>
)
win.setTouchable(false);//设置子菜单不接收触摸消息
var win_1 = floaty.rawWindow(
  <frame id="logo" w="44" h="44" alpha="0.4" >//悬浮按钮
    <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
    <img id="img_logo" w="32" h="32" src="{{org.autojs.autojs.R.drawable.autojs_material}}" gravity="center" layout_gravity="center" />
    <img id="logo_click" w="*" h="*" src="#ffffff" alpha="0" />
  </frame>
)
win_1.setPosition(-30, device.height / 2)
var win_2 = floaty.rawWindow(
  <frame id="logo" w="{{device.width}}px" h="44" alpha="0" >//悬浮按钮 弹性替身
    <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
    <img id="img_logo" w="32" h="32" src="{{org.autojs.autojs.R.drawable.autojs_material}}" margin="6 6" />
  </frame>
)
win_2.setTouchable(false);//设置弹性替身不接收触摸消息


var XY = [], TT = [], img_dp = {}, dpZ = 0
events.broadcast.on("悬浮开关", function (X) {
  ui.run(function () {
    switch (X) {
      case true:
        win.id_logo.setVisibility(0)
        win.setTouchable(true);
        logo_switch = true
        break;
      case false:
        win.id_logo.setVisibility(4)
        win.setTouchable(false);
        logo_switch = false
    }
  })

});
events.broadcast.on("悬浮显示", function (X) {
  ui.run(function () {
    win_1.setPosition(0 - img_dp.w, G_Y)
    win_2.logo.attr("alpha", "0")
    win_1.logo.attr("alpha", "0.4");
  })
})

var terid = setInterval(() => {
  if (TT.length == 0 && win.logo.getY() > 0) {// 不知道界面初始化的事件  只能放到这里将就下了
    ui.run(function () {
    TT = [win.logo.getX(), win.logo.getY()], anX = [], anY = []// 获取logo 绝对坐标
    XY[0] = [win.id_0, TT[0] - win.id_0.getX(), TT[1] - win.id_0.getY()]//  获取子菜单 视图和子菜单与logo绝对坐标差值
    XY[1] = [win.id_1, TT[0] - win.id_1.getX(), TT[1] - win.id_1.getY()]
    XY[2] = [win.id_2, TT[0] - win.id_2.getX(), 0]
    XY[3] = [win.id_3, TT[0] - win.id_3.getX(), TT[1] - win.id_3.getY()]
    XY[4] = [win.id_4, TT[0] - win.id_4.getX(), TT[1] - win.id_4.getY()]
    log("上下Y值差值:" + XY[0][2] + "DP值:" + (XY[0][2] / 83))
    dpZ = XY[0][2] / 83
    img_dp.h_b = XY[0][2]//两个悬浮窗Y差值
    img_dp.w = parseInt(dpZ * 9)//计算logo隐藏时 X值
    win_1.setPosition(0 - img_dp.w, device.height / 2)
    win.id_logo.setVisibility(4)
    win.id_logo.attr("alpha", "1")
    })
    clearInterval(terid)
  }
}, 100)
setInterval(() => {
}, 1000)


function img_down() {
  win_1.logo.attr("alpha", "0.4")
  logo_switch = false
  动画()
}
win.id_0_click.on("click", () => {
  toastLog("个人中心")
  img_down()
})

win.id_1_click.on("click", () => {
  toastLog("日志")
  img_down()
})

win.id_2_click.on("click", () => {
  toastLog("启动脚本")
  img_down()
})

win.id_3_click.on("click", () => {
  toastLog("结束脚本")
  img_down()
})

win.id_4_click.on("click", () => {
  toastLog("设置菜单")
  img_down()
})



function 动画() {
  var anX = [], anY = [], slX = [], slY = []
  if (logo_switch) {
    for (let i = 0; i < XY.length; i++) {
      anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", parseInt(XY[i][1]), 0);
      anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", parseInt(XY[i][2]), 0);
      slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 0, 1)
      slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 0, 1)
    }
  } else {
    for (let i = 0; i < XY.length; i++) {
      anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", 0, parseInt(XY[i][1]));
      anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", 0, parseInt(XY[i][2]));
      slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 1, 0)
      slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 1, 0)
    }
  }
  set = new AnimatorSet();
  set.playTogether(
    anX[0], anX[1], anX[2], anX[3], anX[4],
    anY[0], anY[1], anY[2], anY[3], anY[4],
    slX[0], slX[1], slX[2], slX[3], slX[4],
    slY[0], slY[1], slY[2], slY[3], slY[4]);
  set.setDuration(logo_ms);
  //set.setFillAfter(true)
  threads.start(function () {//动画的结束事件一直没有明白 只能拿线程代替了
    logo_buys = true
    if (logo_switch) {

      log("开启")
      events.broadcast.emit("悬浮开关", true)
      sleep(logo_ms)

    } else {
      log("关闭")
      sleep(logo_ms + 100)
      events.broadcast.emit("悬浮开关", false)
    }
    logo_buys = false
  });
  set.start();
}

//记录按键被按下时的触摸坐标
var x = 0,
  y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY; G_Y = 0
//记录按键被按下的时间以便判断长按等动作
var downTime; yd = false;
win_1.logo.setOnTouchListener(function (view, event) {
  switch (event.getAction()) {
    case event.ACTION_DOWN:
      x = event.getRawX();
      y = event.getRawY();
      windowX = win_1.getX();
      windowY = win_1.getY();
      downTime = new Date().getTime();
      return true;
    case event.ACTION_MOVE:
      if (logo_switch) { return true; }
      if (!yd) {//如果移动的距离大于h值 则判断为移动 yd为真
        if (Math.abs(event.getRawY() - y) > 30 || Math.abs(event.getRawX() - x) > 30) { win_1.logo.attr("alpha", "1"); yd = true }
      } else {//移动手指时调整两个悬浮窗位置
        win_1.setPosition(windowX + (event.getRawX() - x),//悬浮按钮定位
          windowY + (event.getRawY() - y));
        win_2.setPosition(0, windowY + (event.getRawY() - y));//弹性 替身定位(隐藏看不到的,松开手指才会出现)
      }
      return true;
    case event.ACTION_UP:                //手指弹起
      //触摸时间小于 200毫秒 并且移动距离小于30 则判断为 点击
      if (Math.abs(event.getRawY() - y) < 30 && Math.abs(event.getRawX() - x) < 30) {
        //toastLog("点击弹起")
        if (logo_buys) { return }// logo_buys为真表示动画正在播放中 无操作
        if (logo_switch) {
          logo_switch = false
          win_1.logo.attr("alpha", "0.4")
        } else {
          win.setPosition(windowX + (event.getRawX() - x),
            windowY + (event.getRawY() - y) - img_dp.h_b);
          win.id_logo.setVisibility(0)
          logo_switch = true
          win_1.logo.attr("alpha", "0.9")
        }
        动画()
      } else if (!logo_switch) {
        //toastLog("移动弹起")
        G_Y = windowY + (event.getRawY() - y)
        win_1.logo.attr("alpha", "0.4")
        animator = ObjectAnimator.ofFloat(win_2.logo, "translationX", windowX + (event.getRawX() - x), 0 - img_dp.w);
        mTimeInterpolator = new BounceInterpolator();
        animator.setInterpolator(mTimeInterpolator);
        animator.setDuration(300);
        win_2.logo.attr("alpha", "0.4")
        win_1.logo.attr("alpha", "0");
        animator.start();
        threads.start(function () {//动画的结束事件一直没有明白 只能拿线程代替了
          logo_buys = true
          sleep(logo_ms + 100)
          events.broadcast.emit("悬浮显示", 0)
          logo_buys = false
        });
      }
      yd = false
      return true;
  }
  return true;
});



function 发送通知() {

  var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
  var notification; a1 = 0
  log(device.sdkInt)
  if (device.sdkInt >= 26) {
    toastLog("第一项")
    var channel = new android.app.NotificationChannel("channel_id", "channel_name", android.app.NotificationManager.IMPORTANCE_DEFAULT);
    channel.enableLights(true);
    channel.setLightColor(0xff0000);
    channel.setShowBadge(false);
    manager.createNotificationChannel(channel);
    notification = new android.app.Notification.Builder(context, "channel_id")
      .setContentTitle("通知栏标题" + new date())
      .setContentText("这是消息的内容")
      .setWhen(new Date().getTime())
      .setSmallIcon(org.autojs.autojs.R.drawable.autojs_material)



      .setTicker("这是状态栏显示的内容")
      .build();
  } else {
    /**
     * 5.0以上才可以使用横幅通知 9.0测试无效不知为何
     */
    notification = new android.app.Notification.Builder(context)
      //.setVisibility(android.app.Notification.VISIBILITY_PRIVATE)
      .setPriority(android.app.Notification.PRIORITY_MAX)//设置通知优先级为MAX  MAX或者hige 都可以显示横幅通知
      .setDefaults(android.app.Notification.DEFAULT_ALL)//使用系统默认配置 声音和震动
      //.setVibrate( [0 , 50 , 100 , 150])//设置自定义震动 延迟0ms 震动50ms 在延迟100ms 震动150ms
      .setContentTitle("横幅通知")//横幅通知标题
      .setContentText("测试消息") //横幅通知内容
      .setAutoCancel(true)//点击后就关闭 不知为何 无法生效
      .setSmallIcon(org.autojs.autojs.R.drawable.autojs_material)//通知图标
    //.setActivateStatusBar(false)//默认 true ,设置 false 表示只显示 横幅通知 ,而不会发送到通知栏上.
    //var pIntent=android.app.PendingIntent.getActivity(context, 1, new Intent(), 0)
    //.setfullscreenintent(context, false)

    //.setContentIntent(intent)//点击动作不会玩 需要定义一个 new intent


  }
  var n = notification.build();
  manager.notify(2, n);
}
