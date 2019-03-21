/**
 * 功能:  介绍飞行模式开关的两种方式
 * 第一种:  root shell操作
 * 第二种:   打开设置界面,点击飞行模式
 * 额外的:   加一个检查网络状态的函数
 */
function root开关飞行模式() {
  // 第一种 root
  function 打开飞行模式() {
    // 打开飞行模式
    new Shell().exec("su -c 'settings put global airplane_mode_on 1; am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true'")
  }

  function 关闭飞行模式() {
    //关闭飞行模式
    new Shell().exec("su -c 'settings put global airplane_mode_on 0; am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false'")
  }
  打开飞行模式()
  sleep(6000)
  关闭飞行模式()
}

function 点击飞行模式按钮开关飞行模式() {
  var intent = new Intent();
  intent.setAction("android.settings.AIRPLANE_MODE_SETTINGS");
  app.startActivity(intent);
  // 第二种 intent打开飞行模式设置界面,再点击飞行模式按钮
  function 打开飞行模式() {
    // 打开飞行模式
    var r = text('飞行模式').findOne()
    clickView(r)
  }

  function 关闭飞行模式() {
    //关闭飞行模式
    var r = text('飞行模式').findOne()
    clickView(r)
  }

  function clickView(view) {
    log(arguments.callee.name + '开始')
    log(view)
    if (view) {
      var x = view.bounds().centerX()
      var y = view.bounds().centerY()
      log('将要点击的坐标 %s,%s', x, y)
      press(x, y, 1)
    } else {
      throw '传入clickView中的view异常'
    }
    log(arguments.callee.name + '结束')
  }
  打开飞行模式()
  sleep(6000)
  关闭飞行模式()
}


function 网络状态() {
  var intent = new Intent();
  importClass(android.content.BroadcastReceiver);
  importClass(android.content.ContextWrapper);
  importClass(android.content.IntentFilter);
  importClass(android.net.ConnectivityManager);
  var filter = new IntentFilter();
  filter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
  new ContextWrapper(context).registerReceiver(a = new BroadcastReceiver({
    onReceive: function (context, intent) {
      var action = intent.getAction();
      if (action.equals(ConnectivityManager.CONNECTIVITY_ACTION)) {
        var mConnectivityManager = context.getSystemService(context.CONNECTIVITY_SERVICE);
        netInfo = mConnectivityManager.getActiveNetworkInfo();
        if (netInfo != null && netInfo.isAvailable()) {
          /////////////网络连接
          var name = netInfo.getTypeName();
          if (netInfo.getType() == ConnectivityManager.TYPE_WIFI) {
            /////WiFi网络
            toastLog("WiFi网络");
            return "WiFi网络"
          } else if (netInfo.getType() == ConnectivityManager.TYPE_ETHERNET) {
            /////有线网络
            toastLog("有线网络");
            return "有线网络"
          } else if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE) {
            /////////3g网络
            toastLog("3g网络");
            return "3g网络"
          }
        } else {
          ////////网络断开
          toastLog("网络断开");
          return "网络断开"
        }
      }
    }
  }), filter);
}
