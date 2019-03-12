/**
*作者QQ: 1811588980
*完成时间: 2018年12月21日 下午9:58:48
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 暂无备注
**/


toastLog("Are you ready？");
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};

var IMG = 截图();
var img = images.copy(IMG);


var window = floaty.rawWindow(
    <vertical id="vertical" bg="#aaaaaa" w="{{Math.floor(device.width*0.8)}}px" h="{{Math.floor(device.height*0.8)}}px" gravity="center">
        <canvas id="canvas" margin="5dp" layout_weight="1"/>
        <horizontal id="horizontal" margin="5dp" w="*" gravity="center">
            <button id="butJ" layout_weight="1" text="截图"/>
            <button id="butX" layout_weight="1" text="选图"/>
            <button id="butY" layout_weight="1" text="移动"/>
            <button id="butG" layout_weight="1" text="关闭"/>
        </horizontal>
    </vertical>
);


var window_ = floaty.window(
    <button id="but_" w="150px" h="150px" text="▽" alpha="0.7"/>
);

var ad = new 悬浮控制(window, window.butY, 1);
var ad_ = new 悬浮控制(window_, window_.but_);
var F = ad.OutScreen();
var F_ = ad_.OutScreen();

threads.start(function() {
    sleep(100);
    F_ = ad_.OutScreen();
    ad_.windowyidong(F_);
});

ad.setClick(function() {
    window.disableFocus();
    threads.start(function() {
        F = ad.OutScreen();
        ad.windowyidong(F);
        ad_.windowyidong([F_[1], ad_.centerXY(ad.centerXY(F[0])[0])[1]]);
        ad_.windowyidong(ad_.toScreenEdge(0.2));
    });
});

ad_.setClick(function() {
    threads.start(function() {
        F_ = ad_.OutScreen();
        ad_.windowyidong(F_);
        ad.windowyidong([F[1], ad.centerXY(ad_.centerXY(F_[0])[0])[1]]);
        ad.autoIntScreen();
    });
});

window.butJ.click(() => {
    threads.start(function() {
        var F = ad.OutScreen();
        ad.windowyidong(F);
        sleep(100);
        var IMG = 截图();
        //img.recycle();
        img = images.copy(IMG);
        ad.windowyidong(F.reverse());
    });
});

window.butX.click(() => {
    threads.start(function() {
        var F = ad.OutScreen();
        ad.windowyidong(F);
        var Apath = "/sdcard";
        var path = listpath(Apath);
        if (path) {
            var IMG = 加载图片(path);
            //img.recycle();
            img = images.copy(IMG);
        };
        ad.windowyidong(F.reverse());
    });
});


//你们在下面这些关闭的方法里面修改修改，尝试一下改bug吧。


window.butG.click(() => {
    window.close();
    window_.close();
    exit();
});

ad.setLongClick(function() {
    window.close();
    window_.close();
    exit();
});
ad_.setLongClick(function() {
    window.close();
    window_.close();
    exit();
});


//setInterval(() => {}, 1000);
//window.exitOnClose();


//就这些关闭的方法。




var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
var data = {
    translate: {
        x: 0,
        y: 0
    },
    scale: 1,
};

threads.start(function() {
    sleep(100);
    window.setPosition(device.width / 2 - window.getWidth() / 2, device.height / 2 - window.getHeight() / 2);
    sleep(100);
    data = {
        translate: {
            x: -(window.getX() + window.canvas.getX()),
            y: -(window.getY() + window.canvas.getY())
        },
        scale: 1,
    };
});


