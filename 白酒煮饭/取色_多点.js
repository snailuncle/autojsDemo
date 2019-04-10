"ui";

/**
*作者QQ: 1811588980
*完成时间: 2018年12月25日 下午10:36:55
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 去掉实时刷新的功能(部分手机太卡)改为松开时刷新
      圆形区域取色&边框取色。
**/

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="色组生成器" h="40dp"/>
            </appbar>
            <text id="ConsoleText" w="*" maxLines="1"/>            
            <canvas id="canvas" margin="5" layout_weight="1"/>
            <HorizontalScrollView  w="*"h="50" bg="#dddddd">
                <horizontal  gravity="center">
                    <button id="open_img" text="打开图片"  layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="to_" text="移动切换" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="points_rect" text="矩形" layout_weight="1" style="Widget.AppCompat.Button.Colored"/>
                    <button id="points_circle" text="圆形" layout_weight="1" style="Widget.AppCompat.Button.Colored"/>
                    <button id="fill_stroke" text="实心" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="toAry" text="复制点组" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="set_maxColors" text="最大点数" layout_weight="1"/>
                    <button id="set_J" text="记点模式" layout_weight="1"/>
                    <button id="set_go" text="重置记点" layout_weight="1"/>
                    <button id="set_A" text="生成代码" layout_weight="1"/>
                </horizontal>
            </HorizontalScrollView>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <scroll w="*" h="*">
                <vertical>
                    <text text="颜色匹配函数" textSize="25sp" margin="5" gravity="center"/>
                    <input id="in_fun" w="*" h="auto" textSize="16sp" bg="#dddddd" margin="5"/>
                    <button id="save_fun" text="保存函数" w="*"/>
                    <input id="in_put" w="*" h="auto" textSize="16sp" bg="#dddddd" margin="5"/>
                </vertical>
            </scroll>
        </vertical>
    </drawer>
);

log = function() {
    var arg = new Array;
    for (var i = 0; i < arguments.length; i++) {
        arg.push(arguments[i]);
    };

    ui.run(() => {
        ui.ConsoleText.setText(new Date().toTimeString().split(" ")[0] + "/: " + String(arg));
    });
};

toastLog("注意侧拉菜单");
//var img = images.read("/storage/emulated/0/建记/图片/img04.jpg");
var canvasAD = new 图片查看(ui.canvas);

threads.start(function() {
     //console.show();
});


//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);
ui.in_put.setText("colors.isSimilar(color2, color2[, threshold, algorithm])");

ui.ConsoleText.click(function() {
    let txt = String(ui.ConsoleText.getText());
    let i = txt.indexOf("/:");
    if (i + 1) {
        setClip(txt.substring(i + 2));
        toast("已复制");
    };

});


ui.save_fun.click(function() {
    var txt = ui.in_fun.getText();
    if (txt) {
        try {
            var fun = eval("(" + txt + ")");

        } catch (e) {
            toastLog(e);
        };
        if (typeof fun == "function") {
            canvasAD.isColor = fun;
            toast("OK");
        } else {
            toastLog("不是一个函数");
        };
    };
});

ui.open_img.click(function() {
    threads.start(function() {
        switch (dialogs.singleChoice("选择方式", ["媒体库", "本机文件"])) {
            case 0:
                媒体库选择(function(path) {
                    var IMG = images.read(path);
                    canvasAD.setImg(IMG);
                    Script_data.imgPath = path;

                    //IMG.recycle();
                });
                break;
            case 1:
                选择图片(function(path) {
                    var IMG = images.read(path);
                    canvasAD.setImg(IMG);
                    Script_data.imgPath = path;

                    //IMG.recycle();
                });

                break;


        };
    });

});

ui.points_rect.click(function() {
    var s = canvasAD.points_shape;
    if (s % 2) {
        canvasAD.points_shape = 1;
    } else {
        canvasAD.points_shape = 0;
    };
});
ui.points_circle.click(function() {
    var s = canvasAD.points_shape;
    if (s % 2) {
        canvasAD.points_shape = 3;
    } else {
        canvasAD.points_shape = 2;
    };
});
ui.fill_stroke.click(function() {
    var s = canvasAD.points_shape;
    if (String(ui.fill_stroke.getText()) == "实心") {
        if (s >= 2) {
            canvasAD.points_shape = 3;
        } else {
            canvasAD.points_shape = 1;
        };

        ui.run(() => {
            ui.fill_stroke.setText("空心");
        });
    } else {
        if (s >= 2) {
            canvasAD.points_shape = 2;
        } else {
            canvasAD.points_shape = 0;
        };

        ui.run(() => {
            ui.fill_stroke.setText("实心");
        });

    };
});




