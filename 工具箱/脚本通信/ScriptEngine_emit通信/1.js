//运行脚本
var e = engines.execScriptFile("./2.js");
//等待脚本启动
sleep(2000);
//向该脚本发送事件
e.getEngine().emit("say", "你好");
