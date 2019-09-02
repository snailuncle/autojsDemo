var storage = storages.create("gestures动作生成");

var gesturesAry = storage.get("gestures", new Array); //↓↓↓↓[[0,100,[x1,y1],[x2,y2],[x3,y3],[x4,y4],………],………]
//每个手指的动作。

var TouchPointStart = new Array; //[0,1000,[x1,y1],[x2,y2],[x3,y3],[x4,y4],………]
var Ts = 50; //动作精度。越小精度越高。//但实际上没卵用。自动操作函数gestures会自动缩减


events.on("exit", function() {
    storage.put("gestures", gesturesAry);

    // files.write(storage.get("savePath", "/sdcard/脚本/LZ动作.js"), "var gesturesAry=" + JSON.stringify(MainGesturesAry) + ";\nfor(let i=0;i<gesturesAry.length;i++){gestures.apply(null, gesturesAry[i]);sleep(" + Tss + ");}");
});



asss();

function asss() {
    switch (gesturesAry.length?dialogs.select("选择方式", ["复制", "重建"]):1) {
        case 0:
            var str = "gestures.apply(null," + JSON.stringify(gesturesAry) + ");";
            setClip(str);
            toastLog("已复制");

            break;
        case 1:
            gesturesAry = new Array;
            TouchPointStart = new Array;
            w1: while (1) {
                var delayStr = dialogs.prompt("输入延时");
                if(!delayStr){break};
                var delay = parseInt(delayStr);
                if(!(delay>=0)){break};
                TouchPointStart.push(delay);
                
                var durationStr = dialogs.prompt("输入时长");
                if(!durationStr){break};
                var duration = parseInt(durationStr);
                if(!(duration>=0)){break};
                TouchPointStart.push(duration);
                
                var xystr = dialogs.prompt("请输入坐标");
                if(!xystr){break};
                var xy = xystr.replace(" ", "").split(",").map(Number);
                TouchPointStart.push(xy);
                var allTime = 0;
                w2: while (1) {
                    switch (dialogs.select("请选择方式", ["下一个坐标", "下一个手指", "全部完成"])) {
                        case 0:
                            var xystr = dialogs.prompt("请输入坐标");
                            var xy = xystr.replace(" ", "").split(",").map(Number);
                            var duration = parseInt(dialogs.rawInput("输入距上个坐标时长"));
                            allTime += duration;

                            TouchPointStart = TouchPointStart.concat(getPoints(TouchPointStart[TouchPointStart.length - 1], xy, duration / Ts));
                            break;
                        case 1:
                            if (allTime) {
                                TouchPointStart[1] = allTime;
                            };
                            break w2;
                        case 2:
                            break w1;
                        default:
                            break;
                    };

                };
                if (TouchPointStart.length) {
                    gesturesAry.push(TouchPointStart);
                    TouchPointStart = new Array;
                };
            };
            if (TouchPointStart.length) {
                gesturesAry.push(TouchPointStart);
                TouchPointStart = new Array;
            };
            if(gesturesAry.length){
            var str = "gestures.apply(null," + JSON.stringify(gesturesAry) + ");";
            setClip(str);
            toastLog("已复制");
            };
            break;
    };
};


function getPoints(A, B, s) {
    let x1 = A[0];
    let y1 = A[1];
    let x2 = B[0];
    let y2 = B[1];

    //返回一条线上的点。
    let fx = x2 - x1;
    let fy = y2 - y1;
    let cx = fx / s;
    let cy = fy / s;
    let pointsAry = new Array;

    for (let i = 0; i <= s; i++) {
        pointsAry.push([Math.floor(x1 + cx * i), Math.floor(y1 + cy * i)]);
    };

    return pointsAry;
};