var jieshao=["//悬浮音乐播放器:只能播放QQ音乐或酷狗音乐里面下载的歌曲",
"//当一首歌播放完之后默认为随机播放一首歌",
"//♢点击:暂停或者播放,拖动:移动窗口,长按1秒:关闭本脚本",
"//↹点击:随机播放一首歌",
"//☆点击:调换播放模式,☆为随机播放,♡为下一首,○为单曲循环",
"//◎点击:大小化窗口切换,拖动:移动窗口",
"//←触动:触摸音量减小",
"//→触动:触摸音量增大",
"//▽点击:打开歌单选择歌曲播放",
"//↑点击:播放上一首歌",
"//↓点击:播放下一首歌",
"//««触动:触摸时间越长快退距离越长",
"//»»触动:触摸时间越长快进距离越长",
"//△点击:在已有歌曲中搜索"
];

setScreenMetrics(1080, 1920); //设置所适合的屏幕
//console.show();
//file:///sdcard/建记/图片/img17.jpg
//file:///storage/emulated/0/tencent/QQ_Images/null7269572719f0eff6.jpg
alert("悬浮音乐播放器",jieshao.join("\n"));
var window = floaty.window(
    <vertical alpha="0.7" bg="#BCAAA4">
      <horizontal alpha="1">
       <text id="text0" w="178px" lines="1" gravity="center" bg="file://bg1.png" textColor="#000000"/>
       <text id="text1" w="178px" lines="1" gravity="center" bg="file://bg1.png" textColor="#000000"/>
       <text id="text2" w="178px" lines="1" gravity="center" bg="file://bg1.png" textColor="#000000"/>
       <text id="text3" w="178px" lines="1" gravity="center" bg="file://bg1.png" textColor="#000000"/>
       <text id="text4" w="178px" lines="1" gravity="center" bg="file://bg1.png" textColor="#000000"/>
      </horizontal>
      <horizontal alpha="1">
       <vertical>
        <button text="◎" id="butA" textSize="40sp"  bg="file://bg2.png"style="Widget.AppCompat.Button.Borderless" w="178px" h="267px" textColor="#000000"/>
        <button text="←" id="butB" textSize="40sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="267px" textColor="#000000"/>
       </vertical>
       <vertical>
        <horizontal>
         <button text="↹" id="but1" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#000000"/>
         <button text="↑" id="but2" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#000000"/>
         <button text="▽" id="but3" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#000000"/>
        </horizontal>
        <horizontal>
         <button text="««" id="but4" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#000000"/>
         <button text="♢" id="but5" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#ff0000"/>
         <button text="»»" id="but6" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#000000"/>
        </horizontal>
        <horizontal>  
         <button text="☆" id="but7" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#000000"/>
         <button text="↓" id="but8" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#000000"/>
         <button text="△" id="but9" textSize="24sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="178px" textColor="#000000"/>
        </horizontal>
       </vertical>
       <vertical>
        <button text="◎" id="butC" textSize="40sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="267px" textColor="#000000"/>
        <button text="→" id="butD" textSize="40sp" bg="file://bg2.png" style="Widget.AppCompat.Button.Borderless" w="178px" h="267px" textColor="#000000"/>
       </vertical>
      </horizontal>  
      <text id="text" w="*" lines="1" gravity="center" bg="file://bg3.png" textColor="#000000"/>
     </vertical>
);
function bianju() {
    var A = new Array;
    A.push(daxiao[DX][0] / 2 - 35, daxiao[DX][1] / 2 - 35, pingwidth - (daxiao[DX][0] / 2 - 35), pingheight - (daxiao[DX][1] / 2 - 35) - 70);
    //log(A)
    return A;
}
function windowGXY(x, y, k) {
    if (x < k[0]) {
        x = k[0]
    };
    if (k[2] < x) {
        x = k[2]
    };
    if (y < k[1]) {
        y = k[1]
    };
    if (k[3] < y) {
        y = k[3]
    };
    return [x, y];
}
function setontouch() {
    var A = arguments;
    var K = new Array;
    for (var i = 0; i < A.length; i++) {
        K.push(" window.but" + A[i] + ".setOnTouchListener(function(view, event){switch(event.getAction()){case event.ACTION_DOWN: butkg" + A[i] + "=true;return true;case event.ACTION_MOVE:return true;case event.ACTION_UP: butkg" + A[i] + "=false;return true;}return true;});");
    }
    return K.join("");
}
function setvar() {
    var A = arguments;
    var K = new Array;
    for (var i = 0; i < A.length; i++) {
        K.push("butkg" + A[i] + "=false");
    }
    return "var " + K.join(",") + ";";
}
function shuzuG(a, b) {
    var k = new Array;
    for (var i = 0; i < a.length; i++) {
        k.push(files.join(b, a[i]));
    }
    return k;
}
function 截图() {
    requestScreenCapture();
    while (true) {
        if (图 = captureScreen()) {
            return 图;
            break;
        }
    }
} //获取截图，返回图片对象
function pingxiang() {
    var img = 截图();
    if (img.getWidth() < img.getHeight()) {
        return true;
    } else {
        return false;
    }
}
function souge(A, B) {
    //在B组里搜含A字
    var C = new Array,
        D = new Array;
    A = escape(A).replace(/%/g, "\\");
    eval("var re=/" + A + "/;");
    for (var i = 0; i < B.length; i++) {
        if (re.test(B[i])) {
            C.push(i);
            D.push(B[i]);
        }
    }
    return [C, D];
}
function saoge(dirs) {
    var Paths = new Array,
        Files = new Array;
    for (var i = 0; i < dirs.length; i++) {
        if (files.isDir(dirs[i])) {
            var File = files.listDir(dirs[i], function(name) {
                return (name.endsWith(".m4a") || name.endsWith(".mp3")) && files.isFile(files.join(dirs[i], name));
            });
            if (File.length > 0) {
                Files = Files.concat(File.join("☆").split("☆"));
                Paths = Paths.concat(shuzuG(File, dirs[i]));
            }
        }
    }
    if (Files.length > 0) {
        return [Paths, Files];
    }
}
function yidongtexiao(A, B) {
    var sx = A[2] - A[0],
        sy = A[3] - A[1];
    var sd = weiyi(sx, sy, 0) / 25;
    var X = sx / sd,
        Y = sy / sd;
    var x = 0,
        y = 0;
    for (var i = 0; i < sd; i++) {
        x += X;
        y += Y;
        sleep(5);
        B.setPosition(A[0] + x, A[1] + y);
    }
    B.setPosition(A[2], A[3]);
}
//函数分段区
//函数分段区
//函数分段区
//函数分段区
//函数分段区
//重力传感器
var ax, ay, az, fangxiang = true;
sensors.register("gravity", sensors.delay.ui).on("change", (event, gx, gy, gz) => {
    ax = Math.round(-gx * 100) / 100;
    ay = Math.round(gy * 100) / 100;
    az = Math.round(gz * 100) / 100;
});
var pingwidth = device.width,
    pingheight = device.height;
