/**
 *作者QQ: 1811588980
 *完成时间: 2019年6月12日 下午10:00:33
 *测试机型: vivo PD1813D
  *Android版本: 8.1.0
  *屏幕: 1080*2280
  *API: 27
 *备注: 在屏幕上显示悬浮窗中心十字所指示位置上最小的控件信息。
**/




auto();



//要显示的空间数据。
var show_ary = ["bounds","className", "clickable", "id", "desc", "scrollable", "text"];

var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];

let 当前方向 = context.getResources().getConfiguration().orientation
let 当前数组 = new Array;
let 当前坐标 = {
    x: 0,
    y: 0
};

var win = floaty.rawWindow(
    <frame >
        <ImageView id="canvas" w="*"h="*"/>
    </frame>
);
var ASK=new 绘布(win.canvas);
win.setTouchable(false);
win.setSize(-1, -1);


var win_ = floaty.rawWindow(
    <frame w="{{Math.floor(device.width/2)}}px"h="{{Math.floor(device.width/2)}}px">
        <button id="but" w="*" h="*" bg="#40400000" text="+" textColor="#ff0000"textSize="30" layout_gravity="center"gravity="center"/>
    </frame>
);

win_.setPosition(device.width / 4, device.width / 4);

setInterval(() => {
    方向 = context.getResources().getConfiguration().orientation
    //log(方向)
    if (方向 == 1 && 方向 != 当前方向) {
        当前方向 = 方向
        win_.setPosition(device.width / 4, device.width / 4);

        //sleep(1000)
    } else if (方向 == 2 && 方向 != 当前方向) {
        当前方向 = 方向
        toastLog("横屏")
        win_.setPosition(device.width / 4, device.width / 4);
    }

}, 500);

//setTimeout(()=>{exit();},5000);

var paint1 = new Paint;
//paint1.setTextAlign(Paint.Align.CENTER);
paint1.setStrokeWidth(8);
//paint1.setStyle(Paint.Style.STROKE);
//paint1.setStyle(Paint.Style.FILL);
//paint1.setARGB(255, 0, 255, 0);
paint1.setTextSize(40);

var kg = false;
var isbig=true;
//win.canvas.setMaxFps(60);
ASK.setDraw(function(canvas) {
    try {
        canvas.drawColor(android.graphics.Color.TRANSPARENT, android.graphics.PorterDuff.Mode.CLEAR);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        //canvas.drawRoundRect(4, 4, w - 4, h - 4, 100, 100, paint1);
        if (kg) {
            paint1.setStyle(Paint.Style.STROKE);
            for (let i = 0; i < 当前数组.length; i++) {
                paint1.setColor(rainbowColor[i % rainbowColor.length]);
                let uiObj = 当前数组[i];
                if (uiObj) {
                    let rect = uiObj.bounds();
                    canvas.drawRect(rect, paint1);
                    if (i == 当前数组.length - 1) {
                        paint1.setStyle(Paint.Style.FILL);
                        paint1.setColor(反色(paint1.getColor()));
                        for (let i = 0; i < show_ary.length; i++) {

                            canvas.drawText(show_ary[i] + ": " + uiObj[show_ary[i]](), w / 10, h / 5 + paint1.getTextSize() * i, paint1);

                        };

                    };
                };
            };
        };
    } catch (e) {
        toastLog(e);
    };
});

var thread;
var isMove=false;
win_.but.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = win_.getX();
            windowY = win_.getY();
            downTime = new Date().getTime();
            kg=false;
            isMove=false;
            return true;
        case event.ACTION_MOVE:
        isMove=true;
            //移动手指时调整悬浮窗位置
            fcx = windowX + (event.getRawX() - x)
            fcy = windowY + (event.getRawY() - y)
            win_.setPosition(fcx, fcy);
            if (isbig&&(!thread || !thread.isAlive())) {
                thread = threads.start(function() {
                    当前数组 = getUiObj(fcx + win_.getWidth() / 2, fcy + win_.getWidth() / 2);
                    kg = true;
                });
            };

            return true;
        case event.ACTION_UP:
            return true;
        if(!isMove){
            if(isbig){
                win_.setSize(Math.floor(device.width/8),Math.floor(device.width/8));
                isbig=false;
                }else{
                win_.setSize(Math.floor(device.width/2),Math.floor(device.width/2));
                isbig=true;
            };
        };
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



function getUiObj(x, y) {
    //let x=500,y=500;
    let uiObj_ary = filter(function(uiObj) {
        let rect = uiObj.bounds();
        return rect.contains(x, y);
    }).find().sort(function(A,B){
        AR=A.bounds();
        BR=B.bounds();
        return BR.width()*BR.height()-AR.width()*AR.height();
        
    });
    /*
    uiObj_ary.forEach(function(uiObj){
        log(uiObj.bounds());
        
    });
    */
    return uiObj_ary;

};




function 绘布(view) {
    if (view.accessibilityClassName != "android.widget.ImageView") {
        throw "我报错";
    };
    this.width = view.getWidth();
    this.height = view.getHeight();
    this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(this.bitmap);
    this.matrix = new android.graphics.Matrix();
    threads.start(new java.lang.Runnable(() => {
        while (true) {
            if (view.getWidth() != this.width || view.getHeight() != this.height) {
                this.width = view.getWidth();
                this.height = view.getHeight();
                this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
                this.canvas = new android.graphics.Canvas(this.bitmap);
            };
            sleep(500);
        };
    }));
    this.Draw = function() {};
    this.setDraw = function(fun) {
        if (typeof fun == "function") {
            this.Draw = fun;
        };
    };
    setInterval(() => {
        try {
            this.bitmap.eraseColor(0);
            this.canvas.setMatrix(this.matrix);
            this.Draw(this.canvas);
            ui.run(() => {
                view.setImageBitmap(this.bitmap);
            });
        } catch (e) {
            toastLog(e);
        };
    }, 50);
};



