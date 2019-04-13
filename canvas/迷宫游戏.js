"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年4月13日 下午3:36:12
 *测试机型: vivo PD1813D
 *Auto.js版本: 4.1.0 Alpha5
 *Android版本: 8.1.0
 *屏幕: 1080*2280
 *API: 27
 *备注: 暂无备注
 **/

ui.layout(
    <vertical>
        <canvas id="canvas" layout_weight="1"/>
    </vertical>
);

//黑色画笔。
var paint = new Paint;
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(2);
//paint.setStyle(Paint.Style.STROKE);
paint.setStyle(Paint.Style.FILL);
paint.setARGB(255, 0, 0, 0);
//paint.setColor(colors.GRAY);
paint.setTextSize(75);
//写字用的红色画笔。
var paint1 = new Paint;
paint1.setTextAlign(Paint.Align.CENTER);
paint1.setStrokeWidth(5);
paint1.setStyle(Paint.Style.STROKE);
//paint1.setStyle(Paint.Style.FILL);
paint1.setARGB(255, 255, 0, 0);
paint1.setTextSize(75);

var mMatrix = new android.graphics.Matrix;

var ASX = new XYToMatrix(null, 3);


var gameWidth = 31,
    gameHeight = 41,
    blackEdge = 10;
var g_w = gameWidth,
    g_h = gameHeight,
    b_e = blackEdge;
var gameRect = new android.graphics.Rect(0, 0, g_w, g_h);
if (g_w < 3 || g_h < 3) {
    throw "太小无法形成游戏";
};

var mBitmap = android.graphics.Bitmap.createBitmap(g_w * b_e, g_h * b_e, android.graphics.Bitmap.Config.ARGB_8888);
var mCanvas = new android.graphics.Canvas(mBitmap);
mCanvas.drawARGB(255, 127, 127, 127)

var gameAry = new Array(g_w * g_h);
var start;
var end;
var player;
var isLoading = true;
newGame();

function newGame() {
    for (let iy = 0; iy < g_h; iy++) {
        for (let ix = 0; ix < g_w; ix++) {
            if (ix % 2 && iy % 2) {
                gameAry[g_w * iy + ix] = 0;

            } else {
                gameAry[g_w * iy + ix] = 1;
            };
        };
    };

    //迷宫入口。
    var start1 = {
        x: 0,
        y: random(0, (Math.floor(g_h / 2) - 1)) * 2 + 1
    }; //左
    //迷宫出口。
    var start2 = {
        x: random(0, (Math.floor(g_w / 2) - 1)) * 2 + 1,
        y: g_h - 1
    }; //下
    start = start2;

    //迷宫出口。
    var end1 = {
        x: g_w - 1,
        y: random(0, (Math.floor(g_h / 2) - 1)) * 2 + 1
    }; //右
    //迷宫入口。
    var end2 = {
        x: random(0, (Math.floor(g_w / 2) - 1)) * 2 + 1,
        y: 0
    }; //上
    end = end2;


    gameAry[g_w * start.y + start.x] = 0;
    gameAry[g_w * end.y + end.x] = 0;




    player = {
        x: start.x,
        y: start.y,
        paint: (function() {
            let paint = new Paint;
            //paint.setTextAlign(Paint.Align.CENTER);
            //paint.setStrokeWidth(2);
            //paint.setStyle(Paint.Style.STROKE);
            paint.setStyle(Paint.Style.FILL);
            paint.setARGB(255, 255, 0, 0);
            //paint.setColor(colors.GRAY);
            //paint.setTextSize(75);
            return paint;
        })(),
    };

    var ST = { //左下
        x: start.x ? start.x : start.x + 1,
        y: start.y == g_h - 1 ? g_h - 2 : start.y
    };
    var EN = { //右上
        x: end.x == g_w - 1 ? g_w - 2 : end.x,
        y: end.y ? end.y : end.y + 1
    };

    threads.start(function() {
        paint.setStrokeWidth(2);
        //paint.setStyle(Paint.Style.STROKE);
        paint.setStyle(Paint.Style.FILL);
        paint.setARGB(255, 0, 0, 0);


        for (let iy = 0; iy < g_h; iy++) {
            for (let ix = 0; ix < g_w; ix++) {
                if (gameAry[g_w * iy + ix] > 0) {
                    mCanvas.drawRect(ix * b_e, iy * b_e, (ix + 1) * b_e, (iy + 1) * b_e, paint); //左
                };
            };
        };

        paint.setARGB(255, 0, 255, 0);
        mCanvas.drawRect(start.x * b_e, start.y * b_e, (start.x + 1) * b_e, (start.y + 1) * b_e, paint); //左
        mCanvas.drawRect(end.x * b_e, end.y * b_e, (end.x + 1) * b_e, (end.y + 1) * b_e, paint); //左


        paint.setARGB(255, 127, 127, 127);
        DFS(ST);
        isLoading = false;
        toastLog("新迷宫生成完成");

    });




};


