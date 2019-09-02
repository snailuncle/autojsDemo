"ui";

ui.layout(
    <vertical id="ver">
        <horizontal id="hor2" w="*" h="{{Math.floor(device.width*0.15)}}px">
            <input id="input_cs" layout_weight="1" h="*"/>
            <button id="but_cs" w="{{Math.floor(device.width*0.15)}}px"h="*" text="测试"/>
        </horizontal>
        <horizontal id="hor" w="*">
            <button id="but" w="50" text="《"/>
            <input id="input" w="*" text="测试中"/>
        </horizontal>
        <list id="list">
            <vertical id="vertical" w="*" margin="5" bg={colors.toString(colors.GRAY)}>
                <text text="{{name}}"/>
                <text text="{{type}}"/>
                <text text="{{string}}"/>
            </vertical>
        </list>
    </vertical>
);


//◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣◣


   // ui.drawer.openDrawer(0);
//◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤◤

var CurrentThis = this;

var storage = storages.create("AJ查询");
var 测试代码=storage.get("TextCode", "");
var SuperTextAry = storage.get("TextAry", [""]);

    ui.run(() => {
        ui.input_cs.setText(测试代码);
    });
//代码测试();


threads.start(function() {
    ui.run(() => {
        ui.input_cs.setText(测试代码);
        ui.input.setText(String(SuperTextAry[SuperTextAry.length - 1]));
        ui.list.setDataSource(ApiList(SuperTextAry[SuperTextAry.length - 1]));
    });
});


function 代码测试(){
    threads.start(function(){
       try{ 
        测试=eval(测试代码);
        ui.run(()=>{
            ui.input.setText("测试.");
            ui.list.setDataSource(ApiList(SuperTextAry[SuperTextAry.length - 1]));
        });
        }catch(e){
           toastLog(e); 
           测试=undefined;
        };
    });
    
};






//ui.input.addTextChangedListener(new android.text.TextWatcher({
//  afterTextChanged: function(Text) {
setInterval(() => {
    var Text = String(ui.input.getText());
    if (String(Text) != SuperTextAry[SuperTextAry.length - 1]) {
        SuperTextAry.push(String(Text));
        ui.run(() => {
            ui.list.setDataSource(ApiList(SuperTextAry[SuperTextAry.length - 1]));
        });
    };
}, 500);

//    }
//}));

ui.list.on("item_click", function(item, i, itemView, listView) {
    var TextAry = String(ui.input.getText()).split(".");
    TextAry.pop();
    var Text = TextAry.join(".");
    Text = Text ? Text + "." : Text;
    ui.run(() => {
        ui.input.setText(String(Text + item.name));
    });
});

ui.list.on("item_long_click", function(e, item, i, itemView, listView) {
    setClip(JSON.stringify(item).replace(/\\n/g, " "));
    toastLog("已复制" + item.name);
    e.consumed = true;
});

ui.but_cs.click(function(){
   测试代码=String(ui.input_cs.getText());
   代码测试();
});

ui.but.click(() => {
    if (SuperTextAry.length > 1) {
        SuperTextAry.pop();
        threads.start(function() {
            ui.run(() => {
                ui.input.setText(String(SuperTextAry[SuperTextAry.length - 1]));
                ui.list.setDataSource(ApiList(SuperTextAry[SuperTextAry.length - 1]));
            });
        });
    };
});

function ApiList(Text) {
    if (typeof Text == "string") {
        var TextAry = Text.split(".");
        var text2 = TextAry.pop();
        log(TextAry.join("."), text2);
        var OB;
        try {
            var thread = threads.start(function() {
                OB = eval("(" + (TextAry.join(".") || "CurrentThis") + ")");
            });
            thread.join();
            return Detail(OB, text2, (TextAry.join(".") || "this"));
        } catch (e) {
            log("我: " + e);
            return [];
        };
    };
};


function Detail(A, str, text2) {
    if (!A) {
        return [{
            name: "运行 " + text2 + " 返回值:",
            type: "",
            string: "未知"
        }]
    };
    var ary = new Array;
    try {
    ary.push({
        name: "运行 " + text2 + " 返回值:",
        type: typeof(A),
        string: String(A)
    });
    } catch (e) {};
    var re;
    try {
        if (typeof(str) == "string") {
            re = new RegExp(str, "i");
        };
    } catch (e) {};
    try {
        for (var i in A) {
            try {
                if (str && !re.test(String(i))) {
                    continue;
                };
                if (str && String(i) == str) {};
                ary.push({
                    name: String(i),
                    type: typeof(A[i]),
                    string: String(A[i])
                });
            } catch (e) {};
        };
    } catch (e) {};
    return ary;
};

function Disassembly(A) {
    log(typeof(A) + " , " + A);
    switch (typeof(A)) {
        case "object":
            var ary = new Array;
            if (Array.isArray(A)) {
                for (var i in A) {
                    ary.push(Disassembly(A[i]));
                };
                return "[" + ary.join(",\n") + "]";
            } else {
                for (var i in A) {
                    ary.push(i + ":" + Disassembly(A[i]));
                };
                return "{" + ary.join(",\n") + "}";
            };
            break;
        case "function":
            return A.toString();
            break;
        case "string":
            return "\"" + String(A) + "\"";
            break;
        case "number":
            return String(A);
            break;
        case "boolean":
            return String(A);
            break;
        default:
            return String(A);
    };
};

events.on("exit", function() {
    log("结束运行");
    storage.put("TextCode",测试代码);
    storage.put("TextAry", ["", SuperTextAry.pop()]);
});