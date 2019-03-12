
/*
  TTS.js (For Auto.js)
  Build Date: 2018-02-24
  By: 张达
  QQ: 32552732
  E-Mail: new-age@outlook.com
  调用系统TTS进行朗读或将结果保存到文件
*/




/* --- 这些不必动 --- */


//导入需要用到的包和类
importPackage(java.util);
importPackage(java.io);
importPackage(android.speech.tts);
var 语音文本=depth(9).className("android.widget.EditText").id("input").findOne().getText();//dialogs.rawInput("输入文本")
//初始化变量
var ttsLanguage="";//Locale.CHINA;//可自定义，朗读语言，为空则取默认
var TTS;
var ttsStatus=false;

//监听初始化完成事件
var ttsOnInitListener=new TextToSpeech.OnInitListener(){
    onInit:function(status){
        if(status==TextToSpeech.SUCCESS){
            ttsLanguage?0:ttsLanguage=TTS.getDefaultVoice().getLocale();
            var ttsSetLanguageResult=TTS.setLanguage(ttsLanguage);
            if(ttsSetLanguageResult!=TextToSpeech.LANG_MISSING_DATA&&ttsSetLanguageResult!=TextToSpeech.LANG_NOT_SUPPORTED){
                	ttsStatus=true;
                	ttsReady();
            }else{
                toast("TTS不支持当前语言");
            }
        }else{
            toast("初始化TTS失败");
        }
    }
}

//实例化TTS类
TTS=new TextToSpeech(context,ttsOnInitListener);

var ttsOnUtteranceProgressListener=new UtteranceProgressListener(){
    onDone:function(uid){
        tts2FileDone(uid);
        //console.log(uid+" Done");
    }/*,
    onStart:function(uid){
        console.log(uid+" Start");
    },
    onStop:function(uid,interrupted){
        console.log(uid+" Stop, interrupted: "+interrupted);
    },
    onError:function(uid,errCode){
        console.log(uid+" Error, err code: "+errCode);
    }*/
};

TTS.setOnUtteranceProgressListener(ttsOnUtteranceProgressListener);


/*
  [TTS朗读]
  参数:
   -- String ttsText: 需要朗读的文本
   -- String fileName: (可选) 保存结果文件的路径，若为空，则朗读文本，非空则将结果保存到文件
  返回值:
   -- Object result: JSON格式的对象
   ---- Boolean status: 执行状态（成功与否）
   ---- String msg: 附加信息（执行详情）
        
  * 异步执行，返回不代表执行完成，立即使用文件可能会出现异常（文件不完整）
*/
function ttsSpeech(ttsText,fileName){
    var status=false;
    var msg="";
    try{
        if(TTS&&ttsStatus){
            if(ttsText.length<=TextToSpeech.getMaxSpeechInputLength()){
                if(fileName){
                    var file=new File(fileName);
                    if(!file.exists()){
                        file.createNewFile();
                        var utteranceId=Math.random();
                        TTS.synthesizeToFile(ttsText,null,file,utteranceId);
                        status=true;
                        msg="已开始文本转语音到文件";
                    }else{
                        status=false;
                        msg="文件已存在";
                    }
                }else{
                TTS.speak(ttsText,TextToSpeech.QUEUE_FLUSH/*QUEUE_FLUSH插队，QUEUE_ADD排队*/,null);
                    status=true;
                    msg="已开始朗读";
                }
            }else{
                status=false;
                msg="传递文本过长";
            }
        }else{
            status=false;
            msg="TTS尚未初始化";
        }
    }catch(e){
        status=false;
        msg="未知异常: "+e.message;
    }
    return {"status":status,"msg":msg};
}

//脚本退出后注销TTS，回收资源，注释掉的原因是...脚本退出，但是TTS操作不一定完成，如果仅使用TTS到文本，可在tts2FileDone中进行此操作
events.on("exit",function(){
    //TTS.shutdown();
});


/* --- 这些请修改 --- */


/*
  [TTS已准备]
  无参数
  * TTS初始化完成后调用
*/
function ttsReady(){
    //示例
    TTS.stop();//停止正在进行的播报
    var text=语音文本//"Text To Speech Test. 文本转语音测试。";//朗读的文本
    var file="/sdcard/ADM/腾讯/TTS_Test.mp3";//文件保存的路径
    console.log(JSON.stringify(ttsSpeech(text)));//朗读
speech(text,file);
    console.log(JSON.stringify(ttsSpeech(text,file)));//保存
}

/*
  [TTS已输出到文件]
  参数:
   -- int uid: 操作唯一ID，由Math.random()生成
  * TTS结果输出到文件时调用
  * 被调用后，输出结果文件才是完整的，请在此处对输出结果文件进行操作
*/
function tts2FileDone(uid){
    TTS.shutdown();
}


/* new-age@outlook.com */
/* 2018-2-24 */
/* 将近开学 */