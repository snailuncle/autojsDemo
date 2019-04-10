/**
 * HAHA小视频刷趣币脚本,多刷多赚,每天的收益比趣头条要多很多.
 * 
 * APP下载地址:
 *     https://share.chaingrowing.com/#/invitedPage?invitationCode=mu502p&userId=90f31df53baa455a8fc72e82eb0cf889
 * 
 * 邀请码: MU502P    //使用邀请码获得更多收益哦
 * 
 * 脚本使用方法:
 *     首先说明脚本的运行 安卓版本必须大于7.0 低于7.0的需要root
 *     下载安装后,注册HAHA小视频账号登录;
 *     然后将下面全部内容复制,在AUTOJS中新建一个脚本,然后把内容粘贴到里面,点击运行即可
 *     屏幕上方的趣币停止增长时,脚本会自动刷视频
 * 脚本如果不能用了,请下方回复,我会及时更新.
 */

auto.waitFor();
setScreenMetrics(1080, 1920);

events.observeKey();
events.setKeyInterceptionEnabled("volume_up", true);
events.onKeyDown("volume_up", function(event){
    device.cancelVibration();
    ra.exit();
    exit();
});

if (device.sdkInt < 24) {
    var ra = new RootAutomator();
}
while(true) {
    log("启动HAHA小视频");
    launchApp("HAHA小视频");
    log("等待首页出现");
    waitForActivity("com.lswl.qfq.activity.MainActivity");
    sleep(1000);
    log("准备点击发现的一个视频");
    clickId("top_container");
    log("点击了视频,等待视频详情页出现");
    waitForActivity("com.lswl.qfq.activity.VideoActivity");
    sleep(1000);
    
    try {
        var s = 0;
        while(true) {
            var oldTime = new Date();
            var oldTitleNum = id('layout_daohanglan_title').findOne().text();
            while(true) {
                var newTime = new Date();
                if (newTime - oldTime > 1000) {
                    var newTitleNum = id('layout_daohanglan_title').findOne().text();
                    if (newTitleNum != oldTitleNum) {
                        break;
                    } else {
                        if (device.sdkInt < 24) {
                            var x0 = random(600, 650);
                            var y0 = random(1500, 1560);
                            ra.swipe(x0, y0 ,device.width*0.7 ,device.height*0.15,400); sleep(500);
                        } else {
                            var points = [500];
                            var interval = 0.1;
                            var x0 = random(780, 900);
                            var y0 = random(1650, 1750);
                            var a = 240;
                            for(var t = 0; t < Math.PI/2; t += interval){
                                var x = x0 - a * (1.8 * Math.cos(t*0.9) - Math.cos(2 * t*0.9));
                                var y = y0 - a * (6 * Math.sin(t*0.9) - Math.sin(3 * t*0.9));
                                points.push([parseInt(x), parseInt(y)]);
                            }
                            gesture.apply(null, points); sleep(500);
                        }
                    }
                }
                sleep(500);
            }
            s++;
            if (s == 10) {
                let r = random(0,1);
                if (r == 0) {
                    log("随机点击了一次赞");
                    clickId("like");
                }
                s = 0;
            }
        }
    } catch (e) {
        //设备震动2秒.按音量+键停止震动
        device.vibrate(2000);
    }
}


function clickId(a) {
    for (obj_ID = id(a).boundsInside(0, 5, device.width, device.height-5); obj_ID.find().empty(); ) sleep(1e3);
    X = obj_ID.find().get(0).bounds().centerX(), Y = obj_ID.find().get(0).bounds().centerY(), 
    Deviation = random(-30, 30), X1 = X - Deviation, Y1 = Y - Deviation, device.sdkInt<24?ra.tap(X1,Y1):click(X1,Y1);
}