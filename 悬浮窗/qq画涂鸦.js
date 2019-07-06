/*
使用流程
先移动到要画的图片上，在调整大小
截图，打开qq涂鸦，点击画画，等在完成
作者:攀登
适配分辨率1080+1920


*/

画板大小 = [1000, 950]
var 笔画 = null
var w = floaty.rawWindow(
    <frame bg="#66fff900">
        <vertical >
            <horizontal>
                <text id="移动" text="移动" w="30" h="20" bg="#ff00ff00"/>
                <text id="退出" text="退出" w="40" h="20" bg="#ffffff00" layout_weight="1"/>
                <text id="截图" text="截图" w="40" h="20" bg="#ffff0000"/>
                <text id="画画" text="画画" w="40" h="20" bg="#ff00ffff"/>
            </horizontal>
            <text id="缩放" bg="#44000066" w="*" h="*" textSize="20sp" line="3" gravity="center" text="拖动缩放按钮选择图片区域"/>
        </vertical>
    </frame>
);

//setInterval(() => {}, 1000);
w.setPosition(55, 300)
w.缩放.setText("\n拖动缩放按钮选择图片区域  \n");
w.setSize(300, 400)
var execution = null;
//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var wX, wY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
w.移动.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            wX = w.getX();
            wY = w.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            w.setPosition(wX + (event.getRawX() - x),
                wY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本

            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击

            return true;
    }
    return true;
});
w.缩放.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            h1 = w.getHeight()
            w1 = w.getWidth()
            log(w1, h1)
            x = event.getRawX();
            y = event.getRawY();
            wX = w.getX();
            wY = w.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:

            //移动手指时调整悬浮窗位置
            w.setSize(w1 + (event.getRawX() - x),
                h1 + (event.getRawY() - y));
            //   log(w1 + (event.getRawX() - x),                h1 + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本

            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                //onClick();
            }

            return true;
    }
    return true;
});
w.退出.click(() => {
    toastLog("退出画图")
    exit()
});
w.截图.click(() => {
    let x = w.getX();
    let y = w.getY();
    let y0 = y + w.移动.height;
    let w0 = w.缩放.width
    let h0 = w.缩放.height
    w.setPosition(2000, y)
    xc.setTimeout(() => {
        log(x, y0, w0, h0);
        var img = images.clip(captureScreen(), x, y0, w0, h0);
        var sf = 100 / img.height
        if (img.height < img.width) {
            sf = 100 / img.width
        }
        img = images.scale(img, sf, sf)
        img = images.grayscale(img)
        img = images.adaptiveThreshold(img, 200, "MEAN_C", "BINARY", 25, 10);
        img = images.adaptiveThreshold(img, 200, "MEAN_C", "BINARY", 3, 3);
        //img = images.scale(img, 0.3, 0.3)
        var bitmap = img.getBitmap();
        var w = bitmap.getWidth();
        var h = bitmap.getHeight();
        var pixels = util.java.array("int", w * h);
        bitmap.getPixels(pixels, 0, w, 0, 0, w, h);
        //  log(pixels)
        笔画 = 画图(pixels, w, h)
        log(笔画)
        toastLog("图片读取完成,请打开涂鸦界面点击画画")
    }, 100);
    setTimeout(() => {
        w.setPosition(x, y)
    }, 200);

});
w.画画.click(() => {
    if (笔画 != null && 笔画.length > 0) {
        xc.setTimeout(() => {
            var bs=9
            for (let i in 笔画) {
                for (let j = 0; j < 笔画[i].length - 1; j += 2) {
                    swipe(笔画[i][j][0] * bs +10, 笔画[i][j][1] * bs + 765, 笔画[i][j + 1][0] * bs + 10, 笔画[i][j + 1][1] * bs + 765, 11)
                    // log(笔画[i][j][0] * 1, 笔画[i][j][1] * 1 , 笔画[i][j + 1][0] * 1, 笔画[i][j + 1][1] * 1 , 1)
                    sleep(1)
                }
            }
        }, 1)
    }
});

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
xc = threads.start(function() {
    setInterval(() => {}, 100);
});

function 画图(内容, w, h) {
    var 笔画和 = []
    var 笔画 = []
    //-3618616, -16777216
    fx = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ]
    for (let i = 0; i < 内容.length; i++) {
        if (内容[i] == -16777216) {
            x = i % w
            y = parseInt(i / w)
            笔画 = []
            查找(x, y)
            if (笔画.length > 0)
                笔画和.push(笔画)
        }
    }

    function 查找(x, y) {
        let ys = 内容[w * y - w + x]
        if (ys == -16777216) {
            内容[w * y - w + x] = 0
            笔画.push([x, y])
            for (let a = 0; a < 4; a++) {
                查找(x + fx[a][0], y + fx[a][1])
            }
        }
    }
    return 笔画和
}