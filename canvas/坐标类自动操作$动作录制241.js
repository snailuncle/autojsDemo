"ui";

ui.layout(
    <vertical>
        <canvas layout_weight="1" id="canvas" />
        <horizontal h="auto">
            <button id="but_q" layout_weight="1" h="auto" text="清空"/>
            <button id="but_c" layout_weight="1" h="auto" text="撤销"/>
            <button id="but_s" layout_weight="1" h="auto" text="生成代码"/>
            <button id="but_b" layout_weight="1" h="auto" text="保存至文件"/>
        </horizontal>
    </vertical>

);



var paint = new Paint;
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
paint.setARGB(255, 0, 0, 0);
var textSize = 50;
paint.setTextSize(textSize);


var storage = storages.create("AJ动作录制");

//每次动作。
var MainGesturesAry =storage.get("gestures", new Array); //↓↓↓↓
//一次中的手指动作。
var gesturesAry = new Array; //↓↓↓↓[[0,100,[x1,y1],[x2,y2],[x3,y3],[x4,y4],………],………]
//每个手指的动作。
var TouchPointRecord = new Array; //[[0,1000,[x1,y1],………],………]

var TouchPointStart = new Array; //[[x1,y1],[x2,y2],[x3,y3],[x4,y4],………]
var TouchPointCurrent = new Array; //[[x1,y1],[x2,y2],[x3,y3],[x4,y4],………]



threads.start(function() {
    console.show();
});


var Ts = 10; //动作精度。越小精度越高。//但实际上没卵用。自动操作函数gestures会自动缩减
var kg = false;
var jishi = 0;
//new android.graphics.RectF

setInterval(() => {
    if (kg) {
        jishi++;
        for (let i = 0; i < TouchPointRecord.length; i++) {
            let x = Math.floor(TouchPointCurrent[i][0]);
            let y = Math.floor(TouchPointCurrent[i][1]);
            TouchPointRecord[i].push([x, y]);
            TouchPointRecord[i][1] += Ts;
        };
    };
}, Ts);


ui.but_q.click(function() {
    MainGesturesAry = new Array;
});
ui.but_c.click(function() {
    MainGesturesAry.pop();
});
ui.but_s.click(function() {
    setClip("var gesturesAry=" + JSON.stringify(MainGesturesAry) + ";\nfor(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(100);}");
    toast("已复制");
});




ui.but_b.click(function() {
    threads.start(function() {
        var p = dialogs.prompt("保存路径", storage.get("savePath","/sdcard/脚本/LZ动作.js"));

        if (p) {
                storage.put("savePath", p);

            files.write(p, "var gesturesAry=" + JSON.stringify(MainGesturesAry) + ";\nfor(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(100);}");
        };
    });


});


events.on("exit", function() {
    storage.put("gestures", MainGesturesAry);

    //files.write("./组.js","var gesturesAry="+JSON.stringify(MainGesturesAry)+";\nfor(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(100);}");
});



ui.canvas.on("draw", (canvas) => {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    var AX = w / 2;
    var AY = h / 2;
    paint.setStyle(Paint.Style.STROKE);
    canvas.drawText(String(MainGesturesAry.length + "个动作"), 0, textSize, paint)

    if (TouchPointStart.length) {

        for (let i = 0; i < TouchPointStart.length; i++) {
            try {
                let X = TouchPointStart[i][0];
                let Y = TouchPointStart[i][1];
                let x = TouchPointCurrent[i][0];
                let y = TouchPointCurrent[i][1];
                X = X || 0;
                Y = Y || 0;
                x = x || 0;
                y = y || 0;
                let a = X - (x - X);
                let b = Y - (y - Y);
                //let rect = new android.graphics.RectF(X, Y, x, y);
                //canvas.drawRect(rect, paint);
                //let rect2 = new android.graphics.RectF(X, Y, a, b);
                //canvas.drawRect(rect2, paint);
                //let rect3 = new android.graphics.RectF(x, y, a, b);
                //canvas.drawRect(rect3, paint);
                //canvas.drawLine(X, Y, x, y, paint);
                //canvas.drawLine(X, Y, a, b, paint);
                canvas.drawText(String("A"), X, Y, paint)
                canvas.drawText(String("B"), x, y, paint);
                canvas.drawCircle(X, Y, 10, paint);
                canvas.drawCircle(x, y, 10, paint);
                //canvas.drawCircle(a, b, 10, paint);
            } catch (e) {};
        };
        for (let ii = 0; ii < TouchPointRecord.length; ii++) {
            let ge = TouchPointRecord[ii];
            canvas.drawText(String(ge), 0, textSize * (ii + 2), paint)
            for (let i = 2; i < ge.length - 1; i++) {

                let X = ge[i][0];
                let Y = ge[i][1];
                let x = ge[i + 1][0];
                let y = ge[i + 1][1];
                X = X || 0;
                Y = Y || 0;
                x = x || 0;
                y = y || 0;
                //let a = X - (x - X);
                //let b = Y - (y - Y);
                //let rect = new android.graphics.RectF(X, Y, x, y);
                //canvas.drawRect(rect, paint);
                //let rect2 = new android.graphics.RectF(X, Y, a, b);
                //canvas.drawRect(rect2, paint);
                //let rect3 = new android.graphics.RectF(x, y, a, b);
                //canvas.drawRect(rect3, paint);
                canvas.drawLine(X, Y, x, y, paint);
                //canvas.drawLine(X, Y, a, b, paint);
                //canvas.drawText(String("A"), X, Y, paint)
                //canvas.drawText(String("B"), x, y, paint);
                //canvas.drawCircle(X, Y, 10, paint);
                //canvas.drawCircle(x, y, 10, paint);
                //canvas.drawCircle(a, b, 10, paint);
            };
        };
    };

});



