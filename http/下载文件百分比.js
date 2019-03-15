/**
 * 作者: 家
 * QQ:  203118908
 * 功能: 显示下载文件百分比
 */
// importClass("javax.swing.*")
importClass("java.io.FileOutputStream")
importClass("java.io.IOException")
importClass("java.io.InputStream")
importClass("java.net.MalformedURLException")
importClass("java.net.URL")
importClass("java.net.URLConnection")
importClass("java.util.ArrayList")
var myPath = "/sdcard/111aa/abc.js";
log('im alive')
var myUrl = 'http://bmob-cdn-11368.b0.upaiyun.com/2019/03/15/e7109b1040cf97db8008992f5fbec664.test'
var url = new URL(myUrl);
var conn = url.openConnection(); //URLConnection
var inStream = conn.getInputStream(); //InputStream
var fs = new FileOutputStream(myPath); //FileOutputStream
var connLength = conn.getContentLength(); //int
var startTime = java.lang.System.currentTimeMillis();
var buffer = util.java.array('byte', 1024); //byte[]
// buffer = new byte[1204]; //byte[]
var prevTime = java.lang.System.currentTimeMillis();
var bytePrev = 0; //前一次记录的文件大小
var byteSum = 0; //总共读取的文件大小
var byteRead; //每次读取的byte数
log('要下载的文件大小=')
log(connLength)
threads.start(
  function () {
    while (1) {
      var 当前写入的文件大小 = byteSum
      var 百分比 = 当前写入的文件大小 / connLength * 100
      var 要显示的内容 = util.format('下载了%s%', 百分比)
      log(要显示的内容)
      if (当前写入的文件大小 >= connLength) {
        break;
      }
      sleep(1000)
    }
  }
)
while ((byteRead = inStream.read(buffer)) != -1) {
  byteSum += byteRead;
  //当前时间
  var currentTime = java.lang.System.currentTimeMillis();
  fs.write(buffer, 0, byteRead); //读取
}
