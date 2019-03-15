/**
 * 作者: 家
 * QQ:   203118908
 * 功能   介绍ui基本属性
 */
"ui";
ui.layout(
  <vertical padding="16" id="parent">
      <button id="点击按钮改变我" text="点击按钮改变我" gravity="center"/>
      <button id="changeTextColor" text="改变文字颜色" />
      <button id="changeBackgroundColor" text="改变背景颜色" />
      <button id="changeTextSize" text="改变字体大小" />
      <button id="getText" text="获取文本" />
      <button id="setText" text="设置文本" />
      <button id="changeParentColor" text="改变父窗口颜色" />
      <button id="hideOtherButtons" text="隐藏其他按钮" />
      <button id="closeUI" text="game over" />
  </vertical>
);
ui.hideOtherButtons.on("click", (view) => {
  log(view.getText())
  if(view.getText()=="隐藏其他按钮"){
    view.setText('显示其他按钮')
    var selfId=view.id
    log(selfId)
    var parent=ui.parent
    var childCount=parent.childCount
    log(childCount)
    for(var i=0;i<childCount;i++){
      var view=parent.getChildAt(i)
      if(view.id!==selfId){
        view.visibility = 8;
      }
    }
  }else{
    view.setText('隐藏其他按钮')
    var selfId=view.id
    log(selfId)
    var parent=ui.parent
    var childCount=parent.childCount
    log(childCount)
    for(var i=0;i<childCount;i++){
      var view=parent.getChildAt(i)
      if(view.id!==selfId){
        view.visibility = 0;
      }
    }
  }
});
ui.changeParentColor.on("click", () => {
  var color = rndColor()
  // color=colors.toString(color)
  log(color)
  ui.parent.setBackgroundColor(color)
});
ui.changeTextColor.on("click", () => {
  var color = rndColor()
  // color=colors.toString(color)
  log(color)
  ui.点击按钮改变我.setTextColor(color)
});
ui.changeBackgroundColor.on("click", () => {
  var color = rndColor()
  // color=colors.toString(color)
  log(color)
  ui.点击按钮改变我.setBackgroundColor(color)
});
ui.changeTextSize.on("click", () => {
  var size = rndNum(20, 33)
  // color=colors.toString(color)
  log(size)
  ui.点击按钮改变我.setTextSize(size)
});
ui.getText.on("click", () => {
  var text = ui.点击按钮改变我.getText()
  toastLog(text)
});
ui.setText.on("click", () => {
  var text = ui.点击按钮改变我.getText()
  if (text == '点击按钮改变我') {
    ui.点击按钮改变我.setText("变身 Duang")
  } else {
    ui.点击按钮改变我.setText("点击按钮改变我")
  }
});
function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}
function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
ui.closeUI.on("click", () => {
  ui.finish()
});
