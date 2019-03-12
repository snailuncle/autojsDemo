
function 打开飞行模式() {
  // 打开飞行模式
  new Shell().exec("su -c 'settings put global airplane_mode_on 1; am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true'")
}

function 关闭飞行模式() {
  //关闭飞行模式
  new Shell().exec("su -c 'settings put global airplane_mode_on 0; am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false'")
}