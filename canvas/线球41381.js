"ui";
//ui布局为一块画布
var dw = Math.round(device.width / 0.618 < device.height ? device.width : device.height * 0.618);
var dh = Math.round(device.height * 0.618 < device.width ? device.height : device.width / 0.618);
ui.layout(
    <vertical>
        <canvas id="board" w="{{dw}}px" h="{{dh}}px"/>
<horizontal gravity="center">
<button id="but" margin="10px" text="触轮开" textSize="20px" bg="#00BFA5"/>
<button id="but1" margin="10px" text="连线关" textSize="20px" bg="#00BFA5"/>
<button id="but2" margin="10px" text="指令" textSize="20px" bg="#00BFA5"/>
<button id="but3" margin="10px" text="保存并退出" textSize="20px" bg="#00BFA5"/>
</horizontal>
    </vertical>
);

threads.start(function() {
    // console.show();
});

var r = 0.025;
var detailText = ""; //messageLog
var model = 0;
//画笔
var paint = new Paint();
//paint.setColor(colors.parseColor("#00ff00"));
//paint.setStyle(Paint.Style.FILL); //实心样式  
//paint.setStyle(Paint.Style.STROKE); //空心样式  
//paint.setStrokeWidth(5); //边缘宽度  
paint.setTextAlign(Paint.Align.CENTER); //写字左右中心


var dianzu = new Array; //绘画点色数据
for (var i = 0; i < 10; i++) {
    var color = colors.argb(255, random(0, 255), random(0, 255), random(0, 255));
    var a = [Math.random(), Math.random(), color];
    dianzu.push(a);
};
var xianzu = new Array; //绘画线色数据

var lianxianzu = new Array; //连线组
var ControlPoints = new Array; //记录触控点
var TouchPoints = new Array; //画点位


ui.board.on("draw", function(canvas) {
try{
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    paint.setStrokeWidth(5); //边缘宽度  
    paint.setStyle(Paint.Style.STROKE); //空心样式  
    if (lianxianzu.length) {
        paint.setColor(lianxianzu[3]);
        var x = Math.round(w * dianzu[lianxianzu[0]][0]);
        var y = Math.round(h * dianzu[lianxianzu[0]][1]);
        var ax = Math.round(w * lianxianzu[1]); //i == 0 ? dianzu.length - 1 : i - 1
        var ay = Math.round(h * lianxianzu[2]); //i == 0 ? dianzu.length - 1 : i - 1
        canvas.drawLine(x, y, ax, ay, paint);
    };
    if (xianzu.length) {
        for (var i = 0; i < xianzu.length; i++) {
            paint.setColor(xianzu[i][2]);
            var x = Math.round(w * dianzu[xianzu[i][0]][0]);
            var y = Math.round(h * dianzu[xianzu[i][0]][1]);
            var ax = Math.round(w * dianzu[xianzu[i][1]][0]); //i == 0 ? dianzu.length - 1 : i - 1
            var ay = Math.round(h * dianzu[xianzu[i][1]][1]); //i == 0 ? dianzu.length - 1 : i - 1
            canvas.drawLine(x, y, ax, ay, paint);
        };
    };
    for (var i = dianzu.length - 1; i >= 0; i--) {
        var x = Math.round(w * dianzu[i][0]);
        var y = Math.round(h * dianzu[i][1]);
        paint.setColor(dianzu[i][2]);
        canvas.drawCircle(x, y, Math.round(weiyi(w, h) * r), paint); //绘制圆
        var size = Math.round(weiyi(w, h) * r) * 1.5;
        paint.setTextSize(size);
        canvas.drawText(i, x, y + 0.365 * size, paint);
    };
    if (detailText != "") {
        paint.setStrokeWidth(1); //边缘宽度  
        paint.setColor(colors.BLACK);
        paint.setStyle(Paint.Style.FILL); //实心样式  
        var size = 30;
        paint.setTextSize(size);
        canvas.drawText(detailText, w / 2, h / 2 + 0.365 * size, paint);
    };
    if (ui.but.getText() == "触轮开" && TouchPoints.length) {
        DrawTime(canvas, paint, TouchPoints, 250);
    };
    }catch(e){log("d "+e);toast("d "+e);};
});

