
function 看视频倒计时(看视频时长,手机号码,邀请码){
  var w = floaty.rawWindow(
    <frame  gravity="center" bg="#6600FF00">
      <vertical>
        <text  gravity="center" textSize="66sp" typeface="monospace" textStyle="bold" textColor="red"  id="text">看视频倒计时{看视频时长}秒</text>
        <text  gravity="center" textSize="33sp" typeface="monospace" textStyle="bold" textColor="red"  id="text">{手机号码}</text>
        <text  gravity="center" textSize="33sp" typeface="monospace" textStyle="bold" textColor="red"  id="text">{邀请码}</text>
      </vertical>
    </frame>
  );
  w.setSize(-1, -1);
  w.setTouchable(false);
  var p=看视频时长
  var 字体大小=66
  while(1){
    ui.run(function(){
      w.text.setText("看视频倒计时"+String(字体大小)+"秒")
      // w.text.setText("看视频倒计时"+String(p)+"秒")
    })
    ui.run(function(){
      w.text.setTextSize(字体大小)
    })
    log("看视频倒计时"+String(p)+"秒")
    sleep(1000)
    if(p==1){
      break;
    }
    p=p-1;
    字体大小=字体大小-5;
  }
  sleep(2000)
  w.close();
  return true
}
看视频时长=10
手机号码=123123123
邀请码=88888
看视频倒计时(看视频时长,手机号码,邀请码)
