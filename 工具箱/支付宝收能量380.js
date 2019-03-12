本地配置 = storages.create("定时任务");

var 选择 = 弹窗选项("开始蚂蚁森林收能量？,退出,推迟5分钟,推迟15分钟")
if (选择 == 1) {
    exit()
} else if (选择 == 2) {
    //发送参数("%A蚂蚁森林=5;%A森林时间="+(5*60*1000+new Date().getTime()))
    本地配置.put("蚂蚁森林", 5 * 60 * 1000 + new Date().getTime())
    exit()
} else if (选择 == 3) {
    //发送参数("%A蚂蚁森林=15;%A森林时间="+(15*60*1000+new Date().getTime()))
    本地配置.put("蚂蚁森林", 15 * 60 * 1000 + new Date().getTime())
    exit()
}
停止其他脚本()
toastLog("开始蚂蚁森林收能量")
events.on("exit", function() {
    toastLog("结束运行");
    时间 = new Date().getHours()
    log(时间)
    if ((23 < 时间 || 时间 < 4) && 结束) {
        //运行脚本("/storage/emulated/0/脚本/羊毛/头条精选/头条精选自用.js")
    }
});
//console.show()
_toast = toast
_log = log
log = function() {
    try {
        l
    } catch (e) {
        let a = e.stack
        a = a.replace(/\t.+:/ig, "")
        // _log("\n", a)
        a = a.split("\n")
        _log("第" + a[1] + "行:", util.format.apply(util, arguments))
    }
}


function 气泡(a) {
    var toast时间 = 0
    var aa = function(a) {
        log(a)
        if (new Date().getTime() - toast时间 > 2000) {
            toast时间 = new Date().getTime()
            _toast(a)
        }
    }
    return aa
}

