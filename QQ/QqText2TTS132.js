/**
 * QQ聊天文字转语音发送
 */

var QQ = dialogs.rawInput("输入当前登陆QQ号", "633854");

var window = floaty.window(
    <frame><linear>
        <button id="action" text="运行" w="40" h="40" color="#ffffff" bg="#66000000" />
    </linear> </frame>
);

var execution = null;

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

function onClick() {
    if (currentActivity() == "com.tencent.mobileqq.activity.SplashActivity") {
        threads.start(function () {
            run(1);
        });
    } else {
        alert("请打开QQ聊天窗口")
    }
}

function run(r) {
    var r = r;
    while (r) {
        var name = "tmp.mp3"
        var path = "/sdcard/脚本/"
        var str = id("input").findOne().text();
        if (str) {
            tts(str, path + name);
            qqVoice(name, QQ, path);
        } else {
            alert("聊天文字输入框内容为空")
        }
        setText("");
        r = 0;
    }
}


function tts(语音文本, file) {

    importClass(java.util.Locale);
    importClass(java.io.File);
    importClass(android.speech.tts.TextToSpeech);
    var ttsStatus = false;
    var ttsListener = new TextToSpeech.OnInitListener(){
        onInit:function(status){
            if (status == TextToSpeech.SUCCESS) {
                var ttsSetLanguageResult = TTS.setLanguage(TTS.getDefaultVoice().getLocale()/*ttsLanguage*/);
                if (ttsSetLanguageResult != TextToSpeech.LANG_MISSING_DATA && ttsSetLanguageResult != TextToSpeech.LANG_NOT_SUPPORTED) {
                    ttsStatus = true;
                    ttsReady();
                } else {
                    toast("TTS不支持当前语言");
                }
            } else {
                toast("初始化TTS失败");
            }
        }
}
var TTS = new TextToSpeech(context, ttsListener);


function speech(ttsText, fileName) {
    if (TTS && ttsStatus) {
        if (ttsText.length <= TextToSpeech.getMaxSpeechInputLength()) {
            if (fileName) {
                var file = new File(fileName);
                if (!file.exists()) {
                    file.createNewFile();
                }
                TTS.synthesizeToFile(ttsText, null, file, Math.random());
            } else {
                TTS.speak(ttsText, TextToSpeech.QUEUE_FLUSH/*QUEUE_FLUSH插队，QUEUE_ADD排队*/, null);
            }
            return true;
        } else {
            toast("朗读文本过长");
            return false;
        }
    } else {
        toast("TTS未准备好");
        return false;
    }
}


function ttsReady() {
    TTS.stop();
   // speech(语音文本);
    speech(语音文本, file);
}
}



setInterval(() => { }, 1000);


/**
 * qqVoice(name, QQ, originPath)
 * 调用方法：name为要发送语音的名称;QQ是你要用的QQ号;originpath是要发送语音的父文件夹的路径
 */
function qqVoice(name, QQ, originPath) {
    if (QQ == undefined) {
        QQ = "3068758340"
    }
    if (originPath == undefined) {
        originPath = "/sdcard/QQ测试语音/"
    }
    var date1 = (new Date().getYear() + 1900) * 100 + new Date().getMonth() + 1
    var date2 = new Date().getDate()
    var path = "/sdcard/tencent/MobileQQ/" + QQ + "/ptt/" + date1 + "/" + date2 + "/"
    sleep(200)
    if (desc("开始录音").find().empty()) {
        accessibilityFocused(false).checked(false).className("android.widget.ImageView").clickable(true).column(-1).columnCount(0).column(-1).contextClickable(false).depth(9).dismissable(false).findOne().click();
    }
    sleep(200)
    click("录音")
    sleep(200)
    desc("开始录音").find().click()
    sleep(1650)
    desc("停止录音").find().click()
    toast(path);
    sleep(800)
    var fileName = max(files.listDir(path))
    files.remove(path + fileName)
    files.copy(originPath + name, path + name)
    files.rename(path + name, fileName)
    sleep(200)
    id("listen_panel_send_tv").find().click()
}

function max(array) {

    var a = 0
    for (i = 0; i < array.length; i++) {
        re = /\d+/g
        name = array[i].match(re, "g")
        if (name > a) {
            a = name
        }
    }
    return "stream_" + a + ".slk";
}
                
