
/**
 * 作者: 家
 * QQ:   203118908
 * 功能:  动态布局
 */
"ui";
importClass(android.widget.TextView)
ui.layout(
  <vertical id="帮主">
  <horizontal>
    <button id="管家" textSize="16sp" margin="8" gravity="center" >管家加人</button>
    <button id="白夫人" textSize="16sp" margin="8" gravity="center" >白夫人减人</button>
    <button id="乔峰" textSize="16sp" margin="8" gravity="center" >乔峰加布局</button>
  </horizontal>
  </vertical>
)
var 帮主 = ui.帮主
ui.管家.click(
  () => {
    addTextView(帮主)
  }
)
ui.白夫人.click(
  () => {
    delView(帮主)
  }
)
ui.乔峰.click(
  () => {
    log('加布局开始')
    addLayout(帮主)
    log('加布局结束')
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