ui.set_maxColors.click(function() {
    var max = canvasAD.maxColorsPoints;
    threads.start(function() {
        var num = parseInt(dialogs.prompt("修改最大点数", String(max)));
        if (num > 20) {
            canvasAD.maxColorsPoints = num;
            Script_data.max = num;
            toastLog("已修改");
        } else {
            toastLog("点数过少");
        };
    });
});

ui.set_A.click(function() {
    var colorData = canvasAD.getColors();
    setClip("var colorData=" + JSON.stringify(colorData) + ";\nvar p = images.findMultiColors(img, colorData.color, colorData.ary);");
    if (colorData.ary.length) {
        toast("已复制");
    } else {
        toast("数据为空，失败");
    };

});


ui.to_.click(function() {
    canvasAD.toMode();

});

ui.toAry.click(function() {

    var colorData = canvasAD.getColors();
    setClip(JSON.stringify(colorData));
    if (colorData.ary.length) {
        toast("已复制");
    } else {
        toast("数据为空，失败");
    };
});

ui.set_J.click(function() {
    canvasAD.colorMode();
});

ui.set_go.click(function() {
    canvasAD.resetColor();

});

var imagesPath = new Array;

var storage = storages.create("取色_多点");
var Script_data = storage.get("data", {});
events.on("exit", function() {
    Script_data.fun = canvasAD.isColor.toString();
    storage.put("data", Script_data);
});

if (Script_data.fun) {
    try {
        var fun = eval("(" + Script_data.fun + ")");

    } catch (e) {
        toastLog(e);
    };
    if (typeof fun == "function") {
        canvasAD.isColor = fun;
        ui.in_fun.setText(canvasAD.isColor.toString());
        toast("OK");
    };
};

if (Script_data.max) {
    canvasAD.maxColorsPoints = parseInt(Script_data.max);
};

thread = threads.start(function() {
    sleep(1000);
    canvasAD.resetCanvasViewData();
    if (Script_data.imgPath && files.isFile(Script_data.imgPath)) {
        var IMG = images.read(Script_data.imgPath);
        canvasAD.setImg(IMG);
    };
    getPhotosInfo(25, imagesPath);
});


var fileType = {
    文本: {
        img: "format_text.png",
        ends: ["js", "txt", "json"]
    },
    图片: {
        img: "format_picture.png",
        ends: ["png", "jpg"]
    },
    音乐: {
        img: "format_music.png",
        ends: ["mp3", "m4a"]
    },
    视频: {
        img: "format_media.png",
        ends: ["mp4"]
    },
    安装包: {
        img: "format_apk.png",
        ends: ["apk"]
    },
    压缩包: {
        img: "format_zip.png",
        ends: ["zip"]
    },
    数据: {
        img: "format_unkown.png",
        ends: ["abc"]
    }
};

function nameToType(name) {
    var Extension = name.split(".").pop();
    for (var i in fileType) {
        for (var a = 0; a < fileType[i].ends.length; a++) {
            if (Extension == fileType[i].ends[a]) {
                return i;
            };
        }
    };
    return "unkown";
};



