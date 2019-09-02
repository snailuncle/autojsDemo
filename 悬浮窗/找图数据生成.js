/**
 *作者QQ: 1811588980
 *完成时间: 2019年6月1日 下午10:32:35
 *备注: 使用方法
 **本脚本使用方式。
 * 使用悬浮窗展示的方式对图像选中区域进行找图数据生成。
 *截图 重新截图
 *选图 从文件夹中选择图片
 *区域 将红色框以选中的区域作为此时找图区域
 *加入 对红色宽选中的区域进行剪切。作为找图时的小图。并以上一步选中的区域作为找图区域。并以此时区域的中心作为点击坐标。
 *文件夹 是否使用图片文件方式，默认关闭，使用base64图片
 *代码 直接生成找图数据代码。并复制到粘贴板。请自行新建一个脚本粘贴代码(建议格式化代码，方便查看)。
 *关闭 停止使用本功能脚本。
 *移动 移动悬浮窗。点击可以最小化 长按也可关闭此脚本。
 **/

toastLog("Are you ready？");

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};

threads.start(function() {
    //console.show();
});


var IMG = captureScreen();

var MainImg = images.copy(IMG);

var window = floaty.rawWindow(
    <vertical id="vertical" bg="#aaaaaa" w="{{Math.floor(device.width*0.9)}}px" h="{{Math.floor(device.width*0.9)}}px" gravity="center">
        <canvas id="canvas" margin="5dp" layout_weight="1"/>
        <HorizontalScrollView w="*">
            <horizontal id="horizontal" w="*" gravity="center">
                <button id="butJ" layout_weight="1" text="截图"/>
                <button id="openImage" layout_weight="1" text="选图"/>
                <button id="getRegion" layout_weight="1" text="区域"/>
                <button id="addImg" layout_weight="1" text="加入"/>
                <button id="saveToDir" layout_weight="1" text="文件夹关闭"/>
                <button id="setClip" layout_weight="1" text="代码"/>
                <button id="butG" layout_weight="1" text="关闭"/>
            </horizontal>
        </HorizontalScrollView>
        <button id="butY" w="*" text="移动"/>
    </vertical>
);


var window_ = floaty.rawWindow(
    <button id="but_" w="150px" h="150px" text="▽" alpha="0.7"/>
);

var ad = new 悬浮控制(window, window.butY, true, window.vertical);
var ad_ = new 悬浮控制(window_, window_.but_, true);
var F = ad.OutScreen();
var F_ = ad_.OutScreen();

threads.start(function() {
    sleep(100);
    F_ = ad_.OutScreen();
    ad_.windowyidong(F_);
});


ad.setClick(function() {
    //window.disableFocus();
    threads.start(function() {
        F = ad.OutScreen();
        ad.windowyidong(F);
        ad_.windowyidong([F_[1], ad_.centerXY(ad.centerXY(F[0])[0])[1]]);
        ad_.windowyidong(ad_.IntScreen());
        ad_.windowyidong(ad_.toScreenEdge(0));
    });
});

ad_.setClick(function() {
    //window.disableFocus();
    threads.start(function() {
        F_ = ad_.OutScreen();
        ad_.windowyidong(F_);
        ad.windowyidong([F[1], ad.centerXY(ad_.centerXY(F_[0])[0])[1]]);
        ad.windowyidong(ad.IntScreen());
    });
});


window.butJ.click(function() {
    threads.start(function() {
        var F = ad.OutScreen();
        ad.windowyidong(F);
        sleep(100);
        var img = MainImg;
        var IMG = captureScreen();
        MainImg = images.copy(IMG);
        if (MainImg) {
            imageRect.set(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()));
            canvasMatrix.setRectToRect(imageRect, canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
        };
        if (img) {
            img.recycle();
        };
        IMG.recycle();
        ad.windowyidong(F.reverse());
    });
});


window.butG.on("click", () => {
    exit()
});
ad.setLongClick(exit);
ad_.setLongClick(exit);






threads.start(function() {
    sleep(100);
    window.setPosition(device.width / 2 - window.getWidth() / 2, device.height / 2 - window.getHeight() / 2);
});


