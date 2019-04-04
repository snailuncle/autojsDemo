/**
 * 作者:　家
 * ＱＱ：　203118908
 * 功能:　　按钮设置图片demo
 * 说明:    图片可以是普通图片,也可以是Resource
 */
'ui';
importClass(android.graphics.drawable.BitmapDrawable)

ui.layout(
  <vertical>
    <button >普通按钮</button>
    <button id='but' bg='#ff00ff' w='{{device.width}}px' h='66' textSize='26' >设置了resource的按钮</button>
    <button id='but2' bg='#ff00ff' w='{{device.width}}px' h='66' textSize='26' >设置了resource的按钮</button>
  </vertical>
)



ui.post(
  function(){
    var imgId=getResource('ic_android_eat_js')
    ui.but.setBackgroundResource(imgId)
    var imgPath = '/sdcard/m.png'
    var myDrawable=普通图片转drawble(imgPath)
    getAttr(ui.but2)
    // exit()
    ui.but2.setBackgroundDrawable(myDrawable)
  },100
)
function getResource(imageName) {
  var resId = context.getResources().getIdentifier(imageName, "drawable", context.getPackageName());
  return resId;
}

function getAttr(obj) {
  var attrs = []
  for (var k in obj) {
    attrs.push(k)
  }
  attrs.sort()
  log( attrs)
}

function 普通图片转drawble(imgPath){
  var img=images.read(imgPath)
  var myBitmap=img.getBitmap()
  var myDrawable=new BitmapDrawable(context.getResources(),myBitmap);
  return myDrawable
}


