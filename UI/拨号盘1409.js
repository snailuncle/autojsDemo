"ui";
ui.layout(
    <frame>
        <vertical bg="#000000" paddingLeft="20" paddingRight="20" h="*" w="*" layout_gravity="center">
            <text id="back" color="#aaffffff" size="30dp" layout_gravity="center_vertical" gravity="left" text="＜" marginTop="20"/>
            <text id="time" color="#ffffff" size="100dp" gravity="center" text="20:20"/>
            <text id="t"color="#aaffffff" size="24dp" layout_gravity="center_vertical" gravity="center" marginTop="100">请输入密码</text>
            <text id="in" w="*" size="30sp" bg="#55ffffff" textColor="#ffffff"/>
            <button id="ok" text="确定"/>
            <grid id="icons" spanCount="4" h="*" bg="?selectableItemBackgroundBorderless">
                <text color="#aaffffff" h="80dp" size="30dp" layout_gravity="center_vertical" gravity="center" text="{{this}}" bg="?selectableItemBackgroundBorderless"/>
            </grid>
        </vertical>
    </frame>
)
var icons = ["1", "2", "3", "＋","4", "5", "6", "-","7", "8", "9","＝", " ", "0"," ", "×"]
ui.icons.setDataSource(icons);
threads.start(function() {
    while (true) {
        var myDate = new Date();
        timeh = myDate.getHours().toString()
        timem = myDate.getMinutes().toString()
        if (timeh < 10) {
            timeh = "0" + timeh
        }
        if (timem < 10) {
            timem = "0" + timem
        }
        time = timeh + timem
        ui.run(() => {
            ui.time.setText(timeh + ":" + timem)
        })
    }
})

ui.ok.on("click", () => {
    log(timeh + timem)
    if (ui.in.getText() == timeh + timem) {
        ui.finish()
        //        engines.execScriptFile("./main.js")
        engines.myEngine().forceStop()
    } else {
        threads.start(function() {
            ui.run(() => {
                ui.t.setText("密码错误")
                threads.start(function() {
                    device.vibrate(200)
                })
            })
            sleep(1000)
            ui.run(() => {
                ui.t.setText("请输入密码")
            })
        })
    }
})

ui.icons.on("item_click", function(icon) {
    if (icon != " ") {
        if (icon != "×") {
            ui.in.setText(ui.in.text() + icon)
            threads.start(function() {
                device.vibrate(20)
            })
        } else {
            ui.in.setText("")
            threads.start(function() {
                device.vibrate(20)
            })
        }
    }

})