//黑色画笔。
var paint = new Paint;
var paint1 = new Paint;
var paint2 = new Paint;
//paint1.setTextSize(75);
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(0.675);
paint1.setStrokeWidth(0.675);
paint.setStyle(Paint.Style.STROKE);
paint1.setStyle(Paint.Style.STROKE);
paint2.setStyle(Paint.Style.FILL);
//paint.setARGB(255, 0, 0, 0);
paint.setColor(colors.RED);
paint1.setColor(colors.GREEN);
paint2.setColor(colors.GREEN);
//paint.setTextSize(75);
//android.view.MotionEvent

var findImageDataAry = {};
var findImageCount = 0;

var isSaveToDir = false,
    saveToDir;
events.on("exit", function() {
    clipToCode();
});

/*元素结构。

图二:{
    name:"图二",
    img:{
        path:"./图二.png",
        base64:"fhfcgh==",
    },
    template:null,
    options: {
       region: [0, 0,100,50],
       threshold: 0.8
    },
    
    p:{x:0,y:0},
};
*/


var imageRect = new android.graphics.RectF;
var canvasRect = new android.graphics.RectF;
var canvasMatrix = new android.graphics.Matrix;

var ASX = new XYToMatrix(canvasMatrix);



window.openImage.click(function() {
    threads.start(function() {
        var F = ad.OutScreen();
        ad.windowyidong(F);
        sleep(100);
        var path = selectFile("/sdcard", "/脚本", function(dir, name) {
            return name.endsWith(".jpg") || name.endsWith(".png") || files.isDir(files.join(dir, name));
        });
        if (path) {
            var img = MainImg;
            MainImg = 加载图片(path);
            if (MainImg) {
                imageRect.set(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()));
                canvasMatrix.setRectToRect(imageRect, canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
            };
            if (img) {
                img.recycle();
            };
        };
        ad.windowyidong(F.reverse());
    });
});

var RE_rect;

window.getRegion.click(function() {
    if (MainImg) {
        RE_rect = to_newRect(imageRect);
        let x1 = RE_rect.left,
            y1 = RE_rect.top,
            x2 = RE_rect.right,
            y2 = RE_rect.bottom;
        let w = x2 - x1,
            h = y2 - y1;
        let cx = Math.floor(x1 + w / 2),
            cy = Math.floor(y1 + h / 2);
        let obj = {
            region: [x1, y1, w, h],
            p: {
                x: cx,
                y: cy
            },
        };
        let str = JSON.stringify(obj);
        setClip(str);
        toastLog("已复制区域region");
    };
});

window.addImg.click(function() {
    threads.start(function() {
        var F = ad.OutScreen();
        ad.windowyidong(F);
        sleep(100);
        if (MainImg) {
            let rect = to_newRect(imageRect);

            let x1 = rect.left,
                y1 = rect.top,
                x2 = rect.right,
                y2 = rect.bottom;
            let w = x2 - x1,
                h = y2 - y1;
            let cx = Math.floor(x1 + w / 2),
                cy = Math.floor(y1 + h / 2);
            let x_1 = x1,
                y_1 = y1,
                x_2 = x2,
                y_2 = y2;
            let w_ = w,
                h_ = h;
            let c_x = cx,
                c_y = cy;

            if (RE_rect) {
                if (!RE_rect.contains(imageRect)) {
                    toastLog("错╳╳╳╳╳误");
                    toastLog("图片大于找图范围");
                    return;
                };
                x_1 = RE_rect.left;
                y_1 = RE_rect.top;
                x_2 = RE_rect.right;
                y_2 = RE_rect.bottom;
                w_ = x_2 - x_1;
                h_ = y_2 - y_1;
                c_x = Math.floor(x_1 + w_ / 2);
                c_y = Math.floor(y_1 + h_ / 2);
            };


            let img = images.clip(MainImg, x1, y1, w, h);
            let imgName = dialogs.rawInput("命名") || findImageDataAry.length;
            if (isSaveToDir) {
                images.save(img, files.join(saveToDir, "/" + imgName + ".png"), "png", 100);
            };

            //findImageDataAry.push();
            let imgObj = {
                name: imgName,
                img: {
                    path: isSaveToDir ? "./" + imgName + ".png" : null,
                    base64: isSaveToDir ? null : images.toBase64(img, "png", 100)
                },
                template: null,
                options: {
                    region: [x_1, y_1, w_, h_],
                    threshold: 0.8
                },
                p: {
                    x: cx,
                    y: cy
                },
            };
            findImageDataAry[imgName] = imgObj;
            findImageCount++;
            img.recycle();
            toastLog("已添加");
        } else {
            toastLog("没图");
        };
        ad.windowyidong(F.reverse());
    });
});

