//自定义截图方便使用找图功能，作者攀登
//在攀登的脚本基础上加入文字识别功能
//识别结果在日志日志中，当然也可以直接复制进剪贴板;
//by 白酒煮饭;
//在白酒煮饭的基础上加入搜题功能;
//by 专业滥竽充数;
requestScreenCapture();
var path="/sdcard/Download/Screenshots/";
setClip("");
var str = "";
var ztl = 0;
截图 = [200 + 39, 300 + 99 + ztl, 400 + 482, 500 + 545 + ztl];
上部坐标 = [200, 300];
下部坐标 = [400, 500];
files.ensureDir(path);
上坐标();
下坐标();
控制台();

function 控制台() {
    w=floaty.window(
        <frame id="背景1" w="206" h="200" margin="0" gravity="center" bg="#77ffffff">
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
            <scroll gravity="left" h="40" ellipsize="marquee">
            <text id="timu" textColor="red" textSize="10sp">题目：攀登、白酒煮饭、专业滥竽充数</text>
            </scroll>
            <text id="baidu" textColor="red" textSize="10sp"></text>
            <text id="sogou" textColor="red" textSize="10sp"></text>
            <text id="s360" textColor="red" textSize="10sp"></text>
            <text id="uc" textColor="red" textSize="10sp"></text>
           </vertical>
           </frame>
    );
    var sousuo1=false;
    setInterval(() => {
    if(sousuo1){
        sousuo1=false;
        jiamis(dialogs.prompt("输入密码才能继续"));
        }
    }, 1000);
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
            var 路径 = path + sj + ".png";
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
            var pathpng = path + "识别.png";
            var img = captureScreen();
            w.setSize(690, 650);
            var aa = images.clip(img, 截图[0], 截图[1], 截图[2] - 截图[0], 截图[3] - 截图[1]);
            images.saveImage(aa, pathpng);
            文字识别(pathpng);
        });
    });
    w.搜索.click(() => {
        sousuo1=true;
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

function jiamis(mima){
var CryptoJS=CryptoJS||function(p,h){var i={},l=i.lib={},r=l.Base=function(){function a(){}return{extend:function(e){a.prototype=this;var c=new a;e&&c.mixIn(e);c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),o=l.WordArray=r.extend({init:function(a,e){a= this.words=a||[];this.sigBytes=e!=h?e:4*a.length},toString:function(a){return(a||s).stringify(this)},concat:function(a){var e=this.words,c=a.words,b=this.sigBytes,a=a.sigBytes;this.clamp();if(b%4)for(var d=0;d<a;d++)e[b+d>>>2]|=(c[d>>>2]>>>24-8*(d%4)&255)<<24-8*((b+d)%4);else if(65535<c.length)for(d=0;d<a;d+=4)e[b+d>>>2]=c[d>>>2];else e.push.apply(e,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,e=this.sigBytes;a[e>>>2]&=4294967295<<32-8*(e%4);a.length=p.ceil(e/4)},clone:function(){var a= r.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var e=[],c=0;c<a;c+=4)e.push(4294967296*p.random()|0);return o.create(e,a)}}),m=i.enc={},s=m.Hex={stringify:function(a){for(var e=a.words,a=a.sigBytes,c=[],b=0;b<a;b++){var d=e[b>>>2]>>>24-8*(b%4)&255;c.push((d>>>4).toString(16));c.push((d&15).toString(16))}return c.join("")},parse:function(a){for(var e=a.length,c=[],b=0;b<e;b+=2)c[b>>>3]|=parseInt(a.substr(b,2),16)<<24-4*(b%8);return o.create(c,e/2)}},n=m.Latin1={stringify:function(a){for(var e= a.words,a=a.sigBytes,c=[],b=0;b<a;b++)c.push(String.fromCharCode(e[b>>>2]>>>24-8*(b%4)&255));return c.join("")},parse:function(a){for(var e=a.length,c=[],b=0;b<e;b++)c[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return o.create(c,e)}},k=m.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(e){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},f=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=o.create(); this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=k.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var e=this._data,c=e.words,b=e.sigBytes,d=this.blockSize,q=b/(4*d),q=a?p.ceil(q):p.max((q|0)-this._minBufferSize,0),a=q*d,b=p.min(4*a,b);if(a){for(var j=0;j<a;j+=d)this._doProcessBlock(c,j);j=c.splice(0,a);e.sigBytes-=b}return o.create(j,b)},clone:function(){var a=r.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=f.extend({init:function(){this.reset()}, reset:function(){f.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=f.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(e,c){return a.create(c).finalize(e)}},_createHmacHelper:function(a){return function(e,c){return g.HMAC.create(a,c).finalize(e)}}});var g=i.algo={};return i}(Math); (function(){var p=CryptoJS,h=p.lib.WordArray;p.enc.Base64={stringify:function(i){var l=i.words,h=i.sigBytes,o=this._map;i.clamp();for(var i=[],m=0;m<h;m+=3)for(var s=(l[m>>>2]>>>24-8*(m%4)&255)<<16|(l[m+1>>>2]>>>24-8*((m+1)%4)&255)<<8|l[m+2>>>2]>>>24-8*((m+2)%4)&255,n=0;4>n&&m+0.75*n<h;n++)i.push(o.charAt(s>>>6*(3-n)&63));if(l=o.charAt(64))for(;i.length%4;)i.push(l);return i.join("")},parse:function(i){var i=i.replace(/\s/g,""),l=i.length,r=this._map,o=r.charAt(64);o&&(o=i.indexOf(o),-1!=o&&(l=o)); for(var o=[],m=0,s=0;s<l;s++)if(s%4){var n=r.indexOf(i.charAt(s-1))<<2*(s%4),k=r.indexOf(i.charAt(s))>>>6-2*(s%4);o[m>>>2]|=(n|k)<<24-8*(m%4);m++}return h.create(o,m)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})(); (function(p){function h(f,g,a,e,c,b,d){f=f+(g&a|~g&e)+c+d;return(f<<b|f>>>32-b)+g}function i(f,g,a,e,c,b,d){f=f+(g&e|a&~e)+c+d;return(f<<b|f>>>32-b)+g}function l(f,g,a,e,c,b,d){f=f+(g^a^e)+c+d;return(f<<b|f>>>32-b)+g}function r(f,g,a,e,c,b,d){f=f+(a^(g|~e))+c+d;return(f<<b|f>>>32-b)+g}var o=CryptoJS,m=o.lib,s=m.WordArray,m=m.Hasher,n=o.algo,k=[];(function(){for(var f=0;64>f;f++)k[f]=4294967296*p.abs(p.sin(f+1))|0})();n=n.MD5=m.extend({_doReset:function(){this._hash=s.create([1732584193,4023233417, 2562383102,271733878])},_doProcessBlock:function(f,g){for(var a=0;16>a;a++){var e=g+a,c=f[e];f[e]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360}for(var e=this._hash.words,c=e[0],b=e[1],d=e[2],q=e[3],a=0;64>a;a+=4)16>a?(c=h(c,b,d,q,f[g+a],7,k[a]),q=h(q,c,b,d,f[g+a+1],12,k[a+1]),d=h(d,q,c,b,f[g+a+2],17,k[a+2]),b=h(b,d,q,c,f[g+a+3],22,k[a+3])):32>a?(c=i(c,b,d,q,f[g+(a+1)%16],5,k[a]),q=i(q,c,b,d,f[g+(a+6)%16],9,k[a+1]),d=i(d,q,c,b,f[g+(a+11)%16],14,k[a+2]),b=i(b,d,q,c,f[g+a%16],20,k[a+3])):48>a?(c= l(c,b,d,q,f[g+(3*a+5)%16],4,k[a]),q=l(q,c,b,d,f[g+(3*a+8)%16],11,k[a+1]),d=l(d,q,c,b,f[g+(3*a+11)%16],16,k[a+2]),b=l(b,d,q,c,f[g+(3*a+14)%16],23,k[a+3])):(c=r(c,b,d,q,f[g+3*a%16],6,k[a]),q=r(q,c,b,d,f[g+(3*a+7)%16],10,k[a+1]),d=r(d,q,c,b,f[g+(3*a+14)%16],15,k[a+2]),b=r(b,d,q,c,f[g+(3*a+5)%16],21,k[a+3]));e[0]=e[0]+c|0;e[1]=e[1]+b|0;e[2]=e[2]+d|0;e[3]=e[3]+q|0},_doFinalize:function(){var f=this._data,g=f.words,a=8*this._nDataBytes,e=8*f.sigBytes;g[e>>>5]|=128<<24-e%32;g[(e+64>>>9<<4)+14]=(a<<8|a>>> 24)&16711935|(a<<24|a>>>8)&4278255360;f.sigBytes=4*(g.length+1);this._process();f=this._hash.words;for(g=0;4>g;g++)a=f[g],f[g]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360}});o.MD5=m._createHelper(n);o.HmacMD5=m._createHmacHelper(n)})(Math); (function(){var p=CryptoJS,h=p.lib,i=h.Base,l=h.WordArray,h=p.algo,r=h.EvpKDF=i.extend({cfg:i.extend({keySize:4,hasher:h.MD5,iterations:1}),init:function(i){this.cfg=this.cfg.extend(i)},compute:function(i,m){for(var h=this.cfg,n=h.hasher.create(),k=l.create(),f=k.words,g=h.keySize,h=h.iterations;f.length<g;){a&&n.update(a);var a=n.update(i).finalize(m);n.reset();for(var e=1;e<h;e++)a=n.finalize(a),n.reset();k.concat(a)}k.sigBytes=4*g;return k}});p.EvpKDF=function(i,l,h){return r.create(h).compute(i, l)}})(); CryptoJS.lib.Cipher||function(p){var h=CryptoJS,i=h.lib,l=i.Base,r=i.WordArray,o=i.BufferedBlockAlgorithm,m=h.enc.Base64,s=h.algo.EvpKDF,n=i.Cipher=o.extend({cfg:l.extend(),createEncryptor:function(b,d){return this.create(this._ENC_XFORM_MODE,b,d)},createDecryptor:function(b,d){return this.create(this._DEC_XFORM_MODE,b,d)},init:function(b,d,a){this.cfg=this.cfg.extend(a);this._xformMode=b;this._key=d;this.reset()},reset:function(){o.reset.call(this);this._doReset()},process:function(b){this._append(b);return this._process()}, finalize:function(b){b&&this._append(b);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){return function(b){return{decrypt:function(a,q,j){return("string"==typeof q?c:e).decrypt(b,a,q,j)}}}}()});i.StreamCipher=n.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var k=h.mode={},f=i.BlockCipherMode=l.extend({createEncryptor:function(b,a){return this.Encryptor.create(b, a)},createDecryptor:function(b,a){return this.Decryptor.create(b,a)},init:function(b,a){this._cipher=b;this._iv=a}}),k=k.CBC=function(){function b(b,a,d){var c=this._iv;c?this._iv=p:c=this._prevBlock;for(var e=0;e<d;e++)b[a+e]^=c[e]}var a=f.extend();a.Encryptor=a.extend({processBlock:function(a,d){var c=this._cipher,e=c.blockSize;b.call(this,a,d,e);c.encryptBlock(a,d);this._prevBlock=a.slice(d,d+e)}});a.Decryptor=a.extend({processBlock:function(a,d){var c=this._cipher,e=c.blockSize,f=a.slice(d,d+ e);c.decryptBlock(a,d);b.call(this,a,d,e);this._prevBlock=f}});return a}(),g=(h.pad={}).Pkcs7={pad:function(b,a){for(var c=4*a,c=c-b.sigBytes%c,e=c<<24|c<<16|c<<8|c,f=[],g=0;g<c;g+=4)f.push(e);c=r.create(f,c);b.concat(c)},unpad:function(b){b.sigBytes-=b.words[b.sigBytes-1>>>2]&255}};i.BlockCipher=n.extend({cfg:n.cfg.extend({mode:k,padding:g}),reset:function(){n.reset.call(this);var b=this.cfg,a=b.iv,b=b.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=b.createEncryptor;else c=b.createDecryptor, this._minBufferSize=1;this._mode=c.call(b,this,a&&a.words)},_doProcessBlock:function(b,a){this._mode.processBlock(b,a)},_doFinalize:function(){var b=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){b.pad(this._data,this.blockSize);var a=this._process(!0)}else a=this._process(!0),b.unpad(a);return a},blockSize:4});var a=i.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),k=(h.format={}).OpenSSL={stringify:function(a){var d= a.ciphertext,a=a.salt,d=(a?r.create([1398893684,1701076831]).concat(a).concat(d):d).toString(m);return d=d.replace(/(.{64})/g,"$1")},parse:function(b){var b=m.parse(b),d=b.words;if(1398893684==d[0]&&1701076831==d[1]){var c=r.create(d.slice(2,4));d.splice(0,4);b.sigBytes-=16}return a.create({ciphertext:b,salt:c})}},e=i.SerializableCipher=l.extend({cfg:l.extend({format:k}),decrypt:function(a,c,e,f){f=this.cfg.extend(f);c=this._parse(c,f.format);return a.createDecryptor(e,f).finalize(c.ciphertext)},_parse:function(a,c){return"string"==typeof a?c.parse(a):a}}),h=(h.kdf={}).OpenSSL={compute:function(b,c,e,f){f||(f=r.random(8));b=s.create({keySize:c+e}).compute(b,f);e=r.create(b.words.slice(c),4*e);b.sigBytes=4*c;return a.create({key:b,iv:e,salt:f})}},c=i.PasswordBasedCipher= e.extend({cfg:e.cfg.extend({kdf:h}),decrypt:function(a,c,f,j){j=this.cfg.extend(j);c=this._parse(c,j.format);f=j.kdf.compute(f,a.keySize,a.ivSize,c.salt);j.iv=f.iv;return e.decrypt.call(this,a,c,f.key,j)}})}(); (function(){var p=CryptoJS,h=p.lib.BlockCipher,i=p.algo,l=[],r=[],o=[],m=[],s=[],n=[],k=[],f=[],g=[],a=[];(function(){for(var c=[],b=0;256>b;b++)c[b]=128>b?b<<1:b<<1^283;for(var d=0,e=0,b=0;256>b;b++){var j=e^e<<1^e<<2^e<<3^e<<4,j=j>>>8^j&255^99;l[d]=j;r[j]=d;var i=c[d],h=c[i],p=c[h],t=257*c[j]^16843008*j;o[d]=t<<24|t>>>8;m[d]=t<<16|t>>>16;s[d]=t<<8|t>>>24;n[d]=t;t=16843009*p^65537*h^257*i^16843008*d;k[j]=t<<24|t>>>8;f[j]=t<<16|t>>>16;g[j]=t<<8|t>>>24;a[j]=t;d?(d=i^c[c[c[p^i]]],e^=c[c[e]]):d=e=1}})(); var e=[0,1,2,4,8,16,32,64,128,27,54],i=i.AES=h.extend({_doReset:function(){for(var c=this._key,b=c.words,d=c.sigBytes/4,c=4*((this._nRounds=d+6)+1),i=this._keySchedule=[],j=0;j<c;j++)if(j<d)i[j]=b[j];else{var h=i[j-1];j%d?6<d&&4==j%d&&(h=l[h>>>24]<<24|l[h>>>16&255]<<16|l[h>>>8&255]<<8|l[h&255]):(h=h<<8|h>>>24,h=l[h>>>24]<<24|l[h>>>16&255]<<16|l[h>>>8&255]<<8|l[h&255],h^=e[j/d|0]<<24);i[j]=i[j-d]^h}b=this._invKeySchedule=[];for(d=0;d<c;d++)j=c-d,h=d%4?i[j]:i[j-4],b[d]=4>d||4>=j?h:k[l[h>>>24]]^f[l[h>>> 16&255]]^g[l[h>>>8&255]]^a[l[h&255]]},decryptBlock:function(c,b){var d=c[b+1];c[b+1]=c[b+3];c[b+3]=d;this._doCryptBlock(c,b,this._invKeySchedule,k,f,g,a,r);d=c[b+1];c[b+1]=c[b+3];c[b+3]=d},_doCryptBlock:function(a,b,d,e,f,h,i,g){for(var l=this._nRounds,k=a[b]^d[0],m=a[b+1]^d[1],o=a[b+2]^d[2],n=a[b+3]^d[3],p=4,r=1;r<l;r++)var s=e[k>>>24]^f[m>>>16&255]^h[o>>>8&255]^i[n&255]^d[p++],u=e[m>>>24]^f[o>>>16&255]^h[n>>>8&255]^ i[k&255]^d[p++],v=e[o>>>24]^f[n>>>16&255]^h[k>>>8&255]^i[m&255]^d[p++],n=e[n>>>24]^f[k>>>16&255]^h[m>>>8&255]^i[o&255]^d[p++],k=s,m=u,o=v;s=(g[k>>>24]<<24|g[m>>>16&255]<<16|g[o>>>8&255]<<8|g[n&255])^d[p++];u=(g[m>>>24]<<24|g[o>>>16&255]<<16|g[n>>>8&255]<<8|g[k&255])^d[p++];v=(g[o>>>24]<<24|g[n>>>16&255]<<16|g[k>>>8&255]<<8|g[m&255])^d[p++];n=(g[n>>>24]<<24|g[k>>>16&255]<<16|g[m>>>8&255]<<8|g[o&255])^d[p++];a[b]=s;a[b+1]=u;a[b+2]=v;a[b+3]=n},keySize:8});p.AES=h._createHelper(i)})();
try{
var sousuo="";
var aix="U2FsdGVkX1/0xMJy0k4qb8hZjr5S0S5Fw2nGoQbX5ljli6/uJcr56HlzZ1CkVfg1rsk4J949klyTt8ADW4k8ULGXiRZvrkTmlot/MW1FfLG/JGYhLIgCeWDsKiaGtyq5/oLATv5Afv30v6Y8TYsDSZdmRCth/ido9lZrPMnbmUQSS7LhoJGpKbtY2L931xZVN1ai/BPWwfys0yPgtYcgzHCrhH813OLdhEP3+L9FoHIsUzP17EN/9gEZ4s9ezl7+0ndoRkbrOLFUF17WVQrZm6/bgIjUmnSPzaIhVZvNMsik/ftEPflxUO2BV3pNZzbG//V8ToRL5lyfLVnWswl53A+XXc+Sp/0FGmzclAvOKoYGbpgIoeC++57zgYhhP1pGcEINQtfy49TEuBLIcQH9nM5HkxK63A7V8plE+BLUVbSfuT+M85/uqyvtfYQFsYl975Jfkuc3tAVvjOR6DvCX1APJpXH+wRaT3A4orlJBDCHhkD+xebTwfCMEu3MkNNLTo4eZ2eDq+HfNHYntv2u35jVe4f3Pqzux/CgzCoffkgeL248i3t5WJ+cSvnNjcJzPE4uqKA19eytElAUQ0RZDmA==";
sousuo=CryptoJS.AES.decrypt(aix,mima).toString(CryptoJS.enc.Utf8)}catch(e){alert("密码错误！")};
if(sousuo){toast("密码输入正确！");engines.execScript("已解密",sousuo);log(sousuo)}
}

