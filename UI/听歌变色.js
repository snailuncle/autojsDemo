/**
 * 作者:   家
 * QQ:     203118908
 * 功能:   录音功能Demo, 以及提取歌曲信息
 */
'ui';
var isLog=false
function mylog(){
  if(isLog){
    log.apply(this,Array.prototype.slice.call(arguments))
  }
}
importClass(android.media.MediaRecorder)
importClass('java.io.File');
runtime.requestPermissions(["record_audio"]);
size=88
ui.layout(
  <vertical   bg='#CCFFCC' >
    <horizontal>
      <text>歌曲路径</text>
      <input id='songPath'>歌曲路径</input>>
    </horizontal>
    <horizontal>
      <text>歌曲信息</text>
      <text id='info' textSize='20sp'>歌曲信息</text>>
    </horizontal>
    <horizontal h='200'>
      <linear   w="{{size}}" h="{{size*2}}"  gravity='bottom'    layout_width='0dp' layout_weight='1' layout_height='match_parent'  bg='#CCFFCC' >

          <button id='dbColor1'   bg='#ff0000' layout_width='0dp' layout_weight='1'></button>
          <button id='dbColor2'   bg='#ff00ff' layout_width='0dp' layout_weight='1'></button>
          <button id='dbColor3'   bg='#fff0f0' layout_width='0dp' layout_weight='1'></button>


      </linear>




      <img id='songImg'   layout_width='0dp' layout_weight='2'  layout_height="match_parent"></img>



      <linear gravity='center' bg='#CCFFCC'   layout_width='0dp' layout_weight='1'  layout_height='match_parent'>
        <button id='dbValue'  w="{{size}}" h="{{size*2}}"  >显示分贝</button>
      </linear>
    </horizontal>


    <button  id='stop' > 停止录音</button>
    <button  id='start' > 开始放歌并录音</button>
  </vertical>
)

var dbValue=ui.dbValue
var dbColor1=ui.dbColor1
var dbColor2=ui.dbColor2
var dbColor3=ui.dbColor3


ui.stop.on('click', function () {
  stopRecoder()
})
ui.start.on('click', function () {
  startRecoder()
})





var songPathView = ui.songPath
var songImgView=ui.songImg
var lastSong=''
// var songPath = '/storage/emulated/0/QQBrowser/音乐/ThatGirl.mp3'
var songPath = '/storage/emulated/0/netease/cloudmusic/Music/云雀合唱团 - 祝你生日快乐.mp3'
r = files.exists(songPath)
mylog(r)
songPathView.setText(songPath)

setInterval(
  function () {
    main()
  }, 1000
)

function 开始放歌(){
  var songPath = songPathView.getText().toString()
  mylog('歌曲路径')
  mylog(songPath)
  mylog('开始执行放歌命令')
  media.playMusic(songPath);
  mylog('结束执行放歌命令')
}


function main() {
  var songPath = songPathView.getText().toString()
  if(songPath!==lastSong){
    mylog(songPath)
    var info = extractSongInfo(songPath)
    ui.info.setText(info)
    lastSong=songPath
  }
}

function extractSongInfo(songPath) {
  var songPath = app.getUriForFile(songPath)
  var mediaMetadataRetriever = new android.media.MediaMetadataRetriever();
  mediaMetadataRetriever.setDataSource(activity, songPath);
  TITLE = mediaMetadataRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_TITLE);
  mylog(TITLE)
  ALBUM = mediaMetadataRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_ALBUM);
  mylog(ALBUM)
  ALBUMARTIST = mediaMetadataRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_ALBUMARTIST);
  mylog(ALBUMARTIST)
  AUTHOR = mediaMetadataRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_AUTHOR);
  mylog(AUTHOR)



  var picture=mediaMetadataRetriever.getEmbeddedPicture();
  if(picture){
    var bitmap= android.graphics.BitmapFactory.decodeByteArray(picture,0,picture.length);
    songImgView.setImageBitmap(bitmap);

  }

  var result={
    "TITLE":TITLE,
    "专辑标题":ALBUM,
    "专辑艺术家":ALBUMARTIST,
    "媒体文件的作者":AUTHOR,
  }
  var info=''
  for(var k in result){
    info=info+k+': '+result[k]+'\n'
  }
  mylog(info)
  return info
}