function to_newRect(rect) {
    let x1 = rect.left < rect.right ? rect.left : rect.right,
        y1 = rect.top < rect.bottom ? rect.top : rect.bottom,
        x2 = rect.right >= rect.left ? rect.right : rect.left,
        y2 = rect.bottom >= rect.top ? rect.bottom : rect.top;
    return new android.graphics.RectF(x1, y1, x2, y2);
};

window.saveToDir.click(function(v) {
    if (String(v.getText()).endsWith("关闭")) {
        threads.start(function() {
            var F = ad.OutScreen();
            ad.windowyidong(F);
            sleep(100);
            if (saveToDir) {
                if (!dialogs.confirm("是否重设保存路径")) {
                    ad.windowyidong(F.reverse());
                    return;
                };
            };
            switch (dialogs.select("请填写保存路径", ["输入路径", "选择路径"])) {
                case -1:
                    toastLog("未选择保存路径");
                    break;
                case 0:
                    var dir = dialogs.rawInput("请输入保存路径");
                    if (dir && files.isDir(dir)) {
                        saveToDir = dir;
                        isSaveToDir = true;
                        ui.run(() => {
                            v.setText("文件夹开启");
                        });
                        toastLog("保存路径设置完毕");
                    };
                    break;
                case 1:
                    var dir = selectFolder("/sdcard", "/脚本");
                    if (dir && files.isDir(dir)) {
                        saveToDir = dir;
                        isSaveToDir = true;
                        ui.run(() => {
                            v.setText("文件夹开启");
                        });
                        toastLog("保存路径设置完毕");
                    };
                    break;

            };
            ad.windowyidong(F.reverse());
        });
    } else {
        v.setText("文件夹关闭");
        isSaveToDir = false;
    };

});

window.setClip.click(clipToCode);


function clipToCode() {
    if (findImageCount) {

        var objStr = JSON.stringify(findImageDataAry);
        //var str = "auto();\nif (!requestScreenCapture()) {\n    toast(\"请求截图失败\");\n    exit();\n};\nvar imgAry=" + objStr + ";\nimgAry.forEach(function(obj){\n    if(obj.img.path){\n        obj.template=images.read(obj.img.path);\n    };\n    if(obj.img.base64){\n        obj.template=images.fromBase64(obj.img.base64);\n    };\n});\nwhile(1){\n    let img=captureScreen();\n    for(let i in imgAry){\n        let obj=imgAry[i];\n        let p=images.findImage(img,obj.template,obj.options);\n        if(p){\n            click(obj.p.x,obj.p.y);\n        };\n    };\n    img.recycle();\n};";
        var str = "auto();\nif (!requestScreenCapture()) {\n    toast(\"请求截图失败\");\n    exit();\n};\nvar imgAry=" + objStr + ";\nimgAry.forEach(function(obj){\n    if(obj.img.path){\n        obj.template=images.read(obj.img.path);\n    };\n    if(obj.img.base64){\n        obj.template=images.fromBase64(obj.img.base64);\n    };\n});";
        if (isSaveToDir) {
            files.write(files.join(saveToDir, "/main.js"), str);
            toastLog("已保存文件" + findImageCount);
        } else {
            setClip(str);
            toastLog("已生成代码" + findImageCount);
        };
    } else {
        toastLog("没有");
    };
};



//json.toString****将生成的表达式字符串化输出。
//别问我为什么不用JSON.stringify因为需要对字符串进行处理。
function Disassembly(A) {
    switch (typeof(A)) {
        case "object":
            var ary = new Array;
            if (Array.isArray(A)) {
                for (var i in A) {
                    ary.push(arguments.callee(A[i]));
                };
                return "[" + ary.join(",") + "]";
            } else {
                for (var i in A) {
                    ary.push(i + ":" + arguments.callee(A[i]));
                };
                return "{" + ary.join(",") + "}";
            };
            break;
        case "function":
            return A.toString();
            break;
        case "string":
            return String(A);
            break;
        default:
            return String(A);
    };
};




