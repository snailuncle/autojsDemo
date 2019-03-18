function window在屏幕之内(window){
  var x=window.getX()
  var y=window.getY()
  var w=window.getWidth()
  var h=window.getHeight()
  var centerX=x+w/2
  var centerY=y+h/2
  if(centerX>0 && centerX<device.width &&centerY>0 && centerY<device.height){
    return true
  }else{
    return false
  }
}
module.exports=window在屏幕之内
