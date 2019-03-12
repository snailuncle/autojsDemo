// 发送广播:  android.intent.action.激活路飞
var action="android.intent.action.激活路飞"
app.sendBroadcast(
  {
    action:action,
    extras:{
      name:'哦雷瓦路飞',
      dream:'One Piece'
    }
  }
);
log('发送了广播',action)