var 点色;
window.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    paint.setStrokeWidth(5);
    var matrix = new android.graphics.Matrix();
    matrix.postScale(data.scale, data.scale);
    matrix.postTranslate(data.translate.x, data.translate.y);
    paint.setARGB(255, 0, 0, 0);
    canvas.drawImage(img, matrix, paint);
    paint.setStrokeWidth(5);
    paint.setStyle(Paint.Style.STROKE);
    paint.setARGB(255, 255, 255, 0);
    canvas.drawLine(w / 2 - 50, h / 2, w / 2 - 100, h / 2, paint);
    paint.setARGB(255, 255, 0, 255);
    canvas.drawLine(w / 2, h / 2 - 50, w / 2, h / 2 - 100, paint);
    paint.setARGB(255, 255, 0, 0);
    canvas.drawLine(w / 2 + 50, h / 2, w / 2 + 100, h / 2, paint);
    paint.setARGB(255, 0, 0, 255);
    canvas.drawLine(w / 2, h / 2 + 50, w / 2, h / 2 + 100, paint);
    var S = 算坐标(w / 2, h / 2, data, img);
    点色 = S;
    paint.setColor(S.color);
    paint.setStrokeWidth(15);
    canvas.drawCircle(w / 2, h / 2, 41, paint);
    ui.run(() => {
        window.vertical.attr("bg", colors.toString(反色(S.color)));
        window.horizontal.attr("bg", S.colorString);
    });
    paint.setColor(反色(S.color));
    paint.setStrokeWidth(5);
    canvas.drawCircle(w / 2, h / 2, 50, paint);
    var S1 = 算坐标(w / 2, h / 2 - 100, data, img);
    var S2 = 算坐标(w / 2, h / 2 + 100 - 12.5, data, img);
    var S3 = 算坐标(w / 2, h / 2 + 100 + 12.5, data, img);
    canvas.setMatrix(new android.graphics.Matrix());
    paint.setStrokeWidth(1);
    paint.setStyle(Paint.Style.FILL);
    var size = 40;
    paint.setTextSize(size);
    paint.setColor(反色(S1.color));
    canvas.drawText(S.x + "," + S.y, w / 2, h / 2 - 100 + 0.365 * size, paint);
    paint.setColor(反色(S2.color));
    canvas.drawText(S.color, w / 2, h / 2 + 100 - 12.5 + 0.365 * size, paint);
    paint.setColor(反色(S3.color));
    canvas.drawText(S.colorString, w / 2, h / 2 + 100 + 20 + 0.365 * size, paint);
});

function 算坐标(X, Y, data, img) {
    var X = X - data.translate.x,
        Y = Y - data.translate.y;
    var x = X / data.scale;
    var y = Y / data.scale;
    x = Math.floor((0 <= x && x < img.getWidth()) ? x : (0 <= x ? img.getWidth() - 1 : 0));
    y = Math.floor((0 <= y && y < img.getHeight()) ? y : (0 <= y ? img.getHeight() - 1 : 0));
    var color = images.pixel(img, x, y);
    var colorString = colors.toString(color);
    return {
        x: x,
        y: y,
        color: color,
        colorString: String(colorString)
    };
};


var Touch = new Array;
var TouchData = new Array;
var Wx, Wy, fuzhiid = 0,
    fuzhi = false;
window.canvas.setOnTouchListener(function(view, event) {
    try {
        var w = view.width,
            h = view.height;
        sw: switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                var X = event.getX(i);
                var Y = event.getY(i);
                if (weiyi([view.width / 2 - X, view.height / 2 - Y]) <= 50) {
                    Wx = X;
                    Wy = Y;
                    fuzhi = true;
                    fuzhiid = id;
                    break;
                };
                var PC = event.getPointerCount();
                if (PC >= 3) {
                    data = {
                        translate: {
                            x: -(window.getX() + window.canvas.getX()),
                            y: -(window.getY() + window.canvas.getY())
                        },
                        scale: 1,
                    };
                };
                Touch[id] = {
                    X: X - data.translate.x,
                    Y: Y - data.translate.y
                };
                TouchData = deepCopy(data);
                //复制对象。
                break;
            case event.ACTION_MOVE:
                if (fuzhi) {
                    break
                };
                var PC = event.getPointerCount();
                if (PC == 1) {
                    var id = event.getPointerId(0);
                    var X = event.getX(0);
                    var Y = event.getY(0);
                    data.translate.x = X - Touch[id].X;
                    data.translate.y = Y - Touch[id].Y;
                } else if (PC == 2) {
                    var id = event.getPointerId(0);
                    var X = event.getX(0);
                    var Y = event.getY(0);
                    var id1 = event.getPointerId(1);
                    var X1 = event.getX(1);
                    var Y1 = event.getY(1);
                    var SS = weiyi([Touch[id1].X - Touch[id].X, Touch[id1].Y - Touch[id].Y]);
                    var SS1 = weiyi([X1 - X, Y1 - Y]);
                    var kS = SS1 / SS;
                    data.scale = TouchData.scale * kS;
                    data.translate.x = X - Touch[id].X * kS;
                    data.translate.y = Y - Touch[id].Y * kS;
                } else {
                    data = {
                        translate: {
                            x: -(window.getX() + window.canvas.getX()),
                            y: -(window.getY() + window.canvas.getY())
                        },
                        scale: 1,
                    };
                };


                break;
            case event.ACTION_UP:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                if (fuzhi && id == fuzhiid) {
                    if (weiyi([event.getX(i) - Wx, event.getY(i) - Wy]) <= 10) {
                        setClip(JSON.stringify(点色));
                        toastLog("已复制 \n" + JSON.stringify(点色));
                    };
                    fuzhi = false;
                    break;
                };
                Touch[id] = undefined;
                var PC = event.getPointerCount();
                for (var i = 0; i < PC; i++) {
                    var id1 = event.getPointerId(i)
                    var X = event.getX(i);
                    var Y = event.getY(i);
                    if (id1 != id) {
                        Touch[id1] = {
                            X: X - data.translate.x,
                            Y: Y - data.translate.y
                        };
                    };
                };
                log(PC);
                break;
        };
        return true;
    } catch (e) {
        toastLog("Touch: " + e);
        return true;
    };
});


