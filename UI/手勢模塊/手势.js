auto.waitFor()
//console.show()
var a
events.broadcast.on("a1", function() {
    a = 1   
})
events.broadcast.on("a0", function() {
    a = 0   
})
var mfj=files.read("./newmessage.js")


files.createWithDirs("/sdcard/ONEKEY/0.txt");
files.createWithDirs("/sdcard/ONEKEY/1.txt");
files.createWithDirs("/sdcard/ONEKEY/2.txt");
files.createWithDirs("/sdcard/ONEKEY/3.txt");
files.createWithDirs("/sdcard/ONEKEY/4.txt");
files.createWithDirs("/sdcard/ONEKEY/5.txt");
files.createWithDirs("/sdcard/ONEKEY/6.txt");
files.createWithDirs("/sdcard/ONEKEY/7.txt");

files.createWithDirs("/sdcard/ONEKEY/app1.txt")
files.createWithDirs("/sdcard/ONEKEY/appdo1.txt");

files.createWithDirs("/sdcard/ONEKEY/app2.txt");
files.createWithDirs("/sdcard/ONEKEY/appdo2.txt");

files.createWithDirs("/sdcard/ONEKEY/app3.txt");
files.createWithDirs("/sdcard/ONEKEY/appdo3.txt");

files.createWithDirs("/sdcard/ONEKEY/app4.txt");
files.createWithDirs("/sdcard/ONEKEY/appdo4.txt");

files.createWithDirs("/sdcard/ONEKEY/duang.txt");
files.createWithDirs("/sdcard/ONEKEY/wxsys.txt")
files.createWithDirs("/sdcard/ONEKEY/txt1.txt")
files.createWithDirs("/sdcard/ONEKEY/txt2.txt")




reads()
var b1, b2, b3, b4, b5, b6, b7, b8, app1, app2, app3, app4, duang
function reads() {

    b1 = files.read("/sdcard/ONEKEY/0.txt")
    b2 = files.read("/sdcard/ONEKEY/1.txt")
    b3 = files.read("/sdcard/ONEKEY/2.txt")
    b4 = files.read("/sdcard/ONEKEY/3.txt")
    b5 = files.read("/sdcard/ONEKEY/4.txt")
    b6 = files.read("/sdcard/ONEKEY/5.txt")
    b7 = files.read("/sdcard/ONEKEY/6.txt")
    b8 = files.read("/sdcard/ONEKEY/7.txt")
    app1 = files.read("/sdcard/ONEKEY/app1.txt")
    appdo1 = files.read("/sdcard/ONEKEY/appdo1.txt")
    app2 = files.read("/sdcard/ONEKEY/app2.txt")
    appdo2 = files.read("/sdcard/ONEKEY/appdo2.txt")
    app3 = files.read("/sdcard/ONEKEY/app3.txt")
    appdo3 = files.read("/sdcard/ONEKEY/appdo3.txt")
    app4 = files.read("/sdcard/ONEKEY/app4.txt")
    appdo4 = files.read("/sdcard/ONEKEY/appdo4.txt")

    duang = files.read("/sdcard/ONEKEY/duang.txt")
    txt1=files.read("/sdcard/ONEKEY/txt1.txt")
    txt2=files.read("/sdcard/ONEKEY/txt2.txt")

}


events.observeKey()
var window

var wm = context.getSystemService(context.WINDOW_SERVICE);
var wp = wm.getDefaultDisplay().getWidth() - 40;
var hp = wm.getDefaultDisplay().getHeight() - 40
var wcha = 450
var hcha = 600
var wmid = 390 //控件长度

var screenmid = (wp + 40 - wmid) / 2

var screenmid2 = (hp + 40 - wmid) / 2
var upx, upy;
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var rem = true
var downTime
var fxpd

setInterval(() => {}, 1000);
///////////////////////




function OrientationListener() {
    this.__proto__ = Object.create(events.emitter());
    this.currentOrientation = function() {
        return context.resources.configuration.orientation;
    };
    this.oldOrientation = this.currentOrientation();
    this.enable = function() {
        this.javaListener.enable();
    }
    this.disable = function() {
        this.javaListener.disable();
    }
    var that = this;
    var thread = threads.currentThread();
    this.javaListener = new JavaAdapter(android.view.OrientationListener, {
        onOrientationChanged: function() {
            thread.setImmediate(() => {
               let orientation = that.currentOrientation();
                if (that.oldOrientation == undefined || that.oldOrientation != orientation) {
                    that.oldOrientation = orientation;
                    that.emit('orientation_change', orientation);
                }
            });
        }
    }, context);
}




