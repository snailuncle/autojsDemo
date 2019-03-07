作者QQ: 1811588980
*完成时间: 2019年2月8日 下午9:51:22
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920～～～～其他屏幕不知道能不能用。
 *API: 24
*备注: 修复最后一步不走的问题。
**/


//定义悬浮窗控制模块，命名为(悬块)。
function 悬块(window, view) {
    //判断是否缺少构造参数。
    if (!window || !view) {
        //缺少构造参数，抛出错误。
        throw "缺参数";
    };
    //记录按键被按下时的触摸坐标
    this.x = 0, this.y = 0;
    //记录按键被按下时的悬浮窗位置
    this.windowX, this.windowY;
    //按下时长超过此值则执行长按等动作
    this.downTime = 500;
    //记录定时执行器的返回id
    this.Timeout = 0;
    //创建点击长按事件
    this.Click = function() {};
    this.LongClick = function() {};
    this.move = function() {};
    //可修改点击长按事件
    this.setClick = function(fun) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.Click = fun;
        };
    };
    this.setLongClick = function(fun, ji) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.LongClick = fun;
            //判断参数是否可为设置数字？
            if (parseInt(ji) <= 1000) {
                this.downTime = parseInt(ji);
            };
        };
    };

    view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        //判断当前触控事件，以便执行操作。
        switch (event.getAction()) {
            //按下事件。
            case event.ACTION_DOWN:
                //按下记录各种坐标数据。
                this.x = event.getRawX();
                this.y = event.getRawY();
                this.windowX = window.getX();
                this.windowY = window.getY();
                //创建一个定时器用来定时执行长按操作。
                this.Timeout = setTimeout(() => {
                    this.LongClick();
                    this.Timeout = 0;
                }, this.downTime);
                return true;
                //移动事件。
            case event.ACTION_MOVE:
                //移动距离过大则判断为移动状态
                if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                    //移动状态清除定时器
                    if (this.Timeout) {
                        //定时器存在则清除定时器。
                        clearTimeout(this.Timeout);
                        this.Timeout = 0;
                    };
                    //移动手指时调整悬浮窗位置
                    window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
                };
                this.move(event);
                return true;
                //抬起事件。
            case event.ACTION_UP:
                if (this.Timeout) {
                    //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                    //清除定时器。
                    clearTimeout(this.Timeout);
                    this.Timeout = 0;
                    //执行点击事件。
                    this.Click();
                };
                return true;
        };
        //控件的触控事件函数必须要返回true。否则报错。
        return true;
    }));
};



//创建并生成一个悬浮窗。
var window_ = floaty.window(
    //创建一个按钮，并设置其id宽高文字等属性。
    <button  id="but" w="200px" h="200px" text="开始"/>
);
//输出提示信息。
toastLog("长按悬浮窗关闭本脚本");
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => {}, 500);
//声明一个变量用来控制线程。
var thread = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var w_ = new 悬块(window_, window_.but);
//设置长按事件。
w_.setLongClick(function() {
    //输出气泡信息。
    toast("脚本已关闭");
    //脚本停止代码。
    exit();
});
//设置点击事件。
w_.setClick(function() {
    //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
    if (thread ? !thread.isAlive() : true) { //线程没有运行。
        ui.run(() => {
            window_.but.setText("停止");
        });
        //新建一个线程，赋值给变量thread
        thread = threads.start(function() {
            try {
                Main();
            } catch (e) {
                toastLog(e);
            };
        });
    } else {
        thread.interrupt();
        toastLog("次数" + k);
        ui.run(() => {
            window_.but.setText("开始");
        });
    };
});



/*
屏幕 1080*1920
初始位置     偏移量     颜色。
x540        168.66
y1200       84.66
*/
//{"x":540,"y":1200,"color":-331537,"colorString":"#fffaf0ef"}
requestScreenCapture(false);
//setScreenMetrics(1080, 1920);
var fx = 540,
    fy = 1200,
    sx = 168.66,
    sy = 84.66;
//log(ws,hs,fx,fy,sx,sy);

var k = 0;
// press(867, 1596,1)
// log("向上");
//log("右转")
//press(218, 1596,1);

