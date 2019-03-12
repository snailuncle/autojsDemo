"ui";


ui.layout(
    <vertical>
        <horizontal w="*">
            <button id="but" w="50" text="《"/>
            <input id="input" w="*"/>
        </horizontal>
        <list id="list">
            <vertical w="*" margin="5" bg="{{colors.toString(colors.GRAY)}}">
                <text text="{{name}}"/>
                <text text="{{type}}"/>
                <text text="{{string}}"/>
            </vertical>
        </list>
    </vertical>
);

var isCanClip = false;
var storage = storages.create("AJ查询");
var CurrentThis = this;
var SuperTextAry = ["", ""];
var SuperTextAry = storage.get("TextAry", SuperTextAry);
threads.start(function() {
    ui.run(() => {
        ui.input.setText(String(SuperTextAry[SuperTextAry.length - 1]));
        ui.list.setDataSource(ApiList(SuperTextAry[SuperTextAry.length - 1]));
    });
});
setInterval(() => {
    if (String(ui.input.getText()) != SuperTextAry[SuperTextAry.length - 1]) {
        SuperTextAry.push(String(ui.input.getText()));
        ui.run(() => {
            ui.list.setDataSource(ApiList(SuperTextAry[SuperTextAry.length - 1]));
        });
    };
}, 100);

ui.list.on("item_click", function(item, i, itemView, listView) {
    if (isCanClip) {
        setClip("//" + Disassembly(item).replace(/\n/g, ""));
        toast("已复制\n" + item.name + "…");
        return;
    };
    var TextAry = String(ui.input.getText()).split(".");
    TextAry.pop();
    var Text = TextAry.join(".");
    Text = Text ? Text + "." : Text;
    ui.run(() => {
        ui.input.setText(String(Text + item.name));
    });
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
        var text = TextAry.pop();
        log(TextAry.join("."), text);
        var OB;
        try {
            var thread = threads.start(function() {
                OB = eval("(" + (TextAry.join(".") || "CurrentThis") + ")");
            });
            thread.join();
            return Detail(OB, text, (TextAry.join(".") || "this"));
        } catch (e) {
            log("我: " + e);
            return [];
        };
    };
};


function Detail(A, str, text) {
    if (!A) {
        return [{
            name: "运行 " + text + " 返回值:",
            type: "",
            string: "未知"
        }]
    };
    var ary = new Array;
    ary.push({
        name: "运行 " + text + " 返回值:",
        type: typeof(A),
        string: String(A)
    });
    var re;
    try {
        if (typeof(str) == "string") {
            re = new RegExp(str, "i");
        };
    } catch (e) {};
    var k = false;
    try {
        for (var i in A) {
            try {
                if (str && !re.test(String(i))) {
                    continue;
                };
                if (str && String(i) == str) {
                    k = true
                };
                ary.push({
                    name: String(i),
                    type: typeof(A[i]),
                    string: String(A[i])
                });
            } catch (e) {};
        };
    } catch (e) {};
    if (k) {
        isCanClip = true;
    } else {
        isCanClip = false;
    };
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
            return "\"" + A.toString() + "\"";
            break;
        case "number":
            return A.toString();
            break;
        case "boolean":
            return A.toString();
            break;
        default:
            return String(A);
    };
};

events.on("exit", function() {
    log("结束运行");
    storage.put("TextAry", ["", SuperTextAry.pop()]);
});


脚本备份();

function 脚本备份(path) {
    try {
        path = path || "/sdcard/备份脚本";
        var file = new java.io.File(path);
        var fromfile = String(engines.myEngine().getSource());
        var filename = new java.io.File(fromfile).getName();
        if (!file.isDirectory()) {
            if (!file.mkdirs()) {
                log("夹失败");
            };
        };
        var txt = files.read(fromfile);
        files.write(files.join(path, filename), txt);
    } catch (e) {};
};