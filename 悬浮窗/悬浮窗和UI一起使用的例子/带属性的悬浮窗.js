var View点击事件=require('./View点击事件.js')

function 带属性的悬浮窗(windowName,window){
  this.name=windowName
  this.window=window
}
带属性的悬浮窗.prototype.setViewClickAction=function(viewName,view,clickAction){
  log("带属性的悬浮窗.prototype.setViewClickAction=function(viewName,view,clickAction){")
  log(viewName)
  log(view)
  log(clickAction)
  var window=this.window
  var 添加了点击事件的view=new View点击事件(window,viewName,view,clickAction)
  log('setViewClickAction已设置-->'+viewName)
  return viewName
}

module.exports=带属性的悬浮窗
