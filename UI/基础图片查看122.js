"ui";

ui.layout(
    <vertical>
        <canvas id="canvas"/>
    </vertical>
);

toastLog("尝试用多个手指触摸图片");
//帮助资料https://www.jianshu.com/p/6cd77d511510

//var img = images.read("/storage/emulated/0/建记/图片/img04.jpg");
var canvasAD = new 图片查看(ui.canvas);
thread = threads.start(function() {
    //toastLog("正在加载图片");
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
    };
    this.paint = new Paint;
    this.paint.setTextAlign(Paint.Align.CENTER);
    this.paint.setStrokeWidth(5);
    this.paint.setStyle(Paint.Style.STROKE);
    this.paint.setARGB(255, 0, 0, 0);
    this.matrix = new android.graphics.Matrix();
    this.RY = {
        Y: 0
    };;
    canvasView.on("draw", (canvas) => {
        canvas.drawARGB(255, 127, 127, 127);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        if (img) {
            canvas.drawImage(img, this.matrix, this.paint);
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

    this.Touch = new Array;
    this.TouchMatrix;
    canvasView.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        try {
            switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
                case event.ACTION_DOWN:
                    var i = Math.floor(event.getAction() / 256);
                    var id = event.getPointerId(i);
                    var X = event.getX(i);
                    var Y = event.getY(i);
                    var PC = event.getPointerCount();
                    if (PC == 1) {
                        //this.matrix = new android.graphics.Matrix();
                        this.TouchMatrix = this.matrix;
                    };
                    if (PC >= 4) {
                        this.matrix = new android.graphics.Matrix();
                        //this.TouchMatrix = this.matrix;
                    };
                    this.Touch[id] = {
                        x: X,
                        y: Y
                    };
                    break;
                case event.ACTION_MOVE:
                    var PC = event.getPointerCount();
                    var ary = new Array;
                    var ary1 = new Array;
                    for (var i = 0; i < PC; i++) {
                        var id = event.getPointerId(i);
                        var X = event.getX(id);
                        var Y = event.getY(id);
                        ary.push(this.Touch[id].x, this.Touch[id].y);
                        ary1.push(X, Y);
                    };
                    var matrix = new android.graphics.Matrix();
                    matrix.setPolyToPoly(ary, 0, ary1, 0, PC > 4 ? 4 : PC);
                    this.matrix = new android.graphics.Matrix();
                    this.matrix.setConcat(matrix, this.TouchMatrix);
                    break;
                case event.ACTION_UP:
                    var i = Math.floor(event.getAction() / 256);
                    var id = event.getPointerId(i);
                    this.Touch[id] = undefined;
                    this.TouchMatrix = this.matrix;
                    var PC = event.getPointerCount();

                    break;
            };
            return true;
        } catch (e) {
            toastLog("Touch: " + e);
            return true;
        };
    }));
};