/**
 *作者QQ: 1811588980
 *完成时间: 2019年5月11日 下午10:05:40
 *测试机型: vivo PD1813D
 *Auto.js版本: Pro 7.0.0-7
 *Android版本: 8.1.0
 *屏幕: 1080*2280
 *API: 27
 *备注: 本脚本演示了ColorMatrix各个值的用法。
 以及对图片的稍微复杂的处理
 **/



/*
 *
 * 4x5 matrix for transforming the color and alpha components of a Bitmap.　
 * The matrix can be passed as single array, and is treated as follows:
 * 下面这个4x5的矩阵可以表达，为一张图的颜色以及透明图信息。
 * [ a, b, c, d, e,
 *   f, g, h, i, j,
 *   k, l, m, n, o,
 *   p, q, r, s, t  ]
 *
 * When applied to a color 颜色分量矩阵
 * [R, G, B, A]
 * the resulting color is computed as:计算结果如下公式：
 *
 * R’ = a*R + b*G + c*B + d*A + e;
 * G’ = f*R + g*G + h*B + i*A + j;
 * B’ = k*R + l*G + m*B + n*A + o;
 * A’ = p*R + q*G + r*B + s*A + t;
 *
 * That resulting color
 * [R’, G’, B’, A’]
 * then has each channel clamped to the 0 to 255 range.计算出来的结果，每个通道都在0-255之间
 *
 * The sample ColorMatrix below inverts incoming colors by scaling each
 * channel by -1, and then shifting the result up by
 * 255 to remain in the standard color space.
 * 好像用来举例说明的，前四列代表RGBA的偏向成分，第五列代表着颜色偏移量
 *
 * [ -1, 0, 0, 0, 255,
 *   0, -1, 0, 0, 255,
 *   0, 0, -1, 0, 255,
 *   0, 0, 0, 1, 0  ]
 */



importClass(android.graphics.ColorMatrixColorFilter);
importClass(android.graphics.ColorMatrix);


var SeekBarLayout = (function() {
    util.extend(SeekBarLayout, ui.Widget);

    function SeekBarLayout() {
        ui.Widget.call(this);
        this.Magnification = 1;
        this.Difference = 0;
        this.defineAttr("text", (view, attr, value, defineSetter) => {
            view._text.setText(String(value));
        });
        this.defineAttr("range", (view, attr, value, defineSetter) => {
            value = String(value);
            let ary = String(value).split(" ");
            let ASumStr = ary[0];
            let BSumStr = ary[1];

            let AMinSum = parseFloat(ASumStr);
            let AMaxSum = parseFloat(ASumStr.replace(".", ""));
            let A_M = AMaxSum / AMinSum;

            let BMinSum = parseFloat(BSumStr);
            let BMaxSum = parseFloat(BSumStr.replace(".", ""));
            let B_M = BMaxSum / BMinSum;

            this.Magnification = A_M >= B_M ? A_M : B_M;

            let MinSum = AMinSum <= BMinSum ? AMinSum : BMinSum;
            let MaxSum = AMinSum <= BMinSum ? BMinSum : AMinSum;
            let MinSumStr = AMinSum <= BMinSum ? ASumStr : BSumStr;
            let MaxSumStr = AMinSum <= BMinSum ? BSumStr : ASumStr;

            this.Difference = MinSum;

            view._Duration_Min.setText(MinSumStr);
            view._Duration_Max.setText(MaxSumStr);
            view._Duration_seekbar.setMax(this.Magnification * (MaxSum - MinSum));
        });
        this.defineAttr("sum", (view, attr, value, defineSetter) => {
            let Sum = parseFloat(String(value));
            view._CurrentDuration.setText(String(value));
            let _Sum = this.Magnification * (Sum - this.Difference);
            view._Duration_seekbar.setProgress(_Sum);
        });
        this.defineAttr("onChang", (view, attr, value, defineSetter) => {
            var _myFun = eval(value);
            view._Duration_seekbar.setOnSeekBarChangeListener({
                onProgressChanged: (seekBar, progress, fromUser) => {
                    view._CurrentDuration.setText(String(Math.floor((progress / this.Magnification + this.Difference) * 100) / 100));
                    if (fromUser) {
                        _myFun(view._text, progress / this.Magnification + this.Difference);
                    }
                },
                onStartTrackingTouch: function(seekBar) {},
                onStopTrackingTouch: function(seekBar) {
                    //eval(value+"(view._text,progress)");
                }
            });
        });
    };
    SeekBarLayout.prototype.render = function() {
        return (
            <vertical margin="5" >
                            <text id="_text"  w="auto" text="A" textSize="15"gravity="center" layout_gravity="center"/>
                            <frame w="*">
                                <text id="_Duration_Min" w="auto" text="0"margin="10 0 0 0" gravity="center" layout_gravity="left"/>
                                <text id="_CurrentDuration" w="auto" text="0"margin="0 0 0 0" gravity="center" layout_gravity="center"/>
                                <text id="_Duration_Max" w="auto" text="0"margin="0 0 10 0" gravity="center" layout_gravity="right"/>
                            </frame>
                            <seekbar id="_Duration_seekbar" layout_weight="1"/>
                        </vertical>
        );
    };
    SeekBarLayout.prototype.getSum = function() {
        return this.view._Duration_seekbar.getProgress();
    };
    ui.registerWidget("seekbar-layout", SeekBarLayout);
    return SeekBarLayout;
})();


