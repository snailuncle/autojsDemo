"ui";
/*
 *        Author：TimeOut
 *        原理: 发送http协议
 *        然后对返回数据储存到本地(这步只是为了能理解，实际中可以不写)
 *        对返回数据与本地数据进行验证
 *        验证通过下载文件
 */
ui.layout(<frame>
<linear gravity="center">
<button id="state" text="检测更新"/>
</linear>
</frame>);
ui.state.click(()=>{
    m();
    });
function m(){
//文件更新地址
var url = "http://ucdl.25pp.com/fs08/2016/12/16/4/102_bcb7b975a22e445bd6ab8fc8da19ced4.apk?sf=354027&vh=bc5a41206b9654080c5b37ee292f51a5&sh=10&cc=2491945023&appid=282623&packageid=230295&md5=d4f805cc10de3b7c16d98f9d29983d6f&apprd=282623&pkg=wing.android.zipsoftware&vcode=11&fname=Zip%E5%8E%8B%E7%BC%A9%E5%B7%A5%E5%85%B7&iconUrl=http%3A%2F%2Fandroid%2Dartworks%2E25pp%2Ecom%2Ffs08%2F2016%2F12%2F16%2F7%2F102%5F395dd321101ae6729821fc08de049a65%5Fcon%2Epng";
var storage = storages.create("验证");
var s = storage.get("a");
if (s != undefined) {
    alert("软件更新提示!").then(() => {
        toast("软件更新中...");
        threads.start(function() {

            //发送get获取文件
            var data = http.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; U; Android 5.1.1; zh-cn; NX529J Build/LMY47V) AppleWebKit/533.1 (KHTML, like Gecko) Version/5.0 Mobile Safari/533.1/kdxj/1.1.3',
                }
            }).body.bytes();
            files.writeBytes("/sdcard/zip签名.apk", data);
            toast("更新成功,文件保存在/sdcard/zip签名.apk");
            //安装更新后的软件
            app.startActivity({
                action: "android.intent.action.View",
                type: "application/vnd.android.package-archive",
                data: "file:///sdcard/zip签名.apk",
                packageName: "com.android.packageinstaller",
                className: "com.android.packageinstaller.PackageInstallerActivity"
            });
            storage.clear();
        });
    });

} else {
    threads.start(function() {
        //发送post获取是否有更新文件
        var d = http.post("http://www.time.ac.cn/timeflash.asp?user=flash", {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; U; Android 5.1.1; zh-cn; NX529J Build/LMY47V) AppleWebKit/533.1 (KHTML, like Gecko) Version/5.0 Mobile Safari/533.1/kdxj/1.1.3',
            }
        }).body.string();
        //截取网络时间里的分，作为验证信息
        var min = d.split("<minite>")[1].split("</minite>")[0];

        //验证存在，更新
        var storage = storages.create("验证");
        storage.put("a", min);
        alert("再次检测,将收到更新提示!").then(() => {});
    });
}
}