sleep(100);
window.setPosition((pingwidth - window.getWidth()) / 2 + 1, (pingheight - window.getHeight()) / 2);
var DX = 0,
    daxiao = [
        [960, 720],
        [250, 400]
    ];
var dir = ["/sdcard/qqmusic/song",
    "/sdcard/kgmusic/download"
];
var PathFile = saoge(dir);
var m4apath = PathFile[0],
    m4afile = PathFile[1];
if (m4afile.length <= 0) {
    toast("没有歌曲");
    exit();
}
ui.run(function() {
    var A = m4afile.length;
    A = A.toString();
    var B = Math.round(device.getMusicVolume() / device.getMusicMaxVolume() * 100);
    B = B.toString();
    window.text3.setText(A);
    window.text4.setText(B);
});
var gq = 0;
var kg = false,
    kg2 = false,
    bfmsh = 0;
var varkg = setvar("A", "B", "C", "D", "1", "2", "3", "4", "6", "7", "8", "9");
eval(varkg);
var vartouch = setontouch("B", "D", "1", "2", "3", "4", "6", "7", "8", "9");
eval(vartouch);
setInterval(() => {
    runTick();
}, 50);
//setInterval(()=>{runTick1();}, 200);
//记录按键被按下时的触摸坐标
var x, y, sx, sy, dx, dy;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var Akeep = false,
    yidong = false,
    Time = 0;