window.canvas.post(function() {
    let v = window.canvas;
    //var rect=new android.graphics.Rect;
    //ui.canvas.getBoundsOnScreen(canvasRect);
    let w = v.getWidth(),
        h = v.getHeight();
    canvasRect.set(new android.graphics.RectF(0, 0, w, h));
    if (MainImg) {
        imageRect.set(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()));
        canvasMatrix.setRectToRect(imageRect, canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
    };
    ASX.maxPointsListener();
});



window.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.drawARGB(255, 127, 127, 127)
    if (MainImg) {
        let scale = ASX.getScaling();
        let strokeWidth = 5 / scale;
        let TextSize = 75 / scale;
        let radius = 50 / scale;
        paint.setStrokeWidth(strokeWidth); //画笔边缘宽度
        paint1.setStrokeWidth(strokeWidth); //画笔边缘宽度
        paint2.setStrokeWidth(strokeWidth); //画笔边缘宽度
        paint.setTextSize(TextSize);
        paint1.setTextSize(TextSize);
        paint2.setTextSize(TextSize);
        //canvas.drawImage(MainImg, 0, 0, paint1);
        //canvas.setMatrix(canvasMatrix);
        canvas.setMatrix(ASX.matrix);
        // let matrix = canvas.getMatrix();
        //绘制背景色
        // matrix.postConcat(ASX.matrix);
        //canvas.setMatrix(matrix);

        canvas.drawImage(MainImg, 0, 0, paint);
        //图片宽高。
        canvas.drawText("w: " + MainImg.getWidth(), MainImg.getWidth(), MainImg.getHeight(), paint2);
        canvas.drawText("h: " + MainImg.getHeight(), MainImg.getWidth(), MainImg.getHeight() + TextSize, paint2);
        //绘制区域
        canvas.drawRect(imageRect, paint);
        canvas.drawText("w: " + Math.abs(imageRect.width()), imageRect.right, imageRect.bottom, paint2);
        canvas.drawText("h: " + Math.abs(imageRect.height()), imageRect.right, imageRect.bottom + TextSize, paint2);
        canvas.drawText("x: " + Math.abs(imageRect.left), imageRect.left, imageRect.top - TextSize, paint2);
        canvas.drawText("y: " + Math.abs(imageRect.top), imageRect.left, imageRect.top, paint2);
        canvas.drawPoint(imageRect.left, imageRect.top, paint1);
        canvas.drawPoint(imageRect.left, imageRect.bottom, paint1);
        canvas.drawPoint(imageRect.right, imageRect.top, paint1);
        canvas.drawPoint(imageRect.right, imageRect.bottom, paint1);
        canvas.drawCircle(imageRect.left, imageRect.top, radius, paint1);
        canvas.drawCircle(imageRect.left, imageRect.bottom, radius, paint1);
        canvas.drawCircle(imageRect.right, imageRect.top, radius, paint1);
        canvas.drawCircle(imageRect.right, imageRect.bottom, radius, paint1);

        canvas.setMatrix(new android.graphics.Matrix);
        paint2.setStrokeWidth(5); //画笔边缘宽度
        paint2.setTextSize(75);
        //图像缩放比率
        //canvas.drawText(String(Math.floor(scale * 100) / 100), 0, 75, paint2);
        //找图数组数量
        canvas.drawText(String(findImageCount), 0, 75, paint2);


    } else {
        canvas.drawText("请打开一个图片", 0, h / 2, paint1);
    };
});