ui.canvas.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
    try {
        var W = view.getWidth();
        var H = view.getHeight();
        var PC = event.getPointerCount();
        switch (event.getActionMasked()) {
            case event.ACTION_MOVE:
                for (let i = 0; i < PC; i++) {
                    let id = event.getPointerId(i);
                    let X = event.getX(i);
                    let Y = event.getY(i);
                    TouchPointCurrent[i][0] = X;
                    TouchPointCurrent[i][1] = Y;
                };


                break;
            case event.ACTION_CANCEL:
                //log("CANCEL");
                kg = false;
                TouchPointStart = new Array;
                TouchPointCurrent = new Array;

                break;
            case event.ACTION_OUTSIDE:
                //log("OUTSIDE");

                break;
            default:
                var I = Math.floor(event.getAction() / 256);
                var ID = event.getPointerId(I);
                var X = event.getX(I);
                var Y = event.getY(I);
                switch (event.getActionMasked()) {
                    case event.ACTION_DOWN:
                        //第一个手指按下。
                        //log("down");
                        kg = true;
                        TouchPointRecord.splice(I, 0, [0, 1, [Math.floor(X), Math.floor(Y)]]);
                        TouchPointStart.splice(I, 0, [X, Y]);
                        TouchPointCurrent.splice(I, 0, [X, Y]);

                        break;
                    case event.ACTION_UP:
                        //最后一个手指抬起。
                        //log("up");
                        kg = false;
                        jishi = 0;


                        gesturesAry.push(TouchPointRecord[I]);
                        MainGesturesAry.push(gesturesAry);
                        gesturesAry = new Array;


                        TouchPointStart = new Array;
                        TouchPointCurrent = new Array;
                        TouchPointRecord = new Array;

                        break;
                    case event.ACTION_POINTER_DOWN:
                        //log("POINTER_DOWN");
                        TouchPointRecord.splice(I, 0, [jishi * Ts, 1, [Math.floor(X), Math.floor(Y)]]);
                        TouchPointStart.splice(I, 0, [X, Y]);
                        TouchPointCurrent.splice(I, 0, [X, Y]);


                        break;
                    case event.ACTION_POINTER_UP:
                        //log("POINTER_UP");
                        gesturesAry.push(TouchPointRecord[I]);

                        TouchPointStart.splice(I, 1);
                        TouchPointCurrent.splice(I, 1);
                        TouchPointRecord.splice(I, 1);

                        break;
                };
        };
    } catch (e) {
        log("0: " + e);
    };

    return true;
}));


反色 = function(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};

toJavaArray = function(type, ary) {
    //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
    var Ary = util.java.array(type, ary.length);
    for (let i in ary) {
        Ary[i] = ary[i];
    };
    return Ary;
};

SolvePos = function(a, b, r, k, c) {
    let a1 = k * k + 1;
    let b1 = 2 * k * (c - b) - 2 * a;
    let c1 = a * a + (c - b) * (c - b) - r * r;
    let delta = b1 * b1 - 4 * a1 * c1;
    let result = [];
    if (delta == 0) {
        let x0 = Math.sqrt(delta);
        let x1 = -b1 / (2 * a1);
        let y1 = k * x1 + c;
        result.push(x1, y1);
    } else if (delta > 0) {
        let x0 = Math.sqrt(delta);
        let x1 = (-b1 - x0) / (2 * a1);
        let y1 = k * x1 + c;
        result.push(x1, y1);
        let x2 = (-b1 + x0) / (2 * a1);
        let y2 = k * x2 + c;
        result.push(x2, y2);
    }
    return result;
};

weiyi = function(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

kdfx = function(Y) {
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return {
        x: x,
        y: y
    };
};

ydfx = function(obj) {
    var ary = getsd(1, [obj.x, obj.y]);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};

getsd = function(s, ary) {
    var sum = weiyi(ary);
    var S = s / sum;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

XYTOAB = function(x, y, x1, y1) {
    var A = (y1 - y) / (x1 - x);
    var B = y - A * x;
    return [A, B];
};




/*
int getPointerCount() //手势操作所包含的点的个数
int findPointerIndex(int pointerId) //根据pointerId找到pointer在MotionEvent中的index
int getPointerId(int pointerIndex) //根据MotionEvent中的index返回pointer的唯一标识
float getX(int pointerIndex) //返回手势操作点的x坐标
float getY(int pointerIndex) //返回手势操作点的y坐标
final int getActionMasked () //获取特殊点的action 
final int getActionIndex()//  用来获取当前按下／抬起的点的标识。如果当前没有任何点抬起／按下，该函数返回0。比如事件类型为ACTION_MOVE时，该值始终为0。

*/