//多点触控  5,6,261,262,517,518,773,774,
ui.board.setOnTouchListener(function(view, event) {
        try {
    TouchPoints = new Array;
    var TP = TouchPoints;
    var CP = ControlPoints;
    var PC = event.getPointerCount();
    for (var i = 0; i < PC; i++) {
        id = event.getPointerId(i);
        var Xw = event.getX(i) / view.width;
        var Yh = event.getY(i) / view.height;
        Xw = (0 < Xw && Xw < 1) ? Xw : (0 < Xw ? 1 : 0);
        Yh = (0 < Yh && Yh < 1) ? Yh : (0 < Yh ? 1 : 0);
        x = Math.round(event.getX(i));
        y = Math.round(event.getY(i));
        TP.push([id, Xw, Yh]);
        switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                var Xw = event.getX(i) / view.width;
                var Yh = event.getY(i) / view.height;
                if (ui.but1.getText() == "连线开") {
                    var k = shifou(Xw, Yh, dianzu, r * 2);
                    if (k){
                        lianxianzu[0] = k[0];
                    lianxianzu[1] = Xw + k[1];
                    lianxianzu[2] = Yh + k[2]
                    var color = colors.argb(255, random(0, 255), random(0, 255), random(0, 255));
                    lianxianzu[3] = color;
                    };
                } else {
                    CP[id] = shifou(Xw, Yh, dianzu, r * 2);
                    if (CP[id]) {
                        dianzu[CP[id][0]][0] = Xw + CP[id][1];
                        dianzu[CP[id][0]][1] = Yh + CP[id][2];
                    };
                };
                //log(event.getPointerId(Math.floor(event.getAction()/256))+" true");
                //log("down "+event.getAction()+" "+(Math.floor(event.getAction()/256)));
                break;
            case event.ACTION_MOVE:
                var Xw = event.getX(i) / view.width;
                var Yh = event.getY(i) / view.height;
                Xw = (0 < Xw && Xw < 1) ? Xw : (0 < Xw ? 1 : 0);
                Yh = (0 < Yh && Yh < 1) ? Yh : (0 < Yh ? 1 : 0);
                if (ui.but1.getText() == "连线开" && lianxianzu.length) {
                    lianxianzu[1] = Xw;
                    lianxianzu[2] = Yh;
                } else {

                    if (CP[id]) {
                        dianzu[CP[id][0]][0] = Xw + CP[id][1];
                        dianzu[CP[id][0]][1] = Yh + CP[id][2];
                    };
                };
                break;
            case event.ACTION_UP:
                var Xw = event.getX(i) / view.width;
                var Yh = event.getY(i) / view.height;
                Xw = (0 < Xw && Xw < 1) ? Xw : (0 < Xw ? 1 : 0);
                Yh = (0 < Yh && Yh < 1) ? Yh : (0 < Yh ? 1 : 0);
                if (!Math.floor(event.getAction() / 256)) {
                    TouchPoints = [];
                    var k = shifou(Xw, Yh, dianzu, r * 2);
                    if (ui.but1.getText() == "连线开" && k) {
                        //toast(k);
                        xianzu.push([lianxianzu[0], k[0], lianxianzu[3]]);
                    };
                    lianxianzu = [];
                };

                if (!i) {
                    CP[event.getPointerId(Math.floor(event.getAction() / 256))] = false;
                    //log(event.getPointerId(Math.floor(event.getAction()/256))+" false");
                };

                TP = [];
                //log("up "+event.getAction()+" "+event.getPointerId(Math.floor(event.getAction()/256)));
                break;
        };
    };
    //detailText = TP.toString();
    return true;
       } catch (e) {log("t "+e);toast("t "+e);return true    }
});

ui.but.setOnClickListener(function() {
    if (ui.but.getText() == "触轮开") {
        ui.run(() => {
            ui.but.setText("触轮关");
        });
    } else {
        ui.run(() => {
            ui.but.setText("触轮开");
        });
    };
});

