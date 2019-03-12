"auto";
console.show();
launchApp("QQ");
sleep(1000);

Text = "";
while (true) {
    var UIOB = className("android.widget.AbsListView").findOne();
    if (getEnd(UIOB)!=""&&getEnd(UIOB)!= Text) {
        Text = getEnd(UIOB);
        log(Text);
        var txt=TuringRobot(Text);
        input(txt);
        while(!click("发送"));
    };
};


function getEnd(UiObject) {
    try{        
    var sum = UiObject.childCount();
    if (sum) {
        var Object = UiObject.child(sum - 1);
        if (Object.className() == "android.widget.TextView") {
            return Object.text();
        } else {
            return getEnd(Object);
        };
    }else{return ""};
    }catch(e){
     return "";  
        };
};

function TuringRobot(message, id) {
    var url = "http://www.tuling123.com/openapi/api";
    var res = http.postJson(url, {
        key:"1c2514d9c9884931985b5bef1232fa24",
        info: message,
        userid: "1"
    });
    var txt = res.body.json().text;
    return txt;
};