//可以用两只手指移动缩放图像。
var touchControlPoint;
window.canvas.setOnTouchListener(new android.view.View.OnTouchListener(function(view, event) {
    try {
        let W = view.getWidth();
        let H = view.getHeight();
        let PC = event.getPointerCount();
        switch (event.getActionMasked()) {
            case event.ACTION_MOVE:
                try {
                    if (touchControlPoint) {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            let XYary = ASX.matrixPoints(ASX.invertMatrix, [x, y]);
                            setRectXY(imageRect, touchControlPoint, XYary[0], XYary[1]);
                            //break;
                        };
                    };

                } catch (e) {
                    throw "MOVE " + e;
                };


                break;
            case event.ACTION_CANCEL:
                toast("触摸被系统拦截\n可能是三指截屏等功能");

                break;
            case event.ACTION_OUTSIDE:
                log("OUTSIDE");

                break;
            default:
                let I = event.getActionIndex();
                let ID = event.getPointerId(I);
                let X = event.getX(I);
                let Y = event.getY(I);
                switch (event.getActionMasked()) {
                    case event.ACTION_DOWN:
                        try {
                            //log("down");
                            //当有新的手指按下时使坐标差为零。
                            let scale = ASX.getScaling();
                            let touchRadius = 50 / scale;
                            let XYary = ASX.matrixPoints(ASX.invertMatrix, [X, Y]);
                            let resAry = isRectXY(imageRect, XYary[0], XYary[1], touchRadius);
                            //log(resAry);
                            if (resAry) {
                                touchControlPoint = resAry;
                            };
                        } catch (e) {
                            throw "DOWN " + e;
                        };
                        break;
                    case event.ACTION_UP:
                        //最后一个手指抬起。
                        //log("up");
                        touchControlPoint = undefined;

                        break;
                    case event.ACTION_POINTER_DOWN:

                        break;
                    case event.ACTION_POINTER_UP:
                        break;
                };
        };
    } catch (e) {
        throw "imgTouch: " + e;
    };
    if (touchControlPoint) {
        return true;
    };

    return ASX.touchListener(view, event);

}));

function setRectXY(rect, idAry, x, y) {
    x = sinon(Math.floor(x - idAry[1]), 0, MainImg.getWidth());
    y = sinon(Math.floor(y - idAry[2]), 0, MainImg.getHeight());
    //log(x,y);
    switch (idAry[0]) {
        case 0:
            if (rect.right != x && rect.bottom != y) {
                rect.left = x;
                rect.top = y;
            };
            break;
        case 1:
            if (rect.left != x && rect.bottom != y) {
                rect.right = x;
                rect.top = y;
            };
            break;
        case 2:
            if (rect.right != x && rect.top != y) {
                rect.left = x;
                rect.bottom = y;
            };
            break;
        case 3:
            if (rect.left != x && rect.top != y) {
                rect.right = x;
                rect.bottom = y;
            };
            break;
    };
};

function sinon(a, b, c) {
    return (a >= b && a < c) ? a : (a >= b ? c : b);
};


function isRectXY(rect, x, y, r) {
    let x1 = x - rect.left,
        y1 = y - rect.top,
        x2 = x - rect.right,
        y2 = y - rect.bottom;

    if (weiyi([x1, y1]) <= r) {
        return [0, Math.floor(x1), Math.floor(y1)];

    } else if (weiyi([x2, y1]) <= r) {
        return [1, Math.floor(x2), Math.floor(y1)];

    } else if (weiyi([x1, y2]) <= r) {
        return [2, Math.floor(x1), Math.floor(y2)];

    } else if (weiyi([x2, y2]) <= r) {
        return [3, Math.floor(x2), Math.floor(y2)];
    };

    return null;
};



function getTimeString() {
    return new java.text.SimpleDateFormat("yyyy_MM_dd_HH:mm:ss").format(new Date());
}


