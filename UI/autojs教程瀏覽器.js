"ui";
ui.layout(
    <vertical>
        <horizontal>
            <input id="input" hint="请输入网址" maxLines="1" inputType="textUri" layout_weight="1"/>
            <button id="search_but" w="auto" text="进入"/>
        </horizontal>
        <frame>
            <text id="text" w="*" gravity="center" maxLines="1" ellipsize="end"/>
            <progressbar id="progress" w="*" h="auto" indeterminate="true" layout_gravity="top" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
        </frame>
        <frame layout_weight="1">
            <webview id="webview" w="*" h="*"/>
            <list id="list" w="90dp" h="*" bg="#346489" layout_gravity="right">
                <text w="*" h="50" text="{{txt}}" textSize="16sp" bg="#dddddd" margin="5" gravity="center"/>
            </list>
        </frame>
        <frame w="*">
            <button id="left" w="auto" text="上页" layout_gravity="left"/>
            <button id="center" w="auto" text="菜单" layout_gravity="center"/>
            <button id="right" w="auto" text="下页" layout_gravity="right"/>
        </frame>
    </vertical>
);

ui.list.setVisibility(8);

var listArray = [{
        txt: "Auto.js官方文档",
        url: "https://hyb1996.github.io/AutoJs-Docs"
    },
    {
        txt: "百度",
        url: "http://www.baidu.com"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-tutorial.html",
        txt: "javascript"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-array.html",
        txt: "array"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-boolean.html",
        txt: "boolean"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-date.html",
        txt: "date"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-math.html",
        txt: "math"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-number.html",
        txt: "number"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-regexp.html",
        txt: "regexp"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-string.html",
        txt: "string"
    }

];

ui.list.setDataSource(listArray);


var url = "https://hyb1996.github.io/AutoJs-Docs";
//var url = "file:///storage/emulated/0/网页/试.html";
ui.webview.loadUrl(url);
ui.input.setText(url);

setInterval(() => {
    var P = ui.webview.getProgress();
    var T = ui.webview.getTitle();
    if (P == 100) {
        ui.run(() => {
            ui.progress.setVisibility(8);
        });
    } else {
        ui.run(() => {
            ui.progress.setVisibility(0);
        });
    };
    ui.run(() => {
        ui.text.setText(String(T));
    });
}, 100);


var isCanFinish = false;
var isCanFinishTimeout;
ui.emitter.on("back_pressed", e => {
    if (ui.webview.canGoBack()) {
        if (!isCanFinish) {
            isCanFinish = true;
            isCanFinishTimeout = setTimeout(() => {
                toastLog("双击退出");
                isCanFinish = false;
            }, 400);
            ui.run(() => {
                ui.webview.goBack();
            });
            e.consumed = true;
        } else {
            clearTimeout(isCanFinishTimeout);
            e.consumed = false;
        };
    } else {
        clearTimeout(isCanFinishTimeout);
        e.consumed = false;
    };
});



ui.list.on("item_click", function(item, i) {
    ui.run(() => {
        ui.webview.loadUrl(String(item.url));
        ui.list.setVisibility(8);
    });

});

ui.search_but.click(function(v) {
    var T = String(ui.input.getText());
    if (T) {
        ui.run(() => {
            ui.webview.loadUrl(String(T));
        });
    };
});

ui.text.click(function(v) {
    var T = String(ui.webview.getUrl());
    threads.start(function() {
        switch (dialogs.select("操作", ["刷新当前页面", "复制当前网址"])) {
            case 0:
                ui.run(() => {
                    ui.webview.reload();
                });
                break;
            case 1:
                setClip(T);
                toast("已复制\n" + T);
                break;
        };
    });
});

ui.left.click(function(v) {
    ui.run(() => {
        ui.webview.goBack();
    });
});
ui.center.click(function(v) {
    if (ui.list.visibility == 8) {
        ui.run(() => {
            ui.list.setVisibility(0);
        });
    } else {
        ui.run(() => {
            ui.list.setVisibility(8);
        });

    };
});
ui.right.click(function(v) {
    ui.run(() => {
        ui.webview.goForward();
    });
});
