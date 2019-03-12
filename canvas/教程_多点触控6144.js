"ui";

/**
*作者QQ: 1811588980
*完成时间: 2019年1月9日 下午12:44:13
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 暂无备注
**/

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

var textSize=50;

//new android.graphics.RectF


ui.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127);
    //原背景是白色的，太刺眼了，我换成灰色。相当于画了一个不透明的灰色。
    var ary = TT.ary;
    paint.setTextSize(textSize);
    paint.setStyle(Paint.Style.FILL);
    //字体本身的笔画就是一个封闭形状。在这里设置为填充。下面写字。
    for (let i = 0; i < ary.length; i++) {
        canvas.drawText(ary[i], 0, (i+1) * textSize - TT.ji * textSize, paint);
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
                log("触控被取消");
                TouchpointAry = new Array;


                break;
            case event.ACTION_OUTSIDE:
                //暂时未知。
                //log("OUTSIDE");

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
                        log("第一个手指按下");
                        TouchpointAry.splice(I, 0, {
                            id: ID,
                            x: X,
                            y: Y
                        });


                        break;
                    case event.ACTION_UP:
                        //最后一个手指抬起。
                        log("最后一个手指抬起");
                        TouchpointAry = new Array;
                        break;
                    case event.ACTION_POINTER_DOWN:
                        //其他手指按下。
                        log(I, "号手指按下");
                        TouchpointAry.splice(I, 0, {
                            id: ID,
                            x: X,
                            y: Y
                        });


                        break;
                    case event.ACTION_POINTER_UP:
                        //其他手指抬起。
                        log(I, "号手指抬起");
                        TouchpointAry.splice(I, 1);

                        break;
                };
        };
    } catch (e) {
        log("0: " + e);
    };

    return true;
}));



function ABCtoast(maxCount) {
    that = this;
    this.ary = [];
    this.thread;
    this.ji = 0;
    this.addSome = function() {
        var T = String(arguments[0]);
        for (let i = 1; i < arguments.length; i++) {
            T += (" " + String(arguments[i]));
        };
        that.ary.push(T);
        if (that.ary.length > maxCount) {
            that.ary = that.ary.slice(-maxCount);
        };
        if (that.thread ? !that.thread.isAlive() : true) { //线程没有运行。
            that.thread = threads.start(function() {
                sleep(500);
                do {
                    do {
                        that.ji += 0.2;
                        sleep(50);
                    } while (that.ji <= 1);
                    that.ji = 0;
                    that.ary.shift();
                } while (that.ary.length);
            });
        };
    }
};


var TT = new ABCtoast(20);
log = TT.addSome;