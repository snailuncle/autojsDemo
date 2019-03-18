var 悬控移动和点击=require('./悬控移动和点击.js')
function View点击事件(window,viewName,view,clickAction){
  this.window=window
  this.name=viewName
  this.view=view
  var 默认点击动作=()=>{
    toast(this.name+'被点了')
  }
  this.clickAction = 默认点击动作
  if(clickAction){
    this.clickAction = clickAction
    悬控移动和点击(window,viewName,view,clickAction)
  }
}
View点击事件.prototype.setClickAction=function(clickAction){
  this.clickAction=function (){
    悬控移动和点击(window,viewName,view,clickAction)
  }
}

module.exports=View点击事件
