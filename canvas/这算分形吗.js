"ui";

ui.layout(
    <vertical>
        <img id="img"w="*"h="*"/>
    </vertical>
);



importClass(java.io.File);
importClass(java.io.FileFilter);
importClass(android.graphics.Path);
importClass(android.graphics.RectF);
importClass(android.graphics.BitmapFactory);
importClass(android.graphics.Bitmap);
importClass(android.graphics.Matrix);
importClass(android.graphics.Color);
importClass(android.graphics.ColorMatrix);
importClass(android.graphics.ColorFilter);

var W = 1000,
    H = 1000;
var mI = android.graphics.Bitmap.createBitmap(W, H, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new android.graphics.Canvas(mI);

var paint = new Paint;
paint.setStrokeWidth(15);
paint.setStyle(Paint.Style.STROKE);
paint.setARGB(255, 0,0,0);
var rect = new RectF(0, 0, W, H);
    mcanvas.drawRect(rect, paint);


var bitmap = android.graphics.Bitmap.createBitmap(W, H, android.graphics.Bitmap.Config.ARGB_8888);
var canvas = new android.graphics.Canvas(bitmap);
var matrix = new android.graphics.Matrix();
canvas.drawBitmap(mI, matrix, paint);
matrix.preScale(0.9, 0.9, W / 2, H / 2);
matrix.preRotate(10, W / 2, H / 2);
var ASX = new XYToMatrix(matrix, 3);
setInterval(() => {
    let bitmap2 = android.graphics.Bitmap.createBitmap(bitmap);
    bitmap.eraseColor(0);
    canvas.drawBitmap(mI, 0, 0, paint);
    canvas.drawBitmap(bitmap2, ASX.matrix, paint);
    bitmap2.recycle();
    ui.img.setImageBitmap(bitmap);
}, 1);


//可以用两只手指移动缩放图像。
ui.img.setOnTouchListener(ASX.touchListener);


function XYToMatrix(matrix, maxPoints) {
    //通过多点触控来设置matrix从而来缩放图像。
    //第2个参数。最大的手指数量。手指数量超过之后matrix将初始化。
    this.matrix = matrix || new android.graphics.Matrix;
    this.invertMatrix = new android.graphics.Matrix;
    this.matrix.invert(this.invertMatrix);
    this.getScaling = function(ary) {
        //获取缩放比例。
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
                            this.Touch.PointCurrent[i * 2] = x;
                            this.Touch.PointCurrent[i * 2 + 1] = y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > this.maxPoints) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.maxPointsListener(view, event);
                            break;
                        };

                        let Matrix = new android.graphics.Matrix();
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
                    log("CANCEL");
                    toast("触摸被系统拦截\n可能是三指截屏等功能");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    log("OUTSIDE");

                    break;
                default:
                    let I = Math.floor(event.getAction() / 256);
                    let ID = event.getPointerId(I);
                    let X = event.getX(I);
                    let Y = event.getY(I);
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

                                let Matrix = new android.graphics.Matrix();
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

/*
   function drawBitmap() {
     void drawBitmap(int[],int,int,float,float,int,int,boolean,android.graphics.Paint)
     void drawBitmap(int[],int,int,int,int,int,int,boolean,android.graphics.Paint)
     void drawBitmap(android.graphics.Bitmap,float,float,android.graphics.Paint)
     void drawBitmap(android.graphics.Bitmap,android.graphics.Rect,android.graphics.Rect,android.graphics.Paint)
     void drawBitmap(android.graphics.Bitmap,android.graphics.Rect,android.graphics.RectF,android.graphics.Paint)
     void drawBitmap(android.graphics.Bitmap,android.graphics.Matrix,android.graphics.Paint)
     }
*/