function selectFile(Apath, Bpath, filter) {
    /*
    *Apath: string 初始路径。可以不填或为null 例如： null  "/sdcard"  "/sdcard/脚本" 
    *Bpath: string 子路经。可以不填或为null 例如： null  "/DCIM"  "/脚本/文件夹"
    *filter: function 过滤函数。 可以不填或为null 例如： null 
           参数： 文件夹  文件名
           返回： true 或者 false
    **可能的返回值： undefined 没有返回值。
                  java.io.File  文件对象。对象值： name path parent
    **可能的报错：初始路径和子路径不存在的错误。
    */
    importClass(java.io.FilenameFilter);
    importClass(java.io.FileFilter);
    importClass(java.io.File);

    Apath = Apath || "/sdcard";
    var Afile = new File(Apath);
    if (!Afile.exists()) {
        throw ">" + Apath + "<不存在";
    };

    Bpath = Bpath ? Apath + Bpath : Apath;
    var Bfile = new File(Bpath);
    if (!Bfile.exists()) {
        throw ">" + Bpath + "<不存在";
    };

    filter = filter || function() {
        return true;
    };

    var fileFilter = new FileFilter({
        accept: function(file) {
            return filter(file.parent, file.name);
        }
    });

    return main(Bfile);

    function main(Bfile) {
        var fileList = Bfile.listFiles(fileFilter).sort();
        var ary = fileList.map(function(file) {
            return file.name;
        });
        if (ary.length) {
            ary.unshift("返回上一层");
        } else {
            ary = ["返回上一层"];
        };
        var i = dialogs.singleChoice("选择文件\n" + Bfile.path, ary);
        if (i >= 0) {
            if (i) {
                var newFile = fileList[i - 1];
                if (newFile.isDirectory()) {
                    return arguments.callee(newFile);
                } else {
                    if (dialogs.confirm("确定文件？", newFile.name)) {
                        return newFile;
                    } else {
                        return arguments.callee(Bfile);
                    }
                }
            } else {
                var parentFile = Bfile.getParentFile();
                if (Bfile.path != Afile.path) {
                    return arguments.callee(parentFile);
                };
            };
        };
    };
};

function selectFolder(Apath, Bpath) {
    Bpath = Bpath || "";
    var path = files.join(Apath, Bpath);
    var a = files.listDir(path, function(name) {
        return files.isDir(files.join(path, name));
    }).sort();
    if (!a.length) {
        var ary = Bpath.split("/");
        if (ary.length && Bpath.length) {
            ary.pop();
            return arguments.callee(Apath, ary.join("/"));
        };
    };
    a = a.join("/").split("/");
    a.unshift("返回上一层");
    i = dialogs.singleChoice(path, a);
    if (i >= 0) {
        if (i) {
            dir = a[i];
            path = files.join(path, dir);
            if (dialogs.confirm("确定文件夹？", dir)) {
                return path;
            } else {
                return arguments.callee(Apath, files.join(Bpath, dir));
            }
        } else {
            var ary = Bpath.split("/");
            if (ary.length && Bpath.length) {
                ary.pop();
                return arguments.callee(Apath, ary.join("/"));
            };
        };
    };
};


function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};


function getsd(s, ary) {
    //将数组内所有值的平方和开方等于s
    var sum = weiyi(ary);
    var S = (s / sum) || 0;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function weiyi(ary) {
    //数组所有值平方和开方
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    //数学二维坐标系xy,输入角度。
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return [x, y];
};

function ydfx(ary) {
    //数学二维坐标系xy,返回角度。
    var ary = getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};


function windowGXY(x, y, k) {
    x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
    y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
    return {
        x: x,
        y: y
    };
};

function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj;
    }
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
};



