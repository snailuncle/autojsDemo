"ui";
ui.layout(
    <frame>
<canvas id="canvas"/>
 </frame>
);

//蛇头
//const BALL_HEAD = images.read("/sdcard/脚本/画画/1.png");
//苹果
//const APPLE = images.read("/sdcard/脚本/画画/2.png");
//墙方块
//const WALL_BLOCK = images.read("/sdcard/脚本/画画/3.png");
var Width = 5000,
    Height = 5000;
var Ratio = 1;
var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER); //写字左右中心
var BALL = [
    [0.5, 0.5]
];
var BALLColor = [colors.argb(255, random(0, 255), random(0, 255), random(0, 255))];
var BallWidth = 500;
var RatioAdd= 1;//0.216  0.784
var FOOD = new Array;
var FoodWidth = 15;
var bigFoodWidth = 60;
for (var i = 0; i < Math.round(Width * Height * 0.00002); i++) {
    var color = colors.argb(255, random(0, 255), random(0, 255), random(0, 255));
    FOOD.push([Math.random(), Math.random(),FoodWidth, color]);
};
var direction = {
    id: 0,
    Y: 0,
    S: 1
};

var gameover = false;


var Touch = new Array;



ui.canvas.on("draw", function(canvas) {
    try {

        var w = canvas.getWidth();
        var h = canvas.getHeight();
        if (!gameover) {
            paint.setStrokeWidth(1); //边缘宽度
            paint.setStyle(Paint.Style.FILL); //实心样式
            paint.setARGB(255, 0, 0, 0);
            canvas.drawRect(0, 0, w, h, paint);
            DrawGrid(canvas, paint, w/6);//画网格
            //界限
            BALL[0][0] = (BALL[0][0] >= 0 && BALL[0][0] < 1) ? BALL[0][0] : (BALL[0][0] < 0 ? 0 : 1);
            BALL[0][1] = (BALL[0][1] >= 0 && BALL[0][1] < 1) ? BALL[0][1] : (BALL[0][1] < 0 ? 0 : 1);
            Ratio = (BallWidth<=w/4)?1:(w/4/BallWidth);
            //中心
            var cx = BALL[0][0] * Width;
            var cy = BALL[0][1] * Height;
            for (var i = 0; i < FOOD.length; i++) {
                //屏幕坐标
                var x = (FOOD[i][0] * Width - cx) * Ratio + w / 2;
                var y = (FOOD[i][1] * Height - cy) * Ratio + h / 2;

                if (x < w && x >= 0 && y < h && y >= 0) {
                    if ((BallWidth * Ratio-weiyi(x - w / 2, y - h / 2))/(FOOD[i][2] * Ratio) >=0.7 ) {
                        BallWidth = Math.sqrt(BallWidth * BallWidth + FOOD[i][2]*FOOD[i][2]);
                        FOOD.splice(i, 1);
                        var color = colors.argb(255, random(0, 255), random(0, 255), random(0, 255));
                        //FOOD.push([Math.random(), Math.random(),FOOD[i][2], color]);//质量守恒定律,哈哈
                    } else {
                        paint.setColor(FOOD[i][3]);
                        canvas.drawCircle(x, y, FOOD[i][2] * Ratio, paint); //绘制圆
                    };
                };
            };

            paint.setStrokeWidth(2); //边缘宽度
            paint.setColor(colors.RED);

            //界边线
            switch (true) {
                case w / 2 - cx * Ratio >= 0:
                    canvas.drawLine(w / 2 - cx * Ratio, h / 2 - cy * Ratio, w / 2 - cx * Ratio, h / 2 + (Height - cy) * Ratio, paint);
                case w / 2 + (Width - cx) * Ratio < w:
                    canvas.drawLine(w / 2 + (Width - cx) * Ratio, h / 2 - cy * Ratio, w / 2 + (Width - cx) * Ratio, h / 2 + (Height - cy) * Ratio, paint);
                case h / 2 - cy * Ratio >= 0:
                    canvas.drawLine(w / 2 - cx * Ratio, h / 2 - cy * Ratio, w / 2 + (Width - cx) * Ratio, h / 2 - cy * Ratio, paint);
                case h / 2 + (Height - cy) * Ratio < h:
                    canvas.drawLine(w / 2 - cx * Ratio, h / 2 + (Height - cy) * Ratio, w / 2 + (Width - cx) * Ratio, h / 2 + (Height - cy) * Ratio, paint);
            };

            var A = kdfx(direction.Y, 0);
            var B = getsdxyz(A.x, A.z, 0, direction.S / 200 * 0.01);
            BALL[0][0] = BALL[0][0] + (B.x ? B.x : 0);//由于一些该死的bug,添加了这东西,你要是能找出bug,帮忙改改
            BALL[0][1] = BALL[0][1] + (B.y ? B.y : 0);

            paint.setColor(BALLColor[0]);
            canvas.drawCircle(w / 2, h / 2, BallWidth * Ratio, paint); //绘制圆

            paint.setStrokeWidth(BallWidth * Ratio*0.02); //边缘宽度
            paint.setColor(BALLColor[0]);
            var BA=getsdxyz(A.x, A.z, 0, BallWidth * Ratio*1.2);
            var AB=kdfx(direction.Y+45, 0);
            var BB=getsdxyz(AB.x, AB.z, 0, BallWidth * Ratio*1.1);
            canvas.drawLine(w / 2+BA.x, h / 2+BA.y,w / 2+BB.x, h / 2+BB.y, paint);
            var AC=kdfx(direction.Y-45, 0);
            var BC=getsdxyz(AC.x, AC.z, 0, BallWidth * Ratio*1.1);
            canvas.drawLine(w / 2+BA.x, h / 2+BA.y,w / 2+BC.x, h / 2+BC.y, paint);


            paint.setStrokeWidth(1); //边缘宽度
            paint.setColor(colors.BLACK);
            paint.setStyle(Paint.Style.FILL); //实心样式
            var size = 25;
            paint.setTextSize(size);
            //canvas.drawText(Math.round(direction.Y * 10) / 10, w * 0.5, h * 0.5-size + 0.365 * size, paint);
            canvas.drawText(Math.round(BallWidth * 10) / 10, w * 0.5, h * 0.5+ 0.365 * size, paint);


            if (Touch.length) {
                for (var i = 0; i < Touch.length; i++) {
                    if (!Touch[i]) {
                        continue;
                    };
                    var sx = Touch[i].x - Touch[i].X,
                        sy = Touch[i].y - Touch[i].Y;
                    var s = weiyi(sx, sy);
                    var A = getsdxyz(sx, sy, 0, s < 200 ? s : 200);
                paint.setStrokeWidth(5); //边缘宽度
                paint.setStyle(Paint.Style.STROKE); //空心样式
                paint.setColor(反色(BALLColor[0]));
                    canvas.drawCircle(Touch[i].X, Touch[i].Y, 200, paint); //绘制圆
                    canvas.drawLine(Touch[i].X, Touch[i].Y, Touch[i].X + A.x, Touch[i].Y + A.y, paint);
                    canvas.drawCircle(Touch[i].X + A.x, Touch[i].Y + A.y, 100, paint); //绘制圆
            paint.setStrokeWidth(1); //边缘宽度
            paint.setColor(colors.BLACK);
            paint.setStyle(Paint.Style.FILL); //实心样式
            var size = 25;
            paint.setTextSize(size);
            canvas.drawText(i, Touch[i].X-200,Touch[i].Y + 0.365 * size, paint);
                     if(i==1&&BallWidth>Math.sqrt(bigFoodWidth*bigFoodWidth*2)){
            var A = kdfx(direction.Y, 0);
            var B = getsdxyz(A.x, A.z, 0, BallWidth * Ratio*1.6);
            var x=(B.x/Ratio+cx)/Width,y=(B.y/Ratio+cy)/Height;
            x = (x >= 0 && x < 1) ? x : (x < 0 ? 0 : 1);
            y = (y >= 0 && y < 1) ? y : (y < 0 ? 0 : 1);
                        BallWidth = Math.sqrt(BallWidth * BallWidth - bigFoodWidth*bigFoodWidth);                                                  };
                        var color = colors.argb(255, random(0, 255), random(0, 255), random(0, 255));
                        FOOD.push([x, y,bigFoodWidth ,color]);
                };
            };

        } else {
            paint.setStrokeWidth(1); //边缘宽度
            paint.setColor(colors.BLACK);
            paint.setStyle(Paint.Style.FILL); //实心样式
            var size = 200;
            paint.setTextSize(size);
            canvas.drawText("游戏结束", w / 2, h * 0.3 + 0.365 * size, paint);
            var size = 100;
            paint.setTextSize(size);
            canvas.drawText("分数 " + (BALL.length - 3), w * 0.5, h * 0.5 + 0.365 * size, paint);
            paint.setColor(colors.GREEN);
            var size = 150;
            paint.setTextSize(size);
            canvas.drawText("重新开始", w * 0.5, h * 0.75 + 0.365 * size, paint);
            paint.setStrokeWidth(5); //边缘宽度
            canvas.drawLine(0, h * 0.65, w, h * 0.65, paint);

        };

    } catch (e) {
        toastLog("Draw: " + e);
        //exit();
    };
});

