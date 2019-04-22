threads.start(
  function(){
    //请求截图
    if(!requestScreenCapture()){
      alert("请求截图失败");
      // exit();
      return false
    }
  }
)

var flag=false;
var mainId=false;
var window=floaty.rawWindow(
  <button id='action' text='开始' bg='#ffc107' textSize='20sp' w="150px" h="150px" ></button>
)
window.setPosition(0,device.height/5*4)
function clickAction(){
  if(flag){
    flag=false
    if(mainId && mainId.isAlive()){
      ui.run(
        function(){
          window.action.setText('开始')
        }
      )
      mainId.interrupt()
    }
  }else{
    flag=true
    ui.run(
      function(){
        window.action.setText('停止')
      }
    )
    mainId=threads.start(
      function(){
        try{
          关注三个男粉丝主程序()
        }catch(e){
          log('mainId error')
          log(e)
        }
      }
    )
  }
}
悬控移动和点击(window,'action',window.action,clickAction)

setInterval(
  ()=>{},1000
)




function 关注三个男粉丝主程序(){


  var common=require('./common.js')
  var Command=require('./Command.js')
  var Page=require('./Page.js')



  var config=require('./appConfig.js')
  var 关注三个男粉丝=require('./关注三个男粉丝.js')
  var commands=require('./commands.js')


  var 首页=new Page('首页')
  var 主播详情页=new Page('主播详情页')
  var 粉丝列表页=new Page('粉丝列表页')
  var 粉丝详情页=new Page('粉丝详情页')
  // 每个页面正常执行的操作
  var 首页action=function(){
    log('开始执行首页action')
    commands.从右往左滑动Command.go()
    log('结束执行首页action')
  }
  首页.setAction(首页action)
  var 主播详情页action=function(){
    commands.点击粉丝按钮Command.go()
  }
  主播详情页.setAction(主播详情页action)
  var 粉丝列表页action=function(){
    关注三个男粉丝()
  }
  粉丝列表页.setAction(粉丝列表页action)
  // 动作失败后执行的操作
  function 返回首页(){
    var back次数=0
    while(1){
      back();
      sleep(config.一般动作执行后需等待的时间)
      var result=是不是首页()
      if(result){
        log('回到了首页'+back次数)
        return true
      }else{
        log('还没有回到首页'+back次数)
      }
      back次数++;
    }
  }
  var 首页onFailure=function(){
    返回首页()
  }
  首页.setOnFailure(首页onFailure)
  var 主播详情页onFailure=function(){
    返回首页()
  }
  主播详情页.setOnFailure(主播详情页onFailure)
  var 粉丝列表页onFailure=function(){
    返回首页()
  }
  粉丝列表页.setOnFailure(粉丝列表页onFailure)

  var 首页check=function(){
    return 是不是主播详情页()
  }
  首页.setCheck(首页check)
  var 主播详情页check=function(){
    return 是不是粉丝列表页()
  }
  主播详情页.setCheck(主播详情页check)
  var 粉丝列表页check=function(){
    return true
  }
  粉丝列表页.setCheck(粉丝列表页check)



  // var 首页=new Page('首页')
  // var 主播详情页=new Page('主播详情页')
  // var 粉丝列表页=new Page('粉丝列表页')
  // var 粉丝详情页=new Page('粉丝详情页')

  function 查找首页主播名字(){
    var 主播名字控件=common.exist(config.首页的主播名字按钮属性)
    if(主播名字控件){
      return 主播名字控件.text()
    }
    return ''
  }

  // =================主程序开始==============================================
  while(1){
    var 首页主播名字start=查找首页主播名字()
    首页.go()
    if(首页.success){
      log('首页动作执行成功')
      主播详情页.go()
      if(主播详情页.success){
        log('主播详情页动作执行成功')
        关注三个男粉丝()
      }else{
        log('主播详情页动作执行失败')
      }
    }else{
      log('首页动作执行失败')
    }
    返回首页()
    while(1){
      commands.从下往上滑动Command.go()
      var 首页主播名字end=查找首页主播名字()
      if(首页主播名字end === 首页主播名字start){
        log('首页主播名字end===首页主播名字start')
        log(首页主播名字start)
        log(首页主播名字end)
      }else{
        log('首页主播名字end!==首页主播名字start')
        log(首页主播名字start)
        log(首页主播名字end)
        break;
      }
    }
  }

  // =================主程序结束==============================================









  function 是不是首页(){
    var result=common.exist(config.首页的首页按钮属性)
    return result
  }
  function 是不是主播详情页(){
    var result=common.exist(config.主播详情页的获赞按钮属性)
    return result
  }
  function 是不是粉丝列表页(){
    var ca=currentActivity()
    if(ca===config.粉丝列表页activity){
      return true
    }
  }
  function 是不是粉丝详情页(){
    var ca=currentActivity()
    if(ca===config.粉丝详情页activity){
      return true
    }
  }




}

function 悬控移动和点击(window,viewName,view,clickAction){
  log('您的view是->',viewName)
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
              if(new Date().getTime() - downTime > 10000){
                  exit();
              }
              return true;
          case event.ACTION_UP:
              //手指弹起时如果偏移很小则判断为点击
              if(Math.abs(event.getRawY() - y) < 10 && Math.abs(event.getRawX() - x) < 5){
                  onClick(clickAction);
              }
              return true;
      }
      return true;
  });



}
