importPackage(android.speech.tts);
importClass(java.util.Locale);
importClass(java.io.File);

var PackName = "com.tencent.mobileqq"
if (currentPackage() != PackName) { launchPackage(PackName); }
var ButtonRecoard = depth(8).className("android.view.View").desc("录音按钮 按住录音").untilFind();
var RedPacketText = ButtonRecoard[0].parent().child(0).getText().replace(/“/g, "").replace(/”/g, "");

var TTS = new TextToSpeech(context, function (status) {
    if (status != TextToSpeech.SUCCESS) {
        toast("初始化TTS失败");
    }
    var r = TTS.setLanguage(Locale.CHINA);
    if (r < 0) {
        toast("不支持该语言: " + r);
        exit();
    }
    log("TTS初始化成功");
});
events.on("exit", function () {
    if (TTS) {
        TTS.shutdown();
        TTS = null;
    }
    if (thread.isAlive()) { thread.interrupt(); }
    files.remove("/sdcard/脚本/TTS_Temp.mp3");
});
sleep(200)
var time = GetTTSDuration(RedPacketText);
toastLog(RedPacketText + "\n" + "TTS预计朗读用时" + time + "ms");
thread = threads.start(function () {
    device.vibrate("10");
    var ButtonRecoardPos = ButtonRecoard[0].bounds();
    press(ButtonRecoardPos.centerX(), ButtonRecoardPos.centerY(), (time + 500));
    device.vibrate("10");
});
sleep(100);
speech(RedPacketText);

function speech(ttsText, fileName) {
    if (ttsText.length <= TextToSpeech.getMaxSpeechInputLength()) {
        if (fileName) {
            var file = new File(fileName);
            if (!file.exists()) {
                file.createNewFile();
            }
            TTS.synthesizeToFile(ttsText, null, file, Math.random());
        } else {
            TTS.speak(ttsText, TextToSpeech.QUEUE_FLUSH, null);
            //QUEUE_FLUSH插队，QUEUE_ADD排队
        }
        return true;
    } else {
        toast("朗读文本过长");
        return false;
    }
}
function GetTTSDuration(TTS_Text) {
    speech(TTS_Text, "/sdcard/脚本/TTS_Temp.mp3");
    sleep(200);
    log(files.exists("/sdcard/脚本/TTS_Temp.mp3"))
    media.playMusic("/sdcard/脚本/TTS_Temp.mp3");
    media.pauseMusic();
    var MusicDuration = media.getMusicDuration();
    media.stopMusic();
    return MusicDuration;
}