//版本1.0.0_180402_2040
//版本1.0.1_180403_0145 增加断点续传
//版本1.0.2_100413_1330 修复单页搜索结果
//版本1.0.3_180516_2115 输入主页或首页保存最新图集(24)
//版本1.0.4_181129_1230 修复图片正则匹配

//断点续传检测
var storage = storages.create("mzt_tmp");
//storage.clear();exit();
var currentpin = 0;
var currentpage = 0;
if (storage.get("finished") == false && confirm("检测到未完成的任务，是否继续？")) {
    var search = storage.get("search"); //url
    var spage = storage.get("spage"); //页码列表
    var currentpage = storage.get("currentpage"); //当前页码
    var currentpin = storage.get("currentpin"); //当前图集
    SaveAll(search, spage);
} else {
    SaveAll();
}

function SaveAll(s, spage) {
    if (!s) {
        var s = prompt("请输入想搜索的图集", "");
        !s && alerte("未输入内容，请重启");
        storage.put("search", s);
        var url = "http://www.mzitu.com/search/" + s + "/";

        var shome = loadUrl(url);
        var nav = shome.match(/page\/(\d+)/g);
        if (nav) {
            nav.sort();
            spages = nav[nav.length - 1].match(/\d+/);
        } else {
            spages = 1;
        }

        if (spages != 1) {
            var arr2 = new Array();
            for (var i = 1; i <= spages; i++) {
                arr2.push(i);
            } //创建页码数组
            spage = dialogs.multiChoice("选择分页，每页24图集", arr2);
            spage.length == 0 && alerte("没有选择分页");
        } else {
            spage = [0];
        }
        storage.put("spage", spage);
    }
    //循环保存选中的每一页
    for (k = currentpage; k < spage.length; k++) {
        storage.put("currentpage", k);
        SavePage(spage[k] + 1, s);
    }
}

function SavePage(p, s) {
    var url = "http://www.mzitu.com/search/" + s + "/page/" + p + "/";
    if(s=="主页"||s=="首页"){var url='http://www.mzitu.com/';}
    var shome = loadUrl(url);
    var pins = shome.match(/pins[\s\S]*?ul>/);
    if (pins)
        pins = pins[0].match(/<li.*?\d+/g);
    if (pins)
        pins = pins.map(i => i.match(/\d+/));
    else
        alerte("没有搜索到图集");

    storage.put("finished", false);
    //循环保存单页全部图集
    for (i = currentpin; i < pins.length; i++) {
        storage.put("currentpin", i);
        var id = pins[i];
        var home = loadUrl("http://m.mzitu.com/" + pins[i]);
        var title = home.match(/blog-title">([^<]*)/);
        !title && alerte("无法解析网页，请检查");
        title = title[1];
        var pages = home.match(/\/(\d+)页/)[1];
        var path = files.getSdcardPath() + "/妹子图/" + s + "/" + p + "/" + title + "/";
        files.createWithDirs(path);
        !files.isDir(path) && alert("文件夹创建失败");
        toast(title + "：共" + pages + "张图片");
        //循环保存单图集全部图片
        for (ii = 1; ii <= pages; ii++) {
            var imgurl = loadUrl('http://m.mzitu.com/' + id + '/' + ii).match(/<figure>.*\n.*(https?:\/\/i\.meizitu.*(\.[^\"]*))/);
            var ext = imgurl[2];
            imgurl = imgurl[1];
            var name = path + ii + ext;
            saveImg(imgurl, name);
        }
        toast(title + "：已完成");
    }
}

storage.put("finished", true);
toast("全部任务已完成");

function loadUrl(url) {
    var res = http.get(url);
    res.statusCode != 200 && alerte("服务器错误: " + res.statusCode + " " + res.statusMessage);
    var result = res.body.string();
    return result;
}

function saveImg(url, name) {
    var r = http.get(url, {
        headers: {
            'Referer': 'http://www.mzitu.com/',
        }
    });
    files.writeBytes(name, r.body.bytes());
}

function alerte(r) {
    toast(r);
    exit();
}
