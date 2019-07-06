



//定义悬浮窗控制模块，命名为(悬块)。
function 悬块(window, view) {
    //判断是否缺少构造参数。
    if (!window || !view) {
        //缺少构造参数，抛出错误。
        throw "缺参数";
    };
    //记录按键被按下时的触摸坐标
    this.x = 0, this.y = 0;
    //记录按键被按下时的悬浮窗位置
    this.windowX, this.windowY;
    //按下时长超过此值则执行长按等动作
    this.downTime = 500;
    //记录定时执行器的返回id
    this.Timeout = 0;
    //创建点击长按事件
    this.Click = function() {};
    this.LongClick = function() {};
    //可修改点击长按事件
    this.setClick = function(fun) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.Click = fun;
        };
    };
    this.setLongClick = function(fun, ji) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.LongClick = fun;
            //判断参数是否可为设置数字？
            if (parseInt(ji) <= 1000) {
                this.downTime = parseInt(ji);
            };
        };
    };

    view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        //判断当前触控事件，以便执行操作。
        switch (event.getAction()) {
            //按下事件。
            case event.ACTION_DOWN:
                //按下记录各种坐标数据。
                this.x = event.getRawX();
                this.y = event.getRawY();
                this.windowX = window.getX();
                this.windowY = window.getY();
                //创建一个定时器用来定时执行长按操作。
                this.Timeout = setTimeout(() => {
                    this.LongClick();
                    this.Timeout = 0;
                }, this.downTime);
                return true;
                //移动事件。
            case event.ACTION_MOVE:
                //移动距离过大则判断为移动状态
                if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                    //移动状态清除定时器
                    if (this.Timeout) {
                        //定时器存在则清除定时器。
                        clearTimeout(this.Timeout);
                        this.Timeout = 0;
                    };
                    //移动手指时调整悬浮窗位置
                    window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
                };
                return true;
                //抬起事件。
            case event.ACTION_UP:
                if (this.Timeout) {
                    //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                    //清除定时器。
                    clearTimeout(this.Timeout);
                    this.Timeout = 0;
                    //执行点击事件。
                    this.Click();
                };
                return true;
        };
        //控件的触控事件函数必须要返回true。否则报错。
        return true;
    }));
};



auto();
console.show();
launchApp("QQ");

log("开始");


//创建并生成一个悬浮窗。
var window = floaty.window(
    <vertical >
        <button  id="but_x"w="*" layout_weight="1" text="选图"/>
        <button  id="but" w="*" layout_weight="1" text="开始"/>
    </vertical>
);
//        <button  id="but_d"w="*" layout_weight="1" text="读取"/>

//输出提示信息。
toastLog("长按悬浮窗关闭本脚本");
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => {}, 500);
//声明一个变量用来控制线程。
var thread = null;
var path;

//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var ad = new 悬块(window, window.but);
//设置长按事件。
ad.setLongClick(function() {
    //输出气泡信息。
    toast("脚本已关闭");
    //脚本停止代码。
    exit();
});
//设置点击事件。
ad.setClick(function() {
    //输出气泡信息。
    toast("点击");
    //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
    if (thread ? !thread.isAlive() : true) { //线程没有运行。
        ui.run(() => {
            //在ui线程中修改按钮的文字
            window.but.setText("停止");
        });
        //新建一个线程，赋值给变量thread
        thread = threads.start(function() {
            try {
                Main();
            } catch (e) {
                toastLog(e);
            };
            //运行完毕修改按钮文字
            ui.run(() => {
                //在ui线程中修改按钮的文字
                window.but.setText("开始");
            });
        });
    } else {
        thread.interrupt();
        //中断线程;
        ui.run(() => {
            //在ui线程中修改按钮的文字
            window.but.setText("开始");
        });
    };
});

