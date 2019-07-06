importClass(android.graphics.Color);
importClass(android.graphics.PorterDuff);
importClass(android.graphics.PorterDuffXfermode);
importClass(android.graphics.Rect);
importClass(android.graphics.RectF);

//setTimeout(() => {}, 5000);
setInterval(() => {}, 100);

//toastLog("Are you ready？");

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};

threads.start(function() {
    //console.show();
});


var IMG = captureScreen();

var MainImg = images.copy(IMG);


var Width = deviceWidth(),
    Height = deviceHeight();
var region = new Rect(Width / 3, Height / 3, Width / 3 * 2, Height / 3 * 2);

var window = floaty.rawWindow(
    <frame>
        <canvas id="canvas" w="*"h="*"/>
        <horizontal w="auto" h="auto" alpha="0.5" layout_gravity="bottom|center_horizontal">
            <button id="ok" text="确定" />
            <button id="cancel" text="退出" />
        </horizontal>
    </frame>
);
window.setSize(-1, -1);

var RE_rect;

window.ok.click(function(v) {
    let txt = v.getText();
    RE_rect = to_newRect(region);
    let x1 = RE_rect.left,
        y1 = RE_rect.top,
        x2 = RE_rect.right,
        y2 = RE_rect.bottom;
    let w = x2 - x1,
        h = y2 - y1;
    let cx = Math.floor(x1 + w / 2),
        cy = Math.floor(y1 + h / 2);
    let obj = {
        region: [x1, y1, w, h],
        p: {
            x: cx,
            y: cy
        },
    };
    let image = images.clip(MainImg, x1, y1, w, h);
    images.save(image, "/sdcard/tmp.png");
    media.scanFile("/sdcard/tmp.png");

    //let str = JSON.stringify(obj);
    //setClip(str);
    //log(str);
    ui.run(() => {
        v.setText("已保存截图");
    });
    setTimeout(() => {
        ui.run(() => {
            v.setText(txt);
        });
    }, 2000);
});

window.cancel.click(function() {
    exit();
});



window.canvas.post(function() {
    let w = window.canvas.getWidth();
    let h = window.canvas.getHeight();
    //region=new Rect(w/3,h/3,w/3*2,h/3*2);
});

//黑色画笔。
var paint = new Paint;
var paint1 = new Paint;
var paint2 = new Paint;
//paint1.setTextSize(75);
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint1.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
paint1.setStyle(Paint.Style.STROKE);
paint2.setStyle(Paint.Style.FILL);
//paint.setARGB(255, 0, 0, 0);
paint.setColor(colors.RED);
paint1.setColor(colors.GREEN);
paint2.setColor(colors.GREEN);
paint2.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_OUT));
//paint.setTextSize(75);

var radius = 50;
window.canvas.on("draw", function(canvas) {
    //canvas.drawColor(Color.TRANSPARENT, PorterDuff.Mode.CLEAR);
    canvas.drawImage(MainImg, 0, 0, paint);
    //canvas.drawARGB(127, 0, 0, 0);
    let w = canvas.getWidth();
    let h = canvas.getHeight();

    //canvas.drawRect(region, paint2);
    canvas.drawRect(region, paint);
    canvas.drawCircle(region.left, region.top, radius, paint1);
    canvas.drawCircle(region.left, region.bottom, radius, paint1);
    canvas.drawCircle(region.right, region.top, radius, paint1);
    canvas.drawCircle(region.right, region.bottom, radius, paint1);
    canvas.drawRect(0, 0, w, h, paint);

});

var touchControlPoint;
var touchRegion;
var touchX = 0,
    touchY = 0;
var oldRegion;

window.canvas.setOnTouchListener(new android.view.View.OnTouchListener(function(view, event) {
    try {
        let W = view.getWidth();
        let H = view.getHeight();
        let PC = event.getPointerCount();
        switch (event.getActionMasked()) {
            case event.ACTION_MOVE:
                try {
                    for (let i = 0; i < PC; i++) {
                        let id = event.getPointerId(i);
                        let x = event.getX(i);
                        let y = event.getY(i);
                        if (touchControlPoint) {
                            setRectXY(region, touchControlPoint, x, y);
                        } else {
                            x = sinon(x, touchRegion.left, touchRegion.right);
                            y = sinon(y, touchRegion.top, touchRegion.bottom);
                            let tx = x - touchX,
                                ty = y - touchY;
                            newRegion = new Rect(oldRegion);
                            newRegion.offset(tx, ty);
                            //if(touchRegion.contains(newRegion)){
                            region = newRegion;
                            //};


                        };
                        //break;
                    };

                } catch (e) {
                    throw "MOVE " + e;
                };


                break;
            case event.ACTION_CANCEL:
                toast("触摸被系统拦截\n可能是三指截屏等功能");

                break;
            case event.ACTION_OUTSIDE:
                log("OUTSIDE");

                break;
            default:
                let I = event.getActionIndex();
                let ID = event.getPointerId(I);
                let X = event.getX(I);
                let Y = event.getY(I);
                switch (event.getActionMasked()) {
                    case event.ACTION_DOWN:
                        try {
                            //log("down");
                            touchRegion = new Rect(X - region.left, Y - region.top, W + (X - region.right), H + (Y - region.bottom));
                            let resAry = isRectXY(region, X, Y, radius);
                            //log(resAry);
                            if (resAry) {
                                Width = deviceWidth();

                                Height = deviceHeight();
                                touchControlPoint = resAry;
                            } else {
                                oldRegion = new Rect(region);
                                touchX = X;
                                touchY = Y;
                            };
                        } catch (e) {
                            throw "DOWN " + e;
                        };
                        break;
                    case event.ACTION_UP:
                        //最后一个手指抬起。
                        //log("up");
                        if (touchControlPoint) {
                            touchControlPoint = undefined;
                        } else {
                            x = sinon(X, touchRegion.left, touchRegion.right);
                            y = sinon(Y, touchRegion.top, touchRegion.bottom);
                            let tx = x - touchX,
                                ty = y - touchY;
                            newRegion = new Rect(oldRegion);
                            newRegion.offset(tx, ty);
                            //if(touchRegion.contains(newRegion)){
                            region = newRegion;
                            //};

                        };

                        break;
                    case event.ACTION_POINTER_DOWN:

                        break;
                    case event.ACTION_POINTER_UP:
                        break;
                };
        };
    } catch (e) {
        throw "imgTouch: " + e;
    };
    if (touchControlPoint) {
        return true;
    };

    return true; //ASX.touchListener(view, event);

}));



