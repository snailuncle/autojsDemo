"ui";
var tip = '功能使用教程\n1.在此区域输入要查询的成语，可批量查询（一个成语一行，具体看可以看示例\n2."历史"查看刚才查询的成语，有时候查询失败，可以点历史在查询一遍\n3.长按 "历史"可以查看  "保存"的文件\n4.“保存”可以把输入框中的内容进行保存，默认路径在"/sdcard/成语意思.txt"\n5.长按 "保存"把此区域的文本复制\n6.“导入”可以把提前编辑好的成语(一个成语一行)导入查看或查询，默认导入路径"/sdcard/成语.txt"\n7.“示例”批量查询成语及导入的标准格式\n\n \n       此脚本并不完美，有兴趣可自行修改\n ';
var Examples = "起早贪黑\n闻鸡起舞\n默默无闻\n精卫填海\n一叶障目";
ui.layout(
    <vertical padding="8">
        <horizontal>
            <text textColor="black" textSize="18sp" layout_weight="1">成语字典 v1.5</text>
            <button id="lishi" text="历史" w="50" style="Widget.AppCompat.Button.Borderless.Colored"/>
            <button id="del" text="删除" w="50" style="Widget.AppCompat.Button.Borderless.Colored"/>
            <button id="baocun" text="保存" textSize="15sp" w="50" style="Widget.AppCompat.Button.Borderless.Colored"/>
        </horizontal>
        <input id="text" layout_weight="1" hint="{{tip}}" gravity="top" bg="#00FF00" alpha="0.5"/>
        <horizontal>
            <button layout_weight="1" text="查询" id="chaxun"/>
            <button layout_weight="1" text="清空" id="qingkong"/>
            <button layout_weight="1" text="导入" id="daoru"/>
            <button layout_weight="1" text="示例" id="shili"/>
        </horizontal>
    </vertical>
);
var str = new Array();

//历史
ui.lishi.click(() => { 
    ui.text.setText(str.toString());
    return true;
});
//长按历史  查看
ui.lishi.longClick(() => {
    if (files.exists("/sdcard/成语意思.txt")) {
        ui.text.setText(files.read("/sdcard/成语意思.txt"));
        toast('导入成功!!');
    } else {
        toast("你还没有保存过呢");
    }
    return true;
});
//保存
ui.baocun.click(() => {
    var txt = ui.text.text();
    if (txt) {
       // toast(txt);
        files.append("/sdcard/成语意思.txt", txt+"\n\n\n");
        toast('保存成功!\n"/sdcard/成语意思.txt"');
    } else {
       // toast("还没有内容呢✺◟(∗❛ัᴗ❛ั∗)◞✺");
    }
    return true;
});
//长按保存  复制
ui.baocun.longClick(() => {
    let txt = ui.text.text();
    if (txt) {
        toast("复制成功！");
        setClip(txt);
    } else {
        //toast("没有内容呢✺◟(∗❛ัᴗ❛ั∗)◞✺");
    }
    return true;
});
//删除
ui.del.click(() => {
    if (files.exists("/sdcard/成语意思.txt")) {
    files.remove("/sdcard/成语意思.txt");
    toast('删除成功!!');
    return true;
    }
});
//查询
ui.chaxun.click(() => {
    files.remove("/sdcard/.temp.txt")
    str = [];
    str.push(ui.text.text());
    查询();
    return true;
});
//清空
ui.qingkong.click(() => {
    ui.text.setText("");
    return true;
});
//导入
ui.daoru.click(() => {
    if (files.exists("/sdcard/成语.txt")) {
        ui.text.setText(files.read("/sdcard/成语.txt"));
        toast('导入成功!!\n"/sdcard/成语.txt');
    } else {
        toast("把你要导入的成语放到  /sdcard/成语.txt   里面");
    }
    return true;
});
//示例
ui.shili.click(() => {
    ui.text.setText(Examples);
    return true;
});
//显示
function show(lg) {
    ui.run(() => {
        files.append("/sdcard/.temp.txt", lg);
        ui.text.setText(files.read("/sdcard/.temp.txt"));;
    });
}

function 查询() {
    threads.start(function() {
        log(files.remove("/sdcard/.temp.txt"));
        var txt = ui.text.text();
        if (txt) {
            var info = txt.split("\n");
            for (let a = 0; a < info.length; a++) {
                var url = "http://m.dict.cn/hanyu/search.php?q=";
                var res = http.get(url + info[a]);
                var html = res.body.string();
                html = cutstr(html, "<dl", "</dl>", 1, 20);
                html = cutstr(html, "<dd", "</dd>", 1, 20);
                html = html.split(">");
                var txt = info[a] + "\n【释义】" + html[1] + "\n";
                //toast(info[a] + "  完成!");
                show(txt);
                sleep(300);
            }
        } else {
            toast("没有内容!!");
        }
    });
}


function cutstr(a, b, c, f, e) {
    a = a.split(b);
    var d = "";
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