var url = "http://music.163.com/m/playlist?id=2337012291";
a = dialogs.rawInput("输入歌单");
console.show()

if (a == null) {
    log("已取消");
    exit();
}
j = ["歌单", "歌曲"];
p = ["/playlist/", "/song/"];
for (var i in p) {
    q = a.indexOf(p[i]);
    if (q != (-1)) {
        break;
    };
};
console.show()
switch (i * 1) {
    case 0:
        log(j[0])
        b = a.split("list/")[1].split("/")[0];
        url= "http://music.163.com/m/playlist?id=" + b;
        r = http.get(url);
        qq(r);
        a = r.body.string();
        idd = a.split("<li><a href=\"/song?id=");
        le = idd.length;
        id = [];
        name = []
        for (i = 1; i < le; i++) {
            id[i - 1] = idd[i].split("\">")[0];
            name[i - 1] = idd[i].split("</a></li>")[0].split("\">")[1]
        };
        b = id.length
        for (i = 0; i < b; i++) {
            na = name[i] + "&&&" + id[i];
            log(na)
            da = "http://music.163.com/song/media/outer/url?id=" + id[i] + ".mp3 ";
            adm(da, na);
            sleep(100);
        };
        break;
    case 1:
        log(j[1])
        b = a.split("song/")[1].split("/?")[0];
        c = "http://music.163.com/song/media/outer/url?id=" + b + ".mp3 ";
        name=a.split("《")[1].split("》")[0]+"&&&"+b;
        adm(c,name)
        break;
    default:
        alert("应该修改脚本了");
}


device.vibrate(30);

function qq(res) {
    if (res.statusCode != 200) {
        alert("请求失败");
        exit();
    };
}

function adm(da, name) {
    let d = da;
    app.startActivity({
        action: "android.intent.action.SEND",
        type: "*/*",
        packageName: "com.dv.adm.pay",
        data: d,
        className: "com.dv.adm.pay.AEditor"
    });
    let e = className("android.widget.EditText").id("edit_name");
    e.findOne().setText(name + ".mp3");
    sleep(100);
    let f = className("android.widget.Button").id("edit_adds");
    if (f.findOne().getText() == "更新") {
        log("歌曲  《"+name+"》 重复")
        className("android.widget.Button").id("edit_canc").text("取消").findOne().click();
    } else {
        log("歌曲  《"+name+"》 添加成功")
        f.findOne().click();
    }
};