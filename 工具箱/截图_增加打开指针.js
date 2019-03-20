//脚本目的:截图
//首先需要两个角
//需要一个截图按钮
//需要上下左右
//需要退出










requestScreenCapture()
角宽=150
左上角坐标 = [200, 300]
右下角坐标 = [400, 500]
files.ensureDir("/sdcard/js截图/")
控制台()
左上角()
右下角()
sleep(333334333)
function 控制台() {
    w = floaty.window(
        <frame id="背景1" w="250" h="250" gravity="center" bg="#ff9370DB">

        <vertical gravity="center">
            <horizontal layout_weight="1" bg="#99991919">
                <button  id="最小化"  layout_weight="1" gravity="center" w="auto" text="最小化" />
                <button  id="退出"  layout_weight="1" gravity="center" w="auto" text="退出" />
            </horizontal>
            <horizontal layout_weight="2">
                <vertical layout_weight="1" bg="#99991919">
                    <linear gravity="center" layout_weight="1">
                        <button layout_weight="1" id="左上" gravity="center" text="左上" />
                        <button layout_weight="1" id="上a" gravity="center" text="↑" />
                    </linear>
                    <linear gravity="center" layout_weight="1">
                        <button layout_weight="1" id="左a" gravity="center" text="←" />
                        <button layout_weight="1" id="下a" gravity="center" text="↓" />
                        <button layout_weight="1" id="右a" gravity="center" text="→" />
                    </linear>
                </vertical>
                <vertical layout_weight="1" bg="#99991919">
                    <linear gravity="center" layout_weight="1">
                        <button id="右下" layout_weight="1" gravity="center" text="右下" />
                        <button id="上b" layout_weight="1" gravity="center" text="↑" />
                    </linear>
                    <linear gravity="center" layout_weight="1">
                        <button layout_weight="1" id="左b" gravity="center" text="←" />
                        <button layout_weight="1" id="下b" gravity="center" text="↓" />
                        <button layout_weight="1" id="右b" gravity="center" text="→" />
                    </linear>
                </vertical>
            </horizontal>
            <linear gravity="center" layout_weight="1">
                <button layout_weight="1" id="移动" gravity="center" text="移动" />
                <button layout_weight="1" id="截图" gravity="center" text="截图" />
            </linear>
            <linear gravity="center" layout_weight="1">
                <button layout_weight="1" id="打开指针" gravity="center" text="打开指针" />
                <button layout_weight="1" id="关闭指针" gravity="center" text="关闭指针" />
            </linear>

        </vertical>

        </frame>
    );
    w.setPosition(200, 1000);

    w.退出.click(() => {
        //toast("退出");
        exit()
    });

    var sh = new Shell;
    w.关闭指针.click(()=>{
        threads.start(function(){
        sh.exec("su -c 'settings put system pointer_location 0'")
        })
    });
    w.打开指针.click(()=>{
        threads.start(function(){
        sh.exec("su -c 'settings put system pointer_location 1'")
        })
    });

    w.退出.click(() => {
        //toast("退出");
        exit()
    });




// ================================================================



    w.截图.click(() => {
        var sj = new Date().getTime()
        sleep(50)
        var 路径 = "/sdcard/js截图/" + sj + ".png"
        img = captureScreen();
        偏移=17;
        var xac=w1.getX()+偏移;
        var yac=w1.getY()+偏移;


        var xbc=w2.getX()+w2.getWidth()-偏移;
        var ybc=w2.getY()+w2.getHeight()-偏移;
        //如果右下角和左上角有交叉,那么宽度等于
        log("左上角宽和高",w1.getWidth(),w1.getHeight())
        log("右下角宽和高",w2.getWidth(),w2.getHeight())
        var wc=xbc-xac;
        var hc=ybc-yac;
        log(xac,yac,wc,hc)
        aa = images.clip(img,xac,yac,wc,hc);
        images.saveImage(aa, 路径);



        //toastLog("截图保存在:\n" + 路径);

    });
















    w.最小化.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = w.getX();
                windowY = w.getY();
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    if (w.最小化.text() == "最小化") {
                        w.最小化.setText("最大化");
                        w.setSize(400, 190);
                        w1.setSize(0, 0);
                        w2.setSize(0, 0);
                    } else {
                        w.最小化.setText("最小化");
                        w.setSize(720, 720);
                        // w.setSize(控制台大小[0], 控制台大小[1]);

                        w1.setSize(上大小[0], 上大小[1]);
                        w2.setSize(下大小[0], 下大小[1]);
                    }
                }
                return true;
        }
        return true;
    });