function Main() {
    //console.show();
    k = 0;
    while (true) {
        sleep(150);
        var img = captureScreen();
        var f = {
            d: getADCdirection(img)
        };
        var x = 0,
            y = 0;
        for (var i = 1; i < 11; i++) {
            var iA = isGird(img, fx + x - sx, fy - sy * i);
            var iB = isGird(img, fx + x + sx, fy - sy * i);
            var iC = isGird(img, fx + x, fy - sy * (i + 1));
            if (iA) {
                dr(fx + x - sx, fy - sy * i);
                toLeft(f);
                x -= sx;
            } else if (iB) {
                dr(fx + x + sx, fy - sy * i);
                toRight(f);
                x += sx;
            } else if (i == 2) {
                //自身遮挡。
                if (x < 0) {
                    dr(fx + x + sx, fy - sy * i);
                    toRight(f);
                    x += sx;
                } else {
                    dr(fx + x - sx, fy - sy * i);
                    toLeft(f);
                    x -= sx;
                };
            } else if (i == 1) {
                //终点?
                var iv = isEnd(img);
                if (iv === 1) {
                    dr(fx + x + sx, fy - sy * i);
                    toRight(f);
                } else if (iv === -1) {
                    dr(fx + x - sx, fy - sy * i);
                    toLeft(f);
                } else {
                    break;
                };
            } else if (iC && i > 2) {
                //超出屏幕外的转向
                if (iA === 0) {
                    dr(fx + x - sx, fy - sy * i);
                    dr(fx + x, fy - sy * (i + 1));
                    toLeft(f);
                    toRight(f);
                    i++;
                } else if (iB === 0) {
                    dr(fx + x + sx, fy - sy * i);
                    dr(fx + x, fy - sy * (i + 1));
                    toRight(f);
                    toLeft(f);
                    i++;
                } else {
                    break;
                };
            } else {
                break;
            };
        };



    };
};






function dr(x, y) {
    //canvas.drawCircle(x, y, 30, paint);
};



function prs(x, y, s) {
    press(x, y, s);
};


function toLeft(f) {
    if (f.d < 0) {
        log(f.d + "△");
        prs(867, 1596, 2)
    } else {
        log(f.d + "←");
        f.d = -1;
        prs(218, 1596, 2);

    };
    k++;
};

function toRight(f) {
    if (f.d > 0) {
        log(f.d + "△");
        prs(867, 1596, 2)
    } else {
        log(f.d + "→");
        f.d = 1;
        prs(218, 1596, 2);

    };
    k++;
};


function getADCdirection(img) {
    //{"x":563,"y":976,"color":-131587,"colorString":"#fffdfdfd"}
    //{"x":527,"y":965,"color":-8334876,"colorString":"#ff80d1e4"}
    if (images.pixel(img, fx + 20, 976) < images.pixel(img, fx - 20, 976)) {
        log("◢");
        return -1;
    } else {
        log("◣");
        return 1;
    };
    return 0;
};




function isGird(img, x, y, threshold) {
    threshold = threshold || 16;
    var data = {
        "x": 540,
        "y": 1200,
        "color": "#fffdf1f1",
        "ary": [
            [30, 0, "#ffef314a"],
            [-30, 0, "#ffef3d55"],
        ]
    };
    if (x < 0 || x > img.width) {
        return 0;
    };
    if (images.detectsColor(img, data.color, Math.floor(x), Math.floor(y), threshold)) {
        for (var i = 0; i < data.ary.length; i++) {
            if (!images.detectsColor(img, data.ary[i][2], Math.floor(x + data.ary[i][0]), Math.floor(y + data.ary[i][1]), threshold)) {
                return false;
            };
        };
    } else {
        return false;
    };
    return true;
};

function isEnd(img) {
    //{"x":711,"y":1066,"color":-269725,"colorString":"#fffbe263"}
    //171,1066;→
//{"x":253,"y":1067,"color":-139421,"colorString":"#fffddf63"}
//287,1066;←
    if (images.detectsColor(img, "#fffbe263", Math.floor(fx - 287), Math.floor(1066), 16)) {
        return -1;
    } else if (images.detectsColor(img, "#fffbe263", Math.floor(fx + 171), Math.floor(1066), 16)) {
        return 1;
    } else {
        return 0;
    };
};
