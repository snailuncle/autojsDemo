"ui";

function QQ回复() {
    function 新消息() {
        var msgcounts = id("listView1").findOne();
        var a = msgcounts.child(msgcounts.childCount() - 1);
        var b = a.child(a.childCount() - 1).text();
        var b1 = a.child(a.childCount() - 1).bounds();
        if (b1.centerX() < 530) {
            return b;
        }
    }

    function 得到回复(message) {
        var url = "http://www.tuling123.com/openapi/api";
        var r = http.postJson(url, {
            key: "57882c57960f4e0c9299e6fa555b5585",
            info: message,
        });
        return r.body.json().text;
    }

    function 发送回复() {
        var msgcounts = id("listView1").findOne();
        var a = msgcounts.child(msgcounts.childCount() - 1);
        var b = a.child(a.childCount() - 1).text();
        var b1 = a.child(a.childCount() - 1).bounds();
        waitForActivity("com.tencent.mobileqq.activity.SplashActivity", [period = 200])
        if (id("listView1").exists() && id("input").exists()) {
            if (b1.centerX() < 530) {
                setText("[自动回复]" + 得到回复(新消息()));
                click("发送");
            }
        }
    }
    while (1) {
        发送回复()
    }
}
//随机获取评论进行刷屏或回复等操作
function 评论() {
    //&&&&&&&&&&&&&&&&&&&&
    function QQ() {
        app.launchPackage("com.tencent.mobileqq");
        toast("等待聊天页面");
        waitForActivity("com.tencent.mobileqq.activity.SplashActivity", [period = 200]);
        for (i = 0; i < number; i++) {
            //调用api获取评论
            var a = http.get("http://word.rainss.cn/api_system.php?type=txt").body.string();
            id("input").findOne().click(); //输入框
            sleep(200);
            setText(a);
            sleep(200);
            id("fun_btn").findOne().click(); //发送
            sleep(200);
        }
    }
    //&&&&&&&&&&&&&&&&&&&&&
    function 微信() {
        app.launchPackage("com.tencent.mm");
        toast("等待聊天页面");
        waitForActivity("com.tencent.mm.ui.LauncherUI", [period = 200]);
        for (i = 0; i < number; i++) {
            //调用api获取评论
            var a = http.get("http://word.rainss.cn/api_system.php?type=txt").body.string();
            id("aac").findOne().click(); //输入框
            sleep(200);
            setText(a);
            sleep(200);
            text("发送").findOne().click(); //发送
            sleep(200);
        }
    }
    //&&&&&&&&&&&&&&&&&&&&
    function 微信朋友圈() {
        app.launchPackage("com.tencent.mm");
        toast("等待朋友圈页面");
        waitForActivity("com.tencent.mm.plugin.sns.ui.SnsTimeLineUI", [period = 200]);
        for (i = 0; i < number; i++) {
            //调用api获取评论
            var a = http.get("http://word.rainss.cn/api_system.php?type=txt").body.string();
            desc("评论").id("dbs").findOne().click(); //输入框
            sleep(200);
            id("das").click();
            sleep(200);
            setText(a);
            sleep(200);
            text("发送").findOne().click(); //发送
            sleep(200);
        }
    }
    //&&&&&&&&&&&&&&&&&&&&&&
    function QQ空间() {
        app.launchPackage("com.tencent.mobileqq");
        toast("等待空间页面");
        waitForActivity("cooperation.qzone.QzoneFeedsPluginProxyActivity", [period = 200]);
        for (i = 0; i < number; i++) {
            //调用api获取评论
            var a = http.get("http://word.rainss.cn/api_system.php?type=txt").body.string();
            var widget = desc("评论").findOne(); //评论框
            click(widget.bounds().centerX(), widget.bounds().centerY());
            sleep(500);
            setText(a);
            sleep(200);
            text("发送").findOne().click(); //发送
            sleep(200);
        }
    }
    //&&&&&&&&&&&&&&&&&&&&&&&
    function 网易云音乐评论() {
        app.launchPackage("com.netease.cloudmusic");
        toast("打开音乐评论主页面")
        waitForActivity("com.netease.cloudmusic.activity.PlayerActivity", [period = 200]);
        for (i = 0; i < number; i++) {
            //调用api获取评论
            var a = http.get("http://word.rainss.cn/api_system.php?type=txt").body.string();
            sleep(500);
            id("a0w").findOne().click(); //评论按钮
            setText(a);
            sleep(200);
            text("发送").findOne().click(); //发送
            sleep(200);
        }
    }
    //&&&&&&&&&&&&&&&&&&&
    function 微博评论() {
        app.launchPackage("com.sina.weibo");
        toast("打开微博评论页面");
        waitForActivity("com.sina.weibo.feed.DetailWeiboActivity", [period = 200]);
        for (i = 0; i < number; i++) {
            //调用api获取评论
            var a = http.get("http://word.rainss.cn/api_system.php?type=txt").body.string();
            sleep(500);
            desc("评论").id("comment").findOne().click() //评论按钮
            sleep(500);
            setText(a);
            sleep(200);
            text("发送").findOne().click(); //发送
            sleep(200);
        }
    }
    //&&&&&&&&&&&&&&&&&&&&&&&
    function UC浏览器评论() {
        app.launchPackage("com.UCMobile");
        toast("打开网页评论页面");
        waitForActivity("com.uc.browser.InnerUCMobile", [period = 200]);
        for (i = 0; i < number; i++) {
            //调用api获取评论
            var a = http.get("http://word.rainss.cn/api_system.php?type=txt").body.string();
            sleep(500);
            desc("add_comment_item2").findOne().click() //评论按钮
            sleep(500);
            setText(a);
            sleep(200);
            text("发送").findOne().click(); //发送
            sleep(200);
        }
    }
    //&&&&&&&&&&&&&&&&&&&&&&
    var sex = dialogs.singleChoice("请选择", ["QQ()", "微信()", "QQ空间()", "网易云音乐评论()", "微博评论()", "微信朋友圈()", "UC浏览器评论()"], 2);
    toast("选择了第" + (sex + 1) + "个选项");
    var number = dialogs.rawInput("输入评论次数", "5")
    //var QQ = dialogs.confirm("QQ刷屏点确定，微信点取消");
    //&&&&&&&&&&功能区&&&&&&&&&&&&&&
    if (sex == 0) {
        QQ();
        toast("刷屏结束");
    } else if (sex == 1) {
        微信();
        toast("刷屏结束");
    } else if (sex == 2) {
        QQ空间();
    } else if (sex == 3) {
        网易云音乐评论();
    } else if (sex == 4) {
        微博评论();
    } else if (sex == 5) {
        微信朋友圈();
    } else if (sex == 6) {
        UC浏览器评论();
    }
}