ui.but1.setOnClickListener(function() {
    if (ui.but1.getText() == "连线开") {
        ui.run(() => {
            ui.but1.setText("连线关");
        });
    } else {
        ui.run(() => {
            ui.but1.setText("连线开");
        });
    };
});

var CMD;
ui.but2.setOnClickListener(function() {
    //threads.start(function() {
            try {
                dialogs.rawInput(CMD,"",function(cmd) {
                        if (cmd) {
                            var txt = cmd.split(" ");
                            if (txt[0] == "a" && txt.length >= 3) {
                                toast("asd");
                                /*
                                //while (true) {
                                var i = xianzu.findIndex(function(A) {
                                        return (A[0] == txt[1] && A[1] == txt[2]) || (A[1] == txt[1] && A[0] == txt[2]));
                                });
                            if (i) {
                                xianzu.splice(i, 1);
                            } else {
                                break;
                            };
                            // };
                            */
                        };
                    };
                });
        } catch (e) {
            toast(e);
        };
  //  });
});

ui.but3.setOnClickListener(function() {
    ui.finish();
});

function DrawTime(canvas, paint, xy, s) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();

    paint.setStrokeWidth(5); //边缘宽度  
    paint.setStyle(Paint.Style.STROKE); //空心样式  
    var 时间 = new Date;
    for (var i = 0; i < xy.length; i++) {
        var x = Math.round(w * xy[i][1]);
        var y = Math.round(h * xy[i][2]);
        //var 刻度 = 时间.getHours() * 30 + (时间.getMinutes() / 60) * 30;
        //刻度 = 时间.getMinutes() * 6 + (时间.getSeconds() / 60) * 6;
        //canvas.drawCircle(x, y, s, paint); //绘制圆
        var color = colors.argb(255, 0, 255, 0);
        paint.setColor(color);
        canvas.drawCircle(x, y, s * 0.3, paint); //绘制圆
        //刻度 = 时间.getSeconds() * 6 + (时间.getMilliseconds() / 1000) * 6;
        var 刻度 = 时间.getMilliseconds() / 1000 * 240;
        for (var ii = 0; ii < 3; ii++) {
            var A = kdfx((刻度 + 60 + ii * 120) * (i % 2 ? -1 : 1), 0);
            var C = getsdxyz(A.x, A.y, A.z, s);
            var B = kdfx((刻度 + 60 + (ii + 1) * 120) * (i % 2 ? -1 : 1), 0);
            var D = getsdxyz(B.x, B.y, B.z, s);
            var color = colors.argb(255, 0, 0, 255);
            paint.setColor(color);
            canvas.drawLine(x + C.x, y + C.z, x + D.x, y + D.z, paint);
            var A = kdfx((刻度 + ii * 120) * (i % 2 ? -1 : 1), 0);
            var C = getsdxyz(A.x, A.y, A.z, s);
            var B = kdfx((刻度 + (ii + 1) * 120) * (i % 2 ? -1 : 1), 0);
            var D = getsdxyz(B.x, B.y, B.z, s);
            var color = colors.argb(255, 255, 0, 0);
            paint.setColor(color);
            canvas.drawLine(x + C.x, y + C.z, x + D.x, y + D.z, paint);
        };
    };
};


function shifou(x, y, A, s) {
    for (var i = 0; i < A.length; i++) {
        var a = A[i][0] - x,
            b = A[i][1] - y;
        if (Math.abs(weiyi(a, b)) <= s) {
            return [i, a, b];
        };
    };
};




function Details(A, re) {
    threads.start(function() {
        console.show();
    });
    log(typeof(A));
    log(typeof(re));
    if (typeof(re) == "string") {
        re = eval("/" + re + "/i");
    };
    log(A);
    try {
        //A= A.sort();
        log(A.toString());

    } catch (e) {
        //toast(e)
    };
    for (var i in A) {

        try {
            if (!re || re.test(i.toString())) {
                log(typeof(A[i]));
                log(i + "\n" + A[i].toString())
            };
        } catch (e) {
            //toast(e)
        }
    };
};