var w = device.width;

ui.layout(
    <vertical>
        <canvas id="canvas" w="{{w}}px"h="{{w}}px"/>
        <scroll layout_weight="1">
            <vertical margin="5">
                <vertical bg="#e0e0e0" margin="5">
                    <text text="R红色通道最大不超过255" textSize="17" gravity="center"w="*"/>
                    <seekbar-layout w="*" h="auto" text="0 R*值" range="-5.0 5.0" sum="1.0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="1 G*值" range="-5.0 5.0" sum="0.0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="2 B*值" range="-5.0 5.0" sum="0.0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="3 A*值" range="-5.0 5.0" sum="0.0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="4 C+值" range="0 255" sum="0" onChang="MyView"/>
                </vertical>
                <vertical bg="#e0e0e0" margin="5">
                    <text text="G绿色通道最大不超过255" textSize="17" gravity="center"w="*"/>
                    <seekbar-layout w="*" h="auto" text="5 R*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="6 G*值" range="-5.0 5.0" sum="1" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="7 B*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="8 A*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="9 C+值" range="0 255" sum="0" onChang="MyView"/>
                </vertical>
                <vertical bg="#e0e0e0" margin="5">
                    <text text="B蓝色通道最大不超过255" textSize="17" gravity="center"w="*"/>
                    <seekbar-layout w="*" h="auto" text="10 R*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="11 G*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="12 B*值" range="-5.0 5.0" sum="1" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="13 A*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="14 C+值" range="0 255" sum="0" onChang="MyView"/>
                </vertical>
                <vertical bg="#e0e0e0" margin="5">
                    <text text="A透明通道最大不超过255" textSize="17" gravity="center"w="*"/>
                    <seekbar-layout w="*" h="auto" text="15 R*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="16 G*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="17 B*值" range="-5.0 5.0" sum="0" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="18 A*值" range="-5.0 5.0" sum="1" onChang="MyView"/>
                    <seekbar-layout w="*" h="auto" text="19 C+值" range="0 255" sum="0" onChang="MyView"/>
                </vertical>
                <text w="*" text="应该还有别的方法吧，我不管了" textSize="17" gravity="center"margin="10"/>
            </vertical>
        </scroll>
                <button id="openImage" text="打开图片"/>
                <button id="imageSave" text="保存处理后图片"/>
    </vertical>
);

//黑色画笔。
var paint = new Paint;
var paint1 = new Paint;
paint1.setTextSize(75);
//paint.setTextAlign(Paint.Align.CENTER);
//paint.setStrokeWidth(2);
//paint.setStyle(Paint.Style.STROKE);
//paint.setStyle(Paint.Style.FILL);
//paint.setARGB(255, 0, 0, 0);
//paint.setColor(colors.GRAY);
//paint.setTextSize(75);