function 悬浮控制(window, windowid, ar) {
    this.Orientation = context.resources.configuration.orientation;
    this.Width = this.Orientation == 1 ? device.width : device.height;
    this.Height = this.Orientation == 2 ? device.width : device.height;
    this.isAutoIntScreen = true;
    this.Click = function() {};
    this.Move = function() {};
    this.LongClick = function() {};
    this.setClick = (fun) => {
        fun = fun || function() {};
        this.Click = fun;
    };
    this.setMove = (fun) => {
        fun = fun || function() {};
        this.Move = fun;
    };
    this.setLongClick = (fun, ji) => {
        fun = fun || function() {};
        this.LongClick = fun;
        if (parseInt(ji)) {
            this.Tjitime = parseInt(ji) / 50;
        };
    };
    setInterval(() => {
        if (context.resources.configuration.orientation != this.Orientation) {
            this.Orientation = context.resources.configuration.orientation;
            this.Width = this.Orientation == 1 ? device.width : device.height;
            this.Height = this.Orientation == 2 ? device.width : device.height;
            var xy = this.windowGXY(window.getX(), window.getY(), this.G(window));
            this.windowyidong([
                [window.getX(), window.getY()],
                [xy.x, xy.y]
            ]);
        };
    }, 100);
    this.TX = 0;
    this.TY = 0;
    this.Tx = 0;
    this.Ty = 0;
    this.Tyidong = false;
    this.Tkeep = false;
    this.Tjitime = 12;
    this.Ttime = 0;
    setInterval(() => {
        if (this.Tkeep) {
            this.Ttime++;
            if (!this.Tyidong && this.Ttime > this.Tjitime) {
                //非移动且按下时长超过1秒判断为长按
                this.Tkeep = false;
                this.Ttime = 0;
                this.LongClick();
            };
        };
    }, 50);
    if (windowid) {
        windowid.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
            this.Move(view, event);
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    this.Tx = event.getRawX();
                    this.Ty = event.getRawY();
                    this.TX = window.getX();
                    this.TY = window.getY();
                    this.Tkeep = true; //按下,开启计时
                    break;
                case event.ACTION_MOVE:
                    var sx = event.getRawX() - this.Tx;
                    var sy = event.getRawY() - this.Ty;
                    if (!this.Tyidong && this.Tkeep && this.weiyi(sx, sy) >= 10) {
                        this.Tyidong = true;
                    };
                    if (this.Tyidong && this.Tkeep) {
                        window.setPosition(this.TX + sx, this.TY + sy);
                    };
                    break;
                case event.ACTION_UP:
                    if (!this.Tyidong && this.Tkeep && this.Ttime < 7) {
                        this.Click();
                    };
                    this.Tkeep = false;
                    this.Ttime = 0;
                    if (this.Tyidong) {
                        if (this.isAutoIntScreen) {
                            threads.start(new java.lang.Runnable(() => {
                                this.windowyidong(this.IntScreen());
                            }));
                        } else {
                            threads.start(new java.lang.Runnable(() => {
                                this.windowyidong(this.ViewIntScreen());
                            }));

                        };
                        this.Tyidong = false;
                    };
                    break;
            };
            return true;
        }));
    };
    this.G = (win, view) => {
        //返回悬浮窗的坐标范围。
        var K = 36, //悬浮窗的隐形边矩
            H = 66, //手机通知栏的高度
            D = 100; //虚拟按键的高度。(大概)

        var ary;
        if (!ar) {
            if (view) {
                ary = [
                    [-view.getX(), -view.getY()],
                    [this.Width - (view.getX() + view.getWidth()), this.Height - (view.getY() + view.getHeight()) - H - K - D]
                ];

            } else {
                ary = [
                    [0, 0],
                    [this.Width - win.getWidth() + K * 2, this.Height - win.getHeight() - H + K * 2 - D]
                ];
            }
        } else {
            if (view) {
                ary = [
                    [-view.getX(), H - view.getY()],
                    [this.Width - (view.getX() + view.getWidth()), this.Height - (view.getY() + view.getHeight()) - D]
                ];

            } else {
                ary = [
                    [0, H],
                    [this.Width - win.getWidth(), this.Height - win.getHeight() - D]
                ];
            }
        };
        return ary;
    };
    this.weiyi = function() { //平方和开方
        var num = 0;
        for (var i = 0; i < arguments.length; i++) {
            num += arguments[i] * arguments[i];
        };
        return Math.round(Math.sqrt(num) * 1000) / 1000
    };
    this.windowGXY = function(x, y, k) {
        //修正坐标的所在范围。如果坐标超出了范围，则修正回来。
        x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
        y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
        return {
            x: x,
            y: y
        };
    };
    this.windowyidong = (A, s, w) => {
        //移动悬浮窗的动画效果。
        w = w || window;
        s = s || 10;
        var sx = A[1][0] - A[0][0],
            sy = A[1][1] - A[0][1];
        var sd = this.weiyi(sx, sy) / s;
        var X = sx / sd,
            Y = sy / sd;
        var x = 0,
            y = 0;
        for (var i = 0; i < sd; i++) {
            x += X;
            y += Y;
            sleep(1);
            w.setPosition(A[0][0] + x, A[0][1] + y);
        };
        w.setPosition(A[1][0], A[1][1]);
    };
    this.OutScreen = () => {
        //算出最短的距离到达屏幕之外。
        var F = this.G(window);
        var x = window.getX(),
            y = window.getY();
        var sx = window.getX() + window.getWidth() / 2,
            sy = window.getY() + window.getHeight() / 2;
        var cx = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? (sx < this.Width / 2 ? (F[0][0] - window.getWidth()) : (F[1][0] + window.getWidth())) : x,
            cy = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? y : (sy < this.Height / 2 ? (F[0][1] - window.getHeight()) : (F[1][1] + window.getHeight()));
        return [
            [x, y],
            [device.width, device.height]
        ];
    };
    this.toScreenEdge = (d) => {
        //返回到屏幕边缘的坐标。d为浮点数0.1~1之间。
        d = d || 0;
        var F = this.G(window);
        var x = window.getX(),
            y = window.getY();
        var sw = window.getWidth() * d;
        var sx = window.getX() + window.getWidth() / 2,
            sy = window.getY() + window.getHeight() / 2 + 66;
        var cx = sx < (this.Width - sx) ? -sw : (this.Width + sw - window.getWidth());
        return [
            [x, y],
            [cx, y]
        ];
    };
    this.centerXY = (F) => {
        //返回距离中心位置的一个方形两个坐标。
        var w = window.getWidth();
        var h = window.getHeight();
        return [
            [F[0] + w / 2, F[1] + h / 2],
            [F[0] - w / 2, F[1] - h / 2]
        ];
    };
    this.IntScreen = () => {
        //当悬浮超出屏幕之外之后进入的坐标。
        var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
        return [
            [window.getX(), window.getY()],
            [A.x, A.y]
        ];
    };
    this.ViewIntScreen = () => {
        //当悬浮超出屏幕之外之后进入的坐标。
        var A = this.windowGXY(window.getX(), window.getY(), this.G(window, windowid));
        return [
            [window.getX(), window.getY()],
            [A.x, A.y]
        ];
    };
    threads.start(new java.lang.Runnable(() => {
        this.windowyidong(this.IntScreen());
    }));
};