function weiyi() { //平方和开方
    var num = 0;
    for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
    }
    return Math.sqrt(num);
};

function get_wenzi(wenzi_shuliang) {
    //9fa6 4e00
    var A = parseInt("9fa6", 16);
    var B = parseInt("4e00", 16);
    var wenzi = new String;
    for (var i = 0; i < wenzi_shuliang; i++) {
        var zifu = new String;
        zifu += "\\u";
        var C = Math.floor(Math.random() * (A - B)) + B;
        zifu += C.toString(16);
        wenzi += unescape(zifu.replace(/\\u/g, "%u"));
    }
    return wenzi;
};

//看的方向
function kdfx(Y, P, w) {
    var x, y, z;
    ya = Math.sin(P * Math.PI / 180);
    yb = Math.cos(P * Math.PI / 180);
    y = -1 * ya;
    xa = Math.sin(Y % 360 * Math.PI / 180);
    x = xa * yb;
    za = Math.cos(Y % 360 * Math.PI / 180);
    z = za * yb;
    if (!w) {
        w = 10000;
    };
    x = Math.round(w * x) / w;
    y = Math.round(w * y) / w;
    z = Math.round(w * z) / w;
    return {
        x: x,
        y: y,
        z: z
    };
};

//移动方向
function ydfx(bx, by, bz, w) {
    var Y, P;
    var k = new Array;
    Y = 180 * Math.asin(Math.abs(bx) / weiyi(bx, bz)) / Math.PI;
    P = -180 * Math.asin(by / weiyi(bx, by, bz)) / Math.PI;
    if (bx > 0 && bz < 0) {
        Y = 180 - Y
    };
    if (bx < 0 && bz < 0) {
        Y = Y + 180
    };
    if (bx < 0 && bz > 0) {
        Y = 360 - Y
    };
    if (Math.abs(P) == 90) {
        Y = 0;
    };
    if (!w) {
        w = 10000;
    };
    Y = Math.round(w * Y) / w;
    P = Math.round(w * P) / w;
    return {
        Y: Y,
        P: P
    };
};

//速度
function getsdxyz(x, y, z, s, w) {
    var
        d, c = s * s,
        sx, sy, sz;
    if (z != 0) {
        a = x / z;
        b = y / z;
        d = a * a + b * b + 1;
        sz = z / Math.abs(z) * Math.sqrt(c / d);
        sx = sz * a;
        sy = sz * b;
    } else if (x != 0) {
        a = y / x;
        d = a * a + 1;
        sx = x / Math.abs(x) * Math.sqrt(c / d);
        sy = sx * a;
        sz = z;
    } else {
        sy = y / Math.abs(y) * s;
        sx = x;
        sz = z;
    }
    if (!w) {
        w = 10000;
    };
    sx = Math.round(w * sx) / w;
    sy = Math.round(w * sy) / w;
    sz = Math.round(w * sz) / w;
    return {
        x: sx,
        y: sy,
        z: sz
    };
};








/*
    paint.setARGB(255,0,0,0);//白色画笔
    paint.setStyle(Paint.Style.FILL);//空心样式  
    canvas.drawCircle(540,540,510, paint);//绘制圆
    */
/*
    paint.setARGB(255, 255, 255, 255); //白色画笔
    paint.setStyle(Paint.Style.STROKE); //空心样式  
    paint.setStrokeWidth(5); //边缘宽度  
    canvas.drawCircle(540, 540, 500, paint); //绘制圆
*/



/*
    canvas.drawLine(x+C.x, y+C.z, x-C.x, y-C.z, paint);    
    canvas.drawLine(x+D.x, y+D.z, x-D.x, y-D.z, paint);    
    canvas.drawLine(x+C.x, y+C.z, x-D.x, y-D.z, paint);    
    canvas.drawLine(x+C.x, y+C.z, x+D.x, y+D.z, paint);    
    canvas.drawLine(x-C.x, y-C.z, x-D.x, y-D.z, paint);    
    canvas.drawLine(x-C.x, y-C.z, x+D.x, y+D.z, paint);    
*/