function to_newRect(rect) {
    let x1 = rect.left < rect.right ? rect.left : rect.right,
        y1 = rect.top < rect.bottom ? rect.top : rect.bottom,
        x2 = rect.right >= rect.left ? rect.right : rect.left,
        y2 = rect.bottom >= rect.top ? rect.bottom : rect.top;
    return new Rect(x1, y1, x2, y2);
};



function setRectXY(rect, idAry, x, y) {
    x = sinon(Math.floor(x - idAry[1]), 0, Width);
    y = sinon(Math.floor(y - idAry[2]), 0, Height);
    //log(x,y);
    switch (idAry[0]) {
        case 0:
            if (rect.right != x && rect.bottom != y) {
                rect.left = x;
                rect.top = y;
            };
            break;
        case 1:
            if (rect.left != x && rect.bottom != y) {
                rect.right = x;
                rect.top = y;
            };
            break;
        case 2:
            if (rect.right != x && rect.top != y) {
                rect.left = x;
                rect.bottom = y;
            };
            break;
        case 3:
            if (rect.left != x && rect.top != y) {
                rect.right = x;
                rect.bottom = y;
            };
            break;
    };
};

function sinon(a, b, c) {
    return (a >= b && a < c) ? a : (a >= b ? c : b);
};


function isRectXY(rect, x, y, r) {
    let x1 = x - rect.left,
        y1 = y - rect.top,
        x2 = x - rect.right,
        y2 = y - rect.bottom;

    if (weiyi([x1, y1]) <= r) {
        return [0, Math.floor(x1), Math.floor(y1)];

    } else if (weiyi([x2, y1]) <= r) {
        return [1, Math.floor(x2), Math.floor(y1)];

    } else if (weiyi([x1, y2]) <= r) {
        return [2, Math.floor(x1), Math.floor(y2)];

    } else if (weiyi([x2, y2]) <= r) {
        return [3, Math.floor(x2), Math.floor(y2)];
    };

    return null;
};

function getOrientation() {
    return context.resources.configuration.orientation == 2 ?
        "landspace" : "portrait"
}

function deviceWidth() {
    let wm = context.getSystemService('window');
    let display = wm.getDefaultDisplay();
    let metrics = new android.util.DisplayMetrics();
    display.getRealMetrics(metrics);
    //log("width = ", metrics.widthPixels)
    return metrics.widthPixels;
}

function deviceHeight() {
    let wm = context.getSystemService('window');
    let display = wm.getDefaultDisplay();
    let metrics = new android.util.DisplayMetrics();
    display.getRealMetrics(metrics);
    //log("height = ", metrics.heightPixels);
    return metrics.heightPixels;
}


function getTimeString() {
    return new java.text.SimpleDateFormat("yyyy_MM_dd_HH:mm:ss").format(new Date());
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


function ABCtoast(maxCount) {
    this.ary = [];
    this.thread;
    this.ji = 0;
    this.getTimeString = function() {
        //https://www.jianshu.com/p/cf2f1f26dd0a
        return new java.text.SimpleDateFormat("mm:ss:SSS:/").format(new Date());
    };
    this.addSome = (T) => {
        this.ary.push({
            time: this.getTimeString(),
            text: T
        });
        if (this.ary.length > maxCount) {
            this.ary = this.ary.slice(-maxCount);
        };
        if (this.thread ? !this.thread.isAlive() : true) { //线程没有运行。
            this.thread = threads.start(new java.lang.Runnable(() => {
                sleep(500);
                do {
                    do {
                        this.ji += 0.2;
                        sleep(50);
                    } while (this.ji <= 1);
                    this.ji = 0;
                    this.ary.shift();
                } while (this.ary.length);
            }));
        };
    }
};