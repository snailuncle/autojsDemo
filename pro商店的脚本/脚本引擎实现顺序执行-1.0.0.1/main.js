const scripts=["脚本1.js","脚本2.js","脚本3.js"]
var enginess=[];

var mainEnengine=engines.myEngine();

var iii=setInterval(()=>{},1000);//保持主脚本不停，实际使用有ui也可以没有这个

events.on("control",(i)=>{
    i++;
    if(i>=scripts.length)exit();//这里不知道为什么用clearInterval不行

    var ae=engines.execScriptFile(scripts[i])
    sleep(500)//等待脚本运行
    var aengine=ae.getEngine();
    aengine.emit("prepare",i,mainEnengine)
  
    enginess.push(aengine);//便于后续管理  
});

mainEnengine.emit("control",-1);
