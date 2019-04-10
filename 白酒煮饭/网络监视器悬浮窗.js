TrafficStats = android.net.TrafficStats;
importClass(android.graphics.Paint);
Canvas = android.graphics.Canvas;
importClass(android.graphics.Bitmap);
//console.show();
bw=200;
//exit();
function textpaint(str) {
    str = str.split("\n");
   
    bh=126*(bw/200);
    var bitmap = Bitmap.createBitmap(bw, bh, Bitmap.Config.ARGB_8888);
    var canvas = new Canvas(bitmap);
    canvas.drawARGB(122, 0, 0, 0);
    var paint = new Paint();
    /*血条*/
var gsll=sgz(ozsx());
//log(JSON.stringify(gsll));
var hang,lie;
var sh=1;
var hjb=1;
if(bw/200>2){
hjb=parseInt((bw/200)*2);
}

hang=parseInt(gsll.by/bw)*hjb;
lie=(gsll.by%bw)*bw;
paint.setARGB(255,0,255,0);//绿色画笔
if(hang!=0){
canvas.drawRect(0,sh,bw,sh+hang,paint);
}
canvas.drawRect(0,sh+hang,lie,sh+hang+hjb,paint);//绘制直线
sh+=(parseInt(1024/bw)+1)*hjb;


hang=parseInt(gsll.Kb/bw)*hjb;
lie=gsll.Kb%bw;
paint.setARGB(255,255,0,0);//红色画笔
if(hang!=0){
canvas.drawRect(0,sh,bw,sh+hang,paint);
}
canvas.drawRect(0,sh+hang,lie,sh+hang+hjb,paint);//绘制直线
sh+=(parseInt(1024/bw)+1)*hjb;


hang=parseInt(gsll.Mb/bw)*hjb;
lie=gsll.Mb%bw;
paint.setARGB(255,0,0,255);//蓝色画笔
if(hang!=0){
canvas.drawRect(0,sh,bw,sh+hang,paint);
}
canvas.drawRect(0,sh+hang,lie,sh+hang+hjb,paint);//绘制直线
sh+=(parseInt(1024/bw)+1)*hjb;


hang=parseInt(gsll.Gb/bw)*hjb;
lie=gsll.Gb%bw;
paint.setARGB(255,255,128,0);//橙色画笔
if(hang!=0){
canvas.drawRect(0,sh,bw,sh+hang,paint);
}
canvas.drawRect(0,sh+hang,lie,sh+hang+hjb,paint);//绘制直线
sh+=(parseInt(1024/bw)+1)*hjb;


    /*血条*/
    /*绘字*/
    paint.setARGB(255, 0, 255, 0);
    paint.setTextSize(22*(bw/200));
    for (i = 0; i < str.length; i++) {
        paint.setARGB(255, 0, 255, 0);
        canvas.drawText(str[i], 0, i * 24*(bw/200) + 46*(bw/200), paint);
    }
/*绘字*/

    canvas.save(Canvas.ALL_SAVE_FLAG);
    canvas.restore();

    return bitmap;
}



var window = floaty.window(
    <frame>
        <vertical>
            
            <img id="img" w="auto" h="auto"/>
            
        </vertical>
    </frame>
);

var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.img.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置

            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));

            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                threads.start(function() {
                    //onClick();
                });
            }
            return true;
    }
    return true;
});
str = "";
zss = ozs();
zxs = ozx();

swsl = 0;
swxl = 0;
zwss = 0;
zwxs = 0;
threads.start(function() {
    swsl = ozs();
    swxl = ozx();
    while (true) {
        sleep(1000);
        xwsl = ozs();
        xwxl = ozx();
        zwss = xwsl - swsl;
        zwxs = xwxl - swxl;
        swsl = xwsl;
        swxl = xwxl;
    }

});
//log(Object.keys(window.img).sort());


wdgx();

function ksgx() {
    window.img.post(threads.start(function() {
        threads.start(function() {
            while (true) {
                str = "流量↑:" + sz(lzs()) +
                    "\n流量↓:" + sz(lzx()) +
                    "\n网速↑:" + sz(zwss) + "\/s" +
                    "\n网速↓:" + sz(zwxs) + "\/s";
                tu = textpaint(str);
                window.img.setImageBitmap(tu);
            }
        });
    }));
}




function wdgx() {
    threads.start(function() {
        while (true) {
            str = "流量↑:" + sz(lzs()) +
                "\n流量↓:" + sz(lzx()) +
                "\n网速↑:" + sz(zwss) + "\/s" +
                "\n网速↓:" + sz(zwxs) + "\/s";
            tu = textpaint(str);
            ui.run(function() {
                window.img.setImageBitmap(tu);
            });
            
        }
    });
}




function onClick() {
    threads.start(function() {
        var mFile = new java.io.File("sdcard/Screenshot/Screenshot_" + new Date().getTime() + ".png");
        var mFileOutputStream = new java.io.FileOutputStream(mFile);
        pic = textpaint(str);
        pic = Bitmap.createBitmap(pic, //原图
            0, //图片裁剪横坐标开始位置
            0, //图片裁剪纵坐标开始位置
            1, //要裁剪的宽度
            1); //要裁剪的高度
        pic.compress(Bitmap.CompressFormat.PNG, 100, mFileOutputStream);
    });
}

function ozs(){
return TrafficStats.getTotalTxBytes();
}

function ozx() {
    return TrafficStats.getTotalRxBytes();
}
function ozsx() {
    return TrafficStats.getTotalTxBytes()+TrafficStats.getTotalRxBytes();
}

function lzs() {
    return ozs() - zss;
}

function lzx() {
    return ozx() - zxs;
}



function sz(num) { //数据单位转换
    if (num < 1024) {
        return num.toFixed(2) + "by";
    } else {
        num /= 1024
    }
    if (num < 1024) {
        return num.toFixed(2) + "Kb";
    } else {
        num /= 1024
    }
    if (num < 1024) {
        return num.toFixed(2) + "Mb";
    } else {
        num /= 1024
    }
    if (num < 1024) {
        return num.toFixed(2) + "Gb";
    } else {
        num /= 1024
    }
    if (num < 1024) {
        return num.toFixed(2) + "Tb";
    } else {
        num /= 1024
    }
    if (num < 1024) {
        return num.toFixed(2) + "Pb";
    } else {
        num /= 1024
    }
    return num.toFixed(2) + "Eb";
}
function sgz(num2){//流量数据转换格式
var gsj={by:0,Kb:0,Mb:0,Gb:0,Tb:0,Pb:0,Eb:0}
gsj.by=num2%1024;num2=parseInt(num2/1024);
gsj.Kb=num2%1024;num2=parseInt(num2/1024);
gsj.Mb=num2%1024;num2=parseInt(num2/1024);
gsj.Gb=num2%1024;num2=parseInt(num2/1024);
gsj.Tb=num2%1024;num2=parseInt(num2/1024);
gsj.Pb=num2%1024;num2=parseInt(num2/1024);
gsj.Eb=num2
return gsj
}





events.broadcast.on("hello", function(name){
    bwl=parseInt(name);
    if(bwl>2){bw=bwl;}
});
//保持脚本运行
setInterval(()=>{}, 1000);