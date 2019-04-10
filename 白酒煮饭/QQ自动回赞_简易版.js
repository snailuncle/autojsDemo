/**
 * 脚本运行环境,autojs版本不要低于3.0,安卓版本不要低于 5.0,低于7.0的手机要root
 * 
 * 自动回赞,别人给自己点过几次赞,则回点几次赞.
 */
auto.waitFor();
if(!requestScreenCapture()){
    alert("请求截图失败\n程序结束");
    exit();
}

events.on("exit", function(){
    if (device.sdkInt < 24) {
        ra.exit();
    }
});
// var MyQQ = "289986635";

var MyQQ = rawInput("请输入您的QQ号码:");

if (device.sdkInt < 24) {
    var ra = new RootAutomator();
}

app.startActivity({
    data:"mqqapi://card/show_pslcard?&uin="+MyQQ
});

descEndsWith("次赞").findOne().click();
waitForActivity("com.tencent.mobileqq.activity.VisitorsActivity");
sleep(500);
while(true) {
    if (device.sdkInt < 24) {
        ra.swipe(device.width/2, device.height*0.43, device.width/2, device.height*0.8, 300); sleep(350);
    } else {
        swipe(device.width/2, device.height*0.43, device.width/2, device.height*0.8, 300); sleep(350);
    }
    sleep(3000);
    var img = captureScreen();
    var obj = textEndsWith("次").boundsInside(5,5,device.width-10,device.height-10).find();
    var loopTimes = obj.size();
    for (let i = 0; i < loopTimes; i++) {
        let Btn = desc("赞").find().get(i).bounds();
        let leftX = Btn.left;
        let topY = Btn.top;
        let w = Btn.right - leftX;
        let h = Btn.bottom - topY;

        var p = findColorEquals(img, -15550475, leftX, topY, w, h);
        if (p) {
            continue;
        }
        var counts = obj.get(i).text().replace(/[^0-9]/ig,"");
        for (let i = 0; i < counts; i++) {
            let X = Btn.centerX();
            let Y = Btn.centerY();
            if (device.sdkInt < 24) {
                ra.tap(X,Y);
            } else {
                click(X,Y);
            }
        }
    }
    sleep(10*1000);
}