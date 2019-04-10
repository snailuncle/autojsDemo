"ui";
ui.layout(
    <frame background="#515155">
        <vertical align="top" margin="30">
            <text textSize="26sp" textStyle="bold">身份证号码：</text>
            <linear>
                <input id="num" layout_weight="1" bg="#ffffff" h="45" paddingLeft="10sp" maxLines="1" inputType="number" emsMax="11" hint="输入身份证号码" alpha="0.5"/>
                <button h="55" w="70" id="ok" text="查询" />
            </linear>
            <linear>
                <text id="xkh" h="30" w="auto"  textSize="18sp"/>
            </linear>
            <linear>
                <horizontal>
                    <text id="xb" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text id="csrq" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text id="fzd" h="40" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
        </vertical>
    </frame>
);
ui.ok.click(function() {
    threads.start(function() {
        let sd = ui.num.text();
        if (sd) {
            var sum = sfz(sd);
            if (sum) {
                ui.run(() => {
                    ui.xb.setText(sum[1]);
                    ui.csrq.setText(sum[2]);
                    ui.fzd.setText(sum[3]);
                });
            }
        }
    });
});
ui.ok.on("long_click", () => {
    ui.num.setText("");
});

ui.xb.click(function() {
    let xbj = ui.xb.text();
    if (xbj) {
        setClip(xbj);
        toast("复制成功");
    }
});
ui.csrq.click(function() {
    let csrqd = ui.csrq.text();
    if (csrqd) {
        setClip(csrqd);
        toast("复制成功");
    }
});

ui.fzd.click(function() {
    let qhh = ui.fzd.text();
    if (qhh) {
        setClip(qhh);
        toast("复制成功");
    }
});


function sfz(ble) {
    ui.run(() => {
        ui.xb.setText("");
        ui.csrq.setText("");
        ui.fzd.setText("");
    });
    let url = "http://qq.ip138.com/shenfenzheng/search.asp";
    let html = http.post(url, {
        "userid": ble,
        "action": "idcard"
    }).body.string();
    html = cutstr(html, "<li", "</li>", 12, 16);
    html = html.split(">");
    if (html.length>2) {
        return html;
    } else {
        toast("身份证号码错误或不存在！");
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