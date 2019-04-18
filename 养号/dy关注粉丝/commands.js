var config=require('./抖音config.js')
var Command=require('./Command.js')
var common=require('./common.js')

var 从下往上滑动指定次数Command=new Command('从下往上滑动指定次数',1000)
function 从下往上滑动指定次数(滑动次数){
  var duration=200
  var x1=610
  var y1=1517
  var x2=605
  var 粉丝列表一个粉丝的高度=config.粉丝列表一个粉丝的bounds[3]-config.粉丝列表一个粉丝的bounds[1]
  var y2=y1-粉丝列表一个粉丝的高度
  for(var i=0;i<滑动次数;i++){
    swipe(x1, y1, x2, y2, duration)
    sleep(30)
  }
}
从下往上滑动指定次数Command.setAction(从下往上滑动指定次数)

var pressViewCommand=new Command('点击控件')
function pressView(view){
  var viewBounds=view.bounds()
  var x = viewBounds.centerX()
  var y = viewBounds.centerY()
  press(x,y,1)
}
pressViewCommand.setAction(pressView)
var pressCommand=new Command('点击',100)
function myPress(x,y){
  var x=arguments[0]
  var y=arguments[1]
  press(x,y,1)
}
pressCommand.setAction(myPress)
var 从右往左滑动Command=new Command('从右往左滑动',500)
function 从右往左滑动(){
  var duration=100
  var x1=1026
  var y1=1218
  var x2=118
  var y2=1217
  swipe(x1, y1, x2, y2, duration)
}
从右往左滑动Command.setAction(从右往左滑动)
var 点击粉丝按钮Command=new Command('点击粉丝按钮',3000)
function 点击粉丝按钮(){
  var 粉丝按钮=common.exist(config.主播详情页的粉丝按钮属性)
  if(粉丝按钮 && 粉丝按钮.bounds && 粉丝按钮.bounds()){
    var 粉丝按钮bounds=粉丝按钮.bounds()
    var x=粉丝按钮bounds.centerX()
    var y=粉丝按钮bounds.centerY()
    log('点击粉丝按钮Command的x,y=')
    log(x,y)
    pressCommand.go(x,y)
  }
}
点击粉丝按钮Command.setAction(点击粉丝按钮)

var 从下往上滑动Command=new Command('从下往上滑动',2000)
function 从下往上滑动(){
  var duration=100
  var x1=570
  var y1=1361
  var x2=588
  var y2=493
  swipe(x1, y1, x2, y2, duration)
}
从下往上滑动Command.setAction(从下往上滑动)

commands={}

commands.从下往上滑动指定次数Command=从下往上滑动指定次数Command
commands.pressCommand=pressCommand
commands.从右往左滑动Command=从右往左滑动Command
commands.点击粉丝按钮Command=点击粉丝按钮Command
commands.从下往上滑动Command=从下往上滑动Command
commands.pressViewCommand=pressViewCommand


module.exports=commands
