//监听say事件
events.on("say", function(words){
  log('2号脚本打印开始')
  log(words)
  log('2号脚本打印结束')
});
//保持脚本运行
setInterval(()=>{}, 1000);
