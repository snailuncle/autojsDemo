/**
 * 作者:  家
 * QQ:    203118908
 * 功能:  一个小白点控制一个悬浮窗
 * 功能:  可以显示地理位置和ip
 * 备注:   代码太多,不想整理,能用即可,我估计我过几天也看不懂了.
 * 备注:   点击隐藏,的时候,小白点在右上角,是一个长方形
 */



//小白点负责控制台的隐藏和显示
var storage = storages.create("悬浮窗信息");
// storages.remove('悬浮窗信息')
var 小白点边长=100
var 透明度='ff'
var 小白点背景色=util.format('#%sff0000',透明度)
var 小白点悬浮球 = floaty.rawWindow(
  <frame  >
    <text id='小白点'   bg='{{小白点背景色}}'/>
  </frame>
)
小白点悬浮球.setPosition(device.width-小白点边长, device.height / 2)
小白点悬浮球.setSize(小白点边长,小白点边长)
setInterval(() => {}, 3000)
// module.exports=小白点悬浮球
//需要一个信息显示所在地和ip,实时更新的
// var 信息显示 = floaty.rawWindow(
//   <vertical  bg="#00ffff00">
//     <text id='ip' text='ip' />
//     <text id='所在地' text='所在地' />
//   </vertical>
// )
var marginSize=3
var 信息显示margin=new Array(4).join(marginSize+' ')
var 信息显示 = floaty.rawWindow(
  <vertical bg='#FFB6C1' gravity="center" >
    <TableLayout layout_width="wrap_content" layout_height="wrap_content" stretchColumns="1" gravity="center">
      <TableRow gravity="center">
        <vertical gravity="center">
          <horizontal gravity="center">
            <text   layout_weight="2" margin="{{信息显示margin}}" textSize='20sp' id='信息显示' textStyle='bold|italic' textColor='#DA70D6' gravity="center" layout_width="0dp">信息显示</text>
            <text  layout_weight="1"  margin="{{信息显示margin}}" textSize='20sp' id='隐藏' textStyle='bold|italic' textColor='#DA70D6' gravity="center" layout_width="0dp">隐藏</text>
          </horizontal>
        </vertical>
      </TableRow>
      <TableRow>
        <horizontal>
          <text  gravity="center"  text='ip: ' layout_weight="2" layout_width="0dp"  margin="{{信息显示margin}}"  />
          <text id='ip'   margin="{{信息显示margin}}"  layout_weight="4"  bg='#D8BFD8'  singleLine="true"  layout_width="0dp" >123123123123</text>
        </horizontal>
      </TableRow>
      <TableRow>
        <horizontal>
          <text  gravity="center" singleLine="true"   margin="{{信息显示margin}}"  text='所在地: ' layout_weight="2" layout_width="0dp" />
          <text id='所在地'  singleLine="true" layout_weight="4"  bg='#D8BFD8' layout_width="0dp"  margin="{{信息显示margin}}"  >北京四环以内</text>
        </horizontal>
      </TableRow>
    </TableLayout>
  </vertical>
  )
  信息显示.setPosition(device.width/2, device.height / 2)
  function View点击事件(window,viewName,view,clickAction){
    this.window=window
    this.name=viewName
    this.view=view
    var 默认点击动作=()=>{
      // log('this.name'+this.name)
      // toast(this.name+'被点了')
    }
    this.clickAction = 默认点击动作
    if(clickAction){
      this.clickAction = clickAction
    }
    悬控移动和点击(window,viewName,view,clickAction)
  }
  View点击事件.prototype.setClickAction=function(clickAction){
    log('setClickAction')
    log(this.name)
    log("View点击事件.prototype.setClickAction=function(clickAction){")
    log(clickAction)
      悬控移动和点击(this.window,this.name,this.view,clickAction)
  }


