
function 悬控移动和点击(window,viewName,view,clickAction){
  log('您点击的view是->',viewName)
  var show=function(){toast('view被点了')}
  //记录按键被按下时的触摸坐标
  var x = 0, y = 0;
  //记录按键被按下时的悬浮窗位置
  var windowX, windowY;
  //记录按键被按下的时间以便判断长按等动作
  var downTime;
  var onClick=show
  if(clickAction){
    onClick=()=>{clickAction()}
  }


  view.setOnTouchListener(function(view, event){
      switch(event.getAction()){
          case event.ACTION_DOWN:
              x = event.getRawX();
              y = event.getRawY();
              windowX = window.getX();
              windowY = window.getY();
              downTime = new Date().getTime();
              return true;
          case event.ACTION_MOVE:
              //移动手指时调整悬浮窗位置
              window.setPosition(windowX + (event.getRawX() - x),
                  windowY + (event.getRawY() - y));
              //如果按下的时间超过5秒判断为长按，退出脚本
              if(new Date().getTime() - downTime > 5500){
                  exit();
              }
              return true;
          case event.ACTION_UP:
              //手指弹起时如果偏移很小则判断为点击
              if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                  onClick(clickAction);
              }
              return true;
      }
      return true;
  });



}


module.exports=悬控移动和点击