toast = 气泡()
//eval(files.read("/storage/emulated/0/脚本/支付宝/root触屏.js"))
//toastLog = toast
// eval(files.read("/sdcard/脚本/触屏/重写触屏.js"));
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}
锁屏 = 0
结束 = 0
files.createWithDirs("/sdcard/脚本/支付宝/");
伸手 = 找图图片下载("/sdcard/脚本/支付宝/伸手.png", "http://fuzhu.zhinengweixiu.cn/fuzhu/autojs/支付宝/伸手.png")
列表1分钟 = 找图图片下载("/sdcard/脚本/支付宝/列表1分钟.png", "http://fuzhu.zhinengweixiu.cn/fuzhu/autojs/支付宝/列表1分钟.png")
界面1分钟 = 找图图片下载("/sdcard/脚本/支付宝/界面1分钟.png", "http://fuzhu.zhinengweixiu.cn/fuzhu/autojs/支付宝/界面1分钟.png")
帮助 = 找图图片下载("/sdcard/脚本/支付宝/帮助.png", "http://fuzhu.zhinengweixiu.cn/fuzhu/autojs/支付宝/帮助.png")
g = 找图图片下载("/sdcard/脚本/支付宝/g.png", "http://fuzhu.zhinengweixiu.cn/fuzhu/autojs/支付宝/g.png")
t = 找图图片下载("/sdcard/脚本/支付宝/t.png", "http://fuzhu.zhinengweixiu.cn/fuzhu/autojs/支付宝/t.png")
好友排行榜 = 找图图片下载("/sdcard/脚本/支付宝/好友排行榜.png", "http://fuzhu.zhinengweixiu.cn/fuzhu/autojs/支付宝/好友排行榜.png")
次数 = 0
最短时间 = 99
卡住检测 = 0
重载 = 0
重载次数 = 0
意图打开次数 = 0
while (次数 < 200) {
    次数++
    控件集合 = find()
    var 时间 = new Date().getTime()
    img = captureScreen()
    //log("图片分辨率",img.getWidth(),img.getHeight())
    时间 = new Date().getTime()
    p = images.findImageInRegion(img, 好友排行榜, 110, 90, 810, 300, threshold = 0.9)
    //log("好友排行时间",new Date().getTime() - 时间)
    if (p) {
        载入列表 = 0
        let 颜色 = images.pixel(img, 169, 300)
        for (let a = 1; a < 6; a++) {
            if (images.pixel(img, 169, 300 + a * random(100, 150)) != 颜色) {
                载入列表 = 1
                break
            }
        }
        if (!载入列表) {
            log("好友排行榜载入中")
            卡住检测++
            if (卡住检测 > 30) {
                卡住检测 = 0
                back()
                sleep(15000)
            }
            sleep(100)
            continue
        }
        log("好友排行榜载入完成")
        点击查看更多 = threads.start(function() {
            好友列表载入 = 0
            for (let a = 0; a < 20; a++) {
                if (desc("邀请").exists()) {
                    log("已经全部载入完成")
                    return
                } else if (text("好友排行榜").exists()) {
                    if (查看更多 =idContains("J_rank_list_more").findOnce()) {
                        log(查看更多.id())
                        for (let j = 0; j < 50; j++) {
                            if (好友列表载入) 点击查看更多.interrupt();
                            try {
                                if (!查看更多.click()) 点击查看更多.interrupt();
                                sleep(100)
                            } catch (e) {
                                log(e, "错误")
                                点击查看更多.interrupt();
                            }
                        }
                    } else {
                        log("没有", a)
                        sleep(500)
                    }
                } else {
                    log("其他界面")
                    break
                }
            }
        })
        查找手()
    } else if (packageName("com.miui.securitycenter").exists()) {
        log("应用锁")
        gesture(200, [255, 1017], [866, 992], [818, 1632])
        sleep(500);
    } else if (idContains("h5_tv_title").text("蚂蚁森林").exists()) {
        log("蚂蚁森林主页")
        最短时间 = 99
        自己时间 = descContains("分后才能收取").find()
        for (let v = 0; v < 自己时间.size(); v++) {
            if (!自己时间[v].desc().match(/小时/)) {
                let 剩余时间 = 自己时间[v].desc().match(/(\d+)分后才能收取/)[1]
                if (最短时间 > 剩余时间) {
                    最短时间 = 剩余时间
                }
            }
        }
        sleep(100)
        if (boundsInside(736,131,1080,518).desc("种树").exists()) {
            log("攻略主页")
            sleep(500)
            收能量(1)
            滑动 = scrollable(true).findOnce()
            //滑动.scrollBackward()//下滑()
            滑动.scrollForward()
            sleep(300)
            滑动.scrollForward()
            sleep(300)
            滑动.scrollForward()
            sleep(300)
            滑动.scrollForward()
            sleep(300)
            滑动.scrollForward()
        } else {
            log("上滑")
            滑动 = scrollable(true).findOnce()
            if (滑动) {
                滑动.scrollBackward() //下滑()
                sleep(300)
                滑动.scrollBackward() //下滑()
                sleep(300)
                滑动.scrollBackward() //下滑()
                //滑动.scrollForward()
            }
        }
        if (desc("查看更多好友").depth(12).findOnce()) {
            log("点击查看更多好友")
            控件点击(desc("查看更多好友").depth(12).findOnce(), 2)
            sleep(500)
        }

    } else if (textEndsWith("的蚂蚁森林").exists()) {
        log(textEndsWith("的蚂蚁森林").findOnce().text())
        sleep(1000)
        img = captureScreen()
        保护罩 = descMatches(/\d+:\d+:\d+/).exists()
        保护罩0 = images.findColorInRegion(img, "#ffc3fb58", 429, 345, 651 - 429, 23, threshold = 20)
        if (保护罩0 || 保护罩) {
            toastLog("有保护罩…逃")
            back()
            sleep(500)
        } else {
            收能量(1)
            sleep(100)
            收能量(1)
            if (重载次数 > 0) {
                for (let i = 0; i < 30; i++) {
                    img = captureScreen()
                    p = images.findImageInRegion(img, 界面1分钟, 36, 189, 1044 - 90, 899 - 189, threshold = 0.9)
                    if (p) {
                        收能量(1)
                    } else {
                        break
                    }
                }
                重载次数--
            }
            收能量(1)
            重载 = 1
            if (textEndsWith("的蚂蚁森林").exists()) {
                back()
            } else {
                back()
                sleep(300)
                back()
                sleep(200)
                back()
            }
            sleep(300)
        }

    } else if (!context.getSystemService(context.POWER_SERVICE).isInteractive()) {
        log("屏幕没亮")
        device.wakeUp()
        锁屏 = 1
        sleep(1000)
        swipe(500, 1800, 600, 700, 200)
        sleep(1000)
        gesture(800, [175, 998], [271, 1367], [954, 1377], [820, 1666], [163, 1659])
        sleep(1000)
    } else if (packageName("com.android.systemui").exists() || packageName("com.android.keyguard").exists()) {
        log("锁屏")
        锁屏 = 1
        Swipe(500, 1800, 600, 700, 500)
        sleep(1000)
        gesture(800, [175, 998], [271, 1367], [954, 1377], [820, 1666], [163, 1659])
        sleep(1000)
    } else if (!packageName("com.eg.android.AlipayGphone").exists()) {
        toastLog("支付宝不在前台")
        运行支付宝()
        sleep(200)
    } else if (text("稍后再说").exists()) {
        text("稍后再说").findOnce().click()
    } else if (desc("语音").exists()) {
        log("聊天界面")
        back()
        sleep(500)
        back()
        sleep(500)
    } else if (desc("服务器打瞌睡了").exists()) {
        back()
        sleep(5000)
    } else {
        意图打开次数++
        if (意图打开次数 > 2) {
            意图打开次数 = 0
            back()
            sleep(1000)
            continue
        }
        var i = app.intent({
            action: "VIEW",
            data: "alipayqr://platformapi/startapp?saId=60000002" // +"https://66666674.h5app.alipay.com/www/index.htm"
        });
        app.startActivity(i);
        sleep(1000)

    }
    sleep(100)
}

