"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年1月20日 上午10:58:25
 *测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
 *备注: 暂无备注
 **/



//MotionEvent详解 https://www.jianshu.com/p/7c40dece7b22
ui.layout(
    <vertical>
        <canvas id="canvas"/>
    </vertical>

);


var paint = new Paint;
//一个新的画笔。
//paint.setTextAlign(Paint.Align.CENTER);
//写字的时候在中心。
paint.setStrokeWidth(5);
//笔头的宽度。
//paint.setStyle(Paint.Style.STROKE);
//画封闭图形的时候是空心的。
paint.setARGB(255, 0, 0, 0);
//设置笔的颜色。ARGB
//paint.setTextSize(75);
//设置写字的时候，字的大小。

var textSize = 50;
//new android.graphics.RectF


ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.drawARGB(255, 127, 127, 127);
    //原背景是白色的，太刺眼了，我换成灰色。相当于画了一个不透明的灰色。
    canvas.drawLine(0, h / 10, w, h / 10, paint);
    paint.setTextSize(textSize);
    paint.setStyle(Paint.Style.FILL);
    //字体本身的笔画就是一个封闭形状。在这里设置为填充。下面写字。
    paint.setTextAlign(Paint.Align.LEFT);
    for (let i = 0; i < TT1.ary.length; i++) {
        canvas.drawText(TT1.ary[i], 0, h / 10 + (i + 1) * textSize - TT1.ji * textSize, paint);
        //循环绘制日志消息。
    };
    paint.setTextSize(textSize);
    paint.setStyle(Paint.Style.FILL);
    //字体本身的笔画就是一个封闭形状。在这里设置为填充。下面写字。
    paint.setTextAlign(Paint.Align.RIGHT);
    for (let i = 0; i < TT2.ary.length; i++) {
        canvas.drawText(TT2.ary[i], w, h / 10 + (i + 1) * textSize - TT2.ji * textSize, paint);
        //循环绘制日志消息。
    };
    paint.setTextSize(100);
    paint.setStyle(Paint.Style.STROKE);
    for (let i = 0; i < TouchpointAry.length; i++) {
        //循环绘制每一个触控点。
        var obj = TouchpointAry[i];
        if (!obj) {
            continue
        };
        //绘制一个圆圈。
        canvas.drawCircle(obj.x, obj.y, 50, paint);
        //且这个触控点的ID。
        canvas.drawText(obj.id, obj.x + 50, obj.y - 50, paint);

    };
});

var TouchpointAry = new Array;

ui.canvas.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
    try {
        var W = view.getWidth();
        var H = view.getHeight();
        //当前触控的控件宽高。
        var PC = event.getPointerCount();
        //触控点总数量。//包括变化中的触控点。
        var RX = event.getRawX();
        var RY = event.getRawY();
        //触控点id最小的触控坐标。
        switch (event.getActionMasked()) {
            case event.ACTION_MOVE:
                //触控点移动事件。(任何一个触控点移动都会触发)
                log2("移动");

                for (let i = 0; i < PC; i++) {
                    let id = event.getPointerId(i);
                    let X = event.getX(i);
                    let Y = event.getY(i);
                    //每一个触控点的坐标。
                    TouchpointAry[i].x = X;
                    TouchpointAry[i].y = Y;
                };


                break;
            case event.ACTION_CANCEL:
                //触控事件被取消。(触控过程中控件消失或不可触摸)
                log1("触控被取消");
                TouchpointAry = new Array;


                break;
            case event.ACTION_OUTSIDE:
                //暂时未知。
                //log1("OUTSIDE");

                break;
            default:
                var I = Math.floor(event.getAction() / 256);
                //当前变化的是第几个手指？(按照以按下的手指先后顺序排序从0开始)
                var ID = event.getPointerId(I);
                //变化的这个手指的ID。
                var X = event.getX(I);
                var Y = event.getY(I);
                //变化的这个手指的坐标。
                switch (event.getActionMasked()) {
                    //当手指按下或松开时触发。
                    case event.ACTION_DOWN:
                        //第一个手指按下。
                        log1("第一个手指按下");
                        TouchpointAry.splice(I, 0, {
                            id: ID,
                            x: X,
                            y: Y
                        });


                        break;
                    case event.ACTION_UP:
                        //最后一个手指抬起。
                        log1("最后一个手指抬起");
                        TouchpointAry = new Array;
                        break;
                    case event.ACTION_POINTER_DOWN:
                        //其他手指按下。
                        log1(I, "号手指按下");
                        TouchpointAry.splice(I, 0, {
                            id: ID,
                            x: X,
                            y: Y
                        });


                        break;
                    case event.ACTION_POINTER_UP:
                        //其他手指抬起。
                        log1(I, "号手指抬起");
                        TouchpointAry.splice(I, 1);

                        break;
                };
        };
    } catch (e) {
        log1("0: " + e);
    };

    return true;
}));



function ABCtoast(maxCount) {
    this.ary = [];
    this.thread;
    this.ji = 0;
    this.getTimeString = function() {
        //https://www.jianshu.com/p/cf2f1f26dd0a
        return new java.text.SimpleDateFormat("mm:ss:SSS:/").format(new Date());
    };
    this.addSome = (T) => {
        this.ary.push(this.getTimeString() + T);
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


var TT1 = new ABCtoast(20);
var TT2 = new ABCtoast(30);
log1 = function() {
    var T = String(arguments[0]);
    for (let i = 1; i < arguments.length; i++) {
        T += (" " + String(arguments[i]));
    };
    TT1.addSome(T);
};

log2 = function() {
    var T = String(arguments[0]);
    for (let i = 1; i < arguments.length; i++) {
        T += (" " + String(arguments[i]));
    };
    TT2.addSome(T);
};
