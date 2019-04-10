"auto";

 importPackage(android.speech.tts);
 importClass(java.util.Locale);
 let tts = new TextToSpeech(context, function(status) {
     if (status != tts.SUCCESS) {
         toast("初始化TTS识别: " + status);
         exit();
     }
     let r = tts.setLanguage(Locale.CHINA);
     if (r < 0) {
         toast("不支持该语言: " + r);
         exit();
     }
});
let sum, leap, t;
let year = parseInt(dialogs.rawInput("年", 2018));
let month = parseInt(dialogs.rawInput("月", 10));
let day = parseInt(dialogs.rawInput("日", 30));
log(month);
switch (month) // 先计算某月以前月份的总天数
{
    case 1:sum = 0;break;
    case 2:sum = 31;break;
    case 3:sum = 59;break;
    case 4:sum = 90;break;
    case 5:sum = 120;break;
    case 6:sum = 151;break;
    case 7:sum = 181;break;
    case 8:sum = 212;break;
    case 9:sum = 243;break;
    case 10:sum = 273;break;
    case 11:sum = 304;break;
    case 12:sum = 334;break;
    default:
        log("data error");
        break;
}
sum=sum+day;
if(year%400==0||(year%4==0&&year%100!=0)) {// 判断是不是闰年
    leap=1;
    t=366;
} else {
    leap=0;
    t=365;
}
if(leap==1&&month>2) { // *如果是闰年且月份大于2,总天数应该加一天
    sum++;
}
log("这是这一年的第"+sum+"天");
log("今年还剩"+(t-sum)+"天");
let text = "在"+year+"年"+month+"月"+day+"日，"+"这是这一年的第"+sum+"天"+"今年还剩"+(t-sum)+"天，就到2019年了";
log(text);
tts.speak(text, tts.QUEUE_ADD, null);