///////////////
w1()
fudu = 15
function cttt(){
threads.start(function(){
            if (window.getX() < 3000) {
                window.setPosition(3999, 3999);
            } else if (window.getX() > 3000) {    
            if(context.resources.configuration.orientation==1){    
              window.setPosition(screenmid, hp);}else{
                  window.setPosition(screenmid2, wp - 10);
            }}})}


 var ctss=threads.start(function(){
     sensors.register("linear_acceleration", sensors.delay.ui).on("change", (event, ax, ay, az) => {      
  if (az > fudu) {
      if (window.getX() > 3000) {    
            if(context.resources.configuration.orientation==1){    
              window.setPosition(screenmid, hp);}else{
                  window.setPosition(screenmid2, wp - 10);
            }}}})
  })      



///////////////

var orientationListener = new OrientationListener();
orientationListener.enable();
orientationListener.on("orientation_change", function(orientation) {
    if (orientation == 1) {
        if (window) {
            window.close()
            sleep(200)
            w1()
        }
    } else {
        if (window) {
            window.close()
            sleep(200)
            w2()
        } else {
            w2()
        }
    }
})

//setInterval(() => {}, 1000);
//////////
events.on("exit", function() {
    orientationListener.disable();
})
////////
function main() {
    window.action.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
               // toast(downTime)
                if (a == 1) {
                    device.vibrate(15);
                } else if (a == 0) {}
                //window.action.setTextColor(colors.parseColor("#007b7b7b"))
                return true;


            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                return true;


            case event.ACTION_UP:
             if(new Date().getTime()-downTime>1500){
                 cttt()
                 toast("手势区隐藏  甩一下回来") 
                 }
                else if (Math.abs(event.getRawY() - y) < 10 && Math.abs(event.getRawX() - x) < 10) {
                    idname = duang
                    dolist(idname)
                } else {
                    fxpd = context.resources.configuration.orientation
                    upxx()
                    if (rem == true) {
                        if (fxpd == 1) {
                            tx()
                        } else {
                            hx()
                        }
                    }
                }
        }
        return true;
    });
}
//////////



function upxx() {
    upx = window.getX()
    upy = window.getY()
    //toast(upx+" "+upy)

}
///////////
function offscreen() {
    engines.execScriptFile("./息屏.js");
}


///////////
function w1() {
    log("执行竖屏")
    window = floaty.rawWindow(
        <frame>
            <img bg="#00663366"  gravity="top"id="action" src="file://./44.png"  w="{{wmid}}px" h="40px" />
        </frame>
    );
    window.setPosition(screenmid, hp);
    main(x, y, windowX, windowY, downTime, upx, upy, rem, fxpd)
}

function w2() {
    log("执行横屏")
    window = floaty.rawWindow(
        <frame>
            <img bg="#00336655" id="action" src="file://./44.png"  w="{{wmid}}px" h="40px" />
        </frame>
    );
    window.setPosition(screenmid2, wp);
    main(x, y, windowX, windowY, downTime, upx, upy, rem, fxpd)
}

//////////
function dolist() {
    // toast(idname)
    if (idname == "返回") {
        back()

    } else if (idname == "分屏") {
        splitScreen()
        //     log("分屏")
    } else if (idname == "后台") {
        recents()
           log("后台")
    } else if (idname == "上一个app") {
        recents()
        recents()
        //   log("上一个app")
    } else if (idname == "app1") {
        launchApp(appdo1)
    } else if (idname == "app2") {
        launchApp(appdo2)
    } else if (idname == "app3") {
        launchApp(appdo3)
    } else if (idname == "app4") {
        launchApp(appdo4)
    } else if (idname == "home") {
        home()
    } else if (idname == "未读") {
        onekeym()
    } else if (idname == "微信扫一扫") {
        wxscan()
    } else if (idname == "下拉") {
        ztl()
    } else if (idname == "熄屏") {
        offscreen()
    } else if (idname == "APP-bigbang截图") {
        qnscreen()
    } else if (idname == "APP-bigbang取词") {
        qnword()
    } else if (idname == "截图并分享") {
        screeneasy()
    } else if (idname == "快捷短语1") {
        setClip(txt1)
        toast("已写入剪贴板 短语1："+txt1)
        var edit=className("EditText").findOnce()    
       edit.paste()
    } else if (idname == "快捷短语2") {
       setClip(txt2)
        toast("已写入剪贴板 短语2："+txt2)
        var edit=className("EditText").findOnce()    
       edit.paste()
    }
    
     else {

    }

}