function 图片查看(canvasView, img) {
    this.maxColorsPoints = 300;
    this.points_shape = 0;
    this.mode = 0;
    this.toMode = function() {
        if (this.mode == 0) {
            this.mode = 1;
        } else {
            this.mode = 0;
        };
    };

    this.isColor = function(color) {
        return colors.isSimilar(color, "#ff0000", 127);
    };

    this.loadPaint = new Paint;
    this.loadPaint.setTextAlign(Paint.Align.CENTER);
    this.loadPaint.setStrokeWidth(5);
    this.loadPaint.setARGB(255, 0, 0, 0);
    //this.loadPaint.setStyle(Paint.Style.STROKE);
    this.loadPaint.setStyle(Paint.Style.FILL);
    this.loadTextSize = 100;
    this.loadPaint.setTextSize(this.loadTextSize);

    this.paint = new Paint;
    this.paint.setStrokeWidth(10);
    this.paint.setARGB(255, 0, 255, 0);
    this.paint.setStyle(Paint.Style.FILL);

    this.paint1 = new Paint;
    this.paint1.setStrokeWidth(5);
    this.paint1.setARGB(255, 0, 255, 0);
    this.paint1.setStyle(Paint.Style.STROKE);

    this.paint2 = new Paint;
    this.paint2.setStrokeWidth(5);
    this.paint2.setARGB(127, 127, 0, 0);
    this.paint2.setStyle(Paint.Style.STROKE);

    this.view;
    this.canvasRect;
    this.resetCanvasViewData = function() {
        this.view = {
            x: canvasView.getX(),
            y: canvasView.getY(),
            w: canvasView.getWidth(),
            h: canvasView.getHeight()
        };
        this.canvasRect = new android.graphics.RectF(0, 0, this.view.w, this.view.h);
        this.resetPointsData();
        this.resetPoints();
    };

    this.imgRect;
    this.imgMatrix = new android.graphics.Matrix();
    this.imgInvertMatrix = new android.graphics.Matrix();
    this.resetImgData = function() {
        this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
    };

    this.pointsRect;
    this.pointsMatrix = new android.graphics.Matrix();
    this.pointsInvertMatrix = new android.graphics.Matrix();
    this.resetPointsData = function() {
        this.pointsRect = new android.graphics.RectF(-this.view.w / 2, -this.view.h / 2, this.view.w / 2, this.view.h / 2);
        this.pointsMatrix.setRectToRect(this.pointsRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
    };

    if (img) {
        this.resetImgData();
    };

    this.setImg = function(IMG) {
        img = IMG.clone();
        this.resetImgData();
        if (this.canvasRect) {
            this.imgToCenter();
            this.pointsToCenter();
        };
    };

    this.imgToCenter = function() {
        this.imgMatrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
        this.imgMatrix.invert(this.imgInvertMatrix);
    };

    this.pointsToCenter = function() {
        this.pointsMatrix.setRectToRect(this.pointsRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
        this.pointsMatrix.invert(this.pointsInvertMatrix);
    };


    this.PointsAry = {
        rectAry: new Array,
        XYAry: new Array,
        imgAry: new Array
    };

    this.colorsData = {
        x: 0,
        y: 0,
        first: false,
        color: 0,
        ary: new Array,
        region: 0
    };

    this.colorMode = function() {
        this.mode = 2;
        toastLog("记点模式");
    };

    this.color = {
        x: 0,
        y: 0,
        first: false,
        color: 0,
        ary: new Array
    };

    this.resetColor = function() {
        this.color.first = false;
        this.color.ary = new Array;
        toastLog("重置");
    };

    this.getColors = function() {
        if (this.mode == 0 || this.mode == 1) {
            return {
                x: this.colorsData.x,
                y: this.colorsData.y,
                color: this.colorsData.color,
                ary: this.colorsData.ary
            };
        } else if (this.mode == 2) {
            return {
                x: this.color.x,
                y: this.color.y,
                color: this.color.color,
                ary: this.color.ary
            };
        };
    };

    this.RY = {
        Y: 0
    };


    this.maxPoints = 2;
    this.Touch = {
        PointStart: new Array,
        PointCurrent: new Array,
        Matrix: new android.graphics.Matrix()
    };

    canvasView.on("draw", (canvas) => {
        canvas.drawARGB(255, 127, 127, 127);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        if (img) {
            canvas.drawImage(img, this.imgMatrix, this.paint);
            if (this.mode == 2) {
                return
            };
            if (this.canvasRect) {
                if(this.points_shape<=1){this.drawRect(canvas, this.pointsRect, this.paint1, this.pointsMatrix)};
                if(this.points_shape>=2){this.drawCircle(canvas, this.pointsRect, this.paint1, this.pointsMatrix)};
                
            };
            this.drawPoints(canvas, this.PointsAry.XYAry, this.paint);

        } else {
            this.Loading(canvas, this.loadPaint, this.RY);
        };
        if (this.Touch.PointStart.length) {

            for (let i = 0; i < this.Touch.PointStart.length; i += 2) {
                let X = this.Touch.PointStart[i];
                let Y = this.Touch.PointStart[i + 1];
                let x = this.Touch.PointCurrent[i];
                let y = this.Touch.PointCurrent[i + 1];
                X = X || 0;
                Y = Y || 0;
                x = x || 0;
                y = y || 0;
                let a = X - (x - X);
                let b = Y - (y - Y);
                canvas.drawCircle(X, Y, 25, this.paint2);
                canvas.drawCircle(x, y, 25, this.paint2);
            };
        };
    });

    this.drawRect = function(canvas, rect, paint, Matrix) {
        let X = rect.left,
            Y = rect.top,
            x = rect.right,
            y = rect.bottom;
        let ary = this.matrixPoints(Matrix, [X, Y, x, Y, X, Y, X, y, X, y, x, y, x, Y, x, y]);
        canvas.drawLines(ary, paint);
    };

    this.drawCircle = function(canvas, rect, paint, Matrix) {
        let X = rect.left,
            Y = rect.top,
            x = rect.right,
            y = rect.bottom;
        let ary = this.matrixPoints(Matrix, [rect.centerX(), rect.centerY(),X, Y, x, Y, X, y]);
        canvas.drawCircle(ary[0],ary[1],(this.weiyi([ary[2]-ary[4],ary[3]-ary[5]])+this.weiyi([ary[2]-ary[6],ary[3]-ary[7]]))/4, paint);
    };

    this.drawPoints = function(canvas, ary, paint) {
        for (var i = 0; i < ary.length; i++) {
            paint.setColor(this.反色(ary[i].color));
            canvas.drawPoint(ary[i].x, ary[i].y, paint);
        };
    };


    this.Points = {
        rect: new Array,
        strokeRect: new Array,
        circle: new Array,
        strokeCircle: new Array
    };

    this.resetPoints = function() {
        this.Points.rect = this.rectPoints(this.pointsRect.width(), this.pointsRect.height(), this.PointSpacing(this.pointsRect.width(), this.pointsRect.height(), this.maxColorsPoints));
        this.Points.strokeRect = this.rectPoints(this.pointsRect.width(), this.pointsRect.height(), this.PointSpacing(this.pointsRect.width(), this.pointsRect.height(), this.maxColorsPoints), 1);
        this.Points.circle = this.circlePoints((this.pointsRect.width() + this.pointsRect.height()) / 4, this.PointSpacing(this.pointsRect.width(), this.pointsRect.height(), this.maxColorsPoints));
        this.Points.strokeCircle = this.circlePoints((this.pointsRect.width() + this.pointsRect.height()) / 4, this.PointSpacing(this.pointsRect.width(), this.pointsRect.height(), this.maxColorsPoints), 1);
    };

    this.countPoints = function(ary) {
        //运算点。
        return this.matrixPoints(this.imgInvertMatrix, this.matrixPoints(this.pointsMatrix, ary));
    };
    this.PointSpacing = function(w, h, d) {
        //点距
        var c = Math.sqrt(w * h / d);
        return c;
    };


    this.isPointsEnough = function(rect) {
        let X = rect.left,
            Y = rect.top,
            x = rect.right,
            y = rect.bottom;
        let a = this.countPoints([X, Y, x, Y, X, y]);
        let w_ = this.weiyi([a[0] - a[2], a[1] - a[3]]);
        let h_ = this.weiyi([a[0] - a[4], a[1] - a[5]]);
        let w = x - X,
            h = y - Y;
        //点距
        let M = Math.sqrt((w * h) / (w_ * h_)); //PointSpacing
        let m = this.PointSpacing(w, h, this.maxColorsPoints);

        return M > m ? M : m;
        //this.matrixPoints(this.pointsMatrix, this.Points.rect);
        //转换为屏幕坐标点组
    };


    this.toColorsAry = function(ary, matrix, img, fun) {
        let Ary = this.matrixPoints(matrix, ary);
        var Bry = new Array;
        this.colorsData.first = false;
        this.colorsData.ary = new Array;
        for (let i = 0; i < Ary.length; i += 2) {
            let x = Math.floor(Ary[i]),
                y = Math.floor(Ary[i + 1]);
            if (!this.imgRect.contains(x, y)) {
                continue;
            };
            let color = colors.toString(img.pixel(x, y));
            if (fun(color)) {
                Bry.push({
                    x: ary[i],
                    y: ary[i + 1],
                    color: color
                });
                if (!this.colorsData.first) {
                    this.colorsData.first = true;
                    this.colorsData.x = x;
                    this.colorsData.y = y;
                    this.colorsData.color = color;
                } else {
                    this.colorsData.ary.push([x - this.colorsData.x, y - this.colorsData.y, color]);
                };
            };
        };
        return Bry;
    };

    this.mainCount = function() {
        try {
            let ary;
            let k = this.isPointsEnough(this.pointsRect);
            switch (this.points_shape) {
                case 0:
                    if (k) {
                        ary = this.rectPoints(this.pointsRect.width(), this.pointsRect.height(), k);
                    } else {
                        ary = this.Points.rect;
                    };
                    break;
                case 1:
                    if (k) {
                        ary = this.rectPoints(this.pointsRect.width(), this.pointsRect.height(), k, 1);
                    } else {
                        ary = this.Points.strokeRect;
                    };

                    break;
                case 2:
                    if (k) {
                        ary = this.circlePoints((this.pointsRect.width() + this.pointsRect.height()) / 4, k);
                    } else {
                        ary = this.Points.circle;
                    };
                    break;
                case 3:
                    if (k) {
                        ary = this.circlePoints((this.pointsRect.width() + this.pointsRect.height()) / 4, k, 1);
                    } else {
                        ary = this.Points.strokeCircle;
                    };
                    break;
            };

            let ary2 = this.matrixPoints(this.pointsMatrix, ary);
            //转换为屏幕坐标点组
            // toastLog(ary2.length);
            //获取屏幕坐标点组
            this.PointsAry.XYAry = this.toColorsAry(ary2, this.imgInvertMatrix, img, this.isColor);
            //运算出图片坐标并获取颜色。
        } catch (e) {
            log("Main: " + e);
        };
    };



    this.Loading = function(canvas, paint, RY) {
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        RY.Y += 5;
        if (RY.Y >= 360) {
            RY.Y = 0;
        };
        canvas.rotate(RY.Y, w * 0.5, h * 0.52);
        //paint.setStrokeWidth(5);
        paint.setStyle(Paint.Style.STROKE);
        canvas.drawCircle(w / 2, h * 0.48, w / 3, paint);
        canvas.setMatrix(new android.graphics.Matrix());
        canvas.rotate(-RY.Y, w * 0.5, h * 0.52);
        //paint.setStrokeWidth(1);
        paint.setStyle(Paint.Style.FILL);
        canvas.drawText("侧拉菜单中打开一个图片", w / 2, h * 0.48 + 0.365 * paint.getTextSize(), paint);
    };

    this.反色 = function(color) {
        return ~colors.argb(0, colors.red(color), colors.green(color), colors.blue(color));
    };


    this.imgTouch = (view, event) => {
        try {
            if (!img) {
                return
            };
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
                            if (this.canvasRect) {
                                this.imgToCenter();
                            };
                            break;
                        };

                        var Matrix = new android.graphics.Matrix();
                        Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.imgMatrix = new android.graphics.Matrix();
                        this.imgMatrix.setConcat(Matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.imgMatrix.invert(this.imgInvertMatrix);
                        //反矩阵
                    } catch (e) {
                        log("MOVE " + e);
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
                                this.Touch.Matrix = this.imgMatrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                toastLog("DOWN " + e);
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;
                            if (img) {
                                this.mainCount();
                            };

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.imgMatrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。
                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    if (this.canvasRect) {
                                        this.imgToCenter();
                                    };
                                    break;
                                };

                                var Matrix = new android.graphics.Matrix();
                                Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.imgMatrix = new android.graphics.Matrix();
                                this.imgMatrix.setConcat(Matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.imgMatrix.invert(this.imgInvertMatrix);
                                //反矩阵
                            } catch (e) {
                                log("P_DOWN " + e);
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.imgMatrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                log("P_UP " + e);
                            };
                            break;
                    };
            };
        } catch (e) {
            log("imgTouch: " + e);
        };

        return true;

    };
    this.pointsTouch = (view, event) => {
        try {
            if (!this.pointsRect) {
                return
            };
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
                            this.pointsToCenter();
                            break;
                        };

                        var Matrix = new android.graphics.Matrix();
                        Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.pointsMatrix = new android.graphics.Matrix();
                        this.pointsMatrix.setConcat(Matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.pointsMatrix.invert(this.pointsInvertMatrix);
                        //反矩阵
                    } catch (e) {
                        log("MOVE " + e);
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
                                this.Touch.Matrix = this.pointsMatrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                toastLog("DOWN " + e);
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;
                            if (img) {
                                this.mainCount();
                            };

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.pointsMatrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。

                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.pointsToCenter();
                                    break;
                                };

                                var Matrix = new android.graphics.Matrix();
                                Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.pointsMatrix = new android.graphics.Matrix();
                                this.pointsMatrix.setConcat(Matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.pointsMatrix.invert(this.pointsInvertMatrix);
                                //反矩阵
                            } catch (e) {
                                log("P_DOWN " + e);
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.pointsMatrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                log("P_UP " + e);
                            };
                            break;
                    };
            };
        } catch (e) {
            log("pointsTouch: " + e);
        };

        return true;

    };

    this.colorTouch = (view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    var X = event.getX();
                    var Y = event.getY();
                    var Ary = this.matrixPoints(this.imgInvertMatrix, [X, Y]);
                    var x = Math.floor(Ary[0]),
                        y = Math.floor(Ary[1]);
                    if (!this.imgRect.contains(x, y)) {
                        break;

                    };
                    log(x, y, colors.toString(img.pixel(x, y)));

                    break;
                case event.ACTION_CANCEL:
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
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            var Ary = this.matrixPoints(this.imgInvertMatrix, [X, Y]);
                            var x = Math.floor(Ary[0]),
                                y = Math.floor(Ary[1]);
                            if (!this.imgRect.contains(x, y)) {
                                break;
                            };
                            if (!this.color.first) {
                                this.color.first = true;
                                this.color.x = x;
                                this.color.y = y;
                                this.color.color = colors.toString(img.pixel(x, y));
                                log(this.color.color);
                            } else {
                                this.color.ary.push([x - this.color.x, y - this.color.y, colors.toString(img.pixel(x, y))]);
                                log(this.color.ary[this.color.ary.length - 1]);
                            };
                            break;
                        case event.ACTION_POINTER_DOWN:
                            break;
                        case event.ACTION_POINTER_UP:
                            break;
                    };
            };
        } catch (e) {
            log("colorTouch: " + e);
        };

        return true;

    };



    this.matrixPoints = function(imgMatrix, ary) {
        var ary = this.toJavaArray("float", ary);
        imgMatrix.mapPoints(ary);
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

    this.rectPoints = function(w, h, s, g) {
        //宽,高,点距,是否边框
        let sx = Math.floor(w / s / 2) + 1,
            sy = Math.floor(h / s / 2) + 1;
        //以中心基本点正负循环总量    
        let cw = w / 2,
            ch = h / 2;
        let Ary = new Array;
        if (g) {
            //横向
            for (let ix = 0; ix < sx; ix++) {
                if (ix == 0) {
                    Ary.push(0, -ch, 0, ch);
                } else {
                    Ary.push(-ix * s, -ch, ix * s, -ch, -ix * s, ch, ix * s, ch);
                };
            };
            //横向边框线
            for (let iy = 0; iy < sy; iy++) {
                if (iy == 0) {
                    Ary.push(-cw, 0, cw, 0);
                } else {
                    Ary.push(-cw, -iy * s, -cw, iy * s, cw, -iy * s, cw, iy * s);
                };
            };
            //纵向边框线
        } else {
            //内部所有点

            for (let iy = 0; iy < sy; iy++) {
                for (let ix = 0; ix < sx; ix++) {
                    if (iy == 0 && ix == 0) {
                        Ary.push(0, 0);
                    } else {
                        let AX = -ix * s;
                        let AY = -iy * s;
                        let BX = ix * s;
                        let BY = iy * s;
                        if ((iy == 0 && ix != 0) || (iy != 0 && ix == 0)) {
                            Ary.push(AX, AY, BX, BY);
                        } else {
                            Ary.push(AX, AY, BX, BY, AX, BY, BX, AY);
                        };
                    };
                };
            };
        };
        return Ary;
    };

    this.circlePoints = function(r, s, g) {
        //半径,点距,是否边框
        let S = Math.floor(r / s) + 1;
        //以中心基本点正负循环总量    
        let Ary = new Array;
        if (g) {
            let c = Math.floor(Math.PI * r / 2 / s / 2) + 1;
            //循环量。
            let cR = s / r;
            //差值弧度。
            let AR = Math.PI / 2;
            //90度弧度。
            for (let i = 0; i < c; i++) {
                if (i == 0) {
                    let xy = getsd(r, RToxy(0));
                    let xy1 = getsd(r, RToxy(AR));
                    let xy2 = getsd(r, RToxy(-AR));
                    let xy3 = getsd(r, RToxy(AR * 2));
                    Ary = Ary.concat(xy, xy1, xy2, xy3);
                } else {
                    let xy = getsd(r, RToxy(cR * i));
                    let xy1 = getsd(r, RToxy(cR * i + AR));
                    let xy2 = getsd(r, RToxy(cR * i - AR));
                    let xy3 = getsd(r, RToxy(cR * i + AR * 2));
                    Ary = Ary.concat(xy, xy1, xy2, xy3);
                    xy = getsd(r, RToxy(-cR * i));
                    xy1 = getsd(r, RToxy(-cR * i + AR));
                    xy2 = getsd(r, RToxy(-cR * i - AR));
                    xy3 = getsd(r, RToxy(-cR * i + AR * 2));
                    Ary = Ary.concat(xy, xy1, xy2, xy3);
                };
            };
        } else {
            for (let iy = 0; iy < S; iy++) {
                for (let ix = 0; ix < S; ix++) {
                    if (iy == 0 && ix == 0) {
                        Ary.push(0, 0);
                    } else if ((iy == 0 && ix != 0) || (iy != 0 && ix == 0)) {
                        Ary.push(-ix * s, -iy * s, ix * s, iy * s);
                    } else {
                        let AX = -ix * s;
                        let AY = -iy * s;
                        let BX = ix * s;
                        let BY = iy * s;
                        if (weiyi([AX, AY]) <= r) {
                            Ary.push(AX, AY);
                        };
                        if (weiyi([BX, BY]) <= r) {
                            Ary.push(BX, BY);
                        };
                        if (weiyi([AX, BY]) <= r) {
                            Ary.push(AX, BY);
                        };
                        if (weiyi([BX, AY]) <= r) {
                            Ary.push(BX, AY);
                        };
                    };
                };
            };
        };
        return Ary;

        function weiyi(ary) {
            var sum = 0;
            for (var i = 0; i < ary.length; i++) {
                sum += Math.pow(ary[i], 2);
            };
            return Math.sqrt(sum);
        };

        function RToxy(R) {
            var x = Math.cos(R);
            var y = Math.sin(R);
            return [x, y];
        };


        function getsd(s, ary) {
            var sum = weiyi(ary);
            var S = s / sum;
            for (var i = 0; i < ary.length; i++) {
                ary[i] = ary[i] * S;
            };
            return ary;
        };

    };




    canvasView.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {

        if (this.mode == 0) {
            this.imgTouch(view, event);
        } else if (this.mode == 1) {
            this.pointsTouch(view, event);
        } else if (this.mode == 2) {
            this.colorTouch(view, event);
        };
        return true;
    }));


};



