/**
 * 作者:  家
 * QQ:　　203118908
 * 功能：  把光标设置成图片
 */
'ui';
ui.layout(
  <vertical>
    <button>123</button>
    <input id='input'></input>
  </vertical>
)
var view=ui.input
var imgId=getResource('ic_android_eat_js')
view.setCursorDrawableRes(imgId)
function getResource(imageName) {
  var resId = context.getResources().getIdentifier(imageName, "drawable", context.getPackageName());
  return resId;
}
