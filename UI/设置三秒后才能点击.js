var window=floaty.rawWindow(
  <horizontal gravity="center">
    <button id="点击按钮" text="第一个按钮"/>
  </horizontal>
);
w=Math.floor(device.width)
h=Math.floor(device.height/8)
window.setSize(w,h)
window.setPosition(0,device.height/3)
setInterval(()=>{},3000)
function 延迟函数测试(){
  threads.start(
    function () {
      log('延迟函数测试开始')
      sleep(1000)
      log('延迟函数测试结束')
    }
  )
}
//移动窗口
var x=0
var y=0
var windowX
var windowY
var wX
var wY
window.点击按钮.setOnTouchListener(
  function (view,event){
    // log(event.getAction())
    switch (event.getAction()){
      case event.ACTION_DOWN:
        x=event.getRawX()
        y=event.getRawY()
        windowX=window.getX()
        windowY=window.getY()
        return true
      case event.ACTION_MOVE:
      //移动手指调整悬浮窗位置
       window.setPosition(windowX+(event.getRawX()-x),windowY+(event.getRawY()-y))
       wX=window.getX()
       wY=window.getY()
       return true
      case event.ACTION_UP:
      //偏移很小视为点击
      if(
        Math.abs(event.getRawY()-y)<5 &&
        Math.abs(event.getRawX()-x)<5
        )
        {
          log('点击')
          toastLog('点击了按钮')
          window.点击按钮.setEnabled(false)
          setTimeout(function(){
          window.点击按钮.setEnabled(true)
          },3000);
          延迟函数测试()
        }
       window.setPosition(windowX+(event.getRawX()-x),windowY+(event.getRawY()-y))
       wX=window.getX()
       wY=window.getY()
       return true
    }
    return true;
    sleep(300)
  }
)

