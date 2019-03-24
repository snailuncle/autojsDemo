/**
*作者QQ: 1811588980
*完成时间: 2019年3月24日 下午11:35:58
*测试机型: PD1813D
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*2280
 *API: 27
*备注: 用于下载王者荣耀全英雄头像。(需要联网)(下载后可在相册里面查看)(下载后保存在(王者荣耀英雄头像)文件夹里)
**/

console.show();

var dirpath = "/sdcard/王者荣耀英雄头像/";
files.ensureDir(dirpath);

var url = 'http://pvp.qq.com/web201605/js/herolist.json';
var head = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
};
var res = http.get(url, head);

var json = res.body.json();
toastLog("请等待，正在下载");
//log(json);
var num = 0;
for (let j in json) {
    let obj = json[j];
    let I = obj.ename;
    //log("第", Number(j) + 1, json.length, "英雄");
    let imgurl = 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/' + I + '/' + I + '.jpg';
    let res = http.get(imgurl);
    let path = "/" + obj.cname + '.jpg';
    if (res.statusCode == 200) {
        files.writeBytes(files.join(dirpath, path), res.body.bytes());
        media.scanFile(files.join(dirpath, path));
        log("OK " + path);
        num++;
    } else {
        log("NO " + path);
    };
};
toastLog("全部下载完成");
toastLog(num+"个");
toastLog("已保存在"+dirpath);
toastLog("可在手机相册里找到");