// 显示ip和归属地
function 显示ip和归属地(){
  threads.start(
    function(){
      var info=查询本机IP地理位置()
      var ip=info.ip
      var geographicalPosition=info.geographicalPosition
      ui.run(
        function(){
          log('开始改变ip和地理位置信息')
          log(ip)
          log(geographicalPosition)
          信息显示.ip.setText(ip.toString())
          信息显示.所在地.setText(geographicalPosition.toString())

          log('结束改变ip和地理位置信息')
        }
      )

    }
  )
}

function 查询本机IP地理位置(){
  var ip地理位置 = false
  var ip地理位置正则 = /本机IP:&nbsp;\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}<\/span>([\s\S]*?)<\/td/
  var ipUrl = "http://www.baidu.com/s?ie=UTF-8&wd=ip%E5%BD%92%E5%B1%9E%E5%9C%B0%E6%9F%A5%E8%AF%A2"
  var r = http.get(ipUrl);
  log("code = " + r.statusCode);
  var htmlResult = r.body.string()
  ip地理位置 = ip地理位置正则.exec(htmlResult)
  if (ip地理位置) {
    ip地理位置 = ip地理位置正则.exec(ip地理位置)
    var 包含ip和地理位置的文本=ip地理位置[0]
    log('包含ip和地理位置的文本')
    log(包含ip和地理位置的文本)
    var 地理位置=ip地理位置[1]
    地理位置=地理位置.trim()
    var ip=包含ip和地理位置的文本.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)[0]
    // var ip=包含ip和地理位置的文本.match(/\d{1,3}\.{3}\d{1,3}/)
    toastLog(地理位置+'--'+ip)

    return {
      ip:ip,
      geographicalPosition:地理位置
    }
  } else {
    toastLog('没有查询到Ip地理位置,脚本停止')
  }

}







