//3秒后alert弹框怎么写?
"ui";
threads.start(
  function (){
  if (!requestScreenCapture()) {
    alert('申请截图权限失败')
    exit();
  }
}
)
ui.statusBarColor("#AA0000");
ui.layout(
    <frame background="#AA0000">
	    <vertical align="top" paddingTop="5" margin="10">
		    <input id="群友快手链接" bg="#FFFFFF" gravity="left" color="#000000" size="10" marginTop="15" h="300">这里放大家的快手助力链接  作者QQ203118908  诚信互助群734205476</input>
		    <button id="开始给群友助力" text="点击开始给群友助力" margin="20 0 0 0"/>
		    <text text="作者QQ203118908" margin="20 0 0 0"/>
		    <text text="诚信互助群734205476" margin="20 0 0 0"/>
	    </vertical>
    </frame>
);
ui.开始给群友助力.click(() => {
  ui.开始给群友助力.setEnabled(false)
  toastLog('按钮被点击了')
  setTimeout(function (){
    ui.开始给群友助力.setEnabled(true)
  },5000)
  threads.start(
    function (){
      给所有群友助力()

    }
  )
});

function 给所有群友助力() {
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  var 所有链接 = 获取所有链接()
  log(所有链接)
  // exit()
  for (let i = 0; i < 所有链接.length; i++) {
    var url = 所有链接[i]
    var 带有头像的截图 = 打开指定链接助力(url)
    var 助力次数 = i + 1
    添加时间水印并保存到当前日期的截图文件夹(助力次数, 带有头像的截图)
    sleep(1000)
  }
}
function httpString(s) {
  var reg= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  s = s.match(reg);
  return(s)
}

function 获取所有链接() {
  var 群友快手链接 = ui.群友快手链接.text()
  log(群友快手链接)
  //变成数组
  // https://special.viviv.com/sf2019/pk/share/1225536373.html?operation=favor&shareid=ypJavNhkXg90c-3Xdy5BriIxDEs2n_-8JfPQibrxKiQ&fid=1225536373&cc=share_copylink
  var 群友快手链接数组=httpString(群友快手链接)
  return 群友快手链接数组
}

function 打开指定链接助力(url) {
  打开快手组队助力页面(url)
  var 为TA助力 = 确认是否打开了助力界面()
  var 带有头像的截图 = captureScreen()
  clickView(为TA助力)
  sleep(2000)
  //点击之后两种情况,助力成功或者助力过了
  var 助力结果 = 判断助力结果()
  if (助力结果 == '助力成功') {
    log('助力成功')
  } else if (助力结果 == '助力过了') {
    log('助力过了')
  } else {
    throw '不是助力成功,也不是助力过了'
  }
  return 带有头像的截图
}

function 判断助力结果() {
  // text = 今天已经助力过了！
  for (let i = 0; i < 5; i++) {
    var 助力过了 = text('今天已经助力过了！').findOnce()
    var 助力成功 = text('助力成功').findOnce()
    if (助力过了) {
      return '助力过了'
    }
    if (助力成功) {
      return '助力成功'
    }
    sleep(1000)
  }
  return '助力结果判断失败'
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
function 获取为他助力按钮(){
  var r=depth(10).find()
  return r[r.length-1]
}
function 确认是否打开了助力界面() {
  //有text = 为TA助力
  //有text = 感谢你，动动你发财的手指帮我点个助力
  //有text = head_u
  //text = 帮Ta助力
  for (let i = 0; i = 15; i++) {
    var 帮Ta助力 = text('帮Ta助力').findOnce()
    if (帮Ta助力) {
      sleep(1000)
      var 为他助力按钮=获取为他助力按钮()
      clickView(为他助力按钮)
      sleep(3000)
      break
    } else {
      sleep(1000)
    }
    if(i==10){
      alert('没有出现帮他助力页面')
      exit()
    }
  }
  for (let i = 0; i = 15; i++) {
    var 为TA助力 = text('为TA助力').findOnce()
    var 感谢你 = text('感谢你，动动你发财的手指帮我点个助力').findOnce()
    var head_u = text('head_u').findOnce()
    if (为TA助力 && 感谢你 && head_u) {
      sleep(1000)
      return 为TA助力
    } else {
      sleep(1000)
    }
  }
  alert('没有打开助力页面,脚本停止')
  exit()
}

function 添加时间水印并保存到当前日期的截图文件夹(助力次数, 带有头像的截图) {
  //助力第几次
  //水印内容   助力第几次  和日期
  var 当前日期 = 获取当前日期()
  var 助力内容1 = 当前日期
  var 助力内容2 = '第' + 助力次数 + '次助力'
  var 助力保存文件夹 = '/sdcard/快手助力截图' + 当前日期 + '/'
  files.createWithDirs(助力保存文件夹);
  var 图片名字 = 助力次数 + '.png'
  var IMG = 带有头像的截图
  var bitmap = IMG.getBitmap();
  var canvas = new Canvas(bitmap);
  var w = canvas.width,
    h = canvas.height;
  var paint = new Paint;
  paint.setTextAlign(Paint.Align.CENTER);
  paint.setStrokeWidth(5);
  paint.setARGB(127, 10, 255, 127);
  var size = 150;
  paint.setTextSize(size);
  canvas.drawText(助力内容1, w / 2, h / 2 + 0.365 * size, paint);
  canvas.drawText(助力内容2, w / 2, h / 3 + 0.365 * size, paint);
  var img = canvas.toImage();
  images.save(img, 助力保存文件夹 + 图片名字, "png", 50);
}

function 打开快手组队助力页面(url) {
  var url = url || 'https://special4.viviv.com/sf2019/pk/share/1225536373.html?operation=favor&shareid=ypJavNhkXg90c-3Xdy5BriIxDEs2n_-8JfPQibrxKiQ&fid=1225536373&cc=share_copylink'
  url = escape(url)
  var uri = android.net.Uri.parse("kwai://webview?hideToolBar=true&url=" + url);
  app.startActivity({
    action: "android.intent.action.VIEW",
    data: uri,
    packageName: "com.smile.gifmaker",
    className: 'com.yxcorp.gifshow.webview.KwaiWebViewActivity'
  });
}

function 获取当前日期和时间() {
  var result = (new Date()).Format("yyyy-MM-dd hh:mm:ss")
  return result
}

function 获取当前日期() {
  var result = (new Date()).Format("yyyy-MM-dd")
  return result
}
// 2018-3-23
// 2018-10-23
// log(获取当前日期())