/*
window.butJ.click(() => {
    threads.start(function() {
        var X=window.getX(),Y=window.getY();
        window.setPosition(device.width, device.height);
        sleep(100);
        var IMG = 截图();
        img = images.copy(IMG);
        window.setPosition(X,Y);
    });
});

*/



function 截图() {
    while (true) {
        if (图 = captureScreen()) {
            return 图;
            break;
        }
    }
};



function 加载图片(A) {
    if (files.isFile(A)) {
        return images.read(A);
    };
    var dir = "/storage/emulated/0/DCIM";
    var jsFiles = files.listDir(dir, function(name) {
        return (name.endsWith(".jpg") || name.endsWith(".png")) && files.isFile(files.join(dir, name));
    });
    if (jsFiles.length) {
        return images.read(files.join(dir, jsFiles[jsFiles.length - 1]));
    } else {
        toastLog("没有图片可以查看");
        toastLog("请自己修改路径");
        toastLog("后使用");
        exit();
    };
};

function listpath(Apath, Bpath) {
    Bpath = Bpath || "";
    var path = files.join(Apath, Bpath);
    var a = files.listDir(path, function(name) {
        return name.endsWith(".jpg") || name.endsWith(".png") || files.isDir(files.join(path, name));
    }).sort();
    i = dialogs.select(path, a);
    if (i + 1) {
        path = files.join(path, a[i]);
        if (files.isDir(path)) {
            return listpath(Apath, files.join(Bpath, a[i]));
        } else {
            if (dialogs.confirm("确定文件？", a[i])) {
                return path;
            } else {
                return listpath(Apath, Bpath);
            }
        }
    } else {
        var ary = Bpath.split("/");
        if (ary.length && Bpath.length) {
            ary.pop();
            return listpath(Apath, ary.join("/"));
        }
    }
};

function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};


function getsd(s, ary) {
    //将数组内所有值的平方和开方等于s
    var sum = weiyi(ary);
    var S = (s / sum) || 0;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function weiyi(ary) {
    //数组所有值平方和开方
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    //数学二维坐标系xy,输入角度。
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return [x, y];
};

function ydfx(ary) {
    //数学二维坐标系xy,返回角度。
    var ary = getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};


function windowGXY(x, y, k) {
    x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
    y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
    return {
        x: x,
        y: y
    };
};

function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj;
    }
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
};