var canvasRect = new android.graphics.RectF;
var canvasMatrix = new android.graphics.Matrix;
ui.canvas.post(function() {
    let v = ui.canvas;
    //var rect=new android.graphics.Rect;
    //ui.canvas.getBoundsOnScreen(canvasRect,false);
    let w = v.getWidth(),
        h = v.getHeight();
    canvasRect.set(new android.graphics.RectF(0, 0, w, h));
    canvasMatrix.setRectToRect(new android.graphics.RectF(-b_e, -b_e, mBitmap.getWidth() + b_e, mBitmap.getHeight()), new android.graphics.RectF(canvasRect), android.graphics.Matrix.ScaleToFit.START);
});



//ui.canvas.setOnTouchListener(ASX.touchListener);


var Xw, Yh, TX, TY, isTouch = false;
var direction = {
    x: 0,
    y: 0
};

ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.drawARGB(255, 127, 127, 127)
    let matrix = new android.graphics.Matrix;
    matrix.setConcat(ASX.matrix, canvasMatrix);
    //canvasMatrix.postConcat(ASX.matrix);
    canvas.setMatrix(matrix);
    canvas.drawBitmap(mBitmap, 0, 0, paint);
    canvas.drawCircle(player.x * b_e + b_e / 2, player.y * b_e + b_e / 2, b_e*0.7, player.paint);



    canvas.setMatrix(mMatrix);
    if (isTouch) {
        canvas.drawCircle(Xw, Yh, 25, paint1);
        canvas.drawLine(Xw, Yh, TX, TY, paint1);
        canvas.drawCircle(TX, TY, 100, paint1);

    };
    //canvas.drawText(Math.floor(ASX.getScaling() * 100) / 100, w / 2, h / 2, paint1);

    //canvas.drawPath(path, paint1);
    //canvas.drawCircle(x,y,5, paint2);

});



ui.canvas.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            Xw = event.getX();
            Yh = event.getY();
            break;
        case event.ACTION_MOVE:
            TX = event.getX();
            TY = event.getY();

            // if (weiyi([event.getX() - Xw, event.getY() - Yh]) >= 25) {
            isTouch = true;
            if (Math.abs(event.getX() - Xw) <= Math.abs(event.getY() - Yh)) {
                if (event.getY() - Yh > 0) {
                    direction.x = 0;
                    direction.y = 1;
                } else {
                    direction.x = 0;
                    direction.y = -1;
                };
            } else {
                if (event.getX() - Xw > 0) {
                    direction.x = 1;
                    direction.y = 0;
                } else {
                    direction.x = -1;
                    direction.y = 0;
                };
            };
            Xw = event.getX();
            Yh = event.getY();

            // } else {
            //     isTouch = false;
            // };
            break;
        case event.ACTION_UP:
            isTouch = false;
            direction.x = 0;
            direction.y = 0;
    };
    return true;
});

setInterval(() => {
    if (isTouch) {
        let x = player.x + direction.x,
            y = player.y + direction.y;
        if (gameAry[g_w * y + x] <= 0) {

            player.x = x;
            player.y = y;
        };
    };
    if (player.x == end.x && player.y == end.y) {
        isLoading = true;
        newGame();

    };
}, 50);

/*
1.将起点作为当前迷宫单元并标记为已访问
2.当还存在未标记的迷宫单元，进行循环
	1.如果当前迷宫单元有未被访问过的的相邻的迷宫单元
		1.随机选择一个未访问的相邻迷宫单元
		2.将当前迷宫单元入栈
		3.移除当前迷宫单元与相邻迷宫单元的墙
		4.标记相邻迷宫单元并用它作为当前迷宫单元
	2.如果当前迷宫单元不存在未访问的相邻迷宫单元，并且栈不空
		1.栈顶的迷宫单元出栈
		2.令其成为当前迷宫单元
*/