function startRecoder(){
  开始放歌()
  BASE = 600;
  SPACE = 200; // 间隔取样时间
  output_Path = files.getSdcardPath() + '/111.js'
  // log(output_Path)
  soundFile = new File(output_Path);
  recorder = new MediaRecorder();
  recorder.setAudioSource(MediaRecorder.AudioSource.MIC); //声音来源是话筒
  recorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP); //设置格式
  recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB); //设置解码方式
  recorder.setOutputFile(soundFile.getAbsolutePath());
  recorder.prepare();
  setTimeout(
    function () {
      recorder.start();
      updateMicStatus();
    }, 200
  )

}
function updateMicStatus() {
  threads.start(
    function(){

      var n=255;
      var lastDb=0
      while(1){
        if (recorder != null) {
          ratio = recorder.getMaxAmplitude() // BASE;
          db = 0; // 分贝

          if (ratio > 1)
            db = (20 * Math.log10(ratio));



              if(db>lastDb){
                颜色变深()
              }else{
                颜色变浅()
              }
              lastDb=db
              ui.run(
                function(){
                  if(db<10){
                    return ;
                  }
                  intBb=Math.ceil(db)
                  // db=db.toFixed(2)
                  dbValue.setText(intBb.toString())
                  dbValue.attr('height',intBb)
                  dbValue.attr('width',intBb)
                  // dbValue.attr('height',db)


                  var 当前十位数=十位数(db)
                  var 当前个位数=个位数(db)
                  var 当前小数第一位=小数第一位(db)



                  // dbColor1.attr('width',intBb)
                  dbColor1.attr('height',intBb)
                  // dbColor2.attr('width',intBb)
                  dbColor2.attr('height',intBb+60)
                  // dbColor3.attr('width',intBb)
                  dbColor3.attr('height',intBb)



                }
              )



          // toastLog("分贝值：" + db + "     " + Math.log10(ratio));
          sleep(50)
        }
      }
    }
  )
}




function 小数第一位(dbValue)
{
var num = dbValue.toString()
var result = num.substring(num.indexOf(".")+1,num.indexOf(".")+2);
return result;
}

function 十位数(dbValue)
{
var num = dbValue.toString()
var result = num.substring(num.indexOf(".")+1,num.indexOf(".")+2);
return result;
}

function 个位数(dbValue)
{
var num = dbValue.toString()
var result = num.substring(num.indexOf(".")-2,num.indexOf(".")-1);
return result;
}








颜色变化值=10
function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}
function 更换按钮颜色(){


  ui.run(
    function(){
      dbColor1.setBackgroundColor(rndColor())
      dbColor2.setBackgroundColor(rndColor())
      dbColor3.setBackgroundColor(rndColor())



      dbColor1.getBackground().setAlpha(123);
      dbColor2.getBackground().setAlpha(123);
      dbColor3.getBackground().setAlpha(123);
    }
  )






}
function 颜色变浅(){
  var 当前透明度= dbColor1.getBackground().getAlpha()
  var n=当前透明度-颜色变化值
  if(n<0){
    更换按钮颜色()
  }
  mylog('n=')
  mylog(n)
  ui.run(
    function(){
      dbColor1.getBackground().setAlpha(n);
      dbColor2.getBackground().setAlpha(n);
      dbColor3.getBackground().setAlpha(n);
    }
  )
}
function 颜色变深(){
  var 当前透明度= dbColor1.getBackground().getAlpha()
  var n=当前透明度+颜色变化值
  if(n>255){
    更换按钮颜色()
  }
  mylog('n=')
  mylog(n)
  ui.run(
    function(){
      dbColor1.getBackground().setAlpha(n);
      dbColor2.getBackground().setAlpha(n);
      dbColor3.getBackground().setAlpha(n);
    }
  )
}













function stopRecoder() {
  media.stopMusic()

  if (soundFile != null && soundFile.exists()) {
    // 停止录音
    recorder.stop();
    // 释放资源
    recorder.release();
    recorder = null;
  }
}


events.on('exit', function(){
  toastLog('脚本结束')
  media.stopMusic()
  if (soundFile != null && soundFile.exists()) {
    // 停止录音
    recorder.stop();
    // 释放资源
    recorder.release();
    recorder = null;
  }
});
