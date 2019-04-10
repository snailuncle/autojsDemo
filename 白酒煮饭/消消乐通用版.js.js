//起点取第一个格子的中心坐标
//格子是一个格子的宽度和高度，格子大小为一个格子加一个边框的距离,建议取多个格子的坐标然后除以格子数，这样比较精确
起点 = [111, 507] //第一个格子中心坐标
格子 = [142, 142] //格子的宽高像素大小==取点要准，
横 = 7, 竖 = 9//横竖各有多少个格子
var w2 = floaty.rawWindow(
    <frame gravity="center" bg="#ffff0088" >
        <button id="运行">运行</button>
    </frame>
);
w2.setPosition(1, 100)
w2.运行.click(() => {
    if (w2.运行.text() == "运行") {
        w2.运行.setText("停止")
        线程 = threads.start(function() {
            开始()
            w2.运行.setText("运行")
        })
    } else {
        w2.运行.setText("运行")
        线程.interrupt();
    }
});
events.setKeyInterceptionEnabled("volume_down", true);
events.observeKey();
events.on("key", function(keyCode, event) {
    if (event.getAction() == event.ACTION_UP) {
        if (keyCode == 25) {
            if (w2.运行.text() == "运行") {
                w2.运行.setText("停止")
                线程 = threads.start(function() {
                    开始()
                    w2.运行.setText("运行")
                })
            } else {
                w2.运行.setText("运行")
                线程.interrupt();
            }
        }
    }
});
toastLog("按音量减，开始或者暂停运行")
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

function 获取位置() {
    坐标 = []
    图片 = []
    var img = captureScreen();
    for (let y = 0; y < 竖 + 2; y++) {
        坐标[y] = []
        for (let x = 0; x < 横 + 2; x++) {
            if (x > 0 && x < 横 + 1 && y > 0 && y < 竖 + 1) {
                let x1 = 起点[0] + (x - 1) * 格子[0]
                let y1 = 起点[1] + (y - 1) * 格子[1]
                if (x == 1 && y == 1) {
                    图片[0] = images.clip(img, x1 - 20, y1 - 20, 40, 40);
                }
                let 找到 = 1
                for (let t = 0; t < 图片.length; t++) {
                    let p = findImageInRegion(img, 图片[t], x1 - 25, y1 - 25, 60, 60, threshold = 0.8);
                    if (p) {
                        坐标[y][x] = t + 1
                        找到 = 0
                        break
                    }
                }
                if (找到) {
                    图片.push(images.clip(img, x1 - 20, y1 - 20, 40, 40))
                    坐标[y][x] = 图片.length
                }
            } else {
                坐标[y][x] = 0
            }
        }
    }
    x9 = 横
    y9 = 竖
    return 图片.length
}
var 方 = [
    [-1, 0, -2, 1, -1, 1, -2, 0,-3,0],
    [1, 0, 2, -1, 1, -1, 2, 0,3,0],
    [0, -1, -1, -2, -1, -1, 0, -2,0,-3],
    [0, 1, 1, 2, 1, 1, 0, 2,0,3]
];

function 开始() {
    个数 = 获取位置()
    while (1) {
        if (x9 < 1) {
            x9 = 横
            y9--
        }
        if (y9 < 1) 获取位置()
        if (搜索(y9, x9)) 获取位置()
        else x9--
    }
}

function 搜索(y, x) {
    for (let a = 0; a < 4; a++) {
        try {
            if (坐标[y][x] == 坐标[y + 方[a][0]][x + 方[a][1]] && 坐标[y][x] == 坐标[y + 方[a][2]][x + 方[a][3]]) {
                滑动(y + 方[a][2], x + 方[a][3], y + 方[a][6], x + 方[a][7])
                return 1
            }
        } catch (e) {}
        try {
            if (坐标[y][x] == 坐标[y + 方[a][4]][x + 方[a][5]] && 坐标[y][x] == 坐标[y + 方[a][6]][x + 方[a][7]]) {
                滑动(y + 方[a][0], x + 方[a][1], y + 方[a][4], x + 方[a][5])
                return 1
            }
        } catch (e) {}
        try {
            if (坐标[y][x] == 坐标[y + 方[a][0]][x + 方[a][1]] && 坐标[y][x] == 坐标[y + 方[a][8]][x + 方[a][9]]) {
                滑动(y + 方[a][8], x + 方[a][9], y + 方[a][6], x + 方[a][7])
                return 1
            }
        } catch (e) {}
    }
    return 0
}

function 滑动(y, x, y1, x1) {
    //log("找到", x, y, x1, y1)
    x = 起点[0] + (x - 1) * 格子[0] + random(-5, 5)
    y = 起点[1] + (y - 1) * 格子[1] + random(-5, 5)
    x1 = 起点[0] + (x1 - 1) * 格子[0] + random(-5, 5)
    y1 = 起点[1] + (y1 - 1) * 格子[1] + random(-5, 5)
    swipe(x, y, x1, y1, random(150, 160))
    sleep(50)
}