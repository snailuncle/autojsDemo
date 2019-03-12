auto. waitFor();
toast("请打开开聊天页面");
function setAfter() {
    //消息列表
    var a = className("android.widget.ListView").findOne();
    var b = a.child(a.childCount() - 1).child(1).bounds();
    var c = a.child(a.childCount() - 1).child(1);
    if (b.centerX() < 530) {
        //双击最后一个消息
        press(c.bounds().centerX(), c.bounds().centerY(), 1)
        sleep(100)
        press(c.bounds().centerX(), c.bounds().centerY(), 1)
        var before = id("ann").findOne().text();
        back();
        var url = "http://www.tuling123.com/openapi/api";
        r = http.postJson(url, {
            key: "2b3a6919ce2645a2b08f673cdd9cda0d",
            info: before,
            userid: "1",
        });
        var textAfter = r.body.json().text;
        toastLog(textAfter)
        id("aie").findOne().click()
        setText("(๑• . •๑)自动回复(๑• . •๑)\n" + textAfter)
        click("发送")
        sleep(1000)
    }
}

while (1) {
    setAfter()
}