requestScreenCapture();
setClip("");
var str = "";
var ztl = 0;
截图 = [200 + 39, 300 + 99 + ztl, 400 + 482, 500 + 545 + ztl];
上部坐标 = [200, 300];
下部坐标 = [400, 500];
files.ensureDir("/sdcard/脚本/截图/");
上坐标();
下坐标();
控制台();
        importClass(android.speech.tts.TextToSpeech);
        var tts = new TextToSpeech(context, function(status){
        //log(status);
        tts.setLanguage(java.util.Locale.CHINA);
        });
sleep(333334333);

function 控制台() {
    w=floaty.window(
        <frame id="背景1" w="*" h="*" margin="0" gravity="center" bg="#ffffffee">
         <vertical gravity="right">
           <linear gravity="center">
             <button id="最小化" margin="-3" gravity="center" text="最小化" w="57" h="30" textSize="8sp" />
             <button id="有栏" margin="-3" gravity="center" text="有栏" w="57" h="30" textSize="8sp" />
             <button id="截图" margin="-3" gravity="center" text="截图" w="57" h="30" textSize="8sp" />
             <button id="识别" margin="-3" gravity="center" text="识别" w="57" h="30" textSize="8sp" />
              </linear>
          <linear gravity="center">
             <vertical margin="3" bg="#77ffffff" gravity="top">
               <linear margin="-2" gravity="center">
                 <button id="移动0" margin="-3" gravity="center" text="左上" w="40" h="30" textSize="8sp" />
                 <button id="上0" margin="-3" gravity="center" text="↑" w="40" h="30" textSize="8sp" />
                 <button id="退出" margin="-3" gravity="center" text="退出" w="40" h="30" textSize="8sp" />
               </linear>
               <linear margin="-2" gravity="center">
                 <button id="左0" margin="-3" gravity="center" text="←" w="40" h="30" textSize="8sp" />
                 <button id="下0" margin="-3" gravity="center" text="↓" w="40" h="30" textSize="8sp" />
                 <button id="右0" margin="-3" gravity="center" text="→" w="40" h="30" textSize="8sp" />
               </linear>
                 <text id="上坐标" textColor="red" textSize="10sp">上坐标</text>
             </vertical>
             <vertical margin="3" bg="#77ffffff" gravity="top">
               <linear margin="-2" gravity="center">
                <button id="移动1" margin="-3" gravity="center" text="右下" w="40" h="30" textSize="8sp" />
                <button id="上1" margin="-3" gravity="center" text="↑" w="40" h="30" textSize="8sp" />
                <button id="搜索" margin="-3" gravity="center" text="搜索" w="40" h="30" textSize="8sp" />
               </linear>
               <linear margin="-2" gravity="center">
                <button id="左1" margin="-3" gravity="center" text="←" w="40" h="30" textSize="8sp" />
                <button id="下1" margin="-3" gravity="center" text="↓" w="40" h="30" textSize="8sp" />
                <button id="右1" margin="-3" gravity="center" text="→" w="40" h="30" textSize="8sp" />
               </linear>
               <text id="下坐标" textColor="red" textSize="10sp">下坐标</text>
              </vertical>
           </linear>
            <text id="截图大小" textColor="red" textSize="10sp">图片大小:000X000</text>
            <text id="timu" textColor="red" textSize="10sp">题目：攀登、白酒煮饭、专业滥竽充数</text>
            <text id="baidu" textColor="red" textSize="10sp"></text>
            <text id="sogou" textColor="red" textSize="10sp"></text>
            <text id="s360" textColor="red" textSize="10sp"></text>
            <text id="uc" textColor="red" textSize="10sp"></text>
           </vertical>
           </frame>
    );
    setInterval(() => {}, 1000);
    var x = 0;
    var y = 0;
    var wx = 200,
        wy = 1000;
    w.setPosition(wx, wy);
    w.setSize(690, 650);
    w.截图.click(() => {
        threads.start(function() {
            w.setSize(0, 0);
            var sj = new Date().getTime();
            sleep(50);
            var 路径 = "/sdcard/脚本/截图/" + sj + ".png";
            var img = captureScreen();
            w.setSize(690, 650);
            var aa = images.clip(img, 截图[0], 截图[1], 截图[2] - 截图[0], 截图[3] - 截图[1]);
            images.saveImage(aa, 路径);
            toastLog("截图保存在:\n" + 路径);
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
                //移动手指时调整悬浮窗位置;
                w.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                return true;
            case event.ACTION_UP:
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    if (w.最小化.text() == "最小化") {
                        w.最小化.setText("最大化");
                        w.setSize(230, 147);
                        w1.setSize(0, 0);
                        w2.setSize(0, 0);
                    } else {
                        w.最小化.setText("最小化");
                        w.setSize(690, 650);
                        w1.setSize(上大小[0], 上大小[1]);
                        w2.setSize(下大小[0], 下大小[1]);
                    };
                };
                return true;
        };
        return true;
    });
    w.退出.click(() => {
        toast("退出");
        w.close();
        w1.close();
        w2.close();
        threads.shutDownAll();
        exit();
    });
    w.有栏.click(() => {
        if (w.有栏.text() == "无栏") {
            w.有栏.setText("有栏");
            ztl = 0;
        } else {
            w.有栏.setText("无栏");
            ztl = 60;
        };
        窗口移动(2, 上部坐标[0], 上部坐标[1]);
        窗口移动(2, 下部坐标[0], 下部坐标[1]);
    });
    w.上0.click(() => {
        if (上部坐标[1] > -99 + ztl) 上部坐标[1]--;
        窗口移动(0, 上部坐标[0], 上部坐标[1]);
    });
    w.下0.click(() => {
        if (上部坐标[1] < 1920 - 99 + ztl - 1 && 上部坐标[1] + 99 + ztl < 下部坐标[1] + 545 + ztl - 1) 上部坐标[1]++;
        窗口移动(0, 上部坐标[0], 上部坐标[1]);
    });
    w.左0.click(() => {
        if (上部坐标[0] > -39) 上部坐标[0]--;
        窗口移动(0, 上部坐标[0], 上部坐标[1]);
    });
    w.右0.click(() => {
        if (上部坐标[0] < 1080 - 39 - 1 && 上部坐标[0] + 39 < 下部坐标[0] + 482 - 1) 上部坐标[0]++;
        窗口移动(0, 上部坐标[0], 上部坐标[1]);
    });
    w.移动0.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX() - 上部坐标[0];
                y = event.getRawY() - 上部坐标[1];
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                上部坐标[0] = (event.getRawX() - x);
                上部坐标[1] = (event.getRawY() - y);
                if (上部坐标[0] < -39) 上部坐标[0] = -39;
                if (上部坐标[1] < -99 + ztl) 上部坐标[1] = -99 + ztl;
                if (上部坐标[0] > 1080 - 39 - 1) 上部坐标[0] = 1080 - 39 - 1;
                if (上部坐标[1] > 1920 - 99 + ztl - 1) 上部坐标[1] = 1920 - 99 + ztl - 1;
                if (上部坐标[0] + 39 > 下部坐标[0] + 482 - 1) 上部坐标[0] = 下部坐标[0] + 482 - 1 - 39;
                if (上部坐标[1] + 99 > 下部坐标[1] + 545 - 1) 上部坐标[1] = 下部坐标[1] + 545 - 1 - 99;
                窗口移动(0, 上部坐标[0], 上部坐标[1]);
            case event.ACTION_UP:
        };
        return true;
    });
    w.上1.click(() => {
        if (下部坐标[1] > -545 + ztl + 1 && 下部坐标[1] + 545 + ztl > 上部坐标[1] + 99 + ztl + 1) 下部坐标[1]--;
        窗口移动(1, 下部坐标[0], 下部坐标[1]);
    });
    w.下1.click(() => {
        if (下部坐标[1] < 1920 - 545 + ztl) 下部坐标[1]++;
        窗口移动(1, 下部坐标[0], 下部坐标[1]);
    });
    w.左1.click(() => {
        if (下部坐标[0] > -482 + 1 && 下部坐标[0] + 482 > 上部坐标[0] + 39 + 1) 下部坐标[0]--;
        窗口移动(1, 下部坐标[0], 下部坐标[1]);
    });
    w.右1.click(() => {
        if (下部坐标[0] < 1080 - 482) 下部坐标[0]++;
        窗口移动(1, 下部坐标[0], 下部坐标[1]);
    });
    w.移动1.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX() - 下部坐标[0];
                y = event.getRawY() - 下部坐标[1];
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                下部坐标[0] = (event.getRawX() - x);
                下部坐标[1] = (event.getRawY() - y);
                if (下部坐标[0] < -482 + 1) 下部坐标[0] = -482 + 1;
                if (下部坐标[1] < -545 + ztl + 1) 下部坐标[1] = -545 + ztl + 1;
                if (下部坐标[0] > 1080 - 482) 下部坐标[0] = 1080 - 482;
                if (下部坐标[1] > 1920 - 545 + ztl) 下部坐标[1] = 1920 - 545 + ztl;
                if (下部坐标[0] + 482 < 上部坐标[0] + 39 + 1) 下部坐标[0] = 上部坐标[0] + 39 + 1 - 482;
                if (下部坐标[1] + 545 < 上部坐标[1] + 99 + 1) 下部坐标[1] = 上部坐标[1] + 99 + 1 - 545;
                窗口移动(1, 下部坐标[0], 下部坐标[1]);
            case event.ACTION_UP:
        };
        return true;
    });
    w.识别.click(() => {
        threads.start(function() {
            w.setSize(0, 0);
            sleep(50);
            var path = "/sdcard/js截图/识别.png";
            var img = captureScreen();
            w.setSize(690, 650);
            var aa = images.clip(img, 截图[0], 截图[1], 截图[2] - 截图[0], 截图[3] - 截图[1]);
            images.saveImage(aa, path);
            文字识别(path);
        });
    });
    w.搜索.click(() => {
        dialogs.confirm("你帅吗？").then(function(hh){
        if(hh){
        tts.speak("不打扮比鬼难看。。。", tts.QUEUE_FLUSH, null);
        }else{
        tts.speak("一打扮鬼都瘫痪。。。", tts.QUEUE_FLUSH, null);
        }
        }).then(function(hh){
            //alert("您输入的是:" + hh);
        });
    });
    w.背景1.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                wx = windowX + (event.getRawX() - x);
                wy = windowY + (event.getRawY() - y);
                w.setPosition(wx, wy);
            case event.ACTION_UP:
        };
        return true;
    });
};