function DFS(xy) {

    let x = xy.x,
        y = xy.y;
    //标记为已走过。
    gameAry[g_w * y + x] = -1;
    let fx = new Array;
    do {
        fx = new Array;

        //左
        if (gameRect.contains(x - 2, y) && gameAry[g_w * y + x - 2] == 0) {
            fx.push(new Point(x - 2, y));
        };
        //上
        if (gameRect.contains(x, y - 2) && gameAry[g_w * (y - 2) + x] == 0) {
            fx.push(new Point(x, y - 2));
        };
        //右
        if (gameRect.contains(x + 2, y) && gameAry[g_w * y + x + 2] == 0) {
            fx.push(new Point(x + 2, y));
        };
        //下
        if (gameRect.contains(x, y + 2) && gameAry[g_w * (y + 2) + x] == 0) {
            fx.push(new Point(x, y + 2));
        };
        //如果有未被访问的方向
        if (fx.length) {
            //取一个随机的方向。
            let fxy = fx.splice(random(0, fx.length - 1), 1)[0];
            //去掉墙。
            gameAry[(x + (fxy.x - x) / 2) + g_w * (y + (fxy.y - y) / 2)] = 0;
            mCanvas.drawRect((x + (fxy.x - x) / 2) * b_e, (y + (fxy.y - y) / 2) * b_e, ((x + (fxy.x - x) / 2) + 1) * b_e, ((y + (fxy.y - y) / 2) + 1) * b_e, paint); //左
            DFS(fxy);
        };
        //为了看得直观一点。加个延时。
        //sleep(1);
    } while (fx.length);
};

function Point(x, y) {
    this.x = x;
    this.y = y;
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



function XYToMatrix(matrix, maxPoints) {
    this.matrix = matrix || new android.graphics.Matrix;
    this.invertMatrix = new android.graphics.Matrix;
    this.matrix.invert(this.invertMatrix);
    this.getScaling = function(ary) {
        ary = Array.isArray(ary) ? ary : [0, 0, 100, 100];
        try {
            var Ary = this.matrixPoints(this.matrix, ary);
            return this.weiyi([Ary[2] - Ary[0], Ary[3] - Ary[1]]) / this.weiyi(ary);
        } catch (e) {
            toastLog(e);
        };
    };
    this.maxPoints = maxPoints || 2;
    this.maxPointsListener = function() {
        this.matrix = new android.graphics.Matrix;
        this.invertMatrix = new android.graphics.Matrix;
        this.matrix.invert(this.invertMatrix);

    };
    this.Touch = {
        Matrix: this.matrix,
        PointStart: new Array,
        PointCurrent: new Array,

    };
    this.touchListener = new android.view.View.OnTouchListener((view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    try {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            this.Touch.PointCurrent[i * 2] = x;
                            this.Touch.PointCurrent[i * 2 + 1] = y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > this.maxPoints) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.maxPointsListener(view, event);
                            break;
                        };

                        var Matrix = new android.graphics.Matrix();
                        Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(Matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.matrix.invert(this.invertMatrix);
                        //反矩阵
                    } catch (e) {
                        throw "MOVE " + e;
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

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
                            try {
                                log("down");
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                this.Touch.Matrix = this.matrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                throw "DOWN " + e;
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。
                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.maxPointsListener(view, event);
                                    break;
                                };

                                var Matrix = new android.graphics.Matrix();
                                Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.matrix = new android.graphics.Matrix();
                                this.matrix.setConcat(Matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.matrix.invert(this.invertMatrix);
                                //反矩阵
                            } catch (e) {
                                throw "P_DOWN " + e;
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                throw "P_UP " + e;
                            };
                            break;
                    };
            };
        } catch (e) {
            throw "imgTouch: " + e;
        };

        return true;

    });

    this.matrixPoints = function(matrix, ary) {
        //通过矩阵运算坐标数组。但是需要转换为浮点数组。
        var ary = this.toJavaArray("float", ary);
        matrix.mapPoints(ary);
        return this.toJsArray(ary);
    };
    this.toJavaArray = function(type, ary) {
        //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
        var Ary = util.java.array(type, ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.toJsArray = function(ary) {
        var Ary = new Array(ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.getsd = (s, ary) => {
        var sum = this.weiyi(ary);
        var S = (s / sum) || 0;
        for (var i = 0; i < ary.length; i++) {
            ary[i] = ary[i] * S;
        };
        return ary;
    };
    this.weiyi = function(ary) {
        var sum = 0;
        for (var i = 0; i < ary.length; i++) {
            sum += Math.pow(ary[i], 2);
        };
        return Math.sqrt(sum);
    };
    this.kdfx = function(Y) {
        var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
        var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
        return [x, y];
    };
    this.ydfx = (ary) => {
        var ary = this.getsd(1, ary);
        var x = ary[0],
            y = ary[1];
        var Y = Math.asin(y) / (2 * Math.PI) * 360;
        if (x < 0) {
            Y = 180 - Y;
        };
        return Y;
    };


};
