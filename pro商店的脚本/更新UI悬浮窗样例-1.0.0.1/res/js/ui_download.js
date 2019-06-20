"ui";
/*
 * @Author: 大柒
 * @QQ: 531310591@qq.com
 * @Date: 2019-05-19 22:40:02
 * @Version: Auto.Js Pro
 * @Description: 
 * @LastEditors: 大柒
 * @LastEditTime: 2019-05-20 16:55:45
 */

//启用本脚本的使用安卓资源的特性
//ui.useAndroidResources();

//设置自定义主题
//activity.theme.applyStyle(colors.parseColor("#ffff0000"), true);

var bg_color = "#80000000"
//设置状态栏颜色
ui.statusBarColor(bg_color);

var w = 520;
var h = 670;
var v = device.width / 5 * 4 / w;
var path_img = "file://./res/img/download_bg-1.png"
var age = storages.create("Doolu_download");
var data = age.get("data");


var dui = {};

var downLoadLayout = function () {
    util.extend(downLoadLayout, ui.Widget);
    function downLoadLayout() {
        ui.Widget.call(this);
        this.defineAttr("close", (view, attr, value, defineSetter) => {
            let a = data;
            view._title.setText(a.title);
            view._ver.setText(a.ver);
            view._subTitle.setText(a.subTitle);
            view._content.setText(a.text);
            a.butClose ? e = "visible" : e = "gone";
            view._close.attr("visibility", e);
            dui = view;
        });
    }
    downLoadLayout.prototype.render = function () {
        return (
            <frame w="{{vl(w)}}" h="{{vl(h)}}" >
                <img w="{{vl(w)}}" h="{{vl(h)}}" src="{{path_img}}" layout_gravity="center" />
                <vertical w="*" h="*" marginTop="{{vl(60)}}" >
                    <vertical marginLeft="{{vl(61)}}" marginRight="{{vl(61)}}">
                        <text id="_title" text="发现新版本" textColor="#ffffff" textStyle="bold" textSize="{{vl(38)}}" />
                        <text id="_ver" marginTop="-5" text="V1.0.1-0" textColor="#ffffff" textStyle="bold" textSize="{{vl(35)}}" alpha="0.9" />
                        <scroll marginTop="{{vl(120)}}" h="{{vl(230)}}" >
                            <text id="_content" />
                        </scroll>
                    </vertical>
                </vertical>
                <vertical w="*" h="{{vl(140)}}" layout_gravity="bottom">
                    <text id="_subTitle" text="WIFI环境下更新不到30秒哦~" textSize="{{vl(21)}}" gravity="center" />
                    <progressbar id="_progress" marginBottom="-6" w="*" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" visibility="invisible" />
                    <vertical w="*" h="1" bg="#e3e3e3" />
                    <horizontal id="_but" >
                        <horizontal id="_close" w="*" layout_weight="1" visibility="gone">
                            <button w="*" marginRight="-1" id="_butClose" text="暂不更新" textSize="18" textStyle="bold" textColor="#999999" style="Widget.AppCompat.Button.Borderless" />
                            <vertical w="1" h="*" marginLeft="-1" bg="#e3e3e3" />
                        </horizontal>
                        <button w="*" id="_download" text="立即更新" textSize="18" textStyle="bold" textColor="#3087fe" layout_weight="1" style="Widget.AppCompat.Button.Borderless" />
                        <button w="*" id="_text" text="下载中 0%" textSize="18" textStyle="bold" textColor="#3087fe" style="Widget.AppCompat.Button.Borderless" visibility="gone" />
                    </horizontal>
                </vertical>
            </frame>
        )
    }
    ui.registerWidget("download-layout", downLoadLayout);
    return downLoadLayout;
}()

var closeLayout = function () {
    util.extend(closeLayout, ui.Widget);
    function closeLayout() {
        ui.Widget.call(this);
    }
    closeLayout.prototype.render = function () {
        return (
            <frame w="44" h="44" rotation="45">
                <img w="44" h="44" src="#00000000" borderWidth="1dp" scaleType="fitXY" borderColor="#e3e3e3" circle="true" />
                <frame w="1" h="20" bg="#e3e3e3" layout_gravity="center" />
                <frame w="20" h="1" bg="#e3e3e3" layout_gravity="center" />
            </frame>
        )
    }
    closeLayout.prototype.onViewCreated = function (view) {
        view.on("click", () => {
            ui.finish();
        });
    };
    ui.registerWidget("close-layout", closeLayout);
    return closeLayout;
}()

ui.layout(
    <frame w="*" h="*" bg="{{bg_color}}" >
        <download-layout w="{{vl(w)}}" h="{{vl(h)}}" close="" layout_gravity="center" />
        <close-layout w="auto" h="auto" layout_gravity="bottom|center" marginBottom="50" />
        <text text="示例文件关闭按钮" textColor="#e3e3e3"  gravity="bottom|center" marginBottom="20"/>
        <text h="auto" text="UI示例" textSize="28" textColor="#e3e3e3" textStyle="bold" gravity="center" />
    </frame>
)

function vl(x) {
    return parseInt(x * v) + "px"
}

dui._butClose.click(() => {
    confirm("确定要放弃更新吗").then(value => {
        //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
        if (value) {
            ui.finish();
        }
    });
})

ui.emitter.on("back_pressed", e => {
    toast("界面已锁定")
    e.consumed = true;
});

var down = {}; download = false
dui._download.click(() => {
    if (download) { toast("正在下载中"); return }
    download = true
    ui.run(() => {
        dui._butClose.attr("visibility", "gone")
        dui._download.attr("visibility", "gone")
        dui._text.attr("visibility", "visible")
        dui._progress.attr("visibility", "visible")
        dui._text.setText("下载中 0%")
    })
    _down = engines.execScriptFile("./res/js/download.js");
})

dui._text.click(() => {
    if (dui._text.text() != "安装") { return }
    app.startActivity({
        action: "VIEW",
        type: "application/vnd.android.package-archive",
        data: "file://" + data.myPath,
        flags: ["grant_read_uri_permission", "grant_write_uri_permission"]
    });
    exit();
})

//监听脚本间广播'download'事件
events.broadcast.on("download", function (X) {
    switch (X.name) {
        case "进度":
            ui.run(() => {
                dui._progress.setProgress(0 + X.data);
                X.data == 100 ? (data._app ? exit() : dui._text.setText("安装")) : dui._text.setText("下载中 " + X.data + "%");
            })
            break;
        case "结果":
            if (X.data == "下载完成") {
                data._app ? exit() : dui._text.setText("安装");
            }
            break;
    }
});

events.on('exit', function () {
    report("退出")
});

function report(X, Y) {
    Y = Y || false;
    events.broadcast.emit("全局", {
        name: X,
        data: Y
    });
}



//保持脚本运行
setInterval(() => { }, 1000);