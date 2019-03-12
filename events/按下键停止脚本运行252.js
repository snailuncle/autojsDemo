
//无名小姐 -----<<>>><<<>---  将就吧!
events.setKeyInterceptionEnabled("volume_down", true);
threads.start(function(){
    events.observeKey();
events.on("key", function(volume_down, event){
    //处理按键事件
  //  toast("音量下键被按下了");
    toast("脚本已停止运行");
    //exit();
});
});

//主线程代码
while(true){
    sleep(1000);
  log("ghhj");  
    }