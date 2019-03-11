
/**
 * 作者: 家
 * QQ:   203118908
 * 功能:  scroll的使用
 */
"ui";
// scrollView.scrollTo(0, scrollView.getChildAt[0].getMeasuredHeight() - scrollView.getHeight());
importClass(android.widget.TextView)
importClass(android.widget.Button)
ui.layout(
  <vertical id="帮主"  layout_width="wrap_content" layout_gravity="fill_horizontal">
  <vertical>
  <horizontal>
    <button id="管家" textSize="16sp" margin="8" gravity="center" >管家加人</button>
    <button id="白夫人" textSize="16sp" margin="8" gravity="center" >白夫人减人</button>
    <button id="乔峰" textSize="16sp" margin="8" gravity="center" >乔峰加布局</button>
  </horizontal>
  <horizontal>
    <button id="邓紫棋" textSize="16sp" margin="8" gravity="center" >增加泡沫按钮</button>
    <button id="邓紫棋的泡沫" textSize="16sp" margin="8" gravity="center" >遍历显示泡沫按钮</button>
  </horizontal>
  </vertical>
  <scroll id='scroll'  fillViewport="true">
  <vertical id="scrollVertical"  focusable="true"  focusableInTouchMode="true">
  </vertical>
  </scroll>
  </vertical>
)
var num=function(){
  var current=0
  return function(){
    return current++
  }
}()
var 泡沫列表=[]
function 遍历显示所有泡沫按钮(泡沫列表){
  var scrollView=ui.scroll
  threads.start(
    function(){
      泡沫列表.map(
        (泡沫)=>{
          ui.run(
            function(){
              泡沫.attr('bg',getRndColor())
              scrollView.scrollTo(0,  泡沫.getTop());
            }
          )
          sleep(800)
        }
      )
    }
  )
}
function 到底(){
  var scrollView=ui.scroll
  scrollView.scrollTo(0, ui.scrollVertical.getMeasuredHeight() - scrollView.getHeight());
}
function 到顶(){
  var scrollView=ui.scroll
  scrollView.scrollTo(0, 0);
}
var 帮主 = ui.scrollVertical
// var 帮主 = ui.帮主
ui.邓紫棋的泡沫.click(
  () => {
    遍历显示所有泡沫按钮(泡沫列表)
  }
)
ui.邓紫棋.click(
  () => {
    addButtonView(帮主)
    到底()
  }
)
ui.管家.click(
  () => {
    addTextView(帮主)
    到底()
  }
)
ui.白夫人.click(
  () => {
    delView(帮主)
    到顶()
  }
)
ui.乔峰.click(
  () => {
    log('加布局开始')
    addLayout(帮主)
    log('加布局结束')
    到底()
  }
)
function delView(parent) {
  log('得不到的就毁掉它')
  parent.removeView(parent.getChildAt(1))
}
function addTextView(parent) {
  // var child = view
  var child = new TextView(context);
  child.setTextSize(20);
  child.setTextColor(colors.parseColor("#ff00f0"))
  child.setText("左护法");
  child.setGravity(0); //左护法
  parent.addView(child);
  log(child)
  var child = new TextView(context);
  child.setTextSize(20);
  child.setTextColor(colors.parseColor("#ff00f0"))
  child.setText("大长老"); //中间的是大长老
  child.setGravity(1);
  parent.addView(child);
  log(child)
  var child = new TextView(context);
  child.setTextSize(20);
  child.setTextColor(colors.parseColor("#ff00f0"))
  child.setText("右护法");
  child.setGravity(5); //右护法
  parent.addView(child);
  log(child)
}
function addButtonView(parent) {
  // var child = view
  var child = new Button(context);
  child.setTextSize(20);
  child.setTextColor(colors.parseColor("#ff00f0"))
  child.setText("泡沫"+num()); //中间的是大长老
  child.setGravity(1);
  parent.addView(child);
  log(child)
  泡沫列表.push(child)
}
function addLayout(parent) {
  var layo = new android.widget.LinearLayout(context)
  // var layo=android.widget.FrameLayout.LinearLayout(context)
  layo.setOrientation(android.widget.LinearLayout.HORIZONTAL);
  layo.setId(android.view.View.generateViewId())
  // layo.setOrientation( android.widget.FrameLayout.LinearLayout.VERTICAL );
  var child1 = new TextView(context);
  child1.setTextSize(20);
  child1.setTextColor(colors.parseColor("#ff00f0"))
  child1.setText("左护法");
  child1.setGravity(0); //左护法
  child1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(0, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1));
  // child1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 0, 1));
  var child2 = new TextView(context);
  child2.setTextSize(20);
  child2.setTextColor(colors.parseColor("#ff00f0"))
  child2.setText("大长老"); //中间的是大长老
  child2.setGravity(1);
  child2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(0, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1));
  var child3 = new TextView(context);
  child3.setTextSize(20);
  child3.setTextColor(colors.parseColor("#ff00f0"))
  child3.setText("右护法");
  child3.setGravity(5); //右护法
  child3.setLayoutParams(new android.widget.LinearLayout.LayoutParams(0, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1));
  layo.addView(child1)
  layo.addView(child2)
  layo.addView(child3)
  parent.addView(layo)
}
// mView.setLayoutParams(new android.widget.LinearLayout.LayoutParams(
//   android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 0, 1));
// 第一个参数是width，第二个参数是height，第三个参数是weight
// 如果orientation是vertical，width就是0，如果orientation是horizontal，height就是0
//===============公用函数============================
function getRndColor() {
  var a, r, g, b;
  a = Math.floor(0), r = Math.floor(随机0_255()), g = Math.floor(随机0_255()), b = Math.floor(随机0_255());
  // var 反色 = -1 - colors.argb(0, r, g, b);
  var color = colors.argb(0, r, g, b);
  color = colors.toString(color)
  log(color)
  return color
}
function 随机0_255() {
  var r = parseInt(255 * Math.random())
  return r
}