var idname

function tx() {
    window.setPosition(screenmid, hp);


    var fh = threads.start(function() {
        //1区v
        if ((upx < screenmid - 200) && upy < hp - hcha) {
            idname = b1
            dolist(idname)
        } //2区v
        else if ((upx > screenmid + 200) && upy < hp - hcha) {

            idname = b2
            dolist(idname)

        } //5区
        else if ((upx < screenmid - 200) && (upy < hp - 100 && upy > hp - hcha)) {
            idname = b5
            dolist(idname)
        } //6区
        else if ((upx > screenmid + 200) && (upy < hp - 100 && upy > hp - hcha)) {
            idname = b6
            dolist(idname)
        } //4区
        else if (((upx < screenmid + 200) && (upx > screenmid - 200)) && (upy < hp - 30) && (upy > hp - 900)) {
            idname = b4
            dolist(idname)
        } //3区
        else if (((upx < screenmid + 200) && (upx > screenmid - 200)) && (upy < hp - 30) && (upy < hp - 900)) {
            idname = b3
            dolist(idname)
        } //8区
        else if ((upx < screenmid - 60) && (upy >= hp || upy <= hp - 20)) {
            idname = b7
            dolist(idname)
        } //7区
        else if ((upx > screenmid + 60) && (upy >= hp || upy <= hp - 20)) {
            idname = b8
            dolist(idname)
        }
    })
}

function hx() {

    window.setPosition(screenmid2, wp - 10);

    // toast(upx+"-"+upy) 

    var fh = threads.start(function() {
        if ((upx > screenmid2 + 300 || upx < screenmid2 - 300) && upy < wp - wcha) {
            if (currentPackage() == "com.blackberry.hub") {} else {
                launch("com.blackberry.hub")
                toastLog("启动Hub")
            }
        } else if ((upx < screenmid2 - 200 || upx > screenmid2 + 200) && (upy > wp - wcha && upy < wp - 100)) {
            back()
            log("back")
        } else if ((upx < screenmid2 + 200 && upx > screenmid2 - 200) && (upy < wp - 50 && upy > wp - 700)) {

            recents();
            log("recents")
        } else if ((upx < screenmid2 + 200 && upx > screenmid2 - 200) && (upy < wp - 800)) {
            splitScreen()
            log("分屏")
        } else if ((upx > screenmid2 + 30) && (upy >= wp || upy <= wp - 40)) {
            sleep(200)
            if (id("button").text("全部清除").findOnce()) {
                recents();
                log("横滑一次后台")
            } else {
                recents()
                log("横滑1次")
                sleep(300)
                recents()
                log("横滑2次")

            }
        } else if ((upx < screenmid - 30) && (upy >= wp || upy <= wp - 40)) {
            onekeym()
            log("onekey找消息")
        }

        //  colorch()
    })

}







function tx2() {

    if (fxpd == 1) {
        window.setPosition(screenmid, hp);
    } else {
        window.setPosition(screenmid2, wp);
    }
    rem = true

}



function onekeym() {
   
    eval(mfj)
       }







function wxscan() {
    device.vibrate(15);

    context.startActivity(app.intent({
        action: "VIEW",
        className: "com.tencent.mm.ui.LauncherUI",
        packageName: "com.tencent.mm",
        extras: {
            "LauncherUI.From.Scaner.Shortcut": true
        }
    }))
}

function ztl() {
    notifications()

}

function qnscreen() {
    app.startActivity({
        "action": "android.intent.action.MAIN",
        "packageName": "com.forfan.bigbang",
        "className": "com.forfan.bigbang.component.activity.screen.ScreenCaptureActivity"
    });
}

function qnword() {
    app.startActivity({
        "action": "android.intent.action.MAIN",
        "packageName": "com.forfan.bigbang",
        "className": "com.forfan.bigbang.component.activity.UniversalCopyActivity"
    });
}

function screeneasy() {
     engines.execScriptFile("./截图.js");
   
}
/*
var sxui=threads.start(function(){  
                var tts = engines.execScriptFile("./shuaxinui.js");
      })*/
//threads.shutDownAll()