function 选择图片(fun) {
    ui.run(() => {
        importPackage(org.autojs.autojs.ui.explorer);
        importPackage(org.autojs.autojs.model.explorer);
        var explorerView = new ExplorerView(new android.view.ContextThemeWrapper(context, org.autojs.autojs.R.style.AppTheme));
        explorerView.setExplorer(Explorers.workspace(), ExplorerDirPage.createRoot("/sdcard"));
        explorerView.setDirectorySpanSize(2);
        var dialog = new org.autojs.autojs.theme.dialog.ThemeColorMaterialDialogBuilder(context)
            .title("选择图片文件")
            .customView(explorerView, false)
            .positiveText("取消")
            .build();
        explorerView.setOnItemClickListener(function(view, item) {
            if (nameToType(String(item.toScriptFile())) == "图片") {
                fun(String(item.toScriptFile()));
                dialog.dismiss();
            } else {
                toastLog("不是图片");
            };
        });
        com.stardust.app.DialogUtils.showDialog(dialog);
    });
};






function 媒体库选择(fun) {
    ui.run(function() {
        var ctx = activity;
        var window = new android.widget.PopupWindow();
        var view = XmlToView(
            <vertical>
                        <text text="选择图片" textSize="25sp" gravity="center"/>
                        <list id="list" w="*">
                            <horizontal w="*" margin="5" bg={colors.toString(colors.GRAY)} gravity="center">
                                <img w="{{Math.round(device.width/7)}}px" h="{{Math.round(device.width/7)}}px" margin="6" scaleType="fitXY" src="file://{{filePath}}"/>
                                <text w="*" h="25" margin="2" text="{{title}}" textSize="20sp" line="1" gravity="center"/>
                            </horizontal>
                        </list>
                    </vertical>
        );
        view.list.setDataSource(imagesPath);

        view.list.on("item_click", function(item) {
            threads.start(function() {
                dialogs.confirm("确定要打开文件", item.filePath, function(A) {
                    if (A) {
                        fun(item.filePath);
                        window.dismiss();
                    };
                });
            });
        });
        //log(view);
        window.setContentView(view);
        window.setWidth(device.width * 0.8);
        window.setHeight(device.height * 0.8);
        window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(255, 255, 0, 0)));
        window.setFocusable(true);
        window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, -1, -1);
    });
};