window.but5.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            Akeep = true; //按下,开启计时
            //console.clear();
            return true;
        case event.ACTION_MOVE:
            sx = event.getRawX() - x;
            sy = event.getRawY() - y;
            if (!yidong && weiyi(sx, sy, 0) >= 50) {
                yidong = true;
                dx = sx;
                dy = sy
            };
            if (yidong) {
                window.setPosition(windowX + sx - dx, windowY + sy - dy);
            }
            return true;
        case event.ACTION_UP:
            if (!yidong && Time < 7) {
                if (!kg) {
                    anjian(1);
                } else {
                    anjian(5)
                }
            }
            Akeep = false;
            Time = 0;
            if (yidong) {
                var gx = Math.round(windowX + sx - dx),
                    gy = Math.round(windowY + sy - dy);
                var xy = windowGXY(gx + window.getWidth() / 2, gy + window.getHeight() / 2, bianju());
                window.setPosition(xy[0] - window.getWidth() / 2, xy[1] - window.getHeight() / 2);
                yidong = false;
            };
            return true;
    }
    return true;
});
window.butA.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            return true;
        case event.ACTION_MOVE:
            sx = event.getRawX() - x;
            sy = event.getRawY() - y;
            if (!yidong && weiyi(sx, sy, 0) >= 50) {
                yidong = true;
                dx = sx;
                dy = sy
            };
            if (yidong) {
                window.setPosition(windowX + sx - dx, windowY + sy - dy);
            }
            return true;
        case event.ACTION_UP:
            if (!yidong) {
                butkgA = true;
            }
            if (yidong) {
                var gx = Math.round(windowX + sx - dx),
                    gy = Math.round(windowY + sy - dy);
                var xy = windowGXY(gx + window.getWidth() / 2, gy + window.getHeight() / 2, bianju());
                window.setPosition(xy[0] - window.getWidth() / 2, xy[1] - window.getHeight() / 2);
                yidong = false;
            };
            return true;
    }
    return true;
});
window.butC.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            return true;
        case event.ACTION_MOVE:
            sx = event.getRawX() - x;
            sy = event.getRawY() - y;
            if (!yidong && weiyi(sx, sy, 0) >= 50) {
                yidong = true;
                dx = sx;
                dy = sy
            };
            if (yidong) {
                window.setPosition(windowX + sx - dx, windowY + sy - dy);
            }
            return true;
        case event.ACTION_UP:
            if (!yidong) {
                butkgC = true;
            }
            if (yidong) {
                var gx = Math.round(windowX + sx - dx),
                    gy = Math.round(windowY + sy - dy);
                var xy = windowGXY(gx + window.getWidth() / 2, gy + window.getHeight() / 2, bianju());
                window.setPosition(xy[0] - window.getWidth() / 2, xy[1] - window.getHeight() / 2);
                yidong = false;
            };
            return true;
    }
    return true;
});
function runTick1() {
    if (fangxiang && Math.abs(ax) >= 9) {
        if (!pingxiang()) {
            fangxiang = !fangxiang;
            var a = pingwidth;
            pingwidth = pingheight;
            pingheight = a;
            if (DX == 1) {
                DX = 0
            } else {
                DX = 1
            };
            tiaohuan();
        }
    }
    if (!fangxiang && Math.abs(ay) >= 9) {
        if (pingxiang()) {
            fangxiang = !fangxiang;
            var a = pingwidth;
            pingwidth = pingheight;
            pingheight = a;
            if (DX == 1) {
                DX = 0
            } else {
                DX = 1
            };
            tiaohuan();
        }
    }
}
function runTick() {
    if (kg) {
        var jindu = Math.round(media.getMusicCurrentPosition() / media.getMusicDuration() * 1000) / 10;
        var jindu1 = Math.round(media.getMusicCurrentPosition() / 100) / 10;
        ui.run(function() {
            window.text0.setText(jindu.toString());
            window.text1.setText(jindu1.toString());
        });
        if (media.getMusicCurrentPosition() >= media.getMusicDuration() - 100) {
            //media.stopMusic();
            switch (bfmsh) {
                case 0:
                    anjian(1);
                    break;
                case 1:
                    anjian(8);
                    break;
                case 2:
                    kg = false;
                    kg2 = false;
                    anjian(5);
                    break;
            }
        }
    }
    //每秒二十次
    if (Akeep) {
        Time++; //计时
        if (!yidong && Time > 20) {
            //非移动且按下时长超过1秒判断为长按
            media.stopMusic();
            sleep(100);
            window.close();
            toast("已停止运行");
            exit();
        }
    }
    if (butkg1) {
        butkg1 = false;
        anjian(1);
    }
    if (butkg3) {
        butkg3 = false;
        anjian(3);
    }
    if (butkg2) {
        butkg2 = false;
        anjian(2);
    }
    if (butkg8) {
        butkg8 = false;
        anjian(8);
    }
    if (butkg4) {
        anjian(4);
    }
    if (butkg6) {
        anjian(6);
    }
    if (butkgA || butkgC) {
        butkgA = false;
        butkgC = false;
        tiaohuan();
    }
    var B = Math.round(device.getMusicVolume() / device.getMusicMaxVolume() * 100);
    B = B.toString();
    ui.run(() => {
        window.text4.setText(B);
    });
    if (butkgB) {
        device.setMusicVolume(device.getMusicVolume() - device.getMusicMaxVolume() / 20);
    }
    if (butkgD) {
        device.setMusicVolume(device.getMusicVolume() + device.getMusicMaxVolume() / 20);
    }
    if (butkg7) {
        butkg7 = false;
        switch (bfmsh) {
            case 0:
                bfmsh = 1;
                ui.run(function() {
                    window.but7.setText("♡");
                });
                break;
            case 1:
                bfmsh = 2;
                ui.run(function() {
                    window.but7.setText("○");
                });
                break;
            case 2:
                bfmsh = 0;
                ui.run(function() {
                    window.but7.setText("☆");
                });
                break;
        }
    }
    if (butkg9) {
        butkg9 = false;
        var name = rawInput("请搜歌曲");
        if (name) {
            var ge = souge(name, m4afile);
            var i = dialogs.select("搜索 " + name + " 结果", ge[1]);
            if (i >= 0) {
                gq = ge[0][i];
                kg = false;
                kg2 = false;
                anjian(5);
            }
        }
    }
}
function onClick() {
    try {
    } catch (e) {
        toast(e);
    }
}
function tiaohuan() {
    var x = window.getX() + (daxiao[DX][0] / 2);
    if (DX == 0) {
        DX = 1;
        var x_y = bianju();
        //log(x_y)
        ui.run(() => {
            window.setSize(daxiao[DX][0], daxiao[DX][1]);
        });
        //window.setPosition(pingwidth/2-daxiao[DX][0]/2,window.getY());
        //sleep(500)
        if (x <= pingwidth / 2) {
            yidongtexiao([pingwidth / 2 + daxiao[0][0] / 2 - daxiao[1][0], window.getY(), x_y[0] - daxiao[DX][0] / 2, window.getY()], window);
        } else {
            yidongtexiao([pingwidth / 2 - daxiao[0][0] / 2, window.getY(), x_y[2] - daxiao[DX][0] / 2, window.getY()], window);
        };
    } else {
        DX = 0;
        ui.run(() => {
            window.setSize(daxiao[DX][0], daxiao[DX][1]);
        });
        var xay = windowGXY(x, window.getY() + daxiao[DX][1] / 2, bianju());
        if (x <= pingwidth / 2) {
            yidongtexiao([xay[0] - daxiao[DX][0] / 2 - daxiao[DX][0], xay[1] - daxiao[DX][1] / 2, xay[0] - daxiao[DX][0] / 2, xay[1] - daxiao[DX][1] / 2], window);
        } else {
            yidongtexiao([xay[0] - daxiao[DX][0] / 2 + daxiao[DX][0], xay[1] - daxiao[DX][1] / 2, xay[0] - daxiao[DX][0] / 2, xay[1] - daxiao[DX][1] / 2], window);
        }
    }
}
function anjian(K) {
    switch (K) {
        case 5:
            if (!kg) {
                media.playMusic(m4apath[gq]);
                //media.musicSeekTo(51 * 1000);
                ui.run(function() {
                    var A = Math.round(media.getMusicDuration() / 100) / 10;
                    var B = (gq + 1).toString();
                    var C = m4afile[gq];
                    var D = m4afile.length;
                    D = D.toString();
                    window.text.setText(C.toString());
                    window.text2.setText(A.toString());
                    window.text3.setText(B + "/" + D);
                });
                kg = true;
                kg2 = true;
            } else {
                if (kg2) {
                    media.pauseMusic();
                    kg2 = false
                } else {
                    media.resumeMusic();
                    kg2 = true
                }
            }
            break;
        case 6:
            media.musicSeekTo(media.getMusicCurrentPosition() + 1000);
            break;
        case 4:
            media.musicSeekTo(media.getMusicCurrentPosition() - 1000);
            break;
        case 2:
            gq--;
            if (gq < 0) {
                gq = m4apath.length - 1
            };
            kg = false;
            kg2 = false;
            anjian(5);
            break;
        case 8:
            gq++;
            if (gq > m4apath.length - 1) {
                gq = 0
            };
            kg = false;
            kg2 = false;
            anjian(5);
            break;
        case 3:
            var i = dialogs.select("请选择一个歌曲", m4afile);
            if (i >= 0) {
                gq = i;
                kg = false;
                kg2 = false;
                anjian(5);
            }
            break;
        case 1:
            kg = false;
            kg2 = false;
            gq = Math.floor(Math.random() * m4afile.length);
            anjian(5);
            break;
        case "A":
            break;
        case "B":
            break;
    }
}
function weiyi(a, b, c) {
    var a, b, c;
    return Math.round(Math.sqrt(a * a + b * b + c * c) * 1000) / 1000
}
function round_A(a, b) {
    return Math.round(b * a) / a
}
function jueduizhi(a) {
    var a;
    if (a < 0) {
        return -a;
    } else {
        return a;
    }
}
function dir_abcd(a, b, c, d) {
    var A = a.split(b);
    var K = new Array;
    var kg = false;
    for (var i = 0; i < A.length; i++) {
        if (i == c || i == A.length + c) {
            kg = true
        };
        if (kg) {
            K.push(A[i])
        };
        if (i == d || i == A.length + d) {
            kg = false
        };
    }
    return b + K.join(b);
}