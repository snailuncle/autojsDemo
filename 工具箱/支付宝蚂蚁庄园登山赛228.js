console.show()
var ra = new RootAutomator();
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
var w = floaty.rawWindow(
    <frame gravity="center" bg="#99ff0000" w="10" h="10">
        <text id="text">悬浮文字</text>
    </frame>
);
sleep(3000)
log("开始")
click(553,1079)
sleep(500)
起点 = 540
anxia(540, 1888, 0)
while (1) {
    时间 = new Date().getTime()
    var img = captureScreen();
    var p = findColor(img, "#fff2d71e", {
        region: [40, 1100, 1000, 10],
        threshold: 20
    });
    if (p) {
        用时 = new Date().getTime() - 时间
        //  log(用时,"找到啦:" + p);
        w.setPosition(p.x, p.y)
        终点 = p.x + 5
        //  终点=终点-540
        //终点=终点/2
        // 终点=终点+540
        次数 = Math.abs(终点 - 起点) / 1
        log(起点, 终点, 次数)
        //  swipe(起点,1870,终点,1870,200)
        随机数 = random(1732, 1800)
        基数=0.15
        for (let a = 0; a < 次数; a++) {
            if (终点 > 起点) {
                yidong(起点 + 1 * a-(a*基数), 随机数, 0)
            } else {
                yidong(起点 - 1* a+(a*基数), 随机数, 0)
            }
        }
        起点 = 终点
        //  press(p.x,p.y+280+random(5,60),random(500,800))
        sleep(200)
    } else {
        // toast("没找到");
    }
   if( images.detectsColor(img, "#ffff6458",381,1616, threshold = 16, algorithm = "diff")){
       tanqi(0)
       sleep(200)
       toastLog("游戏挂了")
       exit()
       }
}

function anxia(x, y, id) {
    var sjs = random(99999, 10000)
    ra.sendEvent(3, 47, id); 
    ra.sendEvent(3, 57, sjs); 
    ra.sendEvent(1, 330, 1);
    ra.sendEvent(1, 325, 1);
    ra.touchX(x);
    ra.touchY(y);
    ra.sendEvent(3, 48, 5); 
    ra.sendEvent(3, 49, 5); 
    ra.sendSync(); 
}

function yidong(x, y, id) {
    sjs = random(6, 3)
    sjs1 = random(6, 6)
    ra.sendEvent(3, 47, id); 
    ra.touchX(x);
    ra.touchY(y);
    ra.sendEvent(3, 48, sjs); 
    ra.sendEvent(3, 49, sjs1); 
    ra.sendSync(); 
}

function tanqi(id) {
    ra.sendEvent(3, 47, id); 
    ra.sendEvent(3, 57, -1); 
    // ra.sendEvent(1, 330, 0); 
    // ra.sendEvent(1, 325, 0);
    ra.sendSync();
}