window.but_x.click(function() {
    threads.start(function() {
        switch (dialogs.select("选择方式", ["媒体库", "文件"])) {
            case 0:
                var photosPath = getPhotosInfo(5).map(function(obj) {
                    return obj.filePath;
                });
                let i = dialogs.select("选择", photosPath);
                if (i + 1) {
                    path = photosPath[i];
                    toastLog("已选");
                };
                break;
            case 1:
                let p = selectFile("/sdcard/", "", function(name) {
                    return name.endsWith(".jpg") || name.endsWith(".png") || files.isDir(files.join("/sdcard", name));
                });
                if (p) {
                    path = p;
                    toastLog("已选");
                };
                break;
        };
    });
});


toast("finish");



function Main() {
    //这里是主要运行的内容
    if (path) {
        draw(path);
    } else {
        toastLog("未选图片");
    };
};


function draw(path) {
    var img = images.read(path);
    img = images.resize(img, [128], "LANCZOS4");

    img = images.grayscale(img)
    img = images.adaptiveThreshold(img, 200, "MEAN_C", "BINARY", 25, 10);
    img = images.adaptiveThreshold(img, 200, "MEAN_C", "BINARY", 3, 3);
    //img = images.scale(img, 0.3, 0.3)
    var bitmap = img.getBitmap();
    var img_w = bitmap.getWidth();
    var img_h = bitmap.getHeight();
    var pixels = util.java.array("int", img_w * img_h);
    bitmap.getPixels(pixels, 0, img_w, 0, 0, img_w, img_h);
    //  log(pixels)
    笔画 = 画图(pixels, img_w, img_h)
    //log(笔画)
    //toastLog("图片读取完成,请打开涂鸦界面点击画画")



    /*
    img = images.grayscale(img);
    img = images.adaptiveThreshold(img, 200, "MEAN_C", "BINARY", 25, 10);
    img_w = img.getWidth()
    img_h = img.getHeight()
    img = images.rotate(img, 0);
    */
    /*
    if (Boolean(mode)) {
        img = images.inRange(img, colors.rgb(0, 0, 0), colors.rgb(threshold, threshold, threshold)) //越大越暗
    } else {
        img = images.inRange(img, colors.rgb(threshold, threshold, threshold), colors.rgb(255, 255, 255)) //越大越暗
    }
    for (var i = 0; i < length - 1; i++) {
        img_l = images.concat(img_l_o, img_l, "TOP")
    }
    img = images.concat(img, img_l)
    */

    //images.save(img, "./img1.png");
    //media.scanFile("./img1.png");
    log("img", img_w, img_h);
    //exit();

    //board = className("android.view.View").depth(9).findOne();
    board = getUiObj(device.width/2,device.height-device.width/2);
    log("ui");
    rect = board.bounds();

    //rect = new android.graphics.Rect(0, 500, 1000, 1500);
    rect_w = rect.width()
    rect_h = rect.height()
    rect_l = rect.left
    rect_t = rect.top
    log(rect_l,rect_t,rect_w,rect_h);
    for (let i in 笔画) {
        /*
        for (let j = 0; j < 笔画[i].length - 1; j += 2) {
            swipe(笔画[i][j][0] * bs + 10, 笔画[i][j][1] * bs + 765, 笔画[i][j + 1][0] * bs + 10, 笔画[i][j + 1][1] * bs + 765, 11)
            // log(笔画[i][j][0] * 1, 笔画[i][j][1] * 1 , 笔画[i][j + 1][0] * 1, 笔画[i][j + 1][1] * 1 , 1)
            sleep(1)
        }
        */
        for (let j = 0; j < 笔画[i].length - 1; j += 2) {
            let x = 笔画[i][j] / img_w * rect_w + rect_l,
                y = 笔画[i][j + 1] / img_h * rect_h + rect_t;
            if (j != 0) {
                let x1 = 笔画[i][j - 2] / img_w * rect_w + rect_l,
                    y1 = 笔画[i][j - 1] / img_h * rect_h + rect_t;
                swipe(x1, y1, x, y, 2);
                // sleep(10);
            };
        };
        //sleep(1000);
    }

    toastLog("完成");


    return;
    if (colors.isSimilar(color, "#ff000000")) {};
}




