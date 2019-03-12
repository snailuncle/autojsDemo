var numbel=dialogs.rawInput("请输入你要查询的号码：","");
var url = "http://m.ip138.com/mobile.asp?mobile=";
var html = http.get(url+numbel).body.string();
html = cutstr(html, "<tr", "</tr>", 2, 20);
html= html.replace(/[<>\/tdspan]+/g, "\n").split("\n");
dialogs.alert("查询的号码："+numbel+"\n"+"\n"+"①"+html[1]+"\n"+html[2]+"\n"+"②"+html[3]+"："+html[4]+"\n"+"③"+html[5]+"："+html[6]+"\n"+"④"+html[7]+"："+html[8]);

function cutstr(a, b, c, f, e) {
    a = a.split(b);
    var d = ""
    if (e < a.length && e != null) {} else {
        e = a.length;
    }
    if (f == null) {
        f = 1;
    }
    for (i = f; i < e; i++) {
        tmp = a[i].split(c);
        if (tmp.length > 1) {
            d += tmp[0];
        }
    }
    return d;
}