var 小白点悬浮球的小白点点击事件=new View点击事件(小白点悬浮球,'小白点',小白点悬浮球.小白点)
小白点悬浮球的小白点点击事件.setClickAction(显示小白点)
function 显示小白点(){
  小白点悬浮球.小白点.attr('bg',小白点背景色)
  小白点悬浮球.setPosition(device.width-小白点悬浮球.getWidth(), device.height / 2)
  小白点悬浮球.setSize(小白点边长,小白点边长)
  var window=信息显示
  if(window在屏幕之内(window)){
    var xy=[window.getX(),window.getY()]
    storage.put('信息显示',JSON.stringify(xy))
    var endXY;
    endXY=[-(window.getWidth()),window.getY()]
    滑动效果(window,endXY)
  }else{
    //如果有上次的位置,那么就放到上次的位置,否则放到屏幕中间
    var xy=storage.get('信息显示')
    if(xy){
      xy=JSON.parse(xy)
      var x=xy[0]
      var y=xy[1]
      window.setPosition(x,y)
    }else{
      var x=device.width/3
      var y=device.width/2
      window.setPosition(x,y)
    }
  }
  显示ip和归属地()
}
function window在屏幕之内(window){
  var x=window.getX()
  var y=window.getY()
  var w=window.getWidth()
  var h=window.getHeight()
  var centerX=x+w/2
  var centerY=y+h/2
  if(centerX>0 && centerX<device.width &&centerY>0 && centerY<device.height){
    return true
  }else{
    return false
  }
}
var 信息显示的信息显示点击事件=new View点击事件(信息显示,'信息显示',信息显示.信息显示)
var 信息显示的隐藏点击事件=new View点击事件(信息显示,'隐藏',信息显示.隐藏)
log(信息显示的隐藏点击事件)
log('信息显示的隐藏点击事件 开始设置 setClickAction')
信息显示的隐藏点击事件.setClickAction(隐藏信息显示界面并透明化小白点)
log('信息显示的隐藏点击事件 结束设置 setClickAction')
log('信息显示的隐藏点击事件.clickAction')
log(信息显示的隐藏点击事件.clickAction.toString())
function 隐藏信息显示界面并透明化小白点(){
  log('隐藏信息显示界面并透明化小白点')
  // 先记录此时窗口的位置
  var xy=[信息显示.getX(),信息显示.getY()]
  storage.put('信息显示',JSON.stringify(xy))
  var endXY;
  endXY=[-(信息显示.getWidth()),信息显示.getY()]
  滑动效果(信息显示,endXY)
  小白点悬浮球.小白点.attr('bg','#00000000')
  //把小白点边长
  小白点悬浮球.setSize(小白点悬浮球.getWidth(),600)
  小白点悬浮球.setPosition(小白点悬浮球.getX(),device.height/5)
}
function 悬控移动和点击(window,viewName,view,clickAction){
  log('clickAction')
  log(clickAction)
  var show=function(){
    var msg=util.format('[ %s ]    被点了',viewName)
    toastLog(msg)
  }
  //记录按键被按下时的触摸坐标
  var x = 0, y = 0;
  //记录按键被按下时的悬浮窗位置
  var windowX, windowY;
  //记录按键被按下的时间以便判断长按等动作
  var downTime;
  var onClick=show
  log(viewName)
  log('clickAction')
  log(clickAction)
  if(clickAction){
    log('clickAction=true')
    onClick=()=>{clickAction()}
  }else{
    log('clickAction=false')
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
                log('//手指弹起时如果偏移很小则判断为点击')
                log('clickAction=')
                log(clickAction)
                  onClick(clickAction);
              }
              return true;
      }
      return true;
  });
}
function 滑动效果(window,endXY,spendTime){
  var startXY=[
    window.getX(),
    window.getY()
  ]
  var spendTime=spendTime || 100
  spendTime=spendTime <100 ? 100 : spendTime
  var dis=两点距离(startXY,endXY)
  var 每次移动距离=10
  var 一共移动多少份距离=dis/每次移动距离
  // intervalTime
  var intervalTime=spendTime/一共移动多少份距离
  var 两个坐标之间的坐标集合=输入两个坐标之间的坐标集合(startXY, endXY)
  // log('两个坐标之间的坐标集合')
  // log(两个坐标之间的坐标集合)
  if(两个坐标之间的坐标集合.length<2){
    // log("两个坐标之间的坐标集合.legnth<=1")
    // log(两个坐标之间的坐标集合)
    return '两个坐标一样';
  }
  var 最终要移动的坐标集合=压缩数组(两个坐标之间的坐标集合,一共移动多少份距离)
  threads.start(
    function(){
      for(var i=0;i<最终要移动的坐标集合.length;i++){
        var xy=最终要移动的坐标集合[i]
        window.setPosition(xy[0], xy[1])
        sleep(intervalTime)
      }
    }
  )
}
function 两点距离(xy1, xy2) {
  var dx = Math.abs(xy2[0] - xy1[0]);
  var dy = Math.abs(xy2[1] - xy1[1]);
  var dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  return dis  // return parseInt(dis)
}
function 输入两个坐标之间的坐标集合(xy1, xy2) {
  // log(" 输入两个坐标之间的坐标集合(xy1, xy2)")
  // log(xy1, xy2)
  var x1 = xy1[0]
  var y1 = xy1[1]
  var x2 = xy2[0]
  var y2 = xy2[1]
  var xyArr = [xy1]
  var distance = Math.pow(((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)), 0.5);
  if (distance == 0) {
    var result=[
      xy1
    ]
    return result
  }
  var xUnit = (x2 - x1) / distance
  var yUnit = (y2 - y1) / distance
  for (var i = 0; i <= distance; i++) {
    var xTemp = xUnit * i
    var yTemp = yUnit * i
    xyArr.push([Math.floor(xTemp + x1), Math.floor(yTemp + y1)])
  }
  xyArr.push(xy2)
  return xyArr
}
function 压缩数组(arr,多于多少个压缩数组){
  // var newArr=[arr[0]]
  var newArr=[]
  var count=arr.length
  var 多于100的个数=count-多于多少个压缩数组
  var 倍数=Math.floor(count/多于多少个压缩数组)
  for(var i=0;i<arr.length;i++){
    if(Number.isInteger(i/倍数)){
      newArr.push(arr[i])
    }
  }
  newArr.push(arr[arr.length-1])
  return newArr
}
