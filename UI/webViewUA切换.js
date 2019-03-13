/**
 * 作者: 家
 * QQ: 203118908
 * 功能: webViewUA切换
 */
"ui";
importClass(java.io.File);
importPackage(android.text);
importPackage(android.text.style);

ui.layout(
  <vertical id="yidong1" marginTop='0'   bg="#881e90ff">
    <text id="ua" marginTop='10'>ua</text>
    <text id="缓存信息">缓存信息</text>
    <text id="cookie信息" singleLine="true" ellipsize="end" >cookie信息</text>
    <horizontal>
      <button id="切换UA">切换UA</button>
      <button id="清除缓存">清除缓存</button>
      <button id="刷新">刷新</button>
      <button id="上一页">上一页</button>
    </horizontal>
    <horizontal>
      <frame layout_weight="1">
        <button id="百度网站">百度网站</button>
      </frame>
      <frame layout_weight="1">
        <button id="UA网站" >UA网站</button>
      </frame>
    </horizontal>
    <webview id="a" h="450" w="350" margin="0 0"/>
  </vertical>
);




http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
var cookieManager = android.webkit.CookieManager.getInstance();
ui.a.getSettings().setJavaScriptEnabled(true);
var url = "https://www.baidu.com/"
// var url = "http://www.fynas.com/ua/view"
var webView = ui.a
webView.getSettings().setUserAgentString(随机UA());
setTimeout(显示手机UA, 1000)
ui.a.loadUrl(url);
var CookieStr = cookieManager.getCookie(url);
ui.切换UA.on("click", () => {
  toastLog('点击了\n切换UA')
  var webView = ui.a
  webView.getSettings().setUserAgentString(随机UA());
  setTimeout(显示手机UA, 1000)
})

function 显示手机UA() {
  threads.start(
    function () {
      ui.run(
        function () {
          var ua = 获取手机ua()
          ui.ua.setText('UA: '+ua)
        }
      )
    }
  )
}
setInterval(
  () => {
    var ua = 获取手机ua()
    ui.ua.setText('UA: '+ua)
    var 缓存信息 = 当前缓存()
    ui.缓存信息.setText(缓存信息)
    var cookie信息 = 当前Cookie()
    ui.cookie信息.setText(cookie信息)
    var color="#ff00ff"
    markSearch(ui.ua, "UA", color);
    markSearch(ui.缓存信息, "缓存", color);
    markSearch(ui.cookie信息, "cookie", color);

  }, 2000
)

function 获取手机ua() {
  var webView = ui.a
  var ua = webView.settings.getUserAgentString();
  return ua
}

ui.百度网站.on("click", () => {
var url = "https://www.baidu.com/"
ui.a.loadUrl(url);
})

ui.UA网站.on("click", () => {
var url = "http://www.fynas.com/ua/view"
ui.a.loadUrl(url);
})

ui.上一页.on("click", () => {
  var webView = ui.a
  webView.goBack();
})


ui.清除缓存.on("click", () => {
  toastLog('点击了\n清除缓存')
  log('清除缓存前cookie=')
  log(CookieStr)
  var webView = ui.a
  // 不让用js会白屏
  // webView.getSettings().setJavaScriptEnabled(false);
  var CookieStr = cookieManager.getCookie(url);
  cookieManager.removeSessionCookies(null);
  cookieManager.removeAllCookie();
  cookieManager.flush();
  webView.getSettings().setCacheMode(webView.settings.LOAD_NO_CACHE);
  context.deleteDatabase("WebView.db");
  context.deleteDatabase("WebViewCache.db");
  context.getCacheDir().delete();
  webView.clearCache(true);
  webView.clearFormData();
  webView.setWebChromeClient(null);
  webView.setWebViewClient(null);
  android.webkit.WebStorage.getInstance().deleteAllData(); //清空WebView的localStorage
  webView.clearCache(true);
  CookieStr = cookieManager.getCookie(url);
  log('清除缓存后cookie=')
  log(CookieStr)
})
ui.刷新.on("click", () => {
  toastLog('点击了\n刷新')
  ui.run(() => {
    var webView = ui.a
    webView.reload()
    setTimeout(显示手机UA, 1000)
  });
})

function 随机UA() {
  var uas = [
    "Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn; U8800 Build/HuaweiU8800) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    "Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn) AppleWebKit/530.17 (KHTML, like Gecko) FlyFlow/2.2 Version/4.0 Mobile Safari/530.17",
    "Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn; U8800 Build/HuaweiU8800) UC AppleWebKit/534.31 (KHTML, like Gecko) Mobile Safari/534.31",
    "Mozilla/5.0 (Linux; Android 4.0.3; M031 Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
  ]
  var uasLen = uas.length
  var n = 随机数(uasLen)
  var ua = uas[n]
  return ua

  function 随机数(max) {
    var r = parseInt(max * Math.random())
    return r
  }
}

function 当前缓存() {
  var file3 = activity.getCacheDir();
  var file3Size = getFolderSize(file3)
  file3Size = conver(file3Size)
  var 当前缓存路径 = '缓存: ' + file3 + ': ' + file3Size
  return 当前缓存路径
}
function 当前Cookie() {
  var CookieStr = cookieManager.getCookie(url);
  CookieStr = 'cookie: ' + CookieStr
  return CookieStr
}

function getFolderSize(path) {
  var file = new File(path)
  var size = 0;
  try {
    var fileList = file.listFiles();
    for (var i = 0; i < fileList.length; i++) {
      if (fileList[i].isDirectory()) {
        size = size + getFolderSize(fileList[i]);
      } else {
        size = size + fileList[i].length();
      }
    }
  } catch (e) {
    log(e)
  }
  return size
}

function conver(limit) {
  var size = "";
  if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) { //如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else { //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
  var sizestr = size + "";
  var len = sizestr.indexOf("\.");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") { //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}
//删除指定文件夹下所有文件
//param path 文件夹完整绝对路径
function delAllFile(path) {
  var flag = false;
  var file = new File(path);
  if (!file.exists()) {
    return flag;
  }
  if (!file.isDirectory()) {
    return flag;
  }
  var tempList = file.list();
  var temp = null;
  for (var i = 0; i < tempList.length; i++) {
    if (path.endsWith(File.separator)) {
      temp = new File(path + tempList[i]);
    } else {
      temp = new File(path + File.separator + tempList[i]);
    }
    if (temp.isFile()) {
      temp.delete();
    }
    if (temp.isDirectory()) {
      delAllFile(path + "/" + tempList[i]); //先删除文件夹里面的文件
      files.remove(path + "/" + tempList[i]); //再删除空文件夹
      flag = true;
    }
  }
  return flag;
}










function highlightText(text, start, length, color) {
    if (!(typeof(text) == 'object' && text.getClass().getName() == 'android.text.SpannableStringBuilder')) {
        text = new SpannableStringBuilder(text);
    }
    text.setSpan(new ForegroundColorSpan(colors.parseColor(color)), start, start + length, Spannable.SPAN_INCLUSIVE_INCLUSIVE);
    return text;
}

function highlightView(view, start, length, color) {
    view.setText(highlightText(view.text(), start, length, color));
}

function markSearch(view, keywords, color) {
    let textStr = view.text();
    let text = textStr;
    let i = -1;
    while (i < textStr.length - 1) {
        i = textStr.indexOf(keywords, i + 1);
        if (i >= 0) {
            text = highlightText(text, i, keywords.length, color);
        } else {
            break;
        }
    }
    view.setText(text);
    return text;
}