function line(ox, oy, x, y) {
    var k = img_h / img_w
    var sizeX = 0.8
    var sizeY = 0.9
    if (k > 1) {
        sizeX = sizeX / k
    } else {
        sizeY = sizeY * k
    }
    ox = (ox - 0.5) * sizeX + 0.5
    oy = (oy - 0.5) * sizeY + 0.5
    x = (x - 0.5) * sizeX + 0.5
    y = (y - 0.5) * sizeY + 0.5
    swipe(ox * rect_w + rect_l, oy * rect_h + rect_t, x * rect_w + rect_l, y * rect_h + rect_t, 1)
}

function changeColor(n) {
    colorBoard.child(n).click()
}



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




function 画图(内容, w, h) {
    var rect = new android.graphics.Rect(0, 0, w - 1, h - 1);

    var 笔画和 = new Array;
    //-3618616, -16777216
    fx = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ]
    for (let i = 0; i < 内容.length; i++) {
        if (内容[i] == -16777216) {
            x = i % w
            y = parseInt(i / w)
            查找(null, x, y);
        }
    }

    function 查找(笔画, x, y) {
        笔画 = 笔画 || new Array;
        内容[w * y + x] = 0;
        //笔画.push(x, y);
        addPoint(笔画, x, y);
        let kg=false;
        for (let a = 0; a < 4; a++) {
            let x1 = x + fx[a][0],
                y1 = y + fx[a][1];
            if (rect.contains(x1, y1)) {
                let ys = 内容[w * y1 + x1];
                if (ys == -16777216) {
                    if(!kg){
                    查找(笔画,x1,y1);
                    kg=true;
                    }else{
                    查找(null,x1,y1);
                    };
                };
            };
        };
        if(笔画.length>2&&!kg){
            //addPoint(笔画, 笔画[笔画.length - 1], 笔画[笔画.length - 2], true);
            笔画和.push(笔画);
        };
    };
    return 笔画和;
};



function addPoint(strokePoints, X, Y, isEnd, Corner, Distance) {
    Corner = Corner || 15;
    Distance = Distance || 10;
    //X = Math.floor(X);
    //Y = Math.floor(Y);
    if (strokePoints.length / 2 > 1) {
        let x1 = strokePoints[strokePoints.length - 4];
        let y1 = strokePoints[strokePoints.length - 3];
        let x2 = strokePoints[strokePoints.length - 2];
        let y2 = strokePoints[strokePoints.length - 1];
        let FR1 = ydfx([x2 - x1, y2 - y1]);
        let FR2 = ydfx([X - x2, Y - y2]);
        if (Math.abs(FR2 - FR1) >= Corner) {
            if (weiyi([x2 - x1, y2 - y1]) >= Distance) {

                if (!isEnd) {
                    strokePoints.push(X, Y);
                } else {
                    strokePoints[strokePoints.length - 2] = X;
                    strokePoints[strokePoints.length - 1] = Y;
                };

            } else {
                if (!isEnd) {
                    strokePoints[strokePoints.length - 2] = X;
                    strokePoints[strokePoints.length - 1] = Y;
                } else {
                    strokePoints[strokePoints.length - 4] = X;
                    strokePoints[strokePoints.length - 3] = Y;
                    strokePoints.pop();
                    strokePoints.pop();
                };
            };
        } else {
            if (weiyi([x2 - x1, y2 - y1]) >= Distance) {
                strokePoints[strokePoints.length - 2] = X;
                strokePoints[strokePoints.length - 1] = Y;

            } else {
                if (!isEnd) {
                    strokePoints[strokePoints.length - 2] = X;
                    strokePoints[strokePoints.length - 1] = Y;
                } else {
                    strokePoints[strokePoints.length - 4] = X;
                    strokePoints[strokePoints.length - 3] = Y;
                    strokePoints.pop();
                    strokePoints.pop();
                };
            };
        };
    } else {
        strokePoints.push(X, Y);
    };
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
    }).find().sort(function(A,B){
        AR=A.bounds();
        BR=B.bounds();
        return BR.width()*BR.height()-AR.width()*AR.height();
        
    });
    /*
    uiObj_ary.forEach(function(uiObj){
        log(uiObj.bounds());
        
    });
    */
    return uiObj_ary[uiObj_ary.length-1];

};
