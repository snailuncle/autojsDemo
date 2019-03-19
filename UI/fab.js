'ui';
ui.layout(
  <frame>
  <vertical>
    <button id='control' text='显示' ></button>
    <fab
      id='fab'
      layout_width='wrap_content'
      layout_height='wrap_content'
      note="右下角"
      layout_gravity='bottom|right'
      note="margin"
      layout_margin='3dp'
      note="背景色"
      backgroundTint='#33ff00f0'
      note="控制小白球的大小,值越大,白球越小"
      elevation='6dp'
      src="@drawable/ic_stars_black_48dp"
      color='#FAAB1A'
      text='1231231231'
    >
    </fab>
  </vertical>
  </frame>
)
var fabView=ui.fab
fabView.setOnClickListener(
  function(view){
    toastLog('你点击了fab')
  }
)
ui.control.click(
  function(){
    if(fabView.isShown()){
      var founddView=ui.findView('control')
      founddView.setText('隐藏')
      toastLog('按钮文本->'+founddView.getText())
      fabView.hide()
    }else{
      var founddView=ui.findView('control')
      founddView.setText('显示')
      toastLog('按钮文本->'+founddView.getText())
      fabView.show()
    }
  }
)
var obj=fabView
// getAttr(obj)
// exit()
function getAttr(obj) {
  var attrs = []
  for (var k in obj) {
    attrs.push(k)
  }
  attrs.sort()
  log(attrs)
  return attrs
}
function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}
