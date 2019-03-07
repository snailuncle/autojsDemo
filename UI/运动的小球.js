/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   小球边缘运动
 * 日期:   2019.3.5
 */
"ui";
var MarqueeView = (function() {
  //继承至ui.Widget
  util.extend(MarqueeView, ui.Widget);
  function MarqueeView() {
      //调用父类构造函数
      ui.Widget.call(this);
      this.defineAttr("speed", (view, name, defaultGetter) => {
        return this.speed;
      }, (view, name, value, defaultSetter) => {
        this.speed = value;
      });
  }
  MarqueeView.prototype.render = function() {
      return (
        <img  id="ball" src="@drawable/ic_stars_black_48dp"
         circle="true" layout_width="wrap_content" layout_height="wrap_content"   />
      );
  }
  function getInfo(view){
    var width=view.getWidth()
    var height=view.getHeight()
    var left=view.x
    var right=left+width
    var top=view.y
    var bottom=top+height
    ui.run(
      ()=>{
        view.left=left
        view.right=right
        view.top=top
        view.bottom=bottom
        view.setRightPosition=function (position){
          view.setX(position-width)
        }
      }
    )
    return view
  }
  function ballMove(ball,startPoint,endPoint,sleepTime,moveDistance){
    log("ballMove             66666666666")
    var sleepTime=ball.sleepTime || sleepTime
    var moveDistance=ball.moveDistance || moveDistance
    var startX=startPoint.x
    var endX=endPoint.x
    var startY=startPoint.y
    var endY=endPoint.y
    if(startX==endX){
      var start=startY
      var end=endY
      var flag="y"
    }else if(startY==endY){
      var start=startX
      var end=endX
      var flag="x"
    }else{
      alert('你自己加运动方式')
      exit()
    }
    log('运动轴是',flag)
    if(flag=="x"){
      moveDistance=end-start>0 ? moveDistance : moveDistance * -1
      var count=0
      var MaxCount=Math.abs(Math.floor(Math.abs(end-start) / moveDistance))
      log('运动次数=',MaxCount)
      while(count<=MaxCount){
        var position=start+moveDistance*count++;
        ball.setX(position)
        sleep(sleepTime)
      }
    }else if(flag=="y"){
      moveDistance=end-start>0 ? moveDistance : moveDistance * -1
      var count=0
      var MaxCount=Math.abs(Math.floor(Math.abs(end-start) / moveDistance))
      while(count<=MaxCount){
        var position=start+moveDistance*count++;
        ball.setY(position)
        sleep(sleepTime)
      }
    }else{
      alert('flag=',flag)
      exit()
    }
  }
  MarqueeView.prototype.move = function() {
    var that=this;
    var moveThread=threads.start(
      function (){
        var sleepTime=rndNum(20,100)
        var moveDistance=rndNum(20,100)
        while(1){
          var view=that.view.ball
          view=getInfo(view)
          view.sleepTime=sleepTime
          view.moveDistance=moveDistance
          if(view  ){
            log('viewyyyyyyyyyyyyyyyyyyyyy')
            var startPoint=null;
            var endPoint=null;
            //左面,从下往上
            startPoint={
              x:0,
              y:view.y
            }
            endPoint={x:0,y:0}
            log('左面运动开始')
            ballMove(view,startPoint,endPoint)
            log('左面运动结束')
            //上面,从左往右
            startPoint={x:0,y:0}
            endPoint={x:device.width-view.width,y:0}
            log('上面运动开始')
            ballMove(view,startPoint,endPoint)
            log('上面运动结束')
            //右面,从上往下
            startPoint=endPoint
            endPoint={x:device.width-view.width,y:device.height-view.height}
            log('右面运动开始')
            ballMove(view,startPoint,endPoint)
            log('右面运动结束')
            //下面,从右往左
            startPoint=endPoint
            endPoint={x:0,y:device.height-view.height}
            log('下面运动开始')
            ballMove(view,startPoint,endPoint)
            log('下面运动结束')
            //左面,从下往上
            startPoint=endPoint
            endPoint={x:0,y:0}
            log('左面运动开始')
            ballMove(view,startPoint,endPoint)
            log('左面运动结束')
            if(moveThread){
              moveThread.interrupt();
            }
          }
          // sleep(sleepTime)
        }
      }
    )
  }
  function rndNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  function rndColor(){
    return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
  }
  ui.registerWidget("MarqueeView", MarqueeView);
  return MarqueeView;
})();
ui.layout(
  <vertical>
    <vertical id="parentView" text="parent">
        <MarqueeView />
        <MarqueeView />
        <MarqueeView />
        <MarqueeView />
        <MarqueeView />
        <MarqueeView />
        <MarqueeView />
        <MarqueeView />
    </vertical>
     <button id="ok" text="结束"/>
  </vertical>
);
threads.start(
  function(){
    var flag=false
    while(1){
      ui.run(
        function(){
          var view=ui.parentView
          log("view.childCount=",view.childCount)
          if(view.childCount>=8){
            for(var i=0;i<view.childCount;i++){
              var sonView=view.getChildAt(i)
              sonView.widget.move()
            }
            flag=true;
          }
        }
      )
      if(flag){
        break
      }
      sleep(100)
    }
  }
)
ui.ok.on("click", function () {
  ui.finish()
  exit()
});
