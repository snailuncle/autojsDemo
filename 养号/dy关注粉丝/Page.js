
var config=require('./appConfig.js')

function Page(name){
  this.name=name
  this.actionTime=config.一般动作执行后需等待的时间
  this.success=false
  this.action=()=>{}
  this.check=()=>{}
  this.onFailure=()=>{}
  var that=this
  this.go=function(){
    log('当前是 '+this.name+' 页面,开始执行go()')
    var actionThreadId=threads.start(
      function(){
        that.action()
      }
    )
    setTimeout(
      function(){
        if(actionThreadId && actionThreadId.isAlive && actionThreadId.isAlive()){
          actionThreadId.interrupt()
        }
      },this.actionTime
    )
    sleep(this.actionTime+300)
    var result=this.check()
    if(result){
      log(this.name+'actionResult=true')
      this.success=true
    }else{
      this.success=false
      log(this.name+'actionResult=false')
      log('开始执行'+this.name+'onFailure')
      this.onFailure()
      log('结束执行'+this.name+'onFailure')
    }
    log(this.name+'页面,结束执行go()')
  }
}
Page.prototype.setAction=function(action){
  this.action=action
}
Page.prototype.setCheck=function(check){
  this.check=check
}
Page.prototype.setOnFailure=function(onFailure){
  this.onFailure=onFailure
}

module.exports=Page