function 弹窗选项(内容, 延时) {
    //弹窗选项("标题,选项1,选项2,哈哈", 2000)
    延时 = 延时 || 3000
    内容 = 内容.split(",")
    var w
    var 选项 = ""
    var 选择 = 0;

    function 弹窗() {
        w = floaty.rawWindow(
            <frame gravity="center" w="200" bg="#dd87ceeb">
                <vertical >
                    <button gravity="center" id="标题" text='我是标题' style="Widget.AppCompat.Button.Borderless.Colored"  textColor="#ff000066"/>
                    选项内容
                </vertical>
                <text gravity="center" id="选项" bg="#00000000">
                </text>
            </frame>
        );
        sleep(100)
        w.setPosition((device.width - w.getWidth()) / 2, 500);
        w.选项.setOnTouchListener(function(view, event) {
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    选择 = (Math.ceil((event.getRawY() - w.getY()) / (w.getHeight() / 内容.length))) - 1
                    toastLog("您选择了第" + 选择 + "个选项")
                    时间 = 0
                    return true;
            }
            return true;
        })
    }
    for (let i = 1; i < 内容.length; i++) {
        选项 += "<button id='选项" + i + "' text='" + 内容[i] + "'/>\n"
    }
    var 窗口 = 弹窗.toString()
    窗口 = 窗口.replace("我是标题", 内容[0])
    窗口 = 窗口.replace("选项内容", 选项)
    eval(窗口 + "\n弹窗()")
    var 时间 = new Date().getTime()
    while ((new Date().getTime() - 时间) < 延时) {
        sleep(200)
    }
    w.close()
    return 选择
}

function 查找手() {
    var 次数 = 0
    滑动 = scrollable(true).findOnce()
    while (滑动 && 次数++ < 100) {
        img = captureScreen()
        var p = images.findImageInRegion(img, g, 950, 100, 100, 1000, threshold = 1)
        if (!p) {
            p = images.findImageInRegion(img, t, 950, 100, 100, 1000, threshold = 1)
        }
        if (!p) {
            p = images.findImageInRegion(img, 好友排行榜, 110, 90, 810, 300, threshold = 0.9)
        }
        if (!p) {
            log("找手退出")
            return 0
        }
        时间 = new Date().getTime()
        var 时间 = new Date().getTime()
        var p = findImage(img, 伸手, {
            region: [900, 200],
            threads: 64,
            threshold: 0.9
        });
        if (!p) {
            p = findImage(img, 帮助, {
                region: [900, 200],
                threads: 64,
                threshold: 0.9
            });
        }
        if (!p && 重载次数 > 1) {
            p = findImage(img, 列表1分钟, {
                region: [850, 200],
                threads: 64,
                threshold: 0.95
            });
        }
        // log(new Date().getTime() - 时间 + "找手")
        if (p) {
            toast("发现能量！" + p);
            好友列表载入 = 1
            click(p.x - random(10, 500), p.y + 10)
            sleep(1000)
            return
        } else {
            var 时间 = new Date().getTime()
            var p = images.findColor(img, "#30bf6c", {
                region: [842, 700, 1, 1000],
                threshold: 10
            })
            if (p) {
                log(new Date().getTime() - 时间, "没有了")
                好友列表载入 = 1
                重载次数++
                if (重载 == 1) {
                    //发送参数("%A蚂蚁森林=5;%A森林时间="+(5*60*1000+new Date().getTime()))
                    本地配置.put("蚂蚁森林", 5 * 60 * 1000 + new Date().getTime())
                    back()
                    sleep(500)
                    重载 = 0
                    return
                    continue
                }
                if (控件集合.findOne(desc("邀请"))) {
                    let 剩余时间 = 控件集合.find(descMatches(/\d+’/))
                    for (let i = 0; i < 剩余时间.length; i++) {
                        let sj1 = parseInt(剩余时间[i].desc().replace(/’/gm, ""))
                        if (最短时间 > sj1) {
                            最短时间 = sj1
                        }
                    }
                }
                back()
                sleep(500)
                toastLog("等待" + 最短时间 + "分钟再来")
                if (最短时间 != 99) {
                    if (最短时间 > 1 && 最短时间 < 3) {
                        //发送参数("%A蚂蚁森林=5;%A森林时间="+(5*60*1000+new Date().getTime()))
                        本地配置.put("蚂蚁森林", 5 * 60 * 1000 + new Date().getTime())
                        sleep((最短时间) * 51 * 1000)
                        toast("开始蚂蚁森林")
                        return
                    } else if (最短时间 < 2) {
                        //发送参数("%A蚂蚁森林=5;%A森林时间="+(5*60*1000+new Date().getTime()))
                        本地配置.put("蚂蚁森林", 5 * 60 * 1000 + new Date().getTime())
                        toast("开始蚂蚁森林")
                        return
                    } else {
                        //发送参数("%A蚂蚁森林=" + (最短时间 - 1)+";%A森林时间="+((最短时间 - 1)*60*1000+new Date().getTime()))
                        本地配置.put("蚂蚁森林", 最短时间 * 60 * 1000 + new Date().getTime() - 20000)
                        back()
                        sleep(500)
                        if (锁屏 == 1) {
                            Power()
                        }
                        结束 = 1
                        exit()
                    }
                } else {
                    toastLog("没有能量了等1小时在看")
                    //发送参数("%A蚂蚁森林=60;%A森林时间="+(50*60*1000+new Date().getTime()))
                    本地配置.put("蚂蚁森林", 60 * 60 * 1000 + new Date().getTime())
                    back()
                    sleep(500)
                    if (锁屏 == 1) {
                        Power()
                    }
                    结束 = 1
                    exit()
                }
                return
            } else {
                滑动.scrollForward()
                sleep(200)
            }
        }
    }
}