// ================================================================




    w.移动.setOnTouchListener(function(view, event) {
        //移动角需要确定把角移动到哪里,只需要一个坐标
        //这个坐标是按下时候的坐标和移动之后的坐标差
        //再加上view本身的坐标
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();//触摸点距离屏幕的绝对坐标
                y = event.getRawY();
                log(x,y)
                aw = w.getWidth();//返回悬浮窗宽度。
                ah = w.getHeight();
                log(aw,ah)
                windowX = w.getX();//悬浮窗右下角距离屏幕的绝对坐标
                windowY = w.getY();
                log(windowX,windowY)
                downTime = new Date().getTime();
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                //悬浮窗原本的右下角坐标+(现在的触摸点坐标-一开始按下的触摸点坐标)
                w.setPosition(windowX + (event.getRawX() - x),
                               windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    });
    w.上a.click(() => {
        左上角坐标[1]--
        窗口移动(0, 左上角坐标[0], 左上角坐标[1])
        //toast("上a")
    });
    w.下a.click(() => {
        左上角坐标[1]++
        窗口移动(0, 左上角坐标[0], 左上角坐标[1])
        //toast("下a")
    });
    w.左a.click(() => {
        左上角坐标[0]--
        窗口移动(0, 左上角坐标[0], 左上角坐标[1])
        //toast("左a")
    });
    w.右a.click(() => {
        左上角坐标[0]++
        窗口移动(0, 左上角坐标[0], 左上角坐标[1])
        //toast("右a")
    });

    w.上b.click(() => {
        右下角坐标[1]--
        窗口移动(1, 右下角坐标[0], 右下角坐标[1])
        //toast("上b")
    });
    w.下b.click(() => {
        右下角坐标[1]++
        窗口移动(1, 右下角坐标[0], 右下角坐标[1])
        //toast("下b")
    });
    w.左b.click(() => {
        右下角坐标[0]--
        窗口移动(1, 右下角坐标[0], 右下角坐标[1])
        //toast("左b")
    });
    w.右b.click(() => {
        右下角坐标[0]++
        窗口移动(1, 右下角坐标[0], 右下角坐标[1])
        //toast("右b")
    });

    log("w.getWidth=",w.getWidth())
    log("w.getWidth=",w.getWidth())
    log("w.getWidth=",w.getWidth())
    log("w.getWidth=",w.getHeight())
    log("w.getWidth=",w.getHeight())
    log("w.getWidth=",w.getHeight())
    控制台大小 = [0, 0]
    控制台大小[0] = w.getWidth();
    控制台大小[1] = w.getHeight();
    log("控制台大小",控制台大小)
}



function 窗口移动(a, x, y) {
    if (a == 0) {
        w1.setPosition(x, y)
    } else if (a == 1) {
        w2.setPosition(x, y)
    }
}


// 首先需要两个角
//左上角
function 左上角() {
    w1 = floaty.rawWindow(
        <frame id="左上角" margin="0" padding="0" gravity="right|bottom" bg="#000000ff">
          <vertical gravity="left|top" >
            <text w="150" h="6" bg="#ffff0000"></text>
            <text w="6" h="150" bg="#ffff0000"></text>
          </vertical>
        </frame>
    );
    w1.setTouchable(true);
    w1.setPosition(左上角坐标[0], 左上角坐标[1])
    log("左上角坐标",左上角坐标[0], 左上角坐标[1])
    sleep(100)
    //角需要调整位置
    //设置一个监听事件

    w1.左上角.setOnTouchListener(function(view, event) {
        log("w1.左上角.setOnTouchListener")
        log(view)
        log(event)
        //移动角需要确定把角移动到哪里,只需要一个坐标
        //这个坐标是按下时候的坐标和移动之后的坐标差
        //再加上view本身的坐标
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                log("case event.ACTION_DOWN:")

                x = event.getRawX();//触摸点距离屏幕的绝对坐标
                y = event.getRawY();
                log(x,y)
                aw = w1.getWidth();//返回悬浮窗宽度。
                ah = w1.getHeight();
                log(aw,ah)
                windowX = w1.getX();//悬浮窗左上角距离屏幕的绝对坐标
                windowY = w1.getY();
                log(windowX,windowY)
                downTime = new Date().getTime();
            case event.ACTION_MOVE:
                log("case event.ACTION_MOVE:")

                //移动手指时调整悬浮窗位置
                //悬浮窗原本的左上角坐标+(现在的触摸点坐标-一开始按下的触摸点坐标)
                左上角坐标[0] = windowX +(event.getRawX() - x)
                左上角坐标[1] = windowY+(event.getRawY() - y)
                w1.setPosition(windowX + (event.getRawX() - x),
                               windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })
    上大小 = [0, 0]
    上大小[0] = w1.getWidth();
    上大小[1] = w1.getHeight()

}






// 右下角
function 右下角() {
    w2 = floaty.rawWindow(
        <frame id="右下角" margin="0" padding="0" gravity="right|bottom" bg="#0000ff00">
          <vertical gravity="right|bottom" >
            <text w="6" h="150" bg="#ffff0000"></text>
            <text w="150" h="6" bg="#ffff0000"></text>
          </vertical>
        </frame>
    );
    w2.setPosition(右下角坐标[0], 右下角坐标[1])
    log("右下角坐标",右下角坐标[0], 右下角坐标[1])
    sleep(100)

    w2.右下角.setOnTouchListener(function(view, event) {
        log("w2.右下角.setOnTouchListener")
        log(view)
        log(event)
        //移动角需要确定把角移动到哪里,只需要一个坐标
        //这个坐标是按下时候的坐标和移动之后的坐标差
        //再加上view本身的坐标
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                log("case event.ACTION_DOWN:")

                x = event.getRawX();//触摸点距离屏幕的绝对坐标
                y = event.getRawY();
                log(x,y)
                aw = w2.getWidth();//返回悬浮窗宽度。
                ah = w2.getHeight();
                log(aw,ah)
                windowX = w2.getX();//悬浮窗右下角距离屏幕的绝对坐标
                windowY = w2.getY();
                log(windowX,windowY)
                downTime = new Date().getTime();
            case event.ACTION_MOVE:
                log("case event.ACTION_MOVE:")

                //移动手指时调整悬浮窗位置
                //悬浮窗原本的右下角坐标+(现在的触摸点坐标-一开始按下的触摸点坐标)
                右下角坐标[0] = windowX +(event.getRawX() - x)
                右下角坐标[1] = windowY+(event.getRawY() - y)
                w2.setPosition(windowX + (event.getRawX() - x),
                               windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })
    下大小 = []
    下大小[0] = w2.getWidth()
    下大小[1] = w2.getHeight()
    log("下大小",下大小)

}
