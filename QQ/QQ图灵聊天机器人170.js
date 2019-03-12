
// 本脚本是根据白酒煮饭的图灵脚本改编的
// 作者QQ203118908
// 功能, 打开手机QQ,打开QQ群聊天窗口,脚本自动回复新产生的聊天记录
"auto";
console.show();

launchApp("QQ");
threads.start(function() {
  while (true) {
    toast("你的QQ被图灵附身啦,不要打扰他！");
    sleep(5000);
  }
});
上一句话="图灵在哪里啊图灵在哪里"
while(1){

    chatBounds=[136,1500,909,1720]
    chat=id("chat_item_content_layout").className("android.widget.TextView").textMatches(/.+/).boundsInside(chatBounds[0], chatBounds[1], chatBounds[2], chatBounds[3]).findOne(300)
    // log(chat)
    if(chat && chat.text().length>0 && chat.text()!==上一句话){
        // log("聊天内容=",chat.text())
        chatText=chat.text()
        输入=chatText
        图灵机器人(输入)
        上一句话=chatText
    }else{
        // log("没找到聊天内容或者没有新的聊天")
    }
    sleep(1000)
}

function 图灵机器人(输入) {
    var 链接 = "http://www.tuling123.com/openapi/api";
    //toastLog(info);
    var 获取 = http.post(链接, {
        "key": "f48dd9f7a5284994bddcc546ae66cbd4",
        "info": 输入,
        "userid": "80000"
    });
    var 源码 = 获取.body.string();
    eval("b=" + 源码);
    log("\n图灵收到 ",输入,"\n图灵返回",b.text)
    // log("图灵说......",b.text)
    QQsendMessage(b.text)
}


function QQsendMessage(message){
    inputText(message)
    sleep(100)
    send()
}

function inputText(message) {
    className("EditText").untilFind().setText(message);
}

function send() {
    className("Button").text("发送").clickable().click();
}
