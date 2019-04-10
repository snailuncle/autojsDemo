/**
 * 为指定QQ点赞, 理论兼容所有安卓机...具体效果我也不知道,只在安卓7.0+版本测试了
 * 如果有问题,群里说吧.QQ号码格式看下面
 * 注意: 运行本脚本需要安卓7.0以上或者已经root的设备,最低运行版本不建议低于安卓5.0
 */

auto.waitFor();

var QQNum_Arry = [ //按照如下格式添加你要点赞的QQ号
    "289986635",
    "654343442",
];

if (device.sdkInt < 24) {
    var ra = new RootAutomator();
}

for (let i = 0; i < QQNum_Arry.length; i++) {
    app.startActivity({
        data:"mqqapi://card/show_pslcard?&uin="+QQNum_Arry[i]
    });

    waitForActivity("com.tencent.mobileqq.activity.FriendProfileCardActivity");
    sleep(3000);
    let Btn = descEndsWith("次赞").findOne().bounds();
    let X =  Btn.centerX();
    let Y =  Btn.centerY();
    for (let i = 0; i < 10; i++) {
        if (device.sdkInt < 24) {
            ra.tap(X,Y);
        } else {
            click(X,Y);
        }
        sleep(50);
    }
}

if (device.sdkInt < 24) {
    ra.exit();
}