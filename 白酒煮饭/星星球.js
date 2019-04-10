auto();

const WIDTH = Math.min(device.width, device.height);
const HEIGHT = Math.max(device.width, device.height);

start();
function start() {
    var timeout = 10000;
    // 截图权限申请
    threads.start(function () {
        var remember;
        var beginBtn;
        if (remember = id("com.android.systemui:id/remember").checkable(true).findOne(timeout)) {
            remember.click();
        }
        if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(timeout)) {
            beginBtn.click();
        }
    });
    if (!requestScreenCapture(false)) {
        toastLog("请求截图失败");
        exit();
    }

    toastLog("请打开星星球界面");
    launchApp("支付宝");
    waitForActivity("com.alipay.mobile.nebulacore.ui.H5Activity");
    //sleep(5000);

    var antManor = new AntManor();

    antManor.play();

    exit();
}

function AntManor() {
    this.colors = ["#FF4C4C", "#4E86FF"];
    this.find_time = 5000;

    this.play = function () {
        var len = this.colors.length;
        var wait_time = 100;
        var baseline = device.height * 0.412 | 0;
        var min_height = baseline * 0.55 | 0;
        
        // 发球
        var point = this.findColorPoint(len);
        var x = point.x;
        var y = point.y;
        click(x, y);
        
        while (1) {
            var point = this.findColorPoint(len);
            var x = point.x;
            var y = point.y;
            
            if (min_height <= y && y <= baseline)
                click(x, baseline);
        }
    };

    this.findColorPoint = function (len) {
        var wait_time = 100;
        for (var time = 0;time < this.find_time;time += wait_time) {
            for (var i = 0;i < len;i++) {
                var capture = captureScreen();
                if (!capture) {
                    sleep(50);
                    continue;
                }
                var color = this.colors[i];
                var point = findColorEquals(capture, color, 0, 0, WIDTH, HEIGHT);
                if (point !== null) {
                    return point;
                }
            }
        }

        return null;
    };
}