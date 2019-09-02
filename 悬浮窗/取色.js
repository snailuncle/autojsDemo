/**
 *作者QQ: 1811588980
 *完成时间: 2019年6月10日 下午11:47:02
 *测试机型: vivo PD1813D
  *Auto.js版本: Pro 7.0.3-7
  *Android版本: 8.1.0
  *屏幕: 1080*2280
  *API: 27
 *备注: 仅限pro可用。
 拖动时时时获最中心的颜色。
 点击中间的小圆圈，可以获取它的坐标和颜色。长按可关闭。
**/

//importPackage(android.graphics);


if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};

toastLog("仅限pro可用。点击中间的小圆圈，可以获取它的坐标和颜色。长按可关闭");

let 当前方向 = context.getResources().getConfiguration().orientation
let 当前颜色, 当前反颜色;
let 当前坐标 = {
    x: 0,
    y: 0
};
let 当前截图 = captureScreen();

var win = floaty.rawWindow( 
    <frame w="{{Math.floor(device.width/2)}}px"h="{{Math.floor(device.width/2)}}px">
        <canvas id="canvas" w="*"h="*"/>
        <button id="but" w="{{Math.floor(device.width/8)}}px"h="{{Math.floor(device.width/8)}}px" layout_gravity="center" bg="#00000000"/>
    </frame>
);

win.setPosition(device.width / 4, device.width / 4);

setInterval(() => {
    方向 = context.getResources().getConfiguration().orientation
    //log(方向)
    if (方向 == 1 && 方向 != 当前方向) {
        当前方向 = 方向
        win.setPosition(device.width / 4, device.width / 4);

        //sleep(1000)
    } else if (方向 == 2 && 方向 != 当前方向) {
        当前方向 = 方向
        toastLog("横屏")
        win.setPosition(device.width / 4, device.width / 4);
    }

}, 500);

//setTimeout(()=>{exit();},5000);

win.but.click(function(v) {
    let str = 当前坐标.x + "," + 当前坐标.y + "," + 当前颜色;
    setClip(str);
    toastLog(str);
});
win.but.longClick(function() {
    toastLog("关闭");
    exit();
});


var paint1 = new Paint;
//paint1.setTextAlign(Paint.Align.CENTER);
paint1.setStrokeWidth(8);
paint1.setStyle(Paint.Style.STROKE);
//.paint1.setStyle(Paint.Style.FILL);
paint1.setARGB(255, 0, 255, 0);
//paint1.setTextSize(75);


//win.canvas.setMaxFps(60);
win.canvas.on("draw", function(canvas) {
    try {
        canvas.drawColor(android.graphics.Color.TRANSPARENT, android.graphics.PorterDuff.Mode.CLEAR);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        //paint1.setStrokeWidth(8);
        //canvas.drawRoundRect(4, 4, w - 4, h - 4, 100, 100, paint1);
        if (当前反颜色) {
            paint1.setColor(当前反颜色);
        };
        paint1.setStrokeWidth(4);
        canvas.drawRect(4, 4, w - 4, h - 4, paint1);

        paint1.setStrokeWidth(16);
        canvas.drawCircle(w / 2, h / 2, (w + h) / 4 - 16 / 2, paint1);
        canvas.drawCircle(w / 2, h / 2, (w + h) / 16, paint1);


        if (当前颜色) {
            paint1.setColor(当前颜色);
        };
        paint1.setStrokeWidth(12);
        canvas.drawCircle(w / 2, h / 2, (w + h) / 4 - 16 / 2, paint1);
        canvas.drawCircle(w / 2, h / 2, (w + h) / 16, paint1);

    } catch (e) {
        toastLog(e);
    };
});

let kg = false;
win.canvas.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = win.getX();
            windowY = win.getY();
            downTime = new Date().getTime();
            threads.start(function() {
                kg = false;
                let x = win.getX();
                let y = win.getY();
                win.setPosition(device.width, device.width);
                sleep(100);
                当前截图 = captureScreen();
                win.setPosition(x, y);
                kg = true;
            });
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            fcx = windowX + (event.getRawX() - x)
            fcy = windowY + (event.getRawY() - y)
            win.setPosition(fcx, fcy);
            窗口移动(fcx, fcy);
            return true;
        case event.ACTION_UP:
            return true;
    }
    return true;
})





function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};

function RToxy(R) {
    var x = Math.cos(R);
    var y = Math.sin(R);
    return [x, y];
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = s / sum;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};




function 窗口移动(x, y) {
    //w.setPosition()
    x1 = Math.floor(x + device.width / 4);
    y1 = Math.floor(y + device.width / 4);
    //var img = captureScreen();
    if ((当前方向 == 1 && device.width > x1 && x1 > 0 && device.height > y1 && y1 > 0) || (当前方向 == 2 && device.width > y1 && y1 > 0 && device.height > x1 && x1 > 0)) {
        if (kg) {
            当前颜色 = images.pixel(当前截图, x1, y1);
            当前反颜色 = 反色(当前颜色);
            当前坐标.x = x1;
            当前坐标.y = y1;
        };
        //显示该颜色值
    };
};

function RgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [Math.floor(h * 100), Math.round(s * 100) + "%", Math.round(l * 100) + "%"];
}