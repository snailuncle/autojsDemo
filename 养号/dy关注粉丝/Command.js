function Command(name,limitTime){
  this.name=name
  this.action=()=>{}
  this.limitTime=limitTime || 3000
  var that=this
  this.go=function(args1,args2){
    log('命令'+this.name+'开始')
    var myId=threads.start(
      function(){
        that.action(args1,args2)
      }
    )
    sleep(this.limitTime)
    if(myId && myId.isAlive && myId.isAlive()){
      myId.interrupt()
    }
    log('命令'+this.name+'结束')
  }
}

Command.prototype.setAction=function(action){
  this.action=action
}
module.exports=Command
