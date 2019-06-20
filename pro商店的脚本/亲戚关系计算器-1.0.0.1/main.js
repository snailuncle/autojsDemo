"ui";
ui.layout(
    <vertical padding="16" bg="#DCDCDC">
        <text textSize="20sp" gravity="center" textStyle="bold">亲戚称谓 OR 关系计算器</text>
        <horizontal>
            <text textSize="16sp" textStyle="bold" text="选择处理方式：" />
            <spinner id="sp1" entries="算称谓|找关系" spinnerMode="dropdown" prompt="请选择方式" />
        </horizontal>
        <horizontal>
            <checkbox id="isMe" text="对方称呼我" textColor="#222222" textSize="70px" />
            <checkbox id="isSex" text="我是女的" textColor="#222222" textSize="70px" />
        </horizontal>
        <text textSize="16sp" textStyle="bold">要找的称谓</text>
        <input id="in" textColor="red" hint="如：爸爸的奶奶" layout_weight="1" h="30" gravity="top" bg="#BEBEBE" />
        <text textSize="16sp" textStyle="bold">获取到的结果</text>
        <input id="in2" textColor="red" hint="老婆" layout_weight="1" h="30" gravity="top" bg="#BEBEBE" />
        <text textSize="16sp" textStyle="bold">点击添加关系</text>
        <vertical>
            <grid id="list" spanCount="5" h="*" bg="?selectableItemBackgroundBorderless">
                <text h="50dp" size="20dp" layout_gravity="center_vertical" gravity="center" text="{{this}}" bg="?selectableItemBackgroundBorderless" />
            </grid>
        </vertical>
    </vertical>
);
//看这里很重要：这个UI巨丑，我自己都看不下去，有哪位大佬帮忙美化下呗，记得私发给我😂😂
//QQ：1641763174


/*
var relationship;
threads.start(function() {
    //为了你们好，从网络加载可以节省空间，不费事
    //ps:此处暂不能使用
    let aa = http.get("http://1024.my81.club/relationship.js").body.string();
    relationship = require(aa);
});*/
var relationship = require("./relationship.js");
var isMe = false,
    isSex = false;
ui.in.setEnabled(false);
ui.in2.setEnabled(false);
ui.list.setFocusable(false);

var txt = ["父", "母", "夫", "妻", "子", "女", "兄", "弟", "姐", "妹", "DEL", "AC", "COPY", "EXIT"];
var txt2 = ["爸爸", "妈妈", "老公", "老婆", "儿子", "女儿", "哥哥", "弟弟", "姐姐", "妹妹"];

ui.list.setDataSource(txt);

ui.isMe.on("check", (checked) => {
    isMe = checked;
});
ui.isSex.on("check", (checked) => {
    isSex = checked;
});
ui.list.on("item_click", function(item, i) {
    switch (item) {
        case "DEL":
            ui.run(function() {
                let del = (ui.in.text().length > 2) ? 3 : 2;
                ui.in.setText(ui.in.text().slice(0, -del));
            });
            break;
        case "AC":
            ui.in.setText("");
            break;
        case "COPY":
            setClip(ui.in.text());
            break;
        case "EXIT":
            exit();
            break;
        default:
            let txtStr = (ui.in.text().length == 0) ? ui.in.text() + txt2[i] : ui.in.text() + "的" + txt2[i];
            ui.in.setText(txtStr);
    }
});
ui.in.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(key) {
        if (key != '') {
            var options = {
                text: ui.in.text(), //输入的文本
                sex: (isSex == true) ? 0 : 1, //自己的性别：0女性,1男性
                type: "default", //转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
                reverse: (isMe == true) ? true : false //称呼方式：true对方称呼我,false我称呼对方
            };
            let call = relationship(options);
            let callTxt = "";
            if (call.length == 0) callTxt = "啊，暂时没有合适的称谓，这样吧，男的叫哥哥，女的叫姐姐";
            for (let i = 0; i < call.length; i++) {
                callTxt = callTxt + "\n" + call[i];
            }
            ui.run(function() {
                ui.in2.setText(callTxt);
            });
        }
    }
}));