ui.canvas.setOnTouchListener(function(view, event) {
    try {
        var PC = event.getPointerCount();
        for (var i = 0; i < PC; i++) {
            var id = event.getPointerId(i);
            var X = event.getX(i);
            var Y = event.getY(i);
            X = (0 <= X && X < view.width - 1) ? X : (0 <= X ? view.width - 1 : 0);
            Y = (0 <= Y && Y < view.height - 1) ? Y : (0 <= Y ? view.height - 1 : 0);
            switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
                case event.ACTION_DOWN:
                    if (i == Math.floor(event.getAction() / 256)) {
                        Touch[id] = {
                            X: X,
                            Y: Y,
                            x: X,
                            y: Y
                        };
                        if (direction.id == undefined ) {
                            direction.id = id;
                            direction.S = 0;
                        };
                    };

                    break;
                case event.ACTION_MOVE:
                    Touch[id].x = X;
                    Touch[id].y = Y;
                    if (id == direction.id) {
                        var sx = X - Touch[id].X,
                            sy = Y - Touch[id].Y;
                        var YS = ydfx(sx, 0, sy);
                        var s = weiyi(sx, sy);
                        direction.Y = (YS.Y?YS.Y:direction.Y);
                        direction.S = (s < 100 ? s : 100);
                    };
                    break;
                case event.ACTION_UP:
                    if (i == Math.floor(event.getAction() / 256)) {
                        Touch[id] = undefined;
                        if (id == direction.id) {
                            direction.id = undefined;
                        };
                    };
                    break;
            };
        };
        return true;
    } catch (e) {
        toastLog("Touch: " + e);
        return true
    };
});






