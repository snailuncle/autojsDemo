auto();

var window = floaty.window(
    <frame><linear>
        <button id="action" text="消砖块" w="50" h="40" color="#ffffff" bg="#66000000" />
        
    </linear> </frame>
);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event) {
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
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                xzk();
            }
            return true;
    }
    return true;
});
setInterval(() => {}, 1000);

function xzk(){
    threads.start(function() {
    intervalTime = 1;
    press(132, 1552, intervalTime);
    press(391, 1587, intervalTime);
    press(665, 1599, intervalTime);
    press(962, 1552, intervalTime);
});}