function XmlToView(xml) {
    runtime.ui.layoutInflater.setContext(context);
    return runtime.ui.layoutInflater.inflate(xml.toXMLString().toString(), null, true);
};



//获取设备上所有的音频信息
function getAudiosInfo(maxAmount, ary) {
    MediaStore = android.provider.MediaStore;
    var Ary = ary || new Array;
    let contentResolver = context.getContentResolver();
    let audioColumns = [
        MediaStore.Audio.Media._ID,
        MediaStore.Audio.Media.DATA,
        MediaStore.Audio.Media.TITLE,
        MediaStore.Audio.Media.MIME_TYPE
    ];
    let cursor = contentResolver.query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, audioColumns, null, null, null);
    maxAmount = maxAmount ? (maxAmount < cursor.getCount() ? maxAmount : cursor.getCount()) : cursor.getCount();
    cursor.moveToLast();
    while (cursor.moveToPrevious() && Ary.length < maxAmount) {
        let ob = {};
        ob._id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID));
        ob.filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA));
        ob.title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE));
        ob.mime_type = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.MIME_TYPE));
        if (files.exists(ob.filePath)) {
            Ary.push(ob);
        };
    }
    return Ary;
}



//获取设备上所有的视频信息
function getVideosInfo(maxAmount, ary) {
    MediaStore = android.provider.MediaStore;
    var Ary = ary || new Array;
    let contentResolver = context.getContentResolver();
    let videoColumns = [
        MediaStore.Video.Media._ID,
        MediaStore.Video.Media.DATA,
        MediaStore.Video.Media.TITLE,
        MediaStore.Video.Media.MIME_TYPE
    ];
    let cursor = contentResolver.query(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, videoColumns, null, null, null);
    maxAmount = maxAmount ? (maxAmount < cursor.getCount() ? maxAmount : cursor.getCount()) : cursor.getCount();
    cursor.moveToLast();
    while (cursor.moveToPrevious() && Ary.length < maxAmount) {
        var ob = {};
        ob._id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media._ID));
        ob.filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DATA));
        ob.title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.TITLE));
        ob.mime_type = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.MIME_TYPE));
        if (files.exists(ob.filePath)) {
            Ary.push(ob);
        };
    }
    return Ary;
}

//获取设备上所有的照片信息
function getPhotosInfo(maxAmount, ary) {
    MediaStore = android.provider.MediaStore;
    var Ary = ary || new Array;
    let contentResolver = context.getContentResolver();
    let photoColumns = [
        MediaStore.Images.Media._ID,
        MediaStore.Images.Media.DATA,
        MediaStore.Images.Media.TITLE,
        MediaStore.Images.Media.MIME_TYPE,
        MediaStore.Images.Media.SIZE,
        MediaStore.Images.Media.ORIENTATION
    ];
    let cursor = contentResolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, photoColumns, null, null, null);
    maxAmount = maxAmount ? (maxAmount < cursor.getCount() ? maxAmount : cursor.getCount()) : cursor.getCount();
    cursor.moveToLast();
    while (Ary.length < maxAmount) {
        var ob = {};
        //ob._id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID));
        ob.filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA));
        ob.title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.TITLE));
        //ob.mime_type = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.MIME_TYPE));
        ob.size = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE));
        if (files.exists(ob.filePath)) {
            Ary.push(ob);
            sleep(100);
        };
        cursor.moveToPrevious();

    }
    return Ary;
};