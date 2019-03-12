//导入模块
function 导入常用函数模块() {
  var url = 'https://raw.githubusercontent.com/snailuncle/autojsDemo/master/autojsCommonFunctions.js'
  var r = http.get(url)
  log("code = " + r.statusCode);
  var html = r.body.bytes()
  files.write('./autojsCommonFunctions.js', '')
  files.writeBytes('./autojsCommonFunctions.js', html)
  var common = require('./autojsCommonFunctions.js')
  return common
}
var common = 导入常用函数模块()
var jarFileName = "webViewClasses.dex"
common.确保有jar文件(jarFileName)
var sdPath = files.getSdcardPath()
var path = files.join(sdPath, "/autojsLib/", jarFileName)
runtime.loadDex(path);
importPackage(com.a.b);
importClass(android.webkit.WebView)
importClass(android.webkit.WebChromeClient)
importClass(android.webkit.WebViewClient)
w = floaty.rawWindow(
    <frame id="yidong1" margin="0" gravity="center"  bg="#881e90ff">
        <webview id="a" h="200" w="150" margin="0 0"/>
        <vertical>
            <linear margin="0" bg="#ffffffff">
                <button id="运行" margin="-1 0" text="转换" size="10" h="35" w="50"/>
                <button id="退出" margin="-1 0" text="退出" size="10" h="35" w="50" />
                <button id="移动" margin="-1 0" text="拖动" size="10" h="35" w="50" />
                <button id="发音人" margin="-1 0" text="发音人" size="10" h="35" w="70" />
            </linear>
            <ScrollView id="As" h="*" bg="#882f4f4f">
                <text id="日志" textSize="8sp" textColor="#ff550000"  margin="1">日志</text>
            </ScrollView>
        </vertical>
    </frame>
);
w.移动.setOnTouchListener(function (view, event) {
  switch (event.getAction()) {
    case event.ACTION_DOWN:
      x = event.getRawX();
      y = event.getRawY();
      aw = w.getWidth();
      ah = w.getHeight();
      windowX = w.getX();
      windowY = w.getY();
      downTime = new Date().getTime();
      return true;
    case event.ACTION_MOVE:
      //移动手指时调整悬浮窗位置
      w.setPosition(windowX + (event.getRawX() - x),
        windowY + (event.getRawY() - y))
      return true;
    case event.ACTION_UP:
      return true;
  }
  return true;
})
js注入 = 0
view = new View(function (view, 状态, 内容) {
  if (状态 == "js日志") {
    log(状态, 内容)
    return "日志显示"
  } else if (状态 == "js调用") {
    log(状态, 内容)
    return "0"
  } else if (状态 == "打开") {
    js注入 = 0
    log(状态, 内容)
    if (内容.match(/^https:\/\/open\.weixin.qq.com/)) {
      log(unescape(内容.match(/http%.+/)[0]))
      //w.a.loadUrl(unescape(内容.match(/http%.+/)[0]))
      // return "1"
    }
    return "0"
  } else if (状态 == "开始加载") {
    js注入 = 0
    log("开始加载", 内容)
    if (内容.match(/^https:\/\/open\.weixin.qq.com/)) {
      log(unescape(内容.match(/http%.+/)[0]))
      //w.a.loadUrl(unescape(内容.match(/http%.+/)[0]))
      // return "1"
    }
    return "0"
  } else if (状态 == "加载完成") {
    log("加载完成", 内容)
    return "0"
  } else if (状态 == "加载资源") {
    log("加载资源", 内容)
    if (!js注入) {
      js注入 = 1
      ui.run(function () {
        view.evaluateJavascript(js日志.toString() + ";js日志();", function (f) {})
      })
    }
    return "0"
  }
  log(状态, 内容)
  return "0"
})
var 微信ua = "Mozilla/5.0 (Linux; Android 8.0.0; MI 6 Build/OPR1.170623.027; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044432 Mobile Safari/537.36 MicroMesse你nger/6.6.1.1220(0x26060135) NetType/WIFI Language/zh_CN"
var 电脑ua = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
ui.run(function () {
  w.a.getSettings().setJavaScriptEnabled(true);
  w.a.getSettings().setUserAgentString(微信ua);
  webSettings = w.a.getSettings();
  webSettings.setAppCacheEnabled(true);
  //  cachePath = getApplicationContext().getDir("cache",Context.MODE_PRIVATE).getPath();
  webSettings.setAppCachePath("/storage/emulated/0/缓存");
  webSettings.setAppCacheMaxSize(5 * 1024 * 1024);
  w.a.setWebViewClient(view.webViewClient)
  w.a.addJavascriptInterface(view.js, "js");
})
url = "http://www.baidu.com"
sleep(144)
ui.run(function () {
  w.a.loadUrl(url);
})
sleep(2003)
ui.run(function () {
  //window.js.js日志('返回');
  w.a.evaluateJavascript("console.log(11111);window.js.js日志('函数加载返回');", function (f) {
    toastLog("加载函数" + f)
  })
  // w.a.loadUrl("javascript:window.js.js调用('默默');");
  //  gg=w.a.get
  //  log(gg)
})
//importClass(android.webkit.CookieSyncManager);
importClass(android.webkit.CookieManager)
cookieManager = CookieManager.getInstance();
CookieStr = cookieManager.getCookie(url);
log("哦哦", CookieStr)

function js日志() {
  console.log = function (s1) {
    var s = arguments.length + ":";
    for (let a = 0; a < arguments.length; a++) s += arguments[a] + "\t";
    window.js.js日志(s);
  };
  console.log("重写", "日志");
}
setInterval(() => {}, 1000);
