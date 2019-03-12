function 判断当前app() {
  console.show();
  var result = shell('dumpsys activity top | grep ACTIVITY  >  /sdcard/1当前app.txt', true);
  log(result);
  if (result.code == 0) {
    toast("执行成功");
  } else {
    toast("执行失败！请到控制台查看错误信息");
    exit()
  }
  var 文本 = files.read("/sdcard/1当前app.txt")
  log("文本=", 文本)
  var 当前包名 = /ACTIVITY *(.*)\//.exec(文本)[1]
  log('当前包名=', 当前包名)
  var appName = getAppName(当前包名)
  log('appName=', appName)
}
判断当前app()
