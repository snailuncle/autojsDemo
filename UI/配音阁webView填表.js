// WebView.loadUrl("javascript:document.getElementById('账号id').value='账号名'")


var qq号="903729834"

w = floaty.rawWindow(
    <frame id="yidong1" margin="0" gravity="center"  bg="#881e90ff">
        <webview id="a" h="0" w="1" margin="0 0"/>
        <vertical>
            <linear margin="0" bg="#ffffffff">
                <button id="运行" margin="-1 0" text="转换" size="10" h="35" w="50"/>
                <button id="退出" margin="-1 0" text="退出" size="10" h="35" w="50" />
                <button id="移动" margin="-1 0" text="拖动" size="10" h="35" w="50" />
                <button id="发音人" margin="-1 0" text="发音人" size="10" h="35" w="70" />
            </linear>

            <ScrollView id="As" h="*" bg="#882f4f4f">
                <text id="日志" textSize="8sp" textColor="#ff550000"  margin="1">日志</text>
            </ScrollView>
        </vertical>
    </frame>
);
w.setPosition(200, 200)
//w.setSize(device.width/1.7, device.height/4)

w.运行.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_UP:
            自动换 = 0
            if (w.运行.getText() == "转换") {
                toast("开始文字转语音");
                w.运行.setText("停止");
                var thread = threads.start(function() {
                    qq文字转语音(qq号)
                    ui.run(function() {
                        w.运行.setText("转换");
                    })
                });

            } else {
                w.运行.setText("转换");
                thread.interrupt();
            }
            return true;
    }
    return true;
});


w.退出.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_UP:
            toast("退出");
            // activity.finish();
            w.close();
            exit()
            return true;
    }
    return true;
});
w.发音人.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_UP:
            log(Object.keys(发音人).length)
            let s = random(0, Object.keys(发音人).length)
            let b = 0
            for (let a in 发音人) {
                b++
                if (b != s) continue
                w.发音人.setText("" + a);
                发音 = 发音人[a]
                break
            }
            return true;
    }
    return true;
});
/*
w.移动.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_UP:
            return true;
    }
    return true;
})
*/
w.移动.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            aw = w.getWidth();
            ah = w.getHeight();
            windowX = w.getX();
            windowY = w.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            w.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y))
            return true;
        case event.ACTION_UP:
            return true;
    }
    return true;
})
发音人 = {
    小俊: 65070,
    小桃丸: 60120,
    程程: 65080,
    小南: 65340,
    小媛: 60100,
    蜡笔小新: 60170,
    楠楠: 60130,
    奥巴马: 69055
}
ui.run(function() {
    w.a.getSettings().setJavaScriptEnabled(true);
    w.a.getSettings().setUserAgentString("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36");
    w.a.loadUrl("http://www.peiyinge.com/make/#");
})
sleep(5000)
ui.run(function() {
    w.a.evaluateJavascript("var 结果=0;" + 语音url生成.toString(), function(f) {})
})
toast("载入完成可以合成啦")
发音 = 60120
setInterval(() => {}, 1000);

function 文字转语音(内容, 路径) {
    //内容 = "虽然我想不太可能。你该不会是为了帮助他人啊,正义什么的……这种胡闹的玩笑而和这家伙契约的吧~!"
    ui.run(function() {
        w.a.evaluateJavascript("语音url生成('" + 内容 + "'," + 发音 + ");", function(f) {
            toastLog("获取语音中", f)
        })
    })
    语音url = 0
    while (1) {
        ui.run(function() {
            w.a.evaluateJavascript("结果;", function(f) {
                toastLog("获取链接中" + f)
                if (f.length > 5) 语音url = eval(f)
            })
        })
        sleep(1000)
        if (语音url) break
    }
    sleep(100)
    log(语音url)
    var res = http.get(语音url);
    if (res.statusCode != 200) {
        toast("请求失败");
    }
    files.writeBytes(路径, res.body.bytes());
    toast("下载成功");
    // app.viewFile(路径);
}
//
function qq文字转语音(qq) {
    var 界面, 内容
    if (界面 = id("input").findOnce()) {
        内容 = 界面.text()
    }
    if (!内容) {
        toastLog("内容为空")
        return 0
    }
    var date1 = (new Date().getYear() + 1900) * 100 + new Date().getMonth() + 1
    var date2 = new Date().getDate()
    var 路径 = "/sdcard/tencent/MobileQQ/" + qq + "/ptt/" + date1 + "/" + date2 + "/"
    sleep(200)
    if (desc("开始录音").find().empty()) {
        accessibilityFocused(false).checked(false).className("android.widget.ImageView").clickable(true).column(-1).columnCount(0).column(-1).contextClickable(false).depth(9).dismissable(false).findOne().click();
    }
    sleep(200)
    click("录音")
    sleep(200)
    desc("开始录音").find().click()
    sleep(1650)
    desc("停止录音").find().click()
    toast(路径);
    sleep(800)
    var fileName = max(files.listDir(路径))
    文字转语音(内容, 路径 + fileName)
    sleep(200)
    id("listen_panel_send_tv").find().click()
}

function max(array) {
    var a = 0
    for (i = 0; i < array.length; i++) {
        re = /\d+/g
        name = array[i].match(re, "g")
        if (name > a) {
            a = name
        }
    }
    return "stream_" + a + ".slk";
}

function 语音url生成(内容, 发音人) {
    /*
    发音人:
    小俊=65070
    小桃丸=60120
    程程=65080
    小南=65340
    小媛=60100
    蜡笔小新=60170
    楠楠=60130
    */
    结果 = 0
    发音人 = 发音人 || 60120
    var 音量 = 20; //-20到20
    var 速度 = 0; //-200到200
    var val = '{"channel": "' + channel + '","synth_text_hash_code":"' + CryptoJS.MD5(ClearBr(内容)) + '"}';
    getAjax('/1.0/works_synth_sign', val, true, function(data) {
        var a = eval(data);
        var ts = a.time_stamp;
        var sign = a.sign_text
        var url = 'http://proxy.peiyinge.com:17063/synth?ts=' + ts + '&sign=' + sign + '&vid=' + 发音人 + '&volume=' + 音量 + '&speed=' + 速度 + '&content=' + 内容
        console.log(url);
        结果 = url
    })
    // setInterval(function(){},"6000")
    return 1
}
var 结果
//语音url生成('虽然我想不太可能。你该不会是为了帮助他人啊,正义什么的……这种胡闹的玩笑而和这家伙契约的吧~!')
