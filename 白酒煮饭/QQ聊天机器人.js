
var key = "65458a5df537443b89b31f1c03202a80";
var users = {};
var userCount = 0;

auto();
events.observeNotification()
events.onNotification(function(info, n) {
    
    if (info.getPackageName() != "com.tencent.mobileqq") {
        return;
    }
    var message = info.getText();
    if (message && n && n.contentIntent) {
        n.contentIntent.send();
        reply(message);
        home();
    }
})

function reply(message){
	var i = message.indexOf(':');
	if(i < 0){
		return;
	}
	var sender = message.substring(0, i);
	log("昵称: " + sender);
	var content = message.substring(i + 1);
	log("消息: " + content);
	var response = getResponse(getUserId(sender), content);
	log("回复: " + response);
	while(!setText(response));
}

function getResponse(userId, message){
	var url = "http://www.tuling123.com/openapi/api";
	var r = http.postJson(url, {
	    key: key,
	    info: message,
	    userid: userId
	});
	return r.body.json().text;

}

function getUserId(userName){
	var id = users[userName];
	if(!id){
		id = userCount;
		userCount++;
		users[userName] = id;
	}
	return id;
}