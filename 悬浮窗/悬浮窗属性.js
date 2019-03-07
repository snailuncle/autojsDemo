/**
 * 作者: 家
 * QQ:   203118908
 * 功能   介绍悬浮窗基本属性
 */
var window = floaty.window(
  <vertical padding="16" id="parent" >
      <button id="点击按钮改变我" text="点击按钮改变我" gravity="center"/>
      <button id="changeTextColor" text="改变文字颜色" />
      <button id="changeBackgroundColor" text="改变背景颜色" />
      <button id="changeTextSize" text="改变字体大小" />
      <button id="getText" text="获取文本" />
      <button id="setText" text="设置文本" />
      <button id="changeParentColor" text="改变父窗口颜色" />
      <button id="closeFloatyWindow" text="game over" />
  </vertical>
);
window.setPosition(device.width / 4, device.height / 6)
window.changeParentColor.on("click", () => {
  var color = rndColor()
  // color=colors.toString(color)
  log(color)
  window.parent.setBackgroundColor(color)
});
window.changeTextColor.on("click", () => {
  var color = rndColor()
  // color=colors.toString(color)
  log(color)
  window.点击按钮改变我.setTextColor(color)
});
window.changeBackgroundColor.on("click", () => {
  var color = rndColor()
  // color=colors.toString(color)
  log(color)
  window.点击按钮改变我.setBackgroundColor(color)
});
window.changeTextSize.on("click", () => {
  var size = rndNum(20, 33)
  // color=colors.toString(color)
  log(size)
  window.点击按钮改变我.setTextSize(size)
});
window.getText.on("click", () => {
  var text = window.点击按钮改变我.getText()
  toastLog(text)
});
window.setText.on("click", () => {
  var text = window.点击按钮改变我.getText()
  if (text == '点击按钮改变我') {
    window.点击按钮改变我.setText("变身 Duang")
  } else {
    window.点击按钮改变我.setText("点击按钮改变我")
  }
});

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var fn = () => {}
var id = setInterval(
  fn, 3000
)
window.closeFloatyWindow.on("click", () => {
  clearInterval(id)
  window.close()
});
