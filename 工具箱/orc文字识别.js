/*
 *        Author：TimeOut
 *        Script: orc文字识别
 *        Date: 2019.6.20
 */
function ocr(path) {
    if (files.isFile(path)) {
        var url = http.postMultipart("http://d.aroot.cn/addons/yidu_tupian/core/index.php?mch_id=340&s=/api/user/uploadFile&path_name=flower_plant_mygj", {
            "file_upload": open(path)
        }, {
            "headers": {
                "Connection": "Keep-Alive",
                "referer": "https://servicewechat.com/wx552b87a99d56e00a/6/page-frame.html",
                'User-Agent': 'Mozilla/5.0 (Linux; U; Android ' + device.release + '; zh-cn; ' + device.model + ' Build/' + device.buildId + ') AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
                "Content-Type": "multipart/form-data; boundary=1561019505328",
                "Content-Length": "15713",
                "Host": "d.aroot.cn"
            }
        }).body.json();
        if (url.code == 0) {
            var result = http.get("http://d.aroot.cn/addons/yidu_tupian/core/index.php?mch_id=340&s=/api/Vision/get_word&path_url=" + url.info + "&scene=3", {
                "headers": {
                    "charset": "utf-8",
                    "referer": "https://servicewechat.com/wx552b87a99d56e00a/6/page-frame.html",
                    'User-Agent': 'Mozilla/5.0 (Linux; U; Android ' + device.release + '; zh-cn; ' + device.model + ' Build/' + device.buildId + ') AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
                    "content-type": "application/x-www-form-urlencoded",
                    "Host": "d.aroot.cn",
                    "Connection": "Keep-Alive"
                }
            }).body.json();
            return result;
        } else {
            return url;
        }
    } else {
        return "文件路径错误！";
    }
}
log(ocr("/sdcard/fl.jpg"));