function DrawGrid(canvas, paint, s) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    var sx = Math.floor(w / s),
        sy = Math.floor(h / s);
    paint.setARGB(127, 63, 63, 63);
    for (var i = -sx; i < sx; i++) {
        canvas.drawLine(w * 0.5 + i * s, 0, w * 0.5 + i * s, h, paint);
    };
    for (var i = -sy; i < sy; i++) {
        canvas.drawLine(0, h * 0.5 + i * s, w, h * 0.5 + i * s, paint);
    };
    var x = (w / 2) % s,
        y = (h / 2) % s;
    return {
        x: x,
        y: y,
        w: (w - 2 * x) / s,
        h: (h - 2 * y) / s,
        s: s
    };
};

function DrawBlock(canvas, paint, x, y, w, h) {
    //canvas.drawRect(x, y, x + w, y + h, paint);
    paint.setARGB(255, 0, 0, 0); //白色画笔
    canvas.drawLine(x, y, x + w, y + h, paint);
    canvas.drawLine(x + w, y, x, y + h, paint);
    canvas.drawLine(x, y, x + w, y, paint);
    canvas.drawLine(x, y, x, y + h, paint);
    canvas.drawLine(x + w, y, x + w, y + h, paint);
    canvas.drawLine(x, y + h, x + w, y + h, paint);
    paint.setStyle(Paint.Style.FILL); //空心样式
    paint.setARGB(255, 0, 0, 255); //白色画笔
    canvas.drawCircle(x + w * 0.5, y + h * 0.5, w * 0.5, paint); //绘制圆
};


function DrawBALL(canvas, paint, S) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
};




/*?!_-…~@+全局方法+@~…-_!?*/ //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*?!_-…~@+全局方法+@~…-_!?*/ //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*?!_-…~@+全局方法+@~…-_!?*/ //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*?!_-…~@+全局方法+@~…-_!?*/ //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\





function shifou(x, y, A) {
    for (var i = 0; i < A.length; i++) {
        if (A[i][0] == x && A[i][1] == y) {
            return true;
        };
    };
};

function 反色(color) {
    var a = colors.alpha(color);
    var r = 127.5 - (colors.red(color) - 127.5);
    var g = 127.5 - (colors.green(color) - 127.5);
    var b = 127.5 - (colors.blue(color) - 127.5);
    return colors.argb(a, r, g, b);
};

function weiyi() { //平方和开方
    var num = 0;
    for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
    }
    return Math.sqrt(num);
};

function random(A, B) {
    return Math.round(Math.random() * Math.abs(Math.round(A - B)) + (A < B ? A : B));
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
        w = 1000000;
    };
    Y = Math.round(w * Y) / w;
    P = Math.round(w * P) / w;
    return {
        Y: Y,
        P: P
    };
};

//看的方向
function kdfx(Y, P, w) {
    if (Y == undefined || P == undefined) {
        return {
            x: 0,
            y: 0,
            z: 0
        };
    };
    var x, y, z;
    ya = Math.sin(P * Math.PI / 180);
    yb = Math.cos(P * Math.PI / 180);
    y = -1 * ya;
    xa = Math.sin(Y % 360 * Math.PI / 180);
    x = xa * yb;
    za = Math.cos(Y % 360 * Math.PI / 180);
    z = za * yb;
    if (!w) {
        w = 1000000;
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


//速度
function getsdxyz(x, y, z, s, w) {
    if (s == undefined || x == undefined || y == undefined || z == undefined) {
        return {
            x: 0,
            y: 0,
            z: 0
        };
    };
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
    } else if (y != 0) {
        sy = y / Math.abs(y) * s;
        sx = x;
        sz = z;
    } else {
        sx = 0;
        sy = 0;
        sz = 0;
    };
    if (!w) {
        w = 1000000;
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