var canvasRect = new android.graphics.RectF;
var canvasMatrix = new android.graphics.Matrix;
ui.canvas.post(function() {
    let v = ui.canvas;
    //var rect=new android.graphics.Rect;
    //ui.canvas.getBoundsOnScreen(canvasRect);
    let w = v.getWidth(),
        h = v.getHeight();
    canvasRect.set(new android.graphics.RectF(0, 0, w, h));
    if (MainImg) {
        canvasMatrix.setRectToRect(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()), new android.graphics.RectF(canvasRect), android.graphics.Matrix.ScaleToFit.CENTER);
    };
});

var ColorMatrixAry = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.drawARGB(255, 127, 127, 127)
    if (MainImg) {
        canvas.drawImage(MainImg, 0, 0, paint1);
        canvas.setMatrix(canvasMatrix);
        canvas.drawImage(MainImg, 0, 0, paint);
    }else{
        canvas.drawText("请打开一个图片",0,h/2,paint1);
    };
});


function MyView(view, value) {
    var index = parseInt(view.getText());
    ColorMatrixAry[index] = value;
    paint.setColorFilter(new ColorMatrixColorFilter(new ColorMatrix(ColorMatrixAry))); //蓝色通道输出
};





var imagesPath = new Array;

thread = threads.start(function() {
    sleep(1000);
    getPhotosInfo(25, imagesPath);
});




var storage = storages.create("图片处理ColorMatrix");
var imagePath = storage.get("imagePath");
events.on("exit", function() {
    storage.put("imagePath", imagePath);
});

var MainImg = 加载图片(imagePath);


ui.openImage.click(function() {
    threads.start(function() {
        switch (dialogs.singleChoice("选择方式", ["媒体库", "本机文件"])) {
            case 0:
                媒体库选择(function(path) {
                    var img = MainImg;
                    MainImg = 加载图片(path);
                    if (MainImg) {
                        canvasMatrix.setRectToRect(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()), new android.graphics.RectF(canvasRect), android.graphics.Matrix.ScaleToFit.CENTER);
                    };
                    if (img) {
                        img.recycle();
                    };
                });
                break;
            case 1:
                选择图片(function(path) {
                    var img = MainImg;
                    MainImg = 加载图片(path);
                    if (MainImg) {
                        canvasMatrix.setRectToRect(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()), new android.graphics.RectF(canvasRect), android.graphics.Matrix.ScaleToFit.CENTER);
                    };
                    if (img) {
                        img.recycle();
                    };
                });

                break;

        };
    });
});

ui.imageSave.click(function() {
    if (MainImg) {

        let canvas= new Canvas(MainImg.getWidth(), MainImg.getHeight());
        canvas.drawImage(MainImg, 0, 0, paint);
        let img=canvas.toImage();

        let file=new java.io.File(imagePath);
        var toPath = files.join(file.getParent(), files.getNameWithoutExtension(imagePath) + "(ColorMatrix)." + files.getExtension(imagePath));
        //var toPath = "/sdcard/脚本/" + (new Date().getTime()) + ".png";
        images.save(img, toPath, "png", 100);
        img.recycle();
        media.scanFile(toPath);
        toastLog("保存");
    } else {
        toastLog("没图");
    };
});


function 加载图片(A) {
    if (files.isFile(A)) {
        imagePath = A;
        return images.read(A);
    };
    return null;
    var dir = "/storage/emulated/0/DCIM";
    var jsFiles = files.listDir(dir, function(name) {
        return (name.endsWith(".jpg") || name.endsWith(".png")) && files.isFile(files.join(dir, name));
    });
    if (jsFiles.length) {
        return images.read(files.join(dir, jsFiles[jsFiles.length - 1]));
    } else {
        toastLog("没有图片可以查看");
        toastLog("请自己修改路径");
        toastLog("后使用");
        exit();
    };
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
