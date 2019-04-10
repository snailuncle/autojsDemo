

/**
 * 整理者: 家
 * QQ:   203118908
 * 日期:  20190224
 * 妈呀:  整理了一宿,现在是早上6:34
 * 功能: 把某些常用的函数集中起来,方便调用
 * 函数来源: 都是群里的大佬写的,稻草人,+攀登,Ai,破晓的星辰,灶猫,家,浩然,白酒煮饭,生僻字大佬,内个谁,Xero,无名小姐,壞蛋┭,锦瑟安年Ω,专业滥竽充数,膜拜以上几位大神,不管你们同意不同意,我都把你们的代码搬到一块了,O(∩_∩)O哈哈~
 * git:  https://github.com/snailuncle/autojsCommonFunctions/blob/master/autojsCommonFunctions.js
 */

//  //导入模块
//  function 导入常用函数模块(){
//   var url='https://raw.githubusercontent.com/snailuncle/autojsCommonFunctions/master/autojsCommonFunctions.js'
//   var r = http.get(url)
//   log("code = " + r.statusCode);
//   var html=r.body.bytes()
//   files.writeBytes('./autojsCommonFunctions.js',html)
//   var common=require('./autojsCommonFunctions.js')
//   return common
// }
// var common=导入常用函数模块()
// log(common)
// for(let i=0;i<33;i++){
//   common.闪光弹('fire in the hole')
// }




