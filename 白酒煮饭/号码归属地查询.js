"ui";
ui.layout(
    <frame background="#515155">
        <vertical align="top" margin="30">
            <text textSize="26sp" textStyle="bold">手机号码(段)：</text>
            <linear>
                <input id="num" layout_weight="1" bg="#ffffff" h="45" paddingLeft="10sp" maxLines="1" inputType="number" emsMax="11" hint="输入手机号码" alpha="0.5"/>
                <button h="55" w="70" id="ok" text="查询" />
            </linear>
            <linear>
                <text h="20" w="auto" text="手机号码段：" textSize="18sp"/>
                <text id="sj" h="30" w="auto"  textSize="18sp"/>
            </linear>
            <linear>
                <horizontal>
                    <text h="20" w="auto" text="卡号归属地：" textSize="18sp"/>
                    <text id="gsd" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text h="20" w="auto" text="卡类型：" textSize="18sp"/>
                    <text id="klx" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text h="20" w="auto" text="区号：" textSize="18sp"/>
                    <text id="qh" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text h="20" w="auto" text="邮政编码：" textSize="18sp"/>
                    <text id="yzbm" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
        </vertical>
    </frame>
);
ui.ok.click(function() {
    threads.start(function() {
        let sd = ui.num.text();
        if (sd) {
            var sum = query(sd);
            if (sum) {
                ui.run(() => {
                    ui.sj.setText(sd);
                    ui.gsd.setText(sum[2]);
                    ui.klx.setText(sum[4]);
                    ui.qh.setText(sum[6]);
                    ui.yzbm.setText(sum[8]);
                });
            }
        }
    });
});
ui.ok.on("long_click", ()=>{
    ui.num.setText("");
});
  
    
ui.sj.click(function() {
    let sjj = ui.sj.text();
    if (sjj) {
        setClip(sjj);
        toast("复制成功");
    }
});
ui.gsd.click(function() {
    let gsdd = ui.gsd.text();
    if (gsdd) {
        setClip(gsdd);
        toast("复制成功");
    }
});
ui.klx.click(function() {
    let klxx = ui.klx.text();
    if (klxx) {
        setClip(klxx);
        toast("复制成功");
    }
});
ui.qh.click(function() {
    let qhh = ui.qh.text();
    if (qhh) {
        setClip(qhh);
        toast("复制成功");
    }
});
ui.yzbm.click(function() {
    let yzbmm = ui.yzbm.text();
    if (yzbmm) {
        setClip(yzbmm);
        toast("复制成功");
    }
});



function query(numbel) {
    ui.run(() => {
        ui.sj.setText("");
        ui.gsd.setText("");
        ui.klx.setText("");
        ui.qh.setText("");
        ui.yzbm.setText("");
    });
    let url = "http://m.ip138.com/mobile.asp?mobile=";
    let html = http.get(url + numbel).body.string();
    html = cutstr(html, "<tr", "</tr>", 2, 20);
    if (html) {
        str = html.replace(/[<>\/tdspan]+/g, "\n").split("\n");
        return str;
    } else {
        toast("您输入的号码有误，请重新输入！");
        return false;
    }
}



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