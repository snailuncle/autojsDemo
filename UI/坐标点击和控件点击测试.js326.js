"ui";
ui.layout(
    <vertical >
        <button id="触摸" text="普通按钮" h="200" w="1900"/>
        <button id="控件" text="点我" w="auto"/>
        <button id="状态" text="状态" w="auto"/>
        <button id="显示" text="坐标" w="auto"/>
    </vertical>
);
ui.控件.on("click", () => {
    //这种可以被控件点击触发
    toast("点击2我被点啦");
});
ui.触摸.setOnTouchListener(function(view, event) {
    //这种无法被控件点击触发
    //要是能给指定控件直接发送坐标信息就好了
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            ui.显示.setText(x + "-" + y)
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            x = event.getRawX();
            y = event.getRawY();
            ui.显示.setText(x + "-" + y)
            return true;
        case event.ACTION_UP:
            x = event.getRawX();
            y = event.getRawY();
            ui.显示.setText(x + "-" + y)
            return true;
    }
    return true;
})
threads.start(function() {
    sleep(1000)
    a = 0
    while (a++ < 4) {
        toastLog("注意开始坐标点击")
        click(500 + random(10, 30), 30 + random(10, 80))
        sleep(5000)
        toastLog("注意开始控件点击")
        text("普通按钮").findOnce().click()
        sleep(5000)
        toastLog("注意开始控件点击2")
        text("点我").findOnce().click()
        sleep(5000)
    }
})