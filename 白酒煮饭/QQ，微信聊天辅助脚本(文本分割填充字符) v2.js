runControl(true);

// 按下 脚本弹出的 发送按钮 才会起作用。
// 由于QQ小表情 也会被转化为文本，导致小表情失效，建议有小表情的时候 不要用脚本发送
// 运行之后 发送框 闪现，然后消失，这是正常的。


// 更新内容: 增加了 发送按钮 跟随QQ和微信的发送按钮， 本脚本的按钮 会随着 聊天软件的发送按钮 位置的移动而移动。
//              移除了 发送按钮 随意移动的功能。


var QQ分割字符 = "꯭", // 字符和字符之间 需要填充的 符号
    QQ行起始字符 = "꯭", //每一行起始位置需要填充的符号
    QQ行结束字符 = "꯭", //每行结尾需要填充的符号
    QQ分割字符串长度 = 0, // 0 表示不切割，15 表示每间隔15个字符就换行

    微信分割字符 = "꯭",
    微信行起始字符 = "꯭",
    微信行结束字符 = "꯭",
    微信分割字符串长度 = 0;

var flo = floaty.rawWindow(
        <button id="time" text="发送" bg="#aa006000" textSize="10sp"/>
    ),
    run = true,
    floatyState = false;

flo.exitOnClose();
sleep(500);

var xy0 = [0, 0],
    dxy = [0, 0],
    state = "点击",
    longPressTime = 600,
    longPressThreads = "";
flo.setSize(0, 0);
flo.time.setOnTouchListener(function(v, e) {
    switch (e.getAction()) {
        case e.ACTION_DOWN:

            longPressThreads = threads.start(function() {
                sleep(longPressTime);
                state = "长按";
                长按();
            });

            xy0 = [e.getRawX(), e.getRawY()];
            state = "点击";
            break

        case e.ACTION_MOVE:
            dxy = [Math.floor(e.getRawX() - xy0[0]), Math.floor(e.getRawY() - xy0[1])];

            switch (state) {
                case "点击":
                    if (Math.abs(dxy[0]) > 10 || Math.abs(dxy[1]) > 10) {
                        state = "滑动";
                        if (longPressThreads.isAlive()) longPressThreads.interrupt();
                    }
                    break

                case "滑动":
                    break
            }
            break

        case e.ACTION_UP:
            if (state != "点击") {
                state = "点击";
            } else {
                if (longPressThreads.isAlive()) longPressThreads.interrupt();
                单击();
            }
    }
    return true;
});


setInterval(() => {
    try {
        auto();
        switch (currentActivity()) {
            case "com.tencent.mobileqq.activity.SplashActivity":
            case "com.tencent.mobileqq.activity.ChatActivity":
            case "com.tencent.mm.ui.chatting.ChattingUI":
            case "com.tencent.mm.ui.LauncherUI":
                let sendButton = text("发送").enabled(true).findOne(200);
                if (sendButton != null) {
                    let bo = sendButton.bounds();
                    if ((!floatyState) || (Math.abs(flo.getY() - bo.top + bo.height() * 1.3) > 2)) {
                        flo.setPosition(bo.left, bo.top - bo.height() * 1.3);
                        flo.setSize(bo.width(), bo.height());
                        floatyState = true;
                    }
                } else {
                    if (floatyState) {
                        flo.setSize(0, 0);
                        floatyState = false;
                    }
                }
                break;
            default:
                if (floatyState) {
                    flo.setSize(0, 0);
                    floatyState = false;
                }
        }
    } catch (e) {
        log(e);
    }
}, 500);

events.on("exit", function() {
    run = false;
});

function 长按() {}

function 单击() {
    try {
        auto();
        threads.start(function() {
            switch (currentActivity()) {
                case "com.tencent.mobileqq.activity.SplashActivity":
                case "com.tencent.mobileqq.activity.ChatActivity":
                    let sendButton = id("fun_btn").text("发送").enabled(true).findOne(300);
                    if (sendButton == null) return;
                    let obj = className("android.widget.EditText").editable(true).findOne(300);
                    if (obj == null) return;
                    let objText = obj.text();
                    if (objText.length == 0) return;
                    if (objText.indexOf("\/") == -1) {
                        objText = wordDispose(objText, QQ分割字符, QQ分割字符串长度);
                        obj.setText(QQ行起始字符 + objText.join(QQ行结束字符 + "\n" + QQ行起始字符) + QQ行结束字符);
                        sleep(200);
                    }
                    sendButton.click();
                    break

                case "com.tencent.mm.ui.chatting.ChattingUI":
                case "com.tencent.mm.ui.LauncherUI":
                    sendButton = text("发送").className("android.widget.Button").enabled(true).findOne(300);
                    if (sendButton == null) return;
                    obj = className("android.widget.EditText").editable(true).findOne(300);
                    if (obj == null) return;
                    objText = obj.text();
                    if (objText.length == 0) return;
                    objText = wordDispose(objText, 微信分割字符, 微信分割字符串长度);
                    obj.setText(微信行起始字符 + objText.join(微信行结束字符 + "\n" + 微信行起始字符) + 微信行结束字符);
                    sleep(200);
                    sendButton.click();
                    break
            }
        });
    } catch (e) {
        log(e);
    }
}

function wordDispose(t, ico, size) {
    var t_, ico_, size_, tex = []
    switch (arguments.length) {
        case 0:
            return "";
            break

        case 1:
            t_ = arguments[0];
            ico_ = "ˇ";
            size_ = 0;
            break

        case 2:
            t_ = arguments[0];
            if (isNaN(arguments[1])) {
                ico_ = arguments[1];
                size_ = 0;
            } else {
                ico_ = "ˇ";
                size_ = arguments[1];
            }
            break

        default:
            t_ = arguments[0];
            if (isNaN(arguments[2])) {
                if (isNaN(arguments[1])) {
                    return "";
                } else {
                    ico_ = arguments[2].toString();
                    size_ = arguments[1];
                }
            } else {
                ico_ = arguments[1].toString();
                size_ = arguments[2];
            }
    }

    if (!t_) return "";
    t_ = t_.toString().split("\n");
    while (t_.length > 0) {
        t = string_split(size_, t_.shift());
        while (t.length > 0) {
            tex.push(t.shift().split("").join(ico_));
        }
    }
    return tex;
}

function string_split(size, t) {
    if (arguments.length != 2) return [];
    if (isNaN(size)) return [];
    t = t.toString();
    if (size == 0) return [t];
    var tex = [],
        cishu = Math.ceil(t.length / size);
    for (var i = 0; i < cishu; i++) {
        tex.push(t.substr(i * size, size));
    }
    return tex;
}

function runControl(stop) {
    let arr = engines.all(),
        me = engines.myEngine(),
        run = true;
    for (i in arr) {
        if (arr[i].getSource().toString() == me.getSource().toString() && arr[i] != me) {
            if (stop != false) arr[i].forceStop();
            run = stop == true;
        }
    }
    if (!run) exit();
}