/**
 * 作者:   家
 * QQ:     203118908
 * 功能:   悬浮窗和ui一起使用的例子
 */

"ui";
require('./浏览器窗口.js')
threads.start(
  function(){
    require('./小红点悬浮球.js')
  }
)

