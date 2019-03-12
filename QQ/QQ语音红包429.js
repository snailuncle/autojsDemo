importPackage(android.speech.tts);
importClass(java.util.Locale);

auto();

var tts = new TextToSpeech(context, function (status) {
    if (status != tts.SUCCESS) {
        toast("初始化TTS识别: " + status);
        exit();
    }
    var r = tts.setLanguage(Locale.CHINA);
    if (r < 0) {
        toast("不支持该语言: " + r);
        exit();
    }
    toast("TTS初始化成功");
});
tts.setOnUtteranceProgressListener(new UtteranceProgressListener({
    onDone: function (id) {

    }
}));

function textToQQVoice(text) {
    sleep(1000);
    speak(text);
    voiceConverting = false;
}

function speak(text) {
    //  tts.speak(text, tts.QUEUE_ADD, null);
    tts.speak(text, tts.QUEUE_FLUSH, null);
}

events.on("exit", function () {
    if (tts) {
        tts.shutdown();
        tts = null;
    }
});



var window = floaty.window(
    <frame>
        <linear>
            <button id="action" text="QQ红包语音红包" w="auto" h="40" color="#ffffff" bg="#66000000" />
        </linear>
    </frame>
);

var voiceConverting = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function (view, event) {
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
                onClick();
            }
            return true;
    }
    return true;
});

var thread = threads.currentThread();

function onClick() {
    thread.setTimeout(qqMessageToVoice, 0);

    log("onClick");

}

function qqMessageToVoice() {
    if (currentActivity() == "com.tencent.mobileqq.activity.SplashActivity") {
        if (text("QQ语音口令红包").exists()) {
            var id = text("QQ语音口令红包").findOne();
            id.parent().click();
            sleep(500);
        }
    } else if (currentActivity() == "com.tencent.mobileqq.activity.PublicTransFragmentActivity") {
    } else {
        alert("请打开QQ聊天窗口");
        return;
    }
    if (voiceConverting) {
        return;
    }
    voiceConverting = true;
    if (textEndsWith("口令红包").exists()) {
        var id = textEndsWith("口令红包").findOne();
        text1 = id.parent().parent().child(2).text();
        log(text1)
        textToQQVoice(text1);
    }
}

setInterval(() => { }, 1000);