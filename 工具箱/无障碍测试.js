"ui";

ui.layout(
    <vertical padding="16">
        <horizontal>
            <text textSize="16sp">下拉菜单</text>
            <spinner id="sp1" entries="选项1|选项2|选项3"/>
        </horizontal>
        <horizontal>
            <text textSize="16sp">对话框菜单</text>
            <spinner id="sp2" entries="选项4|选项5|选项6" spinnerMode="dialog"/>
        </horizontal>
        <button id="ok">确定</button>
        <button id="select3">选择选项3</button>
    </vertical>
);

ui.ok.on("click", () => {
    var i = ui.sp1.getSelectedItemPosition();
    var j = ui.sp2.getSelectedItemPosition();
    toast("您的选择是选项" + (i + 1) + "和选项" + (j + 4));
});

ui.select3.on("click", () => {
    ui.sp1.setSelection(2);
});

threads.start(function() { //在新线程执行的代码
    while (true) {
        var 应用包名 = context.getPackageName();
        var 应用名 = getAppName(应用包名);
        for (let a = 0; a < 11; a++) {
            try {
                let a = packageNameMatches(/.+/).findOnce()
                toastLog(a.packageName())
                break
            } catch (e) {
                try {
                    auto();
                } catch (e) {}
                sleep(1000)
                toastLog("请选择，" + 应用名 + "  打开无障碍辅助功能")
                log(e, e.stack)

                sleep(3000)
            }
            if (a == 4) {
                exit()
            }
        }

        toastLog("子线程");
        sleep(4000)
    }
});
