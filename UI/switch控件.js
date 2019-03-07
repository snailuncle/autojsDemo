"ui";
ui.layout(
    <vertical>
        <Switch id='cb1' />
        <button id='cb2' text="第一个按钮" />
    </vertical>
);

ui.cb1.on("check", (checked) => {
    toastLog(checked);
    if (checked== false) {//这里autojs测试版7好像有问题只能这么写
        toastLog(1);
    } else {
        toastLog(0);
    }
});

ui.cb2.on("click", () => {
    toastLog("我被点啦");
    if (ui.cb1.isChecked() == false) {
        ui.cb1.setChecked(true);
    } else {
        ui.cb1.setChecked(false);
    }
});