function 文字识别(路径) {
    try {
        var url = "http://pic.sogou.com/pic/upload_pic.jsp";
        var res = http.postMultipart(url, {
            "file": open(路径),
        });
        var t = res.body.string();
        res = http.get("http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + t);
        var temp = res.body.string();
        const json = JSON.parse(temp);
        str = json.result.map(val => val.content);
        str = str.join('\n');
        str = str.replace(/[\s\r\n]/g, "");
    } catch (e) {
        str = "404http错误!";
    }
    setClip(str);
    log("识别内容：" + str);
    toast("识别完成，请往日志或剪切板查看结果");
};

function 窗口移动(a, x, y) {
    if (a == 0) {
        w1.setPosition(x, y);
    } else if (a == 1) {
        w2.setPosition(x, y);
    };
    截图[0] = w1.getX() + 39;
    截图[1] = w1.getY() + 99 - ztl;
    截图[2] = w2.getX() + 482;
    截图[3] = w2.getY() + 545 - ztl;
    ui.run(function() {
        w.上坐标.setText(截图[0] + "x" + 截图[1]);
        w.下坐标.setText(截图[2] + "x" + 截图[3]);
        w.截图大小.setText("截图大小:" + (截图[2] - 截图[0]) + "x" + (截图[3] - 截图[1]));
    });
};

function 上坐标() {
     w1=floaty.window(
        <frame id="移动11" gravity="center">
          <vertical>
            <text w="150" h="1" bg="#99111900"></text>
            <text w="1" h="150" bg="#99111900"></text>
          </vertical>
        </frame>
     );
    w1.setPosition(上部坐标[0], 上部坐标[1]);
    sleep(100);
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
                上部坐标[0] = windowX + (event.getRawX() - x);
                上部坐标[1] = windowY + (event.getRawY() - y);
                if (上部坐标[0] < -39) 上部坐标[0] = -39;
                if (上部坐标[1] < -99 + ztl) 上部坐标[1] = -99 + ztl;
                if (上部坐标[0] > 1080 - 39 - 1) 上部坐标[0] = 1080 - 39 - 1;
                if (上部坐标[1] > 1920 - 99 + ztl - 1) 上部坐标[1] = 1920 - 99 + ztl - 1;
                if (上部坐标[0] + 39 > 下部坐标[0] + 482 - 1) 上部坐标[0] = 下部坐标[0] + 482 - 1 - 39;
                if (上部坐标[1] + 99 > 下部坐标[1] + 545 - 1) 上部坐标[1] = 下部坐标[1] + 545 - 1 - 99;
                窗口移动(2, 上部坐标[0], 上部坐标[1]);
                w1.setPosition(上部坐标[0], 上部坐标[1]);
            case event.ACTION_UP:
        };
        return true;
    });
    上大小 = [0, 0];
    上大小[0] = w1.getWidth();
    上大小[1] = w1.getHeight();
};

