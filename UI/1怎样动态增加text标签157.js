看视频时长=5
手机号码=18812345678
邀请码=666666
看视频倒计时(看视频时长,手机号码,邀请码)

function 看视频倒计时(看视频时长,手机号码,邀请码){
  var w = floaty.rawWindow(
    <frame  gravity="center" bg="#6600FF00">
      <vertical>
        <text  gravity="center" textSize="66sp" typeface="monospace" textStyle="bold" textColor="red"  id="text">看视频倒计时{看视频时长}秒</text>
        <text  gravity="center" textSize="33sp" typeface="monospace" textStyle="bold" textColor="red"  id="text">手机号码{手机号码}</text>
        <text  gravity="center" textSize="33sp" typeface="monospace" textStyle="bold" textColor="red"  id="text">邀请码{邀请码}</text>
      </vertical>
    </frame>
  );
  w.setSize(-1, -1);
  w.setTouchable(false);
  var p=看视频时长
  while(1){
    ui.run(function(){
      w.text.setText("看视频倒计时"+String(p)+"秒")
    })
    log("看视频倒计时"+String(p)+"秒")
    sleep(1000)

    if(p==1){
      break;
    }
    p=p-1
  }
  w.close();
  return true
}
