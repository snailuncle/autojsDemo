坐标 = [0, 0]
上部坐标 = [200, 300]
控制台()
上坐标()
sleep(333334333)

function 控制台() {
    w = floaty.window(
        <frame id="背景1"  w="100" h="100" margin="0" gravity="center"  bg="#8833ff00">
         <vertical gravity="right">
           <linear gravity="center">
             <button id="最小化" margin="-3" gravity="right" text="最小化+移动"  w="60" h="30" textSize="6sp" />
             <button id="退出" margin="-4" gravity="center" text="退出"  w="60" h="30" textSize="8sp" />
              </linear>
          <linear gravity="center">
             <vertical margin="3" bg="#99991919" gravity="top">
               <linear margin="-2" gravity="center">
                 <button id="点击" margin="-3" gravity="center" text="点击"  w="40" h="30" textSize="8sp" />
                 <button id="上0" margin="-3" gravity="center" text="↑"  w="40" h="30" textSize="8sp" />
                 <button id="返回" margin="-3" gravity="center" text="返回"  w="40" h="30" textSize="8sp" />
               </linear>
               <linear margin="-2" gravity="center">
                 <button id="左0" margin="-3" gravity="center" text="←"  w="40" h="30" textSize="8sp" />
                 <button id="移动0" margin="-3" gravity="center" text="※"  w="40" h="30" textSize="8sp" />
                 <button id="右0" margin="-3" gravity="center" text="→"  w="40" h="30" textSize="8sp" />
               </linear>
                 <linear margin="-2" gravity="center">
                 <button id="鼠标" margin="-3" gravity="center" text="键盘"  w="40" h="30" textSize="8sp" />
                 <button id="下0" margin="-3" gravity="center" text="↓"  w="40" h="30" textSize="8sp" />
                 <button id="确定" margin="-3" gravity="center" text="确定"  w="40" h="30" textSize="8sp" />
               </linear>
               <text id="坐标" gravity="center" textColor="red" textSize="8sp">点击坐标:000X000</text>
             </vertical>
           </linear>
          </vertical>
        </frame>
    );
    //setInterval(()=>{}, 1000);
    var x = 0
    var y = 0
    w.setPosition(600, 600)


    // w.setAdjustEnabled(true);
    w.setSize(900, 600)
    w.退出.click(() => {
        toast("退出");
        //w.close();
        exit()
    });
    w.鼠标.click(() => {
        if (w.鼠标.text() == "鼠标") {
            w.鼠标.setText("键盘");
            toast("方向键控制键盘方向");
        } else {
            w.鼠标.setText("鼠标");
            toast("方向键控制光标");
        }
    });
    w.返回.click(() => {
        threads.start(function() {
            back()
        });
    });
    w.确定.click(() => {
        threads.start(function() {
            OK()
        });
    });
    w.点击.click(() => {
        threads.start(function() {
            click(坐标[0], 坐标[1])
        });
    });
    w.最小化.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = w.getX();
                windowY = w.getY();

                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                w.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));

                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    if (w.最小化.text() == "最小化+移动") {
                        w.最小化.setText("最大化     ++++++");
                        w.setSize(150, 150);
                        w1.setSize(0, 0)
                    } else {
                        w.最小化.setText("最小化+移动");
                        w.setSize(900, 600);
                        w1.setSize(上大小[0], 上大小[1])
                    }
                }
                return true;
        }
        return true;
    });

    w.上0.click(() => {
        if (w.鼠标.text() == "键盘") {
            threads.start(function() {
                Up()
            });
        } else {
            上部坐标[1]--
                窗口移动(0, 上部坐标[0], 上部坐标[1])
        }
    });

    w.下0.click(() => {
        if (w.鼠标.text() == "键盘") {
            threads.start(function() {
                Down()
            });
        } else {
            上部坐标[1]++
                窗口移动(0, 上部坐标[0], 上部坐标[1])
        }
    });
    w.左0.click(() => {
        if (w.鼠标.text() == "键盘") {
            threads.start(function() {
                Left()
            });
        } else {
            上部坐标[0]--
                窗口移动(0, 上部坐标[0], 上部坐标[1])
        }
    });
    w.右0.click(() => {
        if (w.鼠标.text() == "键盘") {
            threads.start(function() {
                Right()
            });
        } else {
            上部坐标[0]++
                窗口移动(0, 上部坐标[0], 上部坐标[1])
        }
    });
    w.移动0.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX() * 4 - 上部坐标[0];
                y = event.getRawY() * 4 - 上部坐标[1];
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置

                上部坐标[0] = (event.getRawX() * 4 - x)
                上部坐标[1] = (event.getRawY() * 4 - y)
                if (上部坐标[0] < 0) 上部坐标[0] = 0
                if (上部坐标[0] > 1080) 上部坐标[0] = 1080
                if (上部坐标[1] < 0) 上部坐标[1] = 0
                if (上部坐标[1] > 1920) 上部坐标[1] = 1920
                窗口移动(0, 上部坐标[0], 上部坐标[1])

            case event.ACTION_UP:
        }
        return true;
    })
}

function 窗口移动(a, x, y) {
    w1.setPosition(x, y)
    坐标[0] = w1.getX() + 39 - 40
    坐标[1] = w1.getY() + 99 - 0
    ui.run(function() {
        w.坐标.setText("点击坐标:" + 坐标[0] + "X" + 坐标[1]);
    });
}

function 上坐标() {
    w1 = floaty.window(
        <frame id="移动11" gravity="center"> 
        <vertical>
            <text w="15" h="15" textColor="red" bg="#00000000">↖</text> 
          </vertical>
     </frame>
    );
    w1.setPosition(上部坐标[0], 上部坐标[1])
    sleep(100)
    w1.移动11.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                aw = w1.getWidth();
                ah = w1.getHeight();
                windowX = w1.getX();
                windowY = w1.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                上部坐标[0] = windowX + (event.getRawX() - x)
                上部坐标[1] = windowY + (event.getRawY() - y)
                窗口移动(2, 上部坐标[0], 上部坐标[1])
                w1.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })
    上大小 = [0, 0]
    上大小[0] = w1.getWidth();
    上大小[1] = w1.getHeight()
    log(w1.getWidth())
}