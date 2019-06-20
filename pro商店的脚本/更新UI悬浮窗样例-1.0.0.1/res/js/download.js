
/**
 * 作者: 家
 * QQ:  203118908
 * 功能: 显示下载文件百分比
 */

importClass("java.io.FileOutputStream")
importClass("java.io.IOException")
importClass("java.io.InputStream")
importClass("java.net.MalformedURLException")
importClass("java.net.URL")
importClass("java.net.URLConnection")
importClass("java.util.ArrayList")

var age = storages.create("Doolu_download");
var data = age.get("data");

toast("开始下载")
url = new URL(data.myUrl);
conn = url.openConnection(); //URLConnection
inStream = conn.getInputStream(); //InputStream
fs = new FileOutputStream(data.myPath); //FileOutputStream
connLength = conn.getContentLength(); //int
startTime = java.lang.System.currentTimeMillis();
buffer = util.java.array('byte', 1024); //byte[]
// buffer = new byte[1204]; //byte[]
prevTime = java.lang.System.currentTimeMillis();
bytePrev = 0; //前一次记录的文件大小
byteSum = 0; //总共读取的文件大小
var byteRead; //每次读取的byte数
//log('要下载的文件大小=')
log(connLength)

report("文件大小", connLength);
threads.start(
    function () {
        while (true) {
            var 当前写入的文件大小 = byteSum
            var 百分比 = parseInt(当前写入的文件大小 / connLength * 100)
            //var 要显示的内容 = util.format('下载了%s%', 百分比)
            //log(要显示的内容)
            log("进度" + 百分比)
            if(百分比){report("进度", 百分比)}
            if (当前写入的文件大小 >= connLength) {
                break;
            }
            sleep(100)
        }
    }
)
while ((byteRead = inStream.read(buffer)) != -1) {

    byteSum += byteRead;
    //当前时间
    currentTime = java.lang.System.currentTimeMillis();
    fs.write(buffer, 0, byteRead); //读取

}
log("结束")
report("结果", "下载完成")
if (data._app) {
    app.startActivity({
        action: "VIEW",
        type: "application/vnd.android.package-archive",
        data: "file://" + data.myPath,
        flags: ["grant_read_uri_permission", "grant_write_uri_permission"]
    });
}


function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("download", {
        name: X,
        data: Y
    });
}