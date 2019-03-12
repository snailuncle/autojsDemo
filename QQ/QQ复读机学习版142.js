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
        setText(Text);
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