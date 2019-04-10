"ui";

ui.layout(
    <frame>
        <vertical padding="7" bg="#708090" layout_weight="1">
            <card w="*" h="auto" margin="5" cardCornerRadius="5dp" cardBackgroundColor="#b0c4de"
            cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
            <text textSize="18sp" textStyle="bold" gravity="center" textStyle="bold">时间截转换</text>
        </card>
        <horizontal>
            <card layout_weight="1" h="30" margin="5" cardCornerRadius="5dp" cardBackgroundColor="#b0c4de"
            cardElevation="15dp" gravity="left" foreground="?selectableItemBackground">
            <text textSize="20sp" textStyle="bold" gravity="left">现在：</text>
            <text id="now" textSize="20sp" textStyle="bold" gravity="center">
            </text>
        </card>
        <button id="stop" text="停止" w="50" h="40" gravity="right"/>
    </horizontal>
    <card w="*" h="200" margin="5" cardCornerRadius="5dp" cardBackgroundColor="#b0c4de"
    cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
    <vertical>
        <text textSize="18sp" textStyle="bold" gravity="center">时间截转换成时间</text>
        <horizontal>
            <text textSize="20sp" textStyle="bold" gravity="left">时间截：</text>
            <input id="in1" h="auto" w="*" inputType="datetime"/>
        </horizontal>
        <horizontal gravity="center">
            <button id="zh1" style="Widget.AppCompat.Button.Colored" >转换</button>
            <button id="fz1" style="Widget.AppCompat.Button.Colored" >复制</button>
            <button id="zt1" style="Widget.AppCompat.Button.Colored" >粘贴</button>
            <button id="cl1" style="Widget.AppCompat.Button.Colored" >清空</button>
        </horizontal>
        <horizontal>
            <text textSize="20sp" textStyle="bold" gravity="left">结果：</text>
            <input id="ot1" h="auto" w="*" inputType="datetime"/>
        </horizontal>
    </vertical>
    </card>
    <vertical>
        <card w="*" h="200" margin="5" cardCornerRadius="5dp" cardBackgroundColor="#b0c4de"
        cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
        <vertical>
            <text textSize="18sp" textStyle="bold" gravity="center">时间转换成时间截</text>
            <horizontal>
                <text textSize="20sp" textStyle="bold" gravity="left">时间：</text>
                <input id="in2" h="auto" w="*" inputType="datetime" />
            </horizontal>
            <horizontal gravity="center">
                <button id="zh2" style="Widget.AppCompat.Button.Colored" >转换</button>
                <button id="fz2" style="Widget.AppCompat.Button.Colored" >复制</button>
                <button id="zt2" style="Widget.AppCompat.Button.Colored" >粘贴</button>
                <button id="cl2" style="Widget.AppCompat.Button.Colored" >清空</button>
            </horizontal>
            <horizontal>
                <text textSize="20sp" textStyle="bold" gravity="left">结果：</text>
                <input id="ot2" h="auto" w="*" inputType="datetime"/>
            </horizontal>
        </vertical>
    </card>
    </vertical>
    </vertical>
    </frame>
);
var isOn = 1;
Time()

function Time() {
    var nowTime = threads.start(function() {
        while (isOn) {
            sleep(100);
            ui.run(function() {
                ui.now.setText(String((new Date().getTime())).slice(0, -3));
            });
        }
    });
}
ui.in1.setText(String((new Date().getTime())).slice(0, -3));
ui.in2.setText(toTime());

ui.stop.click(() => {
    if (ui.stop.text() == "停止") {
        ui.stop.text("开始");
        isOn = 0;
    } else {
        Time();
        ui.stop.text("停止");
        isOn = 1;
    }
});
ui.now.click(() => {
    toast("已复制到剪贴板");
    setClip(ui.now.text());
});
ui.zh1.click(() => {
    ui.ot1.setText(toTime(parseInt(ui.in1.text() + "000")));
});

ui.zh2.click(() => {
    ui.ot2.setText(String(toDate(ui.in2.text() + "000")));
});

ui.fz1.click(() => {
    let txt1 = ui.ot1.text()
    if (txt1.length > 1) {
        toast("已复制到剪贴板");
        setClip(txt1);
    }
});
ui.fz2.click(() => {
    let txt2 = ui.ot2.text()
    if (txt2.length > 1) {
        toast("已复制到剪贴板");
        setClip(txt2);
    }
});

ui.zt1.click(() => {
    ui.in1.setText(getClip());
});

ui.zt2.click(() => {
    ui.in2.setText(getClip());
});

ui.cl1.click(() => {
    ui.in1.setText("");
});

ui.cl2.click(() => {
    ui.in2.setText("");
});


function toTime(time) {
    if (time) {
        return new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(time));
    } else {
        return new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
    }
}

function toDate(endTime) {
    toastLog(endTime);
    var date = new Date(); 
    date.setFullYear(endTime.substring(0, 4)); 
    date.setMonth(endTime.substring(5, 7) - 1); 
    date.setDate(endTime.substring(8, 10)); 
    date.setHours(endTime.substring(11, 13)); 
    date.setMinutes(endTime.substring(14, 16)); 
    date.setSeconds(endTime.substring(17, 19)); 
    return Date.parse(date) / 1000; 
}