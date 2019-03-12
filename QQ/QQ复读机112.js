toast("双击气泡即可复读,请慎用,长按按钮5秒退出");
const ACTIVITY_TEXT_PREV = "com.tencent.mobileqq.activity.TextPreviewActivity";
var on = true;
var str;
var f = floaty.window(
    <button id="btn" text="复读:ON"/>);
setInterval(() => {}, 2000);
function onClick(){
    on = !on;
    if (on) {
        f.btn.setText("复读:ON");
        toast("双击气泡即可复读,请慎用,长按按钮5秒退出");
    } else {
        f.btn.setText("复读:OFF");
    }
}
var downtime;
f.btn.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = f.getX();
            windowY = f.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            f.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过5000ms判断为长按，退出脚本
            if (new Date().getTime() - downTime > 5000) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});

while (true) {
    if (!on)
        continue;
    if (currentActivity() == ACTIVITY_TEXT_PREV) {
        var linear = id("content").findOne();
        str = linear.child(0).text();
        //toast(str);
        back();
        if (id("title").findOne(1000) != null) {
            setText(str);
            click("发送");
        }

    }

}