/**
 * 作者:  家
 * QQ:    203118908
 * 功能:  在ui中使用悬浮窗demo
 */
'ui';
ui.layout(
  <vertical>
    <button id='show'>显示悬浮窗</button>
    <button id='hide'>隐藏悬浮窗</button>
  </vertical>
)
var w;
ui.show.on('click',function(){
  toastLog('show')
  if(w){
    w.setSize(666,666)
  }else{
    threads.start(
      function(){
        w = floaty.rawWindow(
          <frame gravity="center" bg="#77ff0000">
              <text id="text" textSize='66sp' >悬浮文字</text>
          </frame>
        );
        w.setSize(666,666)
      }
    )
  }
})
ui.hide.on('click',function(){
  toastLog('hide')
  w.setSize(1,1)
})
setInterval(
  function(){
  },1000
)
