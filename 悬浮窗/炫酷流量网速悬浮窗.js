TrafficStats = android.net.TrafficStats;
importClass(android.graphics.Paint);
Canvas=android.graphics.Canvas;
importClass(android.graphics.Bitmap);

function textpaint(str){
    str=str.split("\n");
var bitmap =Bitmap.createBitmap(200,110,Bitmap.Config.ARGB_8888);

var canvas = new Canvas(bitmap);
canvas.drawARGB(122,0,0,0);
var paint = new Paint();
//圆盘背景
paint.setARGB(255,0,255,0);//白色画笔
//paint.setStyle(Paint.Style.FILL);//空心样式  
//   paint.setFilterBitmap(true);//抗锯齿
//  paint.setFakeBoldText(true);//加粗
//paint.setHinting(16);//字体微调
   paint.setTextSize(22);
   for(i=0;i<str.length;i++){
       paint.setARGB(255,random(0,255),255,0);//
   canvas.drawText(str[i],0,(i+1)*25,paint);
   }
   

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
                    onClick();
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
//log(Object.keys(TrafficStats));

threads.start(function() {
    while (true) {
        str = "流量↑:" + sz(lzs()) +
            "\n流量↓:" + sz(lzx()) +
            "\n网速↑:" + sz(zwss) + "\/s" +
            "\n网速↓:" + sz(zwxs) + "\/s";
         tu=textpaint(str);
        ui.run(function() {
            window.img.setImageBitmap(tu);
        });
sleep(100);

    }
});




function ozs() {
    return TrafficStats.getTotalTxBytes();
}

function ozx() {
    return TrafficStats.getTotalRxBytes();
}

function lzs() {
    return ozs() - zss;
}

function lzx() {
    return ozx() - zxs;
}

function sz(num) {
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






log(TrafficStats.getTotalRxBytes());

while (true) {
    sleep(1000);
}