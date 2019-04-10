console.show()
基数 = 0.15 //滑动减少自己修改数字，达到最高成功率
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
click(553, 1079)
sleep(500)
起点 = 540

while (1) {
    时间 = new Date().getTime()
    var img = captureScreen();
    var p = findColor(img, "#fff2d71e", {
        region: [40, 1100, 1000, 10],
        threshold: 20
    });
    if (p) {
        w.setPosition(p.x, p.y)
        终点 = p.x + 5
        次数 = Math.abs(终点 - 起点)
        log(起点, 终点, 次数)
        //  swipe(起点,1870,终点,1870,200)
        随机数 = random(1732, 1800)
        if (终点 > 起点) {
            终点=parseInt(终点 - (次数 * 基数))
            swipe(起点, 随机数, 终点 , 随机数, 100)
        } else {
            终点=parseInt(终点 + (次数 * 基数))
            swipe(起点, 随机数, 终点, 随机数, 100)
        }

        起点 = 终点
        sleep(200)
    } else {
        // toast("没找到");
    }
    if (images.detectsColor(img, "#ffff6458", 381, 1616, threshold = 16, algorithm = "diff")) {
        sleep(200)
        toastLog("游戏挂了")
        exit()
    }
}