function 下坐标() {
     w2=floaty.window(
        <frame id="移动22" gravity="right|bottom">
          <vertical gravity="right|bottom">
            <text w="1" h="150" bg="#99111900"></text>
            <text w="150" h="1" bg="#99111900"></text>
          </vertical>
        </frame>
     );
    w2.setPosition(下部坐标[0], 下部坐标[1]);
    sleep(100);
    w2.移动22.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                aw = w2.getWidth();
                ah = w2.getHeight();
                windowX = w2.getX();
                windowY = w2.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                下部坐标[0] = windowX + (event.getRawX() - x);
                下部坐标[1] = windowY + (event.getRawY() - y);
                if (下部坐标[0] < -482 + 1) 下部坐标[0] = -482 + 1;
                if (下部坐标[1] < -545 + ztl + 1) 下部坐标[1] = -545 + ztl + 1;
                if (下部坐标[0] > 1080 - 482) 下部坐标[0] = 1080 - 482;
                if (下部坐标[1] > 1920 - 545 + ztl) 下部坐标[1] = 1920 - 545 + ztl;
                if (下部坐标[0] + 482 < 上部坐标[0] + 39 + 1) 下部坐标[0] = 上部坐标[0] + 39 + 1 - 482;
                if (下部坐标[1] + 545 < 上部坐标[1] + 99 + 1) 下部坐标[1] = 上部坐标[1] + 99 + 1 - 545;
                窗口移动(2, 下部坐标[0], 下部坐标[1]);
                w2.setPosition(下部坐标[0], 下部坐标[1]);
            case event.ACTION_UP:
        };
        return true;
    });
    下大小 = [0, 0];
    下大小[0] = w2.getWidth();
    下大小[1] = w2.getHeight();
};
