

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
                return true;
                //抬起事件。
            case event.ACTION_UP:
                if (this.Timeout) {
                    //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                    //清除定时器。
                    clearTimeout(this.Timeout);
                    this.Timeout = 0;
                    //执行点击事件。
                    this.Click(event);
                };
                return true;
        };
        //控件的触控事件函数必须要返回true。否则报错。
        return true;
    }));
};


auto();

var x = Math.floor(device.width / 2),
    y = Math.floor(device.height / 2);
var Width = device.width,
    Height = device.height;
var sw = null,
    sh = null;
var s = Math.floor(1);
//toastLog("长方形宽高为" + s * 2);
var UiObject, UiOb;
var activity=currentActivity();
setInterval(()=>{
    if(currentActivity()!=activity){
      UiObject = selector().findOne();  
        };
    },2000);

threads.start(function() {
    sleep(1000);
    UiObject = selector().findOne();
    UiOb = 获取控件(x, y, s);
    if (!UiOb) {
        toastLog("发生了bug，没找到控件");
        //exit();
    };
    toastLog("找到了控件");
});

var ji = 0;

var window = floaty.rawWindow(
    <vertical>
        <canvas id="canvas" w="{{Math.floor(device.width*0.8)}}px"h="{{Math.floor(device.height*0.8)}}px"/>
    </vertical>
);
var wc = new 悬块(window, window.canvas);

wc.setLongClick(function() {
    toastLog("已停止运行");
    exit();
});
wc.setClick(function(e) {
    threads.start(function() {
        try {
            var x = Math.round(e.getX() / sw),
                y = Math.round(e.getY() / sh);
            log(x + "," + y);
            var s = Math.floor(1);

            UiObject = selector().findOne();
            //toastLog("UiObject"+UiObject?1:0);
            var Ob;
            
            while(!(Ob= 获取控件(x, y, s)));
            if (Ob) {
                UiOb = Ob;
            };
        } catch (e) {
            toastLog(e);
        };
    });
});


importClass(android.graphics.Paint);
importClass(android.graphics.Bitmap);
//importClass(android.graphics.canvas);

//var bitmap = Bitmap.createBitmap(device.width, device.height, Bitmap.Config.ARGB_8888);
//var canvas = new Canvas(bitmap);
var paint = new Paint();

paint.setStrokeWidth(3);
paint.setStyle(Paint.Style.STROKE);
paint.setColor(colors.RED);
paint.setTextAlign(Paint.Align.CENTER); //写字左右中心

var size = 60;
paint.setTextSize(size);

//paint.setARGB(255,255,255,255);
window.canvas.on("draw", function(canvas) {
    try {
        let w = canvas.getWidth(),
            h = canvas.getHeight();
        sw = w / Width*0.95;
        sh = h / Height*0.95;
        canvas.drawARGB(255, 127, 127, 127);

        let matrix = new android.graphics.Matrix();
    matrix.postTranslate((w-Width)/2,(h-Height)/2);
        matrix.postScale(sw, sh,w/2,h/2);
        canvas.setMatrix(matrix);
        paint.setStrokeWidth(5);
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(colors.GREEN);
        canvas.drawRect(0, 0, Width, Height, paint);
        if (UiObject) {
            生成(UiObject, canvas)
        };
        if (UiOb) {
            let r = UiOb.bounds();
            //log(r);
            paint.setColor(colors.RED);
            canvas.drawRect(r, paint);
        paint.setStrokeWidth(3);
        paint.setStyle(Paint.Style.FILL);
            paint.setColor(colors.YELLOW);
            canvas.drawText(String(UiOb.className()), Math.floor(Width/2), r.centerY() + 0.365 * size, paint);
        };
    } catch (e) {
        toastLog(e);
    };
});

function 获取控件(x, y, s) {
    var UiOb = null;
    var UiAry = boundsContains(x - s, y - s, x + s, y - s).find();
    //log(UiAry);
    if (UiAry && UiAry.length) {
        for (let i = 0; i < UiAry.length; i++) {
            let Ui = UiAry[i];
            //log(i);
            if (Ui) {
                if (!UiOb || 判断(Ui,UiOb)) { //UiOb.bounds().contains(UiAry[i].bounds()))
                    UiOb = Ui;
                };
            };
        };
        return UiOb;
    };
    function 判断(a,b){
        return (a.clickable() && (a.depth() <= b.depth() ? (a.indexInParent() > 0 ? true : false) : (true)))
    };
};

//toastLog(saveimg(files.path("./图片.png"), bitmap));
function 生成(UiObject, canvas, C) {
    if (UiObject) {
        canvas.drawRect(UiObject.bounds(), paint);
        if (UiObject.childCount() && ((!C && C != 0) || C > 0)) {
            for (var i = 0; i < UiObject.childCount(); i++) {
                生成(UiObject.child(i), canvas, C - 1);
            };
        };
    };
};

//存画
function saveimg(path, bitmap) {
    try {
        var file = new java.io.File(path);
        var fileOutput = new java.io.FileOutputStream(file);
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, fileOutput);
        return true;
    } catch (e) {
        log(e);
        return false;
    }
};