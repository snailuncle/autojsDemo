/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   边缘跑马灯
 * 日期:   2019.3.4
 */
"ui";
// 四个位置: 左右上下
// 抽象为一个长条, 长度是长的二倍,分成三份,两条一模一样的彩色条纹
var width=device.width
var height=device.height
var oneThirdOfTheWidth=width/3
var oneThirdOfTheHeight=height/3
var twiceTheWidth=2 * width
var twiceTheHeight=2 * height
var threeTimesTheWidth=3 * width
var threeTimesTheHeight=3 * height
var MarqueeView = (function() {
  //继承至ui.Widget
  util.extend(MarqueeView, ui.Widget);
  var width=device.width
  var height=device.height
  var oneThirdOfTheWidth=width/3
  var oneThirdOfTheHeight=height/3
  var twiceTheWidth=2 * width
  var twiceTheHeight=2 * height
  function MarqueeView() {
      //调用父类构造函数
      ui.Widget.call(this);
  }
  MarqueeView.prototype.render = function() {
      return (
        <frame>
          <TableLayout w="{{threeTimesTheWidth}}px" layout_height="match_parent" stretchColumns="1">
            <TableRow>
              <linear id="firstView" >
                <button w="{{oneThirdOfTheWidth}}px" text='第一块' bg="#ff0000" />
                <button w="{{oneThirdOfTheWidth}}px" text='第二块' bg="#00ff00" />
                <button w="{{oneThirdOfTheWidth}}px" text='第三块' bg="#0000ff" />
              </linear>
              <linear id="secondView">
                <button w="{{oneThirdOfTheWidth}}px" text='第4块' bg="#ff0000" />
                <button w="{{oneThirdOfTheWidth}}px" text='第5块' bg="#00ff00" />
                <button w="{{oneThirdOfTheWidth}}px" text='第6块' bg="#0000ff" />
              </linear>
            </TableRow>
          </TableLayout>
        </frame>
      );
  }
  function 如果控件的x等于小于控件的宽度的负数说明控件在屏幕之外那么就把他的x设置为屏幕的宽度让他从右边开始往左边动(view,moveDistance){
    if(view.x<=-view.getWidth()+moveDistance){
      view.setX(device.width)
    }
  }
  function 控件每次左移一定距离(view,moveDistance){
    var x=view.x
    x=x-moveDistance
    ui.run(
      ()=>{
        view.setX(x)
      }
    )
  }
  MarqueeView.prototype.move = function() {
    var that=this;
    threads.start(
      function (){
        var sleepTime=20
        var moveDistance=10
        while(1){
          var secondView=that.view.secondView
          if(secondView){
            var x=secondView.x
            secondView.setX(x-moveDistance)
            break;
          }
          sleep(10)
        }

        while(1){
          var firstView=that.view.firstView
          var secondView=that.view.secondView
          if(firstView && secondView  ){
            var viewArr=[firstView,secondView]
            for(let i=0;i<viewArr.length;i++){
              var view=viewArr[i]
                  如果控件的x等于小于控件的宽度的负数说明控件在屏幕之外那么就把他的x设置为屏幕的宽度让他从右边开始往左边动(view,moveDistance)
                  控件每次左移一定距离(view,moveDistance)
            }
          }
          sleep(sleepTime)
        }
      }
    )
  }
  ui.registerWidget("MarqueeView", MarqueeView);
  return MarqueeView;
})();
ui.layout(
    <frame w="{{width}}" id="parentView" text="parent">
        <MarqueeView id="mv" text='作者QQ  203118908' />
    </frame>
);
setTimeout(
  fn,1000
)
function fn(){
  ui.mv.widget.move()
}
