function 语音合成(str) {
  var str = str;
  var url = "http://www.xfyun.cn/herapi/solution/synthesis?vcn=x_yifeng&vol=7&spd=medium&textType=cn&textPut=" + str;
  var res = http.get(url).body.string();
  eval("res=" + res + ".data");
  var mp3 = http.get(res).body.bytes();
  files.writeBytes("/sdcard/ADM/腾讯/ui.mp3", mp3);
  //  device.vibrate(30)
}
var path="/sdcard/ADM/腾讯/ui.mp3"
var str=dialogs.rawInput("输入文字","哈哈")
语音合成(str);
var myDate = new Date();
  var 年 = myDate.getFullYear(); //
  var 月 = myDate.getMonth() + 1; //
  if (月 < 10) {
    月 = "0" + 月
  };
  var 日 = myDate.getDate(); //
  if (日 < 10) {
    日 = "0" + 日
  };
  var 前路径 = "/sdcard/tencent/MobileQQ/";
  var qq = "2508385778";
  var 后路径 = "/ptt/" + 年 + 月 + "/" + 日 + "/";
  var 路径 = 前路径 + qq + 后路径;

  if (!files.exists(路径)) {
    exit();
  }
  var 文件数组 = files.listDir(路径, function(name) {
    return name.endsWith("");
  });
  var 文件名 = 文件数组[文件数组.length - 1];
  var slk路径 = files.join(路径, 文件名);
files.copy(path, slk路径)
  device.vibrate(30)

