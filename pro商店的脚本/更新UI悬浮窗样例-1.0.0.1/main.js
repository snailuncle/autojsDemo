"ui";
"ui";
/*
 * @Author: 大柒
 * @QQ: 531310591@qq.com
 * @Date: 2019-05-19 22:40:02
 * @Version: Auto.Js Pro
 * @Description: 
 * @LastEditors: 大柒
 * @LastEditTime: 2019-05-20 17:03:49
 */


var bg_color = "#80f5f5f5"
//设置状态栏颜色
ui.statusBarColor("#50000000");

//创建一个储存器保存数据
var age = storages.create("Doolu_download");

var dui = {};

var data = {
    myUrl: "http://xzc.197746.com/autojsjbaz.apk",
    myPath: "/sdcard/Auto.js.apk",
    myName: "Auto.js",
}

var startUpLayout = function () {
    util.extend(startUpLayout, ui.Widget);
    function startUpLayout() {
        ui.Widget.call(this);
        this.defineAttr("a", (view, attr, value, defineSetter) => {
            dui = view;
        });
    }
    startUpLayout.prototype.render = function () {
        return (
            <frame w="200" h="40" layout_gravity="bottom|center" >
                <img id="_bg" w="200" h="30" src="#00000000" borderWidth="1dp" scaleType="fitXY" borderColor="#40a5f3" circle="true" />
                <text id="_text" h="30" text="运行UI示例" gravity="center" textColor="#40a5f3" />
            </frame>
        )
    }
    startUpLayout.prototype.onViewCreated = function (view) {
        view.setOnTouchListener(function (view1, event) {
            switch (event.getAction()) {
                case 0:
                    ui.run(() => {
                        view._bg.attr("src", "#e3e3e3")
                    })
                    return true;
                case 1:
                    ui.run(() => {
                        view._bg.attr("src", "#00000000")
                    })
                    _download()
                    return true;
            }
            return true;
        });
    };
    ui.registerWidget("start_up-layout", startUpLayout);
    return startUpLayout;
}()

ui.layout(
    <frame>
        <text h="30" text="@大柒,更新弹窗示例" gravity="center" textSize="21" textColor="#000000" />
        <vertical w="*" h="*" margin="40" bg="{{bg_color}}" >
            <text text="标题:" />
            <card w="*" h="35" marginBottom="20" cardCornerRadius="5dp" cardBackgroundColor="#e3e3e3"
                cardElevation="0dp" gravity="center" foreground="?selectableItemBackground">
                <input id="title" text="发现新版本" hint="对话框标题" marginBottom="-6" />
            </card>
            <text text="更新版本:" />
            <card w="*" h="35" marginBottom="20" cardCornerRadius="5dp" cardBackgroundColor="#e3e3e3"
                cardElevation="0dp" gravity="center" foreground="?selectableItemBackground">
                <input id="ver" text="Pro 7.0.3-0" hint="更新版本" marginBottom="-6" />
            </card>
            <text text="小标题:" />
            <card w="*" h="35" marginBottom="20" cardCornerRadius="5dp" cardBackgroundColor="#e3e3e3"
                cardElevation="0dp" gravity="center" foreground="?selectableItemBackground">
                <input id="subtitle" text="WIFI环境下更新不到30秒哦~" hint="小标题" marginBottom="-6" />
            </card>
            <frame w="*" h="1" bg="#e3e3e3" />
            <Switch h="50" id="_window" text="悬浮窗模式" />
            <frame w="*" h="1" bg="#e3e3e3" />
            <Switch h="50" id="_close" text="显示关闭按钮" />
            <frame w="*" h="1" bg="#e3e3e3" />
            <Switch h="50" id="_app" text="下载完成后跳转到安装界面" checked="true" />
            <frame w="*" h="1" bg="#e3e3e3" />
            <text text="更新内容:" />
            <card w="*" h="*" marginBottom="20" cardCornerRadius="5dp" cardBackgroundColor="#e3e3e3"
                cardElevation="0dp" gravity="center" foreground="?selectableItemBackground">
                <input id="text" text="" hint="更新内容" marginBottom="-6" gravity="top|left" textSize="12" />
            </card>
        </vertical>
        <start_up-layout a="" />
    </frame>
)
ui.text.setText("由于一些用户催更，更新这个版本。\n新增 定时任务API，参见示例\n新增 脚本商店（未完善），当前所有用户都可以发布项目，但是需要审核；缺失功能包括脚本详情、图标、截图预览等等\n回滚 截图相关更新\n新增 请求截图时支持强制传入宽高，如requestScreenCapture(1080, 1920)\n更改 请求截图权限只能调用一次，第二次会报错\n修复 打包时文件过大出现Timeout的问题\n修复 首页切换Tab时导致Tab状态丢失的问题")

alert("提醒:","测试版本:Pro 7.0.2-3 其他版本自行测试\n示例下载文件为Auto.js 4.0.0大小约14M左右\n安装包是在网上找的,下载后不要乱安装")


ui._window.on("click", function (checked) {
    ui._window.checked ? e = "悬浮窗" : e = "UI";
    dui._text.setText("运行" + e + "示例")
})


var download = false

//启动对应的'UI''悬浮窗'脚本资源
function _download() {
    if (download) { toast("请不要重复运行"); return }
    download = true
    data.title = ui.title.text();
    data.ver = ui.ver.text();
    data.subTitle = ui.subtitle.text();
    data.text = ui.text.text();
    data.butClose = ui._close.checked;
    data._app = ui._app.checked;
    age.put("data", data)
    toast("开始" + dui._text.text() + "文件")
    ui._window.checked ? engines.execScriptFile("./res/js/window_download.js") : engines.execScriptFile("./res/js/ui_download.js")
}

//监听脚本间广播'download'事件
events.broadcast.on("全局", function (data) {
    switch (data.name) {
        case "退出":
            download = false;
            break;
    }
});

//保持脚本运行
setInterval(() => { }, 1000);

//退出脚本时 结束所有脚本
events.on('exit', function () {
    engines.stopAllAndToast()
});