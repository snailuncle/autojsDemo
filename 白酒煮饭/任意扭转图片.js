"ui";

ui.layout(
    <vertical>
        <canvas id="canvas"/>
    </vertical>
);

toastLog("尝试用多个手指触摸图片");
toastLog("五个手指头能让图片回到原位哦");
//帮助资料https://www.jianshu.com/p/6cd77d511510
threads.start(function() {
    console.show();
});

//var img = images.read("/storage/emulated/0/建记/图片/img04.jpg");
var canvasAD = new 图片查看(ui.canvas);

thread = threads.start(function() {
    //toastLog("正在加载图片");
    sleep(1000);
    IMG = images.load('http://b-ssl.duitang.com/uploads/blog/201309/29/20130929153548_rECFe.jpeg');
    if (!IMG) {
        toastLog("网络连接异常");
        toastLog("或使用本地图片");
        exit();
    };
    //toastLog("图片加载完成");
    canvasAD.setImg(IMG);
});


function 图片查看(canvasView, img) {
    this.setImg = function(IMG) {
        img = IMG.clone();
        this.textSize = 20;
        this.paint.setTextSize(this.textSize);
    };
    this.imgToCenter = function() {
        if (img) {
            this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
            this.view = {
                x: canvasView.getX(),
                y: canvasView.getY(),
                w: canvasView.getWidth(),
                h: canvasView.getHeight()
            };
            this.canvasRect = new android.graphics.RectF(0, 0, this.view.w, this.view.h);
            this.matrix = new android.graphics.Matrix();
            this.matrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
        };
    };
    this.view = {
        x: canvasView.getX(),
        y: canvasView.getY(),
        w: canvasView.getWidth(),
        h: canvasView.getHeight()
    };
    this.canvasRect = new android.graphics.RectF(0, 0, this.view.w || device.width, this.view.h || device.height);
    this.paint = new Paint;
    this.paint.setTextAlign(Paint.Align.CENTER);
    this.paint.setStrokeWidth(5);
    //this.paint.setStyle(Paint.Style.STROKE);
    this.paint.setARGB(255, 0, 0, 0);
    this.paint.setStyle(Paint.Style.FILL);
    //this.paint.setStrokeWidth(5);
    this.textSize = 20;
    this.paint.setTextSize(this.textSize);
    this.matrix = new android.graphics.Matrix();
    this.imgRect;
    if (img) {
        this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
        this.matrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
    };
    this.RY = {
        Y: 0
    };

    this.Touch = new Array;
    this.TouchPointStart = new Array;
    this.TouchPointCurrent = new Array;
    this.TouchMatrix;


    canvasView.on("draw", (canvas) => {
        canvas.drawARGB(255, 127, 127, 127);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        if (img) {
            this.textSize = 20;
            this.paint.setTextSize(this.textSize);
            canvas.drawImage(img, this.matrix, this.paint);
            for (let i = 0; i < this.TouchPointStart.length; i += 2) {
                let X = Math.round(this.TouchPointStart[i]);
                let Y = Math.round(this.TouchPointStart[i + 1]);
                let x = Math.round(this.TouchPointCurrent[i]);
                let y = Math.round(this.TouchPointCurrent[i + 1]);
                canvas.drawLine(X, Y, x, y, this.paint);
                canvas.drawText(X + "," + Y, w / 4, h * 0.01 * i + h * 0.05 + 0.365 * this.textSize, this.paint);
                canvas.drawText(x + "," + y, w / 4 * 3, h * 0.01 * i + h * 0.05 + 0.365 * this.textSize, this.paint);
            };
        } else {
            this.Loading(canvas, this.paint, this.RY);
        };
    });
    this.Loading = function(canvas, paint, RY) {
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        RY.Y += 20;
        if (RY.Y >= 360) {
            RY.Y = 0;
        };
        canvas.rotate(RY.Y, w * 0.5, h * 0.52);
        paint.setStrokeWidth(5);
        paint.setStyle(Paint.Style.STROKE);
        canvas.drawCircle(w / 2, h * 0.48, w / 3, paint);
        canvas.setMatrix(new android.graphics.Matrix());
        canvas.rotate(-RY.Y, w * 0.5, h * 0.52);
        paint.setStyle(Paint.Style.FILL);
        paint.setStrokeWidth(1);
        var size = 100;
        paint.setTextSize(size);
        canvas.drawText("正在下载图片", w / 2, h * 0.48 + 0.365 * size, paint);
    };
    this.反色 = function(color) {
        return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
    };

    canvasView.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        try {
            //log(event);
            switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
                case event.ACTION_DOWN:
                    try {
                        log("down");
                        var i = Math.floor(event.getAction() / 256);
                        log(i);
                        //当前变化的是第几个点
                        var id = event.getPointerId(i);
                        //获取这个点的ID。
                        var X = event.getX(i);
                        var Y = event.getY(i);
                        //得到当前变化的这个点的坐标。相对于控件原点。
                        var PC = event.getPointerCount();
                        //获取点的总数量。
                        this.TouchMatrix = this.matrix;
                        for (let i = 0; i < PC - 1; i++) {
                            this.TouchPointStart[i * 2] = this.TouchPointCurrent[i * 2];
                            this.TouchPointStart[i * 2 + 1] = this.TouchPointCurrent[i * 2 + 1];
                        };
                        //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                        this.TouchPointStart.splice(i * 2, 0, X, Y);
                        this.TouchPointCurrent.splice(i * 2, 0, X, Y);
                        //保存坐标的数组。
                        this.Touch[id] = {
                            x: X,
                            y: Y
                        };

                        if (PC > 4) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                            this.imgToCenter();
                            break;
                        };

                        var matrix = new android.graphics.Matrix();
                        matrix.setPolyToPoly(this.TouchPointStart, 0, this.TouchPointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(matrix, this.TouchMatrix);
                        //进行矩阵运算并刷新矩阵。
                    } catch (e) {
                        toastLog("DOWN " + e);
                    };
                    break;
                case event.ACTION_MOVE:
                    try {
                        //log("move");
                        var PC = event.getPointerCount();
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let X = event.getX(i);
                            let Y = event.getY(i);
                            this.TouchPointCurrent[i * 2] = X;
                            this.TouchPointCurrent[i * 2 + 1] = Y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > 4) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.imgToCenter();
                            break;
                        };

                        var matrix = new android.graphics.Matrix();
                        matrix.setPolyToPoly(this.TouchPointStart, 0, this.TouchPointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(matrix, this.TouchMatrix);
                        //进行矩阵运算并刷新矩阵。
                    } catch (e) {
                        log("MOVE " + e);
                    };
                    break;
                case event.ACTION_UP:
                    try {
                        log("up");
                        var i = Math.floor(event.getAction() / 256);
                        log(i);
                        var id = event.getPointerId(i);
                        var PC = event.getPointerCount();
                        this.TouchMatrix = this.matrix;
                        for (let i = 0; i < PC; i++) {
                            this.TouchPointStart[i * 2] = this.TouchPointCurrent[i * 2];
                            this.TouchPointStart[i * 2 + 1] = this.TouchPointCurrent[i * 2 + 1];
                        };
                        this.TouchPointStart.splice(i * 2, 2);
                        this.TouchPointCurrent.splice(i * 2, 2);
                        this.Touch[id] = undefined;

                    } catch (e) {
                        log("UP " + e);
                    };

                    break;
            };
            return true;
        } catch (e) {
            log("Touch: " + e);
            return true;
        };
    }));
};