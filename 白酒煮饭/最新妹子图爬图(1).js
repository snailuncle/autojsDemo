 mm = 1
 ur = "http://api.xkapi.xyz/index/g/meizitugetinfo/?id=" //145165 ";
 urlo = "http://api.xkapi.xyz/index/g/meizitu/?type=zuixin&yeshu=" //1";
 qw = dialogs.rawInput("输入页数(每页五组图)", 3);
 console.show();
 hhh: for (po = 1; po <= qw * 1; po++) {
     url = urlo + po;
     //log(url)
     var re = http.get(url);
     if (re.statusCode != 200) {
         toastLog("请求失败");
         exit();
     };
     as = re.body.string();
     ak = as.split(",\"title");
     if (ak.legth == 1) {
         break hhh;
     };
     bk = [];
     for (i = 0; i < ak.length - 1; i++) {
         bk[i] = ak[i].split("\"id\":")[1]
     };
     v = bk.length;
     for (io = 0; io < v; io++) {
         路径 = "/sdcard//图片/" + bk[io] + "/";
         files.ensureDir(路径);
         am = ur + bk[io];
         log(mm + " 张图");
         mm++
         //存图(路径, am);
     };
     sleep(500);
 };
 device.vibrate(27);

 function 存图(路径, url) {
     var re = http.get(url);
     if (re.statusCode != 200) {
         toastLog("请求失败");
         exit();
     };
     as = re.body.string();
     b = as.replace("{\"content\":\"", "[");
     a = b.replace("\"}", "]");
     for (i = 0; i < a.length; i++) {
         a = a.replace("\\", "");
     };
     b = eval(a);
     c = b.length;
     for (i = 0; i < c; i++) {
         gg = 路径 + i;
         var res = http.get(b[i]);
         if (res.statusCode != 200) {
             toastLog("请求失败");
             exit();
         };
         files.writeBytes(gg + ".jpg", res.body.bytes());

     };
 };