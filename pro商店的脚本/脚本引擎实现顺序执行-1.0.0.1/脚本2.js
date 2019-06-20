var mainEngine;
var index;

var ii=setInterval(()=>{},1000)
events.on("prepare",function(i,obj){
    mainEngine=obj;
    index=i;
    main();
    clearInterval(ii);
});


//执行逻辑
function main(){
   for(var i=0;i<9;i++){
      log("这里是脚本2 loop"+i);
      sleep(100);
   }
   mainEngine.emit("control",index);
}

