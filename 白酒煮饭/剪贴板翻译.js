var window = floaty.window(
    <frame><linear>
        <button id="action" text="翻译" w="40" h="40" color="#ffffff" bg="#66000000" />
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
                Baidu_zh_To_en(getClip());
            }
            return true;
    }
    return true;
});
setInterval(() => {}, 1000);
function Baidu_zh_To_en(str) {
    threads.start(function(){
    function getMd5(string) {return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16)}
    var salt = (new Date).getTime();
    var sign = getMd5("20180125000118573" + str + (new Date).getTime() + "O_PrebY0tsdbHjKNOaDf");
    var res = http.post("http://api.fanyi.baidu.com/api/trans/vip/translate?", {q: str,appid: "20180125000118573",salt: salt,from: "en",to: "zh",sign: sign});
    str = JSON.parse(res.body.string()).trans_result.map(val => val.dst).join('\n');  
   toastLog(str);
  });
}