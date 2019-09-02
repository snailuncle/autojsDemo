"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年7月7日 下午9:03:02
 *测试机型: vivo PD1813D
 *Auto.js版本: 4.1.0 Alpha5
 *Android版本: 8.1.0
 *屏幕: 1080*2280
 *API: 27
 *备注: 多点取色。打开一张图片之后。可以缩放和移动图片。点击移动切换。将记录你所触摸的坐标点和颜色。以第1个点为相对点。生成多点找色数据。
 **/

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="线条色组生成器" h="40dp"/>
            </appbar>
            <text id="ConsoleText" w="*" maxLines="1"/>
            <canvas id="canvas" margin="5" layout_weight="1"/>
            <HorizontalScrollView  w="*"h="50" bg="#dddddd">
                <horizontal  gravity="center">
                    <button id="open_img" text="打开图片"  layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="move_" text="移动切换" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="clip_ary" text="复制点组" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="clear_ary" text="清空点组" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="clear2_ary" text="清空点数" layout_weight="1"style="Widget.AppCompat.Button.Colored"/>
                    <button id="clip_code" text="生成代码" layout_weight="1"/>
                </horizontal>
            </HorizontalScrollView>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <scroll w="*" h="*">
                <vertical>
                    <text text="使用说明" textSize="25sp" margin="5" gravity="center"/>
                    <text id="text_help" text="使用说明2" textSize="25sp" margin="5" gravity="center"/>
                </vertical>
            </scroll>
        </vertical>
    </drawer>
);

ui.text_help.setText("多点取色。\n打开一张图片之后。\n可以缩放和移动图片。\n点击移动切换。\n将记录你所触摸的坐标点和颜色。\n以第1个点为相对点。\n生成多点找色数据。");

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
    // console.show();
});


//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.ConsoleText.click(function() {
    let txt = String(ui.ConsoleText.getText());
    let i = txt.indexOf("/:");
    if (i + 1) {
        setClip(txt.substring(i + 2));
        toast("已复制");
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
                /*
                    选择图片(function(path) {
                        var IMG = images.read(path);
                        canvasAD.setImg(IMG);
                        Script_data.imgPath = path;

                        //IMG.recycle();
                    });
                    */
                let path = selectFile("/sdcard/", "", function(name) {
                    return name.endsWith(".jpg") || name.endsWith(".png") || files.isDir(files.join("/sdcard", name));
                });
                if (path) {
                    var IMG = images.read(path);
                    canvasAD.setImg(IMG);
                    Script_data.imgPath = path;
                };
                break;
        };
    });

});





ui.clip_code.click(function() {
    var colorData = canvasAD.getColors();
    setClip("var colorData=" + JSON.stringify(colorData) + ";\nrequestScreenCapture();\nvar img=captureScreen();\nvar p = images.findMultiColors(img, colorData.color, colorData.ary);\nif(p){\nlog(p.x,p.y);\ntoast('找到了');\n}else{\ntoast('没找到');\n};");
    if (colorData.ary.length) {
        toast("已复制");
    } else {
        toast("数据为空，失败");
    };

});


ui.move_.click(function() {
    canvasAD.toMode();

});
ui.clear_ary.click(function() {
    if (canvasAD.clearColors()) {
        toast("已清空");
    };
});
ui.clear2_ary.click(function() {
    if (canvasAD.PointsAry.strokeAry.length) {
        threads.start(function() {
            var sum = parseInt(dialogs.rawInput("输入要清楚的点数", 10));
            if (sum) {
                sum = sum <= canvasAD.PointsAry.strokeAry.length ? sum : canvasAD.PointsAry.strokeAry.length;
                canvasAD.PointsAry.strokeAry.splice(canvasAD.PointsAry.strokeAry.length - sum, sum);
            };
        });
    };
});

ui.clip_ary.click(function() {

    var colorData = canvasAD.getColors();
    setClip(JSON.stringify(colorData));
    if (colorData.ary.length) {
        toast("已复制");
    } else {
        toast("数据为空，失败");
    };
});



var imagesPath = new Array;

var storage = storages.create("取色_线条");
var Script_data = storage.get("data", {});

//当离开本界面时保存
ui.emitter.on("pause", () => {

    storage.put("data", Script_data);
});

for (let i in Script_data) {
    switch (i) {
        case "fun":
            break;
        case "max":

            break;
        case "funList":

            break;

    };


};







