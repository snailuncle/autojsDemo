// Page
// Command


// threads.start(
//   function(){
//     //请求截图
//     if(!requestScreenCapture()){
//       alert("请求截图失败");
//       // exit();
//       return false
//     }
//   }
// )



var Page=require('./Page.js')
var Command=require('./Command.js')
var config=require('./appConfig.js')
var common=require('./common.js')
var commands=require('./commands.js')

var 粉丝列表一个粉丝的bounds=config.粉丝列表一个粉丝的bounds
var 粉丝高度=粉丝列表一个粉丝的bounds[3]-粉丝列表一个粉丝的bounds[1]
var 粉丝宽度=粉丝列表一个粉丝的bounds[2]-粉丝列表一个粉丝的bounds[0]

function 获取parentView(){
  var propFeature=config.粉丝列表页的列表parentView属性
  var parentView=common.exist(propFeature)
  return parentView
}
function 获取合格粉丝view(parentView,已经标记过的粉丝){
  // 点击所有可见的粉丝
  var childCount=parentView.childCount()
  log('childCount=',childCount)
  if(childCount<1){
    return ;
  }
  for(var i=0;i<childCount;i++){
    var child=parentView.child(i)
    log('当前粉丝是')
    log(child)

    try{
      // 画出控件区域(child,2000,i)
      var childBounds=child.bounds()
      var childWidth=childBounds.width()
      var childHeight=childBounds.height()
      var childNameView=child.child(1)
      var child关注状态View=child.child(2)
      childName=childNameView.child(0).child(0).text()
      child关注状态=child关注状态View.child(0).child(0).text()


    }catch(e){
      log('遍历粉丝列表出现错误')
      log(e)
      log(e.stack)
      continue;
    }




    log('childWidth === 粉丝宽度',childWidth === 粉丝宽度)
    log('childHeight === 粉丝高度',childWidth === 粉丝宽度)
    log('child关注状态 === "关注"',childWidth === 粉丝宽度)
    log('已经标记过的粉丝=')
    log(已经标记过的粉丝)
    if(已经标记过的粉丝.indexOf(childName)>-1){
      continue;
    }
    if(childWidth === 粉丝宽度 && childHeight === 粉丝高度 && child关注状态 === '关注'){
      log('该粉丝合格')
      return [child,childName]
    }else{
      log('该粉丝不合格')
      continue;
    }
  }
}
function 关注三个男粉丝(){
  var startTime=new Date().getTime();
  var endTime=new Date().getTime();
  var spendTime=endTime-startTime;
  var 已关注的男粉丝数量=0;
  var 已经标记过的粉丝=[]
  while(1){
    sleep(1000)
    var parentView=获取parentView()
    if(parentView){
      log('找到了粉丝列表页parentView')
    }else{
      log('没有找到粉丝列表页parentView')
      return;
    }

    try{
      var 合格粉丝=获取合格粉丝view(parentView,已经标记过的粉丝)
      log('合格粉丝=')
      log(合格粉丝)
      if(合格粉丝){
        log('找到了合格粉丝')
        log(合格粉丝)
      }else{
        log('没有找到合格粉丝')
        // 从下往上滑动
        commands.从下往上滑动指定次数Command.go(6)
        continue ;
      }
      已经标记过的粉丝.push(合格粉丝[1])
      log('点开粉丝开始')
      点开粉丝(合格粉丝[0])
      log('点开粉丝结束')
      log('判断性别开始')
      var 性别=判断性别()
      log('判断性别结束')
      log('粉丝性别是男就点击关注开始')
      var 有效关注=粉丝性别是男就点击关注(性别)
      log('粉丝性别是男就点击关注结束')
      if(有效关注){
        已关注的男粉丝数量++;
      }
      log('返回粉丝列表开始')
      返回粉丝列表()
      log('返回粉丝列表结束')

    }catch(e){
      log('关注三个男粉丝发生错误')
      log(e)
      log(e.stack)
    }

    var 暂时没有更多了view=text('暂时没有更多了').depth(10).visibleToUser().findOnce()
    if(暂时没有更多了view){
      log('发现了暂时没有更多了view')
      return ;
    }

    if(已关注的男粉丝数量>=3){
      return ;
    }
    endTime=new Date().getTime();
    spendTime=endTime-startTime;
    if(spendTime>config.粉丝列表页关注男粉丝的限制时长){
      log('一分钟了,还没有合格的粉丝,闪人')
      return ;
    }

  }






}


function 点开粉丝(合格粉丝){
  commands.pressViewCommand.go(合格粉丝)
}
function 判断性别(){
  var 粉丝详情页资料view=查找粉丝详情页资料view()
  if(粉丝详情页资料view){
    //截图
    var img = captureScreen();
    var 粉丝详情页资料viewBounds=粉丝详情页资料view.bounds()
    var left=粉丝详情页资料viewBounds.left
    var top=粉丝详情页资料viewBounds.top
    var width=粉丝详情页资料viewBounds.width()
    var height=粉丝详情页资料viewBounds.height()
    log(img,left,top,width,height)
    if(isBoy(img,left,top,width,height)){
      return '男'
    }
    if(isGirl(img,left,top,width,height)){
      return '女'
    }
    return '人妖'
  }
  return '人妖'
}
function 查找粉丝详情页资料view(){
  // for (var i = 0; i < config.控件查找次数; i++) {
  for (var i = 0; i < 1; i++) {
    var view=common.exist(config.粉丝详情页资料view属性)
    // var view=id(config.粉丝详情页资料id).findOnce()
    if (view) {
      log(arguments.callee.name + '=')
      log(view)
      if(view.bounds().width()<1){
        continue;
      }
      log(arguments.callee.name + '成功')
      // 画出控件区域(view,3000)
      // 画出控件区域(view,3000,i+'粉丝详情页')
      return view
    }
  }
  log(arguments.callee.name + '失败')
  // exit()
  return false
}
function 粉丝性别是男就点击关注(性别){
  if(性别===config.要关注的粉丝性别){
    return 点击关注按钮()
  }
}
function 点击关注按钮(){
  var 关注按钮=common.exist(config.粉丝详情页关注按钮属性)
  if(关注按钮){
    commands.pressViewCommand.go(关注按钮)
    return true;
  }
}
function 返回粉丝列表(){
  back()
  sleep(config.一般动作执行后需等待的时间)
}

function isBoy(img,left,top,width,height){
  //在该图片中找色，指定找色区域为在位置(400, 500)的宽为300长为200的区域，指定找色临界值为4
  var point = findColor(img, config.boyColor, {
    region: [left,top,width,height],
    threshold: 10
  });
  if(point){
    toastLog("男");
    return true
  }
}
function isGirl(img,left,top,width,height){
  var point = findColor(img, config.girlColor, {
    region: [left,top,width,height],
    threshold: 10
  });
  if(point){
    toastLog("女");
    return true
  }
}


// 关注三个男粉丝()



module.exports=关注三个男粉丝












// if('android.widget.FrameLayout'===child.className()){
//   continue
// }