[
  '点击控件',
  '铃声',
  '启动app',
  '停止app',
  '卸载app',
  '卸载app没root',
  '清除app数据',
  '启动最新安装的app',
  '停止最新安装的app',
  '卸载最新安装的app',
  '清除最新安装的app数据',
  '静默安装app',
  '获取app图标',
  '控制app联网',
  '获取手机上所有的app名字',
  '点击输入框弹出输入法',
  '使所有输入框点击时都能弹出输入法',
  '失去焦点',
  '是否root',
  '获取指定应用的版本号',
  '打开qq群名片',
  '打开qq名片',
  'qq强制聊天',
  '字节变为gbk中文',
  '最新安装的app',
  '文件修改时间',
  '文件大小',
  '字符串变字节',
  '日期加N天',
  'md5',
  '是横屏还是竖屏',
  '截图',
  '随机字符',
  '获取时间',
  '调整手机音量',
  '微信扫一扫',
  '公共字符串',
  '网络',
  '安卓intent源码',
  '获取手机ip地理位置',
  '替换系统文件',
  '编辑距离',
  '数组交集',
  '提取包含关键字的app',
  '获取页面所有文字',
  '悬浮控制',
  '闪光弹',
  '打开开发者选项',
  '气泡',
  '随机字符串',
  'wifi状态',
  '开关飞行模式',
  '上滑',
  '获取deflate网页内容',
  '获取gzip网页内容'
  ]





  var common = {}
  Array.prototype.intersect = function () {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        var str = arguments[i][j];
        if (!obj[str]) {
          obj[str] = 1;
        } else {
          obj[str]++;
          if (obj[str] == arguments.length) {
            result.push(str);
          }
        } //end else
      } //end for j
    } //end for i
    return result;
  }
  //集合去掉重复
  Array.prototype.uniquelize = function () {
    var tmp = {},
      ret = [];
    for (var i = 0, j = this.length; i < j; i++) {
      if (!tmp[this[i]]) {
        tmp[this[i]] = 1;
        ret.push(this[i]);
      }
    }
    return ret;
  }
  //并集
  Array.prototype.union = function () {
    var arr = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        var str = arguments[i][j];
        if (!obj[str]) {
          obj[str] = 1;
          arr.push(str);
        }
      } //end for j
    } //end for i
    return arr;
  }
  //2个集合的差集 在arr不存在
  Array.prototype.minus = function (arr) {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = 1;
    }
    for (var j = 0; j < this.length; j++) {
      if (!obj[this[j]]) {
        obj[this[j]] = 1;
        result.push(this[j]);
      }
    }
    return result;
  };
  // console.log(Array.intersect(["1", "2", "3"], ["2", "3", "4", "5", "6"])); //[2,3]
  // console.log([1, 2, 3, 2, 3, 4, 5, 6].uniquelize()); //[1,2,3,4,5,6]
  // console.log(Array.union(["1", "2", "3"], ["2", "3", "4", "5", "6"], ["5", "6", "7", "8", "9"]))
  // console.log(["2", "3", "4", "5", "6"].minus(["1", "2", "3"]));

  common.点击控件 = function (view) {
    log(arguments.callee.name + '开始')
    log(view)
    if (view) {
      var x = view.bounds().centerX()
      var y = view.bounds().centerY()
      log('将要点击的坐标 %s,%s', x, y)
      press(x, y, 1)
    } else {
      throw '传入点击控件中的view异常'
    }
    log(arguments.callee.name + '结束')
  }
  common.铃声 = function (铃声类型, 是否循环播放, 播放时长) {
    var 铃声类型 = 铃声类型 || 0
    var 播放时长 = 播放时长 || 6000
    var 是否循环播放 = 是否循环播放 || false
    if (是否循环播放) {
      播放时长 = 666 * 1000
    }
    var 铃声选择结果 = android.media.RingtoneManager.TYPE_NOTIFICATION
    switch (铃声类型) {
      case 0:
        铃声选择结果 = android.media.RingtoneManager.TYPE_RINGTONE
        break;
      case 1:
        铃声选择结果 = android.media.RingtoneManager.TYPE_ALARM
        break;
      case 2:
        铃声选择结果 = android.media.RingtoneManager.TYPE_ALL
        break;
      default:
        break;
    }
    var mp = new android.media.MediaPlayer();
    mp.setDataSource(context, android.media.RingtoneManager.getDefaultUri(铃声选择结果));
    if (是否循环播放) mp.setLooping(true);
    mp.prepare();
    mp.start();
    threads.start(function () {
      sleep(播放时长)
      if (mp.isPlaying()) {
        mp.stop()
      }
    });
    return mp;
  }

  common.启动app = function (appName) {
    launchApp(appName)
  }

  common.停止app = function (appName) {
    var packageName=getPackageName(appName);
    shell('am force-stop ' + packageName,true);

  }
  common.卸载app = function (appName) {
    var packageName=getPackageName(appName);
    shell("pm uninstall "+packageName,true)
  }

  common.清除app数据 = function (appName) {
    var packageName=getPackageName(appName);
    shell('pm clear ' + packageName,true);
  }


  common.卸载最新安装的app=function (){
    var pm = context.getPackageManager()
    var appList=pm.getInstalledApplications(0)
    var appInfoList=[]
    for(let i=0;i<appList.size();i++){
      var app=appList.get(i)
      var appInfo={
        appName:app.loadLabel(pm),
        packageName:app.packageName,
        isSystemApp:app.isSystemApp(),
        firstInstallTime:pm.getPackageInfo(app.packageName,0).firstInstallTime
      }
      appInfoList.push(appInfo)

    }
    appInfoList.sort((a,b)=>{
      return b.firstInstallTime-a.firstInstallTime
    })
    log('最新安装的app是=%j',appInfoList[0])

    var packageName=appInfoList[0].packageName
    shell("pm uninstall "+packageName,true)
    return appInfoList[0].appName
  }
  common.清除最新安装的app数据=function (){
    var pm = context.getPackageManager()
    var appList=pm.getInstalledApplications(0)
    var appInfoList=[]
    for(let i=0;i<appList.size();i++){
      var app=appList.get(i)
      var appInfo={
        appName:app.loadLabel(pm),
        packageName:app.packageName,
        isSystemApp:app.isSystemApp(),
        firstInstallTime:pm.getPackageInfo(app.packageName,0).firstInstallTime
      }
      appInfoList.push(appInfo)

    }
    appInfoList.sort((a,b)=>{
      return b.firstInstallTime-a.firstInstallTime
    })
    log('最新安装的app是=%j',appInfoList[0])

    var packageName=appInfoList[0].packageName
    shell('pm clear ' + packageName,true);
    return appInfoList[0].appName
  }
  common.停止最新安装的app=function (){
    var pm = context.getPackageManager()
    var appList=pm.getInstalledApplications(0)
    var appInfoList=[]
    for(let i=0;i<appList.size();i++){
      var app=appList.get(i)
      var appInfo={
        appName:app.loadLabel(pm),
        packageName:app.packageName,
        isSystemApp:app.isSystemApp(),
        firstInstallTime:pm.getPackageInfo(app.packageName,0).firstInstallTime
      }
      appInfoList.push(appInfo)

    }
    appInfoList.sort((a,b)=>{
      return b.firstInstallTime-a.firstInstallTime
    })
    log('最新安装的app是=%j',appInfoList[0])




    var packageName=appInfoList[0].packageName
    shell('am force-stop ' + packageName,true);
    return appInfoList[0].appName
  }

  common.启动最新安装的app=function (){
    var pm = context.getPackageManager()
    var appList=pm.getInstalledApplications(0)
    var appInfoList=[]
    for(let i=0;i<appList.size();i++){
      var app=appList.get(i)
      var appInfo={
        appName:app.loadLabel(pm),
        packageName:app.packageName,
        isSystemApp:app.isSystemApp(),
        firstInstallTime:pm.getPackageInfo(app.packageName,0).firstInstallTime
      }
      appInfoList.push(appInfo)

    }
    appInfoList.sort((a,b)=>{
      return b.firstInstallTime-a.firstInstallTime
    })
    log('最新安装的app是=%j',appInfoList[0])




    var packageName=appInfoList[0].packageName
    launch(packageName)
    return appInfoList[0].appName
  }

  common.点击输入框弹出输入法=function (window,view){
    view.on(
      "touch_down", function () {
        window.requestFocus();
        view.requestFocus();
      }
    )
    view.on(
      "key", function (keyCode,event) {
        if(event.getAction()==event.ACTION_DOWN && keyCode == keys.back){
          window.disableFocus()
          event.consumed=true
        }
        window.requestFocus();
        view.requestFocus();
      }
    )

  }


  common.使所有输入框点击时都能弹出输入法=function (window,inputBoxViewArr){
    for(let i=0;i<inputBoxViewArr.length;i++){
      var view=inputBoxViewArr[i]
      common.点击输入框弹出输入法(window,view)
    }
  }



  common.失去焦点=function (window){
    window.disableFocus()
  }





  common.是否root=function(){
    var r=shell("ls /system/bin",true).result.toString()
    if(r.length>50){
      return true
    }else{
      return false
    }
  }
  common.获取指定应用的版本号 = function (appName) {
    /**
     * 获取指定应用的版本号
     * @param {string} packageName 应用包名
     */
    function getPackageVersion(packageName) {
      importPackage(android.content);
      var pckMan = context.getPackageManager();
      var packageInfo = pckMan.getPackageInfo(packageName, 0);
      return packageInfo.versionName;
    }
    var packageName = getPackageName(appName);
    return getPackageVersion(packageName)
  }


  common.打开qq群名片=function (qq群号){
    app.startActivity({
       action: "android.intent.action.VIEW",
       data:"mqqapi://card/show_pslcard?card_type=group&uin="+qq群号,
       packageName: "com.tencent.mobileqq",
    });//打开qq群名片


  }



  common.打开qq名片=function (qq号){
    app.startActivity({
       action: "android.intent.action.VIEW",
       data:"mqqapi://card/show_pslcard?uin="+qq号,
       packageName: "com.tencent.mobileqq",
    });//打开qq名片


  }

  common.qq强制聊天=function (qq号){
    app.startActivity({
       action: "android.intent.action.VIEW",
       data:"mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin="+qq号,
       packageName: "com.tencent.mobileqq",
    });//qq强制聊天

  }

  common.字节变为gbk中文 = function (bytesContent) {
    var str = new java.lang.String(bytesContent, "gbk")
    return str
  }
  common.最新安装的app = function () {

    var pm = context.getPackageManager()
    var appList=pm.getInstalledApplications(0)
    var appInfoList=[]
    for(let i=0;i<appList.size();i++){
      var app=appList.get(i)
      var appInfo={
        appName:app.loadLabel(pm),
        packageName:app.packageName,
        isSystemApp:app.isSystemApp(),
        firstInstallTime:pm.getPackageInfo(app.packageName,0).firstInstallTime
      }
      appInfoList.push(appInfo)
    }
    appInfoList.sort((a,b)=>{
      return b.firstInstallTime-a.firstInstallTime
    })
    log('最新安装的app是=%j',appInfoList[0])
    return appInfoList[0]


  }
  common.文件修改时间 = function (path) {
    var time=new java.io.File(files.path(path)).lastModified();
    return  time
  }
  common.文件大小 = function (path) {
    var size = new java.io.File(path).length()
    return size
  }
  common.字符串变字节 = function (string) {
    return new java.lang.String(string).getBytes();
  }
  common.日期加N天 = function (n) {
    var now = new Date();
    now.setDate(now.getDate()+n);
    return (now);
  }
  common.md5 = function (string) {
    return java.math.BigInteger(1,java.security.MessageDigest.getInstance("MD5")
    .digest(java.lang.String(string).getBytes())).toString(16);
  }
  common.是横屏还是竖屏 = function () {
    var a = (context.resources.configuration.orientation);
    if (a === 1) {
      toastLog("这是竖屏!!");
      return '竖屏'
    }

    else {
      toastLog("这是横屏!!");}
      return '横屏'

  }
  common.截图 = function (path) {
    var path=path || '/sdcard/1temp.png'

    var dd = shell("screencap -p "+path,true)
    var img
    if(dd.code ==0){
        img = images.read(path)
    }else{
        log("错误信息:")
        log(dd.error)
    }
    return img


  }
  common.随机字符=function (n){
    var n= n || 8
    var str="";
    for(var i=0;i<n;i++){
    str+=String.fromCharCode(random(0,65535));
    }
    return str;
    }

  common.获取时间=function (time) {
    if (time) {
        return new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(time));
    } else {
        return new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
    }
  }

  common.调整手机音量=function (){

    var am = context.getSystemService(context.AUDIO_SERVICE)
    // STREAM_MUSIC这个自己试试,是调整那种音量,范围0-6  自己试试,我也不知道
    var STREAM_MUSIC = 1
    // 1 增大音量   -1  降低音量  0 不变
    var ADJUST_RAISE = -1
    //  1 显示调整音量界面   0  不显示界面
    var FLAG_SHOW_UI = 1
    am.adjustStreamVolume(STREAM_MUSIC, ADJUST_RAISE, FLAG_SHOW_UI)


    //获取最大音量
    var max = am.getStreamMaxVolume(STREAM_MUSIC);
    log(max)
    //获取当前音量
    toastLog('最大音量'+max)
    sleep(2000)
    var current = am.getStreamVolume(STREAM_MUSIC);
    log(current)
    toastLog('当前音量'+current)

  }

  common.微信扫一扫=function (){
    context.startActivity(app.intent({
      action: "VIEW",
      className:"com.tencent.mm.ui.LauncherUI",
      packageName:"com.tencent.mm",
      extras: {
          "LauncherUI.From.Scaner.Shortcut": true
      }
    }).setFlags(335544320));
  }
  common.公共字符串=function (str1,str2){
    // var str1 = "aaabbba"
    // var str2 = " bbbcaaa"

    function find(str1, str2) {
        //创建存放重复内容的数组
        var all = new Array();
        //字符串转字符数组
        var str_1 = str1.split("");
        var str_2 = str2.split("");
        for (var i = 0; i < str_1.length; i++) {
            for (var l = 0; l < str_2.length; l++) {
                //判断是否重复
                var lo = all.length;
                all[lo] = "";
                //判断之后的字符串是否相同
                for (var k = 0; str_1[i + k] == str_2[l + k]; k++) {
                    all[lo] = all[lo] + str_1[i + k];
                    //防止数组越界，提前停止循环
                    if (i + k == str_1.length-1||i+k==str_2.length-1) {
                        break;
                    }
                }
            }
        }

        var most = 0;
        var fu = new Array();
        for (var j = 0; j < all.length; j++) {
            //去除空的内容
            if (all[j] != "") {
                //按照大小排序(删除部分小的)
                if (all[j].split("").length >= most) {
                    most = all[j].split("").length;
                    fu[fu.length] = all[j];
                }
            }
        }

        //将不重复内容写到新数组
        var wu=new Array();
        for(var i=0;i<fu.length;i++){
            var c=false;
            for(var l=0;l<wu.length;l++){
                if(fu[i]==wu[l]){
                    c=true;
                }
            }
            if(!c){
                wu[wu.length]=fu[i];
            }
        }

        //将最长的内容写到新数组
        var ml=new Array();
        //获得最后一个字符串的长度(最长)
        var longest=wu[wu.length-1].split("").length;
        //长度等于最长的内容放到新数组
        for(var i=wu.length-1;i>=0;i--){
            if(wu[i].split("").length==longest){
                ml[ml.length]=wu[i];
            }else{
                //提前结束循环
                break;
            }
        }

        return ml
    }
    var result=find(str1, str2)
    log(result)
    return result
  }

  common.网络=function (){
    var intent = new Intent();
    importClass(android.content.BroadcastReceiver);
    importClass(android.content.ContextWrapper);
    importClass(android.content.IntentFilter);
    importClass(android.net.ConnectivityManager);
    var filter = new IntentFilter();
    filter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
    new ContextWrapper(context).registerReceiver(a = new BroadcastReceiver({
        onReceive: function(context, intent) {
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

  common.安卓intent源码=function (){
    var intent = new Intent();
    intent.setAction("android.settings.ACCESSIBILITY_SETTINGS");
    //辅助功能
    //intent.setAction("android.settings.ADD_ACCOUNT_SETTINGS");
    //添加账户
    //intent.setAction("android.settings.AIRPLANE_MODE_SETTINGS");
    //系统设置首页
    //intent.setAction("android.settings.APN_SETTINGS");
    //APN设置
    //intent.setAction("android.settings.APPLICATION_SETTINGS");
    //应用管理
    //intent.setAction("android.settings.BATTERY_SAVER_SETTINGS");
    //节电助手
    //intent.setAction("android.settings.BLUETOOTH_SETTINGS");
    //蓝牙
    //intent.setAction("android.settings.CAPTIONING_SETTINGS");
    //字幕
    //intent.setAction("android.settings.CAST_SETTINGS");
    //无线显示
    //intent.setAction("android.settings.DATA_ROAMING_SETTINGS");
    //移动网络
    //intent.setAction("android.settings.DATE_SETTINGS");
    //日期和时间设置
    //intent.setAction("android.settings.DEVICE_INFO_SETTINGS");
    //关于手机
    //intent.setAction("android.settings.DISPLAY_SETTINGS");
    //显示设置
    //intent.setAction("android.settings.DREAM_SETTINGS");
    //互动屏保设置
    //intent.setAction("android.settings.HARD_KEYBOARD_SETTINGS");
    //实体键盘
    //intent.setAction("android.settings.HOME_SETTINGS");
    //应用权限,默认应用设置,特殊权限
    //intent.setAction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS");
    //忽略电池优化设置
    //intent.setAction("android.settings.INPUT_METHOD_SETTINGS");
    //可用虚拟键盘设置
    //intent.setAction("android.settings.INPUT_METHOD_SUBTYPE_SETTINGS");
    //安卓键盘语言设置(AOSP)
    //intent.setAction("android.settings.INTERNAL_STORAGE_SETTINGS");
    //内存和存储
    //intent.setAction("android.settings.LOCALE_SETTINGS");
    //语言偏好设置
    //intent.setAction("android.settings.LOCATION_SOURCE_SETTINGS");
    //定位服务设置
    //intent.setAction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS");
    //所有应用
    //intent.setAction("android.settings.MANAGE_APPLICATIONS_SETTINGS");
    //应用管理
    //intent.setAction("android.settings.MANAGE_DEFAULT_APPS_SETTINGS");
    //与ACTION_HOME_SETTINGS相同
    //intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION");
    //在其他应用上层显示,悬浮窗
    //intent.setAction("android.settings.MANAGE_UNKNOWN_APP_SOURCES");
    //安装未知应用 安卓8.0
    //intent.setAction("android.settings.action.MANAGE_WRITE_SETTINGS");
    //可修改系统设置 权限
    //intent.setAction("android.settings.MEMORY_CARD_SETTINGS");
    //内存与存储
    //intent.setAction("android.settings.NETWORK_OPERATOR_SETTINGS");
    //可用网络选择
    //intent.setAction("android.settings.NFCSHARING_SETTINGS");
    //NFC设置
    //intent.setAction("android.settings.NFC_SETTINGS");
    //网络中的 更多设置
    //intent.setAction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");
    //通知权限设置
    //intent.setAction("android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS");
    //勿扰权限设置
    //intent.setAction("android.settings.ACTION_PRINT_SETTINGS");
    //打印服务设置
    //intent.setAction("android.settings.PRIVACY_SETTINGS");
    //备份和重置
    //intent.setAction("android.settings.SECURITY_SETTINGS");
    //安全设置
    //intent.setAction("android.settings.SHOW_REGULATORY_INFO");
    //监管信息
    //intent.setAction("android.settings.SOUND_SETTINGS");
    //声音设置
    //intent.setAction("android.settings.SYNC_SETTINGS");
    //添加账户设置
    //intent.setAction("android.settings.USAGE_ACCESS_SETTINGS");
    //有权查看使用情况的应用
    //intent.setAction("android.settings.USER_DICTIONARY_SETTINGS");
    //个人词典
    //intent.setAction("android.settings.VOICE_INPUT_SETTINGS");
    //辅助应用和语音输入
    //intent.setAction("android.settings.VPN_SETTINGS");
    //VPN设置
    //intent.setAction("android.settings.VR_LISTENER_SETTINGS");
    //VR助手
    //intent.setAction("android.settings.WEBVIEW_SETTINGS");
    //选择webview
    //intent.setAction("android.settings.WIFI_IP_SETTINGS");
    //高级WLAN设置
    //intent.setAction("android.settings.WIFI_SETTINGS");
    //选择WIFI,连接WIFI
    app.startActivity(intent);

  }

  common.获取手机ip地理位置=function (){
    var ip地理位置 = false
    var ip地理位置正则 = /本机IP:&nbsp;\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}<\/span>([\s\S]*?)<\/td/
    var ipUrl = "http://www.baidu.com/s?ie=UTF-8&wd=ip%E5%BD%92%E5%B1%9E%E5%9C%B0%E6%9F%A5%E8%AF%A2"
    var r = http.get(ipUrl);
    log("code = " + r.statusCode);
    var htmlResult = r.body.string()
    ip地理位置 = ip地理位置正则.exec(htmlResult)
    if (ip地理位置) {
      ip地理位置 = ip地理位置正则.exec(ip地理位置)
      ip地理位置 = ip地理位置[1]
      toastLog(ip地理位置)
      return ip地理位置
    } else {
      log('没有查询到Ip地理位置,脚本停止')
      return false
    }

  }

  common.获取app图标=function (appName){
    importClass(java.io.File);
    importClass(java.io.FileOutputStream);
    importClass(android.graphics.Bitmap);
    var pm = context.getPackageManager();
    importClass(android.util.DisplayMetrics)
    var name = appName
    var packageName = app.getPackageName(name);
    var appInfo = pm.getApplicationInfo(packageName, 0);
    var bmp = appInfo.loadIcon(pm).getBitmap();
    files.create("/sdcard/"+name+".jpg");
    var f = new File("/sdcard/"+name+"qq.jpg");
    var fOut = new FileOutputStream(f);
    bmp.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
    fOut.flush();
    fOut.close();

    var img=images.read("sdcard/"+name+".jpg")
    return img
    // app.viewFile("sdcard/"+name+".jpg")
  }

  common.替换系统文件 = function (syspath,sdpath) {
    // // var path = "/data/data/com.aaa.bbb"
    // // var pathSD = "/sdcard/com.aaa.bbb"
    // //删除原来的文件
    // shell('chown root:root ' + path, true)
    // shell('rm ' + path + " -rf", true);
    // shell('rm ' + pathSD + " -rf", true);
    // sleep(2000)

    // // 解压备份的文件
    // var inkeSdacrdPath = "/sdcard/com.aaa.bbb.zip"
    // var 文件路径 = inkeSdacrdPath
    // var 文件夹路径 = "/sdcard"
    // com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(文件夹路径))
    // sleep(2000)

    // //移动解压后的文件
    // shell("mv -f /sdcard/com.aaa.bbb /data/data/com.aaa.bbb", true);

    // //修改权限
    // shell("chmod -R 777 /data/data/com.aaa.bbb", true);

    //------------------------------------------------
    //------------------------------------------------
    //------------------------------------------------
    // var path = "/data/data/com.aaa.bbb"
    // var pathSD = "/sdcard/com.aaa.bbb"
    //删除原来的文件
    shell('chown root:root ' + syspath, true)
    shell('rm ' + path + " -rf", true);
    sleep(2000)

    //移动解压后的文件
    shell("mv -f "+sdpath+" "+syspath, true);

    //修改权限
    shell("chmod -R 777 "+syspath, true);



  }

  common.编辑距离 = function (sm,sn){
    var m=sm.length+1
    var n=sn.length+1
    var matrix = new Array();
    for ( var i = 0; i < m; i++) {
        matrix[i] = new Array();
        for ( var j = 0; j < n; j++) {
            matrix[i][j] = 0;
        }
    }
    matrix[0][0]=0
    for(let i=1;i<m;i++){
        matrix[i][0] = matrix[i-1][0] + 1
    }
    for(let j=1;j<n;j++){
        matrix[0][j] = matrix[0][j-1]+1
    }
    cost = 0
    for(let i=1;i<m;i++){
        for(let j=1;j<n;j++){
            if(sm[i-1]==sn[j-1]){
                cost = 0
            }
            else{
                cost = 1
            }
            matrix[i][j]=Math.min(matrix[i-1][j]+1,matrix[i][j-1]+1,matrix[i-1][j-1]+cost)
        }
    }
    return matrix[m-1][n-1]
    // var mindist=minEditDist("126","456")
    // print(mindist)
  }
  common.静默安装app = function (apk路径) {
    shell("pm install -r " + apk路径 , true)
  }



  common.获取手机上所有的app名字 = function () {
    var 所有的app名字=[]
    var pm=context.getPackageManager()
    let list=pm.getInstalledApplications(0)
    for(let i=0;i<list.size();i++){
      let p=list.get(i)
      var app={
        appName:p.loadLabel(pm),
        packageName:p.packageName
      }
      所有的app名字.push(app.appName)
    }
    return 所有的app名字
  }
  common.数组交集=function(){

    var 交集 = Array.intersect(arr1, arr2)
    log(交集)
    return 交集
  }
  common.控制app联网 = function (appName, 是否允许联网联网) {
    var 是否允许联网联网 = 是否允许联网联网 || true
    //作者: 家  QQ203118908


    //本来打算用iptables-restore用文件形式更新防火墙规则,
    //可是iptables-restore出现了bug,2013年就有人提过这个bug
    //https://linux.debian.bugs.dist.narkive.com/J0hbJiR6/bug-710379-xtables-addons-common-quota2-module-iptables-save-creates-invalid-record
    //又得改,坑爹

    //马丹,iptables -D INPUT -lineNumber也有BUG,
    //提示 index of deletion too big
    //日了够了
    //又得改,坑爹
    // sudo iptables -D OUTPUT 1 -t nat
    //
    // uid=`cat /data/system/packages.list | grep com.sohu.inputmethod.sogou | busybox awk '{print $2}'`
    // iptables -t filter -A OUTPUT -m owner --uid-owner=$uid -j DROP

    // 以上是android iptables 屏蔽某个app网络访问的内容，

    function 联网控制(appName) {
      // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
      // -A OUTPUT -m owner --uid-owner 10105 -j DROP
      this.等待shell执行完毕的时间 = 0
      this.防火墙规则路径 = '/sdcard/iptables.txt'
      this.uid路径 = '/sdcard/' + appName + 'uidOwner.txt'
      this.appName = appName
      this.packageName = getPackageName(this.appName)
      this.执行shell = (cmd) => {
        var result = shell(cmd, true);
        console.show();
        log(result);
        if (result.code == 0) {
          toastLog("执行成功");
        } else {
          toastLog("执行失败！请到控制台查看错误信息");
        }
        sleep(this.等待shell执行完毕的时间)
      }
      this.uid = () => {
        var cmd = 'cat /data/system/packages.list | grep ' + this.packageName + ' > ' + this.uid路径
        log('cmd=', cmd)
        this.执行shell(cmd)
        // cat /data/system/packages.list | grep com.tencent.mobileqq > /sdcard/QQuidOwner.txt
        var 包含uid的文本 = files.read('/sdcard/' + appName + 'uidOwner.txt')
        log('包含uid的文本=', 包含uid的文本)
        var uidReg = new RegExp(this.packageName + '\\s*(\\d+)')
        log('uidReg=', uidReg)
        var uid = 包含uid的文本.match(uidReg)[1]
        log(uid)
        return uid
      }
      this.允许联网规则 = 'iptables -t filter -A OUTPUT -m owner --uid-owner ' + this.uid() + ' -j ACCEPT'
      this.禁止联网规则 = 'iptables -t filter -A OUTPUT -m owner --uid-owner ' + this.uid() + ' -j DROP'
      this.允许 = () => {
        this.清空该app的防火墙规则()
        this.将防火墙规则写入系统(this.允许联网规则)
      }
      this.禁止 = () => {
        this.清空该app的防火墙规则()
        this.将防火墙规则写入系统(this.禁止联网规则)
      }

      this.将防火墙规则写入系统 = (防火墙规则) => {
        var cmd = 防火墙规则
        this.执行shell(cmd)
      }
      this.导出防火墙规则 = () => {
        var cmd = 'iptables-save > ' + this.防火墙规则路径
        this.执行shell(cmd)
      }
      this.防火墙规则 = () => {
        this.导出防火墙规则()
        var 防火墙规则 = files.read(this.防火墙规则路径)
        log('防火墙规则=', 防火墙规则)
        return 防火墙规则
      }
      this.清空该app的防火墙规则 = () => {
        var 防火墙规则 = this.防火墙规则()
        // stringObject.replace(regexp/substr,replacement)
        // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
        // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
        // -A OUTPUT -m owner --uid-owner 10105 -j DROP
        // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
        // -A OUTPUT -m owner --uid-owner 10105 -j ACCEPT
        // 删除之前添加的规则（iptables -A INPUT -s 192.168.1.5 -j DROP）：
        // [root@test ~]# iptables -D INPUT -s 192.168.1.5 -j DROP
        // iptables -t filter -A OUTPUT -m owner --uid-owner=$uid -j DROP
        var 要删除的规则reg = new RegExp('-A (OUT|IN)PUT -m owner --uid-owner ' + this.uid() + ' -j (ACCEPT|DROP)', 'g')
        // 要删除的规则reg= /-A OUTPUT -m owner --uid-owner 10105 -j (ACCEPT|DROP)/
        // -A OUTPUT -m owner --uid-owner 10105 -j (ACCEPT|DROP)
        // iptables -D OUTPUT -m owner --uid-owner 10105 -j ACCEPT
        log('要删除的规则reg=', 要删除的规则reg)
        var new防火墙规则 = 防火墙规则.match(要删除的规则reg, '')
        log('new防火墙规则=', new防火墙规则)
        // new防火墙规则= [
        //   '-A OUTPUT -m owner --uid-owner 10105 -j ACCEPT',
        //   '-A OUTPUT -m owner --uid-owner 10105 -j DROP'
        //               ]
        if (new防火墙规则) {
          for (let i = 0; i < new防火墙规则.length; i++) {
            var 规则 = new防火墙规则[i]
            规则 = 规则.replace('-A', '-D')
            var cmd = 'iptables ' + 规则
            this.执行shell(cmd)
          }
        }
        log('清空了指定app的防火墙规则')
      }
    }
    // var appName = 'QQ'
    // var appName = '哔哩哔哩'
    var appName = '微信'
    var app联网控制 = new 联网控制(appName)
    if (是否允许联网联网) {
      app联网控制.允许()
    } else {
      app联网控制.禁止()
    }


  }
  common.提取包含关键字的app = function (app关键字) {
    importClass(android.content.pm.PackageManager)
    var uc应用 = []
    var ucapp = {}
    pm = context.getPackageManager();
    var 有的 = pm.getInstalledPackages(PackageManager.GET_SHARED_LIBRARY_FILES)
    有的 = pm.getInstalledPackages(PackageManager.GET_META_DATA)
    有的 = 有的 + ""
    有的 = 有的.replace(/PackageInfo[^ ]+ /g, "")
    有的 = 有的.replace(/[\}|\[|\]| ]/g, "")
    有的 = 有的.split(",")
    for (let i of 有的) {
      var packageInfo = pm.getPackageInfo(i, 0);
      var appName = packageInfo.applicationInfo.loadLabel(context.getPackageManager()).toString()
      //appName = app.getAppName(i)
      if (appName.match(app关键字)) {
        // log(appName)
        // log("包名:" + i)
        ucapp = {
          "包名": i,
          "名称": appName
        }
        uc应用.push(ucapp) 
      }
    }
    return uc应用
  }
  common.卸载app没root = function (appName) {
    var packageName=getPackageName(appName);
    app.uninstall(packageName);


  }

  common.获取页面所有文字 = function (setting) {
    var setting = setting || {}
    var defaultSetting = {
      getText: true,
      getDesc: true,
      getId: false,
      removeRepetitiveElements: true
    }
    Object.assign(defaultSetting, setting);
    log(defaultSetting)
    var allStr = []
    var getDescAndTextAndIdOfNode = function (node) {
      if (node) {
        if (defaultSetting.getText) {
          var text = node.text()
          if (!!text) {
            allStr.push(text)
          }
        }
        if (defaultSetting.getDesc) {
          var desc = node.desc()
          if (!!desc) {
            allStr.push(desc)
          }
        }
        if (defaultSetting.getId) {
          var id = node.id()
          if (!!id) {
            allStr.push(id)
          }
        }
      }
      for (let i = 0; i < node.childCount(); i++) {
        getDescAndTextAndIdOfNode(node.child(i));
      }
    }
    var getFrameLayoutNode = function () {
      return className('FrameLayout').findOne(2000)
    }
    getDescAndTextAndIdOfNode(getFrameLayoutNode())

    function removeRepetitiveElements(arr) {
      var obj = {}
      for (let i = 0; i < arr.length; i++) {
        if (obj.hasOwnProperty(arr[i])) {} else {
          obj[arr[i]] = true
        }
      }
      return Object.keys(obj)
    }
    if (defaultSetting.removeRepetitiveElements) {
      allStr = removeRepetitiveElements(allStr)
    }
    return allStr
  }

  common.悬浮控制 = function (window, windowid, ar) {
    this.Orientation = context.resources.configuration.orientation;
    this.Width = this.Orientation == 1 ? device.width : device.height;
    this.Height = this.Orientation == 2 ? device.width : device.height;
    this.Click = function () {};
    this.Move = function () {};
    this.LongClick = function () {};
    this.setClick = (fun) => {
      fun = fun || function () {};
      this.Click = fun;
    };
    this.setMove = (fun) => {
      fun = fun || function () {};
      this.Move = fun;
    };
    this.setLongClick = (fun, ji) => {
      fun = fun || function () {};
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
    this.weiyi = function () { //平方和开方
      var num = 0;
      for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
      };
      return Math.round(Math.sqrt(num) * 1000) / 1000
    };
    this.windowGXY = function (x, y, k) {
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


  common.闪光弹 = function (content, x, y, color, t) {




    var single = (function () {
      var unique;

      function getInstance() {
        if (unique === undefined) {
          unique = new Flash();
        }
        return unique;
      }
      return {
        getInstance: getInstance
      }
    })();

    function Flash() {}
    Flash.prototype.update = function (content, x, y, color, t) {
      this.content = content || '未传入参数'
      this.x = x || random(100, 300)
      this.y = y || random(100, 900)
      this.color = color || -2278181
      this.t = t || 2000
    }
    Flash.prototype.show = function () {
      var window = floaty.rawWindow( <card cardBackgroundColor = "#aa00FF00"
        cardCornerRadius = "18dp" >
        <text id = "text"
        size = "30dp"
        layout_width = "wrap_content"
        layout_height = "wrap_content"
        layout_gravity = "center"
        gravity = "center"
        paddingLeft = "10"
        paddingRight = "10"
        paddingTop = "10"
        paddingBottom = "10" > 123 </text> </card>
      );
      window.text.setText(this.content);
      window.text.setBackgroundColor(this.color);
      window.setPosition(this.x, this.y);
      setTimeout(() => {
        window.close();
      }, this.t);
    }

    function flash(content, x, y, color, t) {
      var content = content.toString()
      var f = single.getInstance()
      f.update(content, x, y, color, t)
      f.show()
    }
    var color = color || colors.rgb(random(0, 255), random(0, 255), random(0, 255))
    flash(content, x, y, color, t);
    // flash('hello world')
    // flash('Are you ok?')
    // flash('我很好')
    // flash('you are beautiful')




  }
  common.打开开发者选项 = function () {
    app.startActivity({
      action: "android.intent.action.VIEW", //此处可为其他值
      packageName: "com.android.settings",
      className: "com.android.settings.Settings$DevelopmentSettingsActivity"
      //此处可以加入其他内容，如data、extras
    });
  }


  common.气泡 = function (msg, x, y) {
    function toastAt0(msg, x, y) {
      importClass(android.widget.Toast);
      importClass(android.view.Gravity);
      var toast = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
      toast.setGravity(Gravity.TOP | Gravity.LEFT, x, y);
      toast.show();
    }
    var x = x || device.width / 3
    var y = y || device.height / 5 * 4
    var msg = msg.toString()
    ui.run(() => toastAt0(msg, x, y));
    sleep(2000)

    // toastAt('sdfsfdsdfs',300,300)




  }












  common.随机字符串 = function (PassLength) {
    var PassLength = PassLength || 8
    var str = 'abcdefghijklmnopqrstuvwxyz';
    var STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var num = '0123456789';
    var sym = '+=-@#~,.[]()!%^*$';
    var text = str.split('').concat(STR.split(''))
    var pw = '';
    for (i = 0; i < PassLength; i++) {
      var strpos = random(0, text.length - 1);
      pw += text[strpos].charAt(random(0, text[strpos].length - 1));
    }
    return pw;
  }

  common.wifi状态 = function () {

    importPackage(android.content);
    let wifiManager = context.getSystemService(Context.WIFI_SERVICE);
    if (wifiManager.isWifiEnabled()) {
      log('wifi is opend')
      return 'open'
    } else {
      log('wifi is closed')
      return 'close'
    }


  }


  common.开关飞行模式 = function (开关) {
    // 0 关闭 1开启  默认开启飞行模式
    var 开关 = 开关 || 1

    function 打开飞行模式() {
      // 打开飞行模式
      new Shell().exec("su -c 'settings put global airplane_mode_on 1; am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true'")
    }

    function 关闭飞行模式() {
      //关闭飞行模式
      new Shell().exec("su -c 'settings put global airplane_mode_on 0; am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false'")
    }
    if (开关 == 1) {
      打开飞行模式()
    } else {
      关闭飞行模式()
    }

  }

  common.上滑 = function () {
    var randomP = random(500, 600);
    var points = [randomP];
    var interval = 0.1;
    var x0 = random(780, 900);
    var y0 = random(1500, 1600);
    var a = 240;
    for (var t = 0; t < Math.PI / 2; t += interval) {
      var x = x0 - a * (1.8 * Math.cos(t * 0.9) - Math.cos(2 * t * 0.9));
      var y = y0 - a * (5 * Math.sin(t * 0.9) - Math.sin(2 * t * 0.9));
      points.push([parseInt(x), parseInt(y)]);
    }
    gesture.apply(null, points);
    sleep(1500);
  }

  common.获取deflate网页内容 = function (url) {
    importClass('java.io.BufferedReader');
    importClass('java.io.InputStreamReader');
    importClass("java.util.zip.InflaterInputStream")
    importClass('java.io.ByteArrayInputStream');
    importClass("java.util.zip.Inflater")

    var res = http.get(url)
    log("statusCode = " + res.statusCode);
    var deflateFileContent = res.body.bytes()
    var 网页内容 = null;
    if (deflateFileContent) {
      var br = new BufferedReader(new InputStreamReader(new InflaterInputStream(new ByteArrayInputStream(deflateFileContent), new Inflater(true))));
      var lns = [],
        cl;
      while (cl = br.readLine()) lns.push(cl);
      网页内容 = lns.join("\n")
      // log('网页内容')
      // log(网页内容)
      return 网页内容
    } else {
      console.error('下载失败')
      exit()
    }
    return false
  }

  common.获取gzip网页内容 = function (url) {
    function 保存zip文件(zipFile) {
      var path = files.join(files.cwd(), "1下载bilibili弹幕专用/webPage.gzip.js")
      files.createWithDirs(path)
      log("path=", path)
      // path= /storage/emulated/0/脚本/zip文件专用/test.zip
      files.writeBytes(path, zipFile)
      var r = 解压zip文件(path)
      log(r)
      return r
    }

    function 解压zip文件(文件路径) {
      //同一目录下的同一文件名
      // unzipGzipFile(sourceGzipFilePath, targetPath)
      var fileName = files.getName(文件路径)
      var 解压后的文件路径 = 文件路径.replace(fileName, 'webPage.js')
      log('解压的解压后的文件路径=', 解压后的文件路径)
      files.createWithDirs(解压后的文件路径)
      // com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(解压后的文件路径))
      var sourceGzipFilePath = 文件路径
      var targetPath = 解压后的文件路径
      unzipGzipFile(sourceGzipFilePath, targetPath)
      return targetPath
    }

    function unzipGzipFile(sourceGzipFilePath, targetPath) {
      importClass(java.io.FileInputStream);
      importClass(java.util.zip.GZIPInputStream);
      importClass('java.io.FileOutputStream');

      var sourceGzipFilePath = sourceGzipFilePath || '/sdcard/tempSourceGzipFilePath.js'
      var targetPath = targetPath || '/sdcard/tempTargetPath.js'
      log('sourceGzipFilePath')
      log(sourceGzipFilePath)
      log('targetPath')
      log(targetPath)
      var sChunk = 8192;
      var gzipFileInputStream = new FileInputStream(sourceGzipFilePath);
      var zipin = new GZIPInputStream(gzipFileInputStream);
      var buffer = util.java.array('byte', sChunk)
      var out = new FileOutputStream(targetPath);
      var length;
      while ((length = zipin.read(buffer, 0, sChunk)) != -1)
        out.write(buffer, 0, length);
      out.close();
      zipin.close();
    }
    var res = http.get(url)
    log("statusCode = " + res.statusCode);
    var gzipFileContent = res.body.bytes()
    var 网页内容 = null;
    if (gzipFileContent) {
      var 网页保存路径 = 保存zip文件(gzipFileContent)
      网页内容 = files.read(网页保存路径)
      // log('网页内容')
      // log(网页内容)
      return 网页内容
    } else {
      console.error('下载失败')
      exit()
    }
    return false
  }


  // var r=common
  // log(r)
  // var arr=[]
  // for(var k in common){
  //   arr.push(k)
  // }
  // log(arr)


  module.exports = common