thread = threads.start(function() {
    sleep(500);
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
    this.mode = 0;
    this.toMode = function() {
        if (this.mode == 0) {
            this.mode = 1;
        } else {
            this.mode = 0;
        };
    };
    this.maxPoints = 2;

    this.loadPaint = new Paint;
    this.loadPaint.setTextAlign(Paint.Align.CENTER);
    this.loadPaint.setStrokeWidth(5);
    this.loadPaint.setARGB(255, 0, 0, 0);
    //this.loadPaint.setStyle(Paint.Style.STROKE);
    this.loadPaint.setStyle(Paint.Style.FILL);
    this.loadTextSize = 100;
    this.loadPaint.setTextSize(this.loadTextSize);

    this.paint = new Paint;
    this.paint.setStrokeWidth(5);
    this.paint.setARGB(255, 0, 255, 0);
    this.paint.setStyle(Paint.Style.FILL);

    this.paint1 = new Paint;
    this.paint1.setStrokeWidth(5);
    this.paint1.setARGB(255, 0, 255, 0);
    this.paint1.setStyle(Paint.Style.FILL);

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
    };

    this.imgRect;
    this.imgMatrix = new android.graphics.Matrix();
    this.imgInvertMatrix = new android.graphics.Matrix();
    this.resetImgData = function() {
        this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
    };

    this.getScaling = function(ary) {
        //获取缩放比例。
        ary = Array.isArray(ary) ? ary : [0, 0, 100, 100];
        try {
            var Ary = this.matrixPoints(this.imgMatrix, ary);
            return this.weiyi([Ary[2] - Ary[0], Ary[3] - Ary[1]]) / this.weiyi(ary);
        } catch (e) {
            toastLog(e);
        };
    };

    if (img) {
        this.resetImgData();
    };

    this.setImg = function(IMG) {
        img = IMG.clone();
        this.resetImgData();
        if (this.canvasRect) {
            this.imgToCenter();
        };
    };

    this.imgToCenter = function() {
        this.imgMatrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
        this.imgMatrix.invert(this.imgInvertMatrix);
    };



    this.PointsAry = {
        x: 0,
        y: 0,
        first: false,
        color: 0,
        //单个字符的笔画数据。
        strokeAry: new Array, //[[x,y,color],[x,y,color],[x,y,color],………]
        //每笔的数据。
        strokePoints: new Array //[[x,y,color],[x,y,color],[x,y,color],………]

    };




    this.getColors = function() {
        return {
            x: this.PointsAry.x,
            y: this.PointsAry.y,
            color: this.PointsAry.color,
            ary: this.PointsAry.strokeAry
        };
    };
    this.clearColors = function() {
        this.PointsAry = {
            x: 0,
            y: 0,
            first: false,
            color: 0,
            //单个字符的笔画数据。
            strokeAry: new Array, //[[x,y,color],[x,y,color],[x,y,color],………]
            //每笔的数据。
            strokePoints: new Array //[[x,y,color],[x,y,color],[x,y,color],………]

        };
        return true;
    };

    this.RY = {
        Y: 0
    };


    this.Touch = {
        PointStart: new Array,
        PointCurrent: new Array,
        Matrix: new android.graphics.Matrix()
    };

    canvasView.on("draw", (canvas) => {
        canvas.drawARGB(255, 127, 127, 127);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        var scale = this.getScaling();
        if (img) {
            canvas.setMatrix(this.imgMatrix);
            //绘制图片。
            canvas.drawImage(img, 0, 0, this.paint);
            if (this.canvasRect) {};
            //绘制点色数组。
            this.paint.setStrokeWidth(5 / scale);
            this.paint1.setStrokeWidth(5 / scale);
            this.drawPoints(canvas, this.PointsAry, this.paint, 10 / scale);
            //绘制实时显示颜色和坐标的点。
            //this.drawMianPoint(canvas,this.imgInvertMatrix,this.paint);

        } else {
            //没有图片时绘制加载动画。
            this.Loading(canvas, this.loadPaint, this.RY);
        };

        //绘制触控点信息。
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



    this.drawPoints = function(canvas, PointsAry, paint, circleRadius) {
        circleRadius = circleRadius || 10;
        try {
            for (let i = 0; i < PointsAry.strokeAry.length; i++) {
                let ary = PointsAry.strokeAry[i];

                let x = PointsAry.x + ary[0] + 0.5,
                    y = PointsAry.y + ary[1] + 0.5;
                this.paint.setColor(this.反色(ary[2]));
                canvas.drawCircle(x, y, circleRadius, this.paint);
                if (i != 0) {
                    let ary0 = PointsAry.strokeAry[i - 1];
                    let x1 = PointsAry.x + ary0[0] + 0.5,
                        y2 = PointsAry.y + ary0[1] + 0.5;
                    canvas.drawLine(x1, y2, x, y, this.paint1);
                };
            };
            for (let i = 0; i < PointsAry.strokePoints.length; i++) {
                let ary = PointsAry.strokePoints[i];
                let x = PointsAry.x + ary[0] + 0.5,
                    y = PointsAry.y + ary[1] + 0.5;
                this.paint.setColor(this.反色(ary[2]));
                canvas.drawCircle(x, y, circleRadius, this.paint);
                if (i != 0) {
                    let ary0 = PointsAry.strokePoints[i - 1];
                    let x1 = PointsAry.x + ary0[0] + 0.5,
                        y2 = PointsAry.y + ary0[1] + 0.5;
                    canvas.drawLine(x1, y2, x, y, this.paint1);
                };
            };
        } catch (e) {
            toastLog(e);
        };

    };




    this.countPoints = function(ary) {
        //运算点。
        return this.matrixPoints(this.imgInvertMatrix, this.matrixPoints(this.pointsMatrix, ary));
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
                //记录图片点色坐标数组。
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
        //屏幕点色坐标数组。
        return Bry;
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
        canvas.drawText("请打开一个图片", w / 2, h * 0.48 + 0.365 * paint.getTextSize(), paint);
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
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    isMove = true;
                    for (let i = 0; i < PC; i++) {
                        let id = event.getPointerId(i);
                        let X = event.getX(i);
                        let Y = event.getY(i);
                        if (i == 0) {
                            var XYary = this.matrixPoints(this.imgInvertMatrix, [X, Y]);
                            this.addPoint2(this.PointsAry.strokePoints, XYary[0], XYary[1]);
                        };
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    kg = false;
                    this.PointsAry.strokePoints = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    //log("OUTSIDE");

                    break;
                default:
                    var I = Math.floor(event.getAction() / 256);
                    var ID = event.getPointerId(I);
                    var X = event.getX(I);
                    var Y = event.getY(I);
                    var RX = event.getRawX();
                    var RY = event.getRawY();
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            //第一个手指按下。
                            //log("down");
                            //strokePoints = new Array;
                            var XYary = this.matrixPoints(this.imgInvertMatrix, [X, Y]);
                            this.addPoint2(this.PointsAry.strokePoints, XYary[0], XYary[1]);

                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            //log("up");
                            isMove = false;
                            var XYary = this.matrixPoints(this.imgInvertMatrix, [X, Y]);
                            this.addPoint2(this.PointsAry.strokePoints, XYary[0], XYary[1]);


                            this.PointsAry.strokeAry = this.PointsAry.strokeAry.concat(this.PointsAry.strokePoints);
                            this.PointsAry.strokePoints = new Array;
                            //MainGesturesAry.push(gesturesAry);
                            //gesturesAry = new Array;



                            break;
                        case event.ACTION_POINTER_DOWN:
                            //log("POINTER_DOWN");


                            break;
                        case event.ACTION_POINTER_UP:
                            //log("POINTER_UP");


                            break;
                    };
            };
        } catch (e) {
            log("0: " + e);
        };

        return true;

    };




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
    this.addPoint2 = function(strokePoints, X, Y) {
        var x = Math.floor(X),
            y = Math.floor(Y);
        if (this.imgRect.contains(x, y)) {
            //var color = colors.toString(img.pixel(x, y));
            var color = img.pixel(x, y);
            if (!this.PointsAry.first) {
                this.PointsAry.x = x;
                this.PointsAry.y = y;
                this.PointsAry.color = color;
                this.PointsAry.first = true;
            };
            let x1 = x - this.PointsAry.x,
                y1 = y - this.PointsAry.y;
            if (strokePoints.length >= 1) {
                let x2 = strokePoints[strokePoints.length - 1][0];
                let y2 = strokePoints[strokePoints.length - 1][1];
                if (!this.PointsAry.strokeAry.concat(strokePoints).some(function(ary) {
                        if (ary[0] == x1 && ary[1] == y1) {
                            return true;
                        };
                    })) {
                    strokePoints.push([x1, y1, color]);
                };
            } else {
                strokePoints.push([x1, y1, color]);
            };
        };
    };
    this.addPoint = function(strokePoints, X, Y, isEnd, Corner, Distance) {
        Corner = Corner || 1;
        Distance = Distance || 1;
        //X = Math.floor(X);
        //Y = Math.floor(Y);
        if (strokePoints.length > 1) {
            let x1 = strokePoints[strokePoints.length - 2][0];
            let y1 = strokePoints[strokePoints.length - 2][1];
            let x2 = strokePoints[strokePoints.length - 1][0];
            let y2 = strokePoints[strokePoints.length - 1][1];
            let FR1 = this.ydfx([x2 - x1, y2 - y1]);
            let FR2 = this.ydfx([X - x2, Y - y2]);
            if (Math.abs(FR2 - FR1) >= Corner) {
                if (this.weiyi([x2 - x1, y2 - y1]) >= Distance) {

                    if (!isEnd) {
                        strokePoints.push([X, Y]);
                    } else {
                        strokePoints[strokePoints.length - 1][0] = X;
                        strokePoints[strokePoints.length - 1][1] = Y;
                    };

                } else {
                    if (!isEnd) {
                        strokePoints[strokePoints.length - 1][0] = X;
                        strokePoints[strokePoints.length - 1][1] = Y;
                    } else {
                        strokePoints[strokePoints.length - 2][0] = X;
                        strokePoints[strokePoints.length - 2][1] = Y;
                        strokePoints.pop();
                        strokePoints.pop();
                    };
                };
            } else {
                if (this.weiyi([x2 - x1, y2 - y1]) >= Distance) {
                    strokePoints[strokePoints.length - 1][0] = X;
                    strokePoints[strokePoints.length - 1][1] = Y;

                } else {
                    if (!isEnd) {
                        strokePoints[strokePoints.length - 1][0] = X;
                        strokePoints[strokePoints.length - 1][1] = Y;
                    } else {
                        strokePoints[strokePoints.length - 2][0] = X;
                        strokePoints[strokePoints.length - 2][1] = Y;
                        strokePoints.pop();
                        strokePoints.pop();
                    };
                };
            };
        } else {
            strokePoints.push([X, Y]);
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

function selectFile(Apath, Bpath) {
    Apath = Apath || "/sdcard";
    Bpath = Bpath || "";

    return main(Bpath);

    function main(Bpath) {
        var path = files.join(Apath, Bpath);
        var a = files.listDir(path).sort();
        if (a.length) {
            a = a.join("/").split("/");
            a.unshift("返回上一层");
        } else {
            a = ["返回上一层"];
        };
        i = dialogs.singleChoice("选择文件\n" + path, a);
        if (i >= 0) {
            if (i) {
                name = a[i];
                path = files.join(path, name);
                if (files.isDir(path)) {
                    return arguments.callee(files.join(Bpath, name));
                } else {
                    if (dialogs.confirm("确定文件？", name)) {
                        return path;
                    } else {
                        return arguments.callee(Bpath);
                    }
                }
            } else {
                var ary = Bpath.split("/");
                if (ary.length && Bpath.length) {
                    ary.pop();
                    return arguments.callee(ary.join("/"));
                };
            };
        };
    };
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
        };
        cursor.moveToPrevious();

    }
    return Ary;
};





function RToxy(R) {
    var x = Math.cos(R);
    var y = Math.sin(R);
    return [x, y];
};

function xyToR(x, y) {
    var ary = getsd(1, [x, y]);
    x = ary[0],
        y = ary[1];
    var R = Math.asin(y);
    if (x < 0) {
        R = Math.PI - R;
    };
    return R;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
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

function ydfx(ary) {
    var ary = getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};

function getUiObj(x, y) {
    //let x=500,y=500;
    let uiObj_ary = filter(function(uiObj) {
        let rect = uiObj.bounds();
        return rect.contains(x, y);
    }).find().sort(function(A, B) {
        AR = A.bounds();
        BR = B.bounds();
        return BR.width() * BR.height() - AR.width() * AR.height();

    });
    /*
    uiObj_ary.forEach(function(uiObj){
        log(uiObj.bounds());
        
    });
    */
    return uiObj_ary[uiObj_ary.length - 1];

};