function 悬浮控制(window, windowid, ar) {
    this.Orientation = context.resources.configuration.orientation;
    this.Width = this.Orientation == 1 ? device.width : device.height;
    this.Height = this.Orientation == 2 ? device.width : device.height;
    this.Click = function() {};
    this.LongClick = function() {};
    this.setClick = (fun) => {
        fun = fun || function() {};
        this.Click = fun;
    };
    this.setLongClick = (fun, ji) => {
        fun = fun || function() {};
        this.LongClick = fun;
        if (parseInt(ji)) {
            this.Tjitime = parseInt(ji) / 50;
        };
    };
    setInterval(() => {
        if (context.resources.configuration.orientation != this.Orientation) {
            this.Orientation = context.resources.configuration.orientation;
            this.Width = this.Orientation == 1 ? device.width : device.height;
            this.Height = this.Orientation == 2 ? device.width : device.height;
            var xy = this.windowGXY(window.getX(), window.getY(), this.G(window));
            this.windowyidong([
                [window.getX(), window.getY()],
                [xy.x, xy.y]
            ]);
        };
    }, 100);
    this.TX = 0;
    this.TY = 0;
    this.Tx = 0;
    this.Ty = 0;
    this.Tyidong = false;
    this.Tkeep = false;
    this.Tjitime = 12;
    this.Ttime = 0;
    setInterval(() => {
        if (this.Tkeep) {
            this.Ttime++;
            if (!this.Tyidong && this.Ttime > this.Tjitime) {
                //非移动且按下时长超过1秒判断为长按
                this.Tkeep = false;
                this.Ttime = 0;
                this.LongClick();
            };
        };
    }, 50);
    if (windowid) {
        windowid.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    this.Tx = event.getRawX();
                    this.Ty = event.getRawY();
                    this.TX = window.getX();
                    this.TY = window.getY();
                    this.Tkeep = true; //按下,开启计时
                    break;
                case event.ACTION_MOVE:
                    var sx = event.getRawX() - this.Tx;
                    var sy = event.getRawY() - this.Ty;
                    if (!this.Tyidong && this.Tkeep && this.weiyi(sx, sy) >= 10) {
                        this.Tyidong = true;
                    };
                    if (this.Tyidong && this.Tkeep) {
                        window.setPosition(this.TX + sx, this.TY + sy);
                    };
                    break;
                case event.ACTION_UP:
                    if (!this.Tyidong && this.Tkeep && this.Ttime < 7) {
                        this.Click();
                    };
                    this.Tkeep = false;
                    this.Ttime = 0;
                    if (this.Tyidong) {
                        var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
                        threads.start(new java.lang.Runnable(() => {
                            this.windowyidong([
                                [window.getX(), window.getY()],
                                [A.x, A.y]
                            ]);
                        }));
                        this.Tyidong = false;
                    };
                    break;
            };
            return true;
        }));
    };
    this.G = (win) => {
        var K = 35, //悬浮窗的隐形边矩
            H = 66; //手机通知栏的高度
        if (!ar) {
            return [
                [-K, -K],
                [this.Width - win.getWidth() + K, this.Height - win.getHeight() - H + K]
            ];
        } else {
            return [
                [0, H],
                [this.Width - win.getWidth(), this.Height - win.getHeight()]
            ];
        };
    };
    this.weiyi = function() { //平方和开方
        var num = 0;
        for (var i = 0; i < arguments.length; i++) {
            num += arguments[i] * arguments[i];
        };
        return Math.round(Math.sqrt(num) * 1000) / 1000
    };
    this.windowGXY = function(x, y, k) {
        x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
        y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
        return {
            x: x,
            y: y
        };
    };
    this.windowyidong = (A, s, w) => {
        w = w || window;
        s = s || 10;
        var sx = A[1][0] - A[0][0],
            sy = A[1][1] - A[0][1];
        var sd = this.weiyi(sx, sy) / s;
        var X = sx / sd,
            Y = sy / sd;
        var x = 0,
            y = 0;
        for (var i = 0; i < sd; i++) {
            x += X;
            y += Y;
            sleep(1);
            w.setPosition(A[0][0] + x, A[0][1] + y);
        };
        w.setPosition(A[1][0], A[1][1]);
    };
    this.OutScreen = () => {
        var F = this.G(window);
        var x = window.getX(),
            y = window.getY();
        var sx = window.getX() + window.getWidth() / 2,
            sy = window.getY() + window.getHeight() / 2 + 66;
        var cx = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? (sx < this.Width / 2 ? (F[0][0] - window.getWidth()) : (F[1][0] + window.getWidth())) : x,
            cy = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? y : (sy < this.Height / 2 ? (F[0][1] - window.getHeight()) : (F[1][1] + window.getHeight()));
        return [
            [x, y],
            [cx, cy]
        ];
    };
    this.toScreenEdge = (d) => {
        d = d || 0;
        var F = this.G(window);
        var x = window.getX(),
            y = window.getY();
        var sw = window.getWidth() * d;
        var sx = window.getX() + window.getWidth() / 2,
            sy = window.getY() + window.getHeight() / 2 + 66;
        var cx = sx < (this.Width - sx) ? -sw : (this.Width + sw - window.getWidth());
        return [
            [x, y],
            [cx, y]
        ];
    };
    this.centerXY = (F) => {
        var w = window.getWidth();
        var h = window.getHeight();
        return [
            [F[0] + w / 2, F[1] + h / 2],
            [F[0] - w / 2, F[1] - h / 2]
        ];
    };
    this.autoIntScreen = () => {
        var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
        threads.start(new java.lang.Runnable(() => {
            this.windowyidong([
                [window.getX(), window.getY()],
                [A.x, A.y]
            ]);
        }));
    };
    this.autoIntScreen();
};