//====================================
function 联系作者() {
    toast("本人精通CSS、JavaScript、PHP、ASP、C、C＋＋、C#、Java、Ruby、Perl、Lisp、python、Objective-C、ActionScript、Pascal等单词的拼写 ，及Windows、Linux、Andriod、OS X等环境的开关机。如有疑问请与我联系");
    var qq号 = "2661621351";
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=" + qq号,
        packageName: "com.tencent.mobileqq",
    });
    //waitForActivity("", [period = 200]);
}
//==========================
ui.layout(
        <frame>   
        <vertical>         
        <button id="one" color="red" text="[联系作者QQ]"style="Widget.AppCompat.Button.Colored" w="auto" h="auto"/>   
        <button id="two" color="yellow" text="[联网随机评论]"  style="Widget.AppCompat.Button.Colored" w="auto" h="auto"/>        
        <button id="three" color="black" text="[QQ自动回复] " style="Widget.AppCompat.Button.Colored" w="auto" h="auto"/>
        <button id="four" color="blue" text="[获取更多功能]" style="Widget.AppCompat.Button.Colored" w="auto" h="auto"/>
        </vertical> 
        </frame>
);
//在新线程执行的代码
ui.one.on("click", () => {
    threads.start(function() {
        //这里放方法
        联系作者();
    });

});
ui.two.on("click", () => {
    threads.start(function() {
        评论();
    });
});
ui.three.on("click", () => {
    threads.start(function() {
        toast(" 请打开聊天页面，会自动进行消息回复呦")
        QQ回复();
    });
});
ui.four.on("click", () => {
    threads.start(function() {
        alert("本人精通CSS、JavaScript、PHP、ASP、C、C＋＋、C#、Java、Ruby、Perl、Lisp、python、Objective-C、ActionScript、Pascal等单词的拼写 ，及Windows、Linux、Andriod、OS X等环境的开关机");
    });
});