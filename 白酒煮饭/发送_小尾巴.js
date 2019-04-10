/**
 *作者QQ: 1811588980
 *完成时间: 2019年4月6日 上午5:35:47
 *测试机型: PD1813D
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*2280
 *API: 27
 *备注: 本脚本实现原理。
 *_生成一个带按钮的悬浮窗。
 *_覆盖界面原有的发送按钮。
 *_并且检测输入框内输入的内容。
 *_然后添加内容发送。
 **/



var ScriptName = (engines.myEngine().getSource().toString().match(/\/([^\/]+)$/))[1];
//var ScriptName="小尾巴";
var ScriptName  =  new  RegExp(ScriptName);
var execution = engines.all();
var ScriptRuningCount = 0;
for (var i = 0; i < execution.length; i++) {
    if (ScriptName.test((execution[i].getSource().toString().match(/\/([^\/]+)$/))[1])) {
        if (ScriptRuningCount > 1) {
            toast("已有");
            exit();
        } else {
            ScriptRuningCount++;
        };
    };
};


auto();
launchApp("QQ");

var W = device.width,
    H = device.height;
var kg = false;

var window = floaty.rawWindow( 
     <text id = "but"w = "*"h = "*"text = "发送"gravity="center" />
);


setInterval(() => {
    let Ui_T = className("android.widget.Button").clickable(true).text(String(window.but.getText())).findOnce();
    if (Ui_T) {
        let rect = Ui_T.bounds();
        let x = rect.left,
            y = rect.top;
        let w = rect.right - rect.left,
            h = rect.bottom - rect.top;
        ui.run(() => {
            window.setPosition(x, y);
            window.setSize(w, h);
            window.but.setTextSize(h / 7.2);
        });
    } else {
        window.setPosition(W, H);
    };
    if (kg) {
        let Ui_E = className("android.widget.EditText").editable(true).findOnce();
        if (Ui_E && Ui_E.text()) {
            input(getAddMessage(Ui_T.text()));
            while (!Ui_T.click()) {
                sleep(100);
            }
        };

        kg = false;
    };
}, 50);

window.but.click(function() {
    kg = true;
});

function getAddMessage(txt) {
    var date = new Date();
    var month = date.getMonth() + 1;
    //month = month.substring(month.length - 2);
    var day = date.getDate();
    //day = day.substring(day.length - 2);
    var time = date.toTimeString().substr(0, 8);
    time = month + "月" + day + "日 \n" + time;
    var 充电状态 = "🔋";
    if (device.isCharging()) {
        充电状态 = "⚡";
    }
    return "\n" + time + "\n" + 充电状态 + device.getBattery() + "%";
    // 在上一行修改 QQ小尾巴内容。
};