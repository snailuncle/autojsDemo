"ui";
ui.layout(
    <vertical >
        <linear gravity="center">
            <button id="bt" text="隐藏" textSize="20sp"/>
        </linear>
        <linear id="h" gravity="center">
        <scroll>
            <text id="data" text="我出来了" textSize="20sp"/>
        </scroll>
        </linear>
    </vertical>
);
threads.start(function() {
    var str="";
    //遍历ui.h对象
    for (var i in ui.h) {
        //打印对象值
        str+=i+" ";
    }
    ui.data.setText(str);
});
ui.bt.click(() => {
    if (ui.bt.getText() == "隐藏") {
        ui.bt.setText("显示");
        ui.h.visibility = 8;
        toast("内容已隐藏!");
    } else {
        ui.bt.setText("隐藏");
        ui.h.visibility = 0;
        toast("内容已显示!");
    }
});