function XYToMatrix(matrix, maxPoints) {
    //通过多点触控来设置matrix从而来缩放图像。
    //第2个参数。最大的手指数量。手指数量超过之后matrix将初始化。
    this.originalMatrix = matrix || new android.graphics.Matrix;
    this.matrix = new android.graphics.Matrix(this.originalMatrix);
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
        canvasMatrix.setRectToRect(imageRect, canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);

        this.matrix = new android.graphics.Matrix(this.originalMatrix);
        //this.invertMatrix = new android.graphics.Matrix;
        this.matrix.invert(this.invertMatrix);

    };
    this.Touch = {
        Matrix: this.matrix,
        PointStart: new Array,
        PointCurrent: new Array,

    };
    //new android.view.View.OnTouchListener();
    this.touchListener = (view, event) => {
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
                    let I = event.getActionIndex();
                    let ID = event.getPointerId(I);
                    let X = event.getX(I);
                    let Y = event.getY(I);
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            try {
                                //log("down");
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
                            //log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            //log("POINTER_DOWN");
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
                            //log("POINTER_UP");
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


};


function 加载图片(A) {
    if (files.isFile(A)) {
        return images.read(A);
    };
    return null;
};








function 媒体库选择(fun) {
    ui.run(function() {
        var ctx = activity;
        var window = new android.widget.PopupWindow();
        var view = XmlToView(
            <vertical padding="5">
                        <text text="选择图片" textSize="25sp" gravity="center"/>
                        <list id="list" w="*">
                            <vertical w="*" margin="5" bg={colors.toString(colors.GRAY)} gravity="center">
                                <img w="auto" h="auto" margin="6" src="file://{{filePath}}"/>
                                <text w="*" h="25" margin="2" text="{{title}}" textSize="20sp" line="1"  margin="5" gravity="center"/>
                            </vertical>
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
        window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.LTGRAY));
        window.setFocusable(true);
        window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, -1, -1);
    });
};





function XmlToView(xml) {
    runtime.ui.layoutInflater.setContext(context);
    return runtime.ui.layoutInflater.inflate(xml.toXMLString().toString(), null, true);
};



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
            //sleep(100);
        };
        cursor.moveToPrevious();

    }
    return Ary;
};