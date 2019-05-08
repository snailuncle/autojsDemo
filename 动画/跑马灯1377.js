/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   跑马灯主程序
 * 日期:   2019.3.4
 */
"ui";
var MarqueeView = (function() {
  //继承至ui.Widget
  util.extend(MarqueeView, ui.Widget);
  function MarqueeView() {
      //调用父类构造函数
      ui.Widget.call(this);
      //自定义属性key，定义在配置中保存时的key
      this.defineAttr("text", (view, attr, value, defineSetter)=>{
        view.content.setText(value);
    });
      this.defineAttr("textColor", (view, attr, value, defineSetter)=>{
        view.content.setTextColor(value);
        // view.content.setTextColor(colors.parseColor(value));
    });
      this.defineAttr("bg", (view, attr, value, defineSetter)=>{
        view.setBackgroundColor(value);
    });
  }
  MarqueeView.prototype.render = function() {
      return (
        <frame id="background">
          <text id="content"  layout_width='wrap_content' />
        </frame>
      );
  }
  MarqueeView.prototype.move = function() {
    var that=this;
    threads.start(
      function (){
        var sleepTime=rndNum(20,600)
        var moveDistance=rndNum(6,300)
        while(1){
          var view=that.view.content
          if(view  ){
            var x=view.x
            x=x-moveDistance
            ui.run(
              ()=>{
                view.setX(x)
              }
            )
            var right=view.x+view.getWidth()
            if(right<=0){
              ui.run(
                ()=>{
                  view.setX(device.width)
                }
              )
            }
          }
          sleep(sleepTime)
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
  MarqueeView.prototype.changeSome = function() {
    var that=this;
    var viewbg=that.view
    var viewfont=that.view.content
    var color=null;
    var size=null;
    //改变背景颜色
    color=rndColor()
    viewbg.setBackgroundColor(color)
    //改变字体颜色
    color=rndColor()
    viewfont.setTextColor(color)
    //改变字体大小
    size=rndNum(6,33)
    viewfont.setTextSize(size)

  }
  ui.registerWidget("MarqueeView", MarqueeView);
  return MarqueeView;
})();

ui.layout(
    <vertical id="parentView" text="parent">
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
        <MarqueeView text='作者QQ  203118908' />
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
          if(view.childCount>=30){
            for(var i=0;i<view.childCount;i++){
              var sonView=view.getChildAt(i)
              sonView.widget.changeSome()
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