function 收能量(a) {
    var 收集能量 = boundsInside(36, 371, 980, 1129).className("android.widget.Button").find()
    log(收集能量.length, "个能量球")
    for (let p1 = 0; p1 < 收集能量.length; p1++) {
        click(收集能量[p1].bounds().centerX(), 收集能量[p1].bounds().centerY())
        sleep(10)
    }
    if (a != 1) {
        back()
        sleep(500)
    }
}

function 控件点击(a, b) {
    if (b == 2) {
        let fw = a.bounds()
        log("坐标点击", fw.centerX(), fw.centerY())
        click(fw.centerX(), fw.centerY())
        return true
    } else {
        log("控件点击", a.text() || a.desc())
        for (let i = 0; i < 5; i++) {
            if (!a) {
                log("控件不存在")
                return false
            } else if (a.clickable() == true) {
                return a.click()
            } else {
                a = a.parent()
            }
        }
    }
    return false
}

function 控件和(a) {
    return 控件集合.find(a)
}

function 控件1(a, b) {
    var cj = 控件集合.findOne(a)
    if (!cj) {
        if (("" + a).indexOf("text") > -1) {
            a = eval((a + "").replace(/text/g, "desc"))
        } else if (("" + a).indexOf("desc") > -1) {
            a = eval(("" + a).replace(/desc/g, "text"))
        }
        cj = 控件集合.findOne(a)
    }
    if (b && cj) {
        控件点击(cj, b)
    }
    return cj
}


function 找图图片下载(路径, url) {
    for (var i = 0; i < 9; i++) {
        var 图片 = images.read(路径);
        if (!图片) {
            //var url = "http://www.autojs.org/assets/uploads/profile/3-profileavatar.png";
            var res = http.get(url);
            if (res.statusCode != 200) {
                toastLog("图片请求失败" + 路径);
            } else {
                files.writeBytes(路径, res.body.bytes());
            }
        } else {
            break
        }
    }
    if (!图片) {
        toastLog("图片载入失败" + 路径);
        exit()
    }
    return 图片
}

function 运行支付宝() {
    var i = app.intent({
        action: "VIEW",
        data: "alipayqr://platformapi/startapp?saId=60000002" // +"https://66666674.h5app.alipay.com/www/index.htm"
    });
    app.startActivity(i);
    sleep(100)
    if (!packageName("com.eg.android.AlipayGphone").exists()) {
        var aa = shell("am start -n com.eg.android.AlipayGphone/com.eg.android.AlipayGphone.AlipayLogin", true);
        sleep(2000)
    }
}

function 停止其他脚本() {
    var 当前脚本 = engines.myEngine()
    log(当前脚本 + "")
    var 正在运行 = engines.all();
    log("正在运行的脚本有", 正在运行.length, "个")
    for (var i = 0; i < 正在运行.length; i++) {
        if (正在运行[i].toString() != 当前脚本.toString()) {
            log("停止脚本", 正在运行[i].toString());
            正在运行[i].forceStop();
        }
    }
}

function 发送参数(a) {
    //  toast(a)
    //  shell("am broadcast -a Auto.test.text --es yitu " + a, true);
    var i = ({
        action: "Auto.test.text",
        extras: {
            "yitu": a
        },
    });
    app.sendBroadcast(i);
}

function 运行脚本(脚本) {
    //var result = shell("am start -n org.autojs.autojs/.external.open.RunIntentActivity -d " + 脚本 + " -t application/x-javascript", true);
    engines.execScriptFile(脚本);
}