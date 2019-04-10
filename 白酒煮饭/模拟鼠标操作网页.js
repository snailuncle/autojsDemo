"ui";
ui.statusBarColor("#ff555555");
ui.layout(
    <frame background="#ff555555">
        
        <ScrollView>
            <vertical align="top" margin="1">
                
                
                <webview w="359" h="260" size="6" id="webview" margin="0 0 1 0"/>
                <input id="text" w="359" h="0" size="10" bg="#ffffff" margin="0 1 1 0" hint="网页代码区"/>
                
                <linear>
                    <input id="awz" w="242" h="55" size='8' hint="vip视频网址。"/>
                    
                    <button h="55" w="60" id="azt" text="粘贴" />
                    <button h="55" w="60" id="aok" text="解析" />
                </linear>
                <linear>
                    <button h="55" w="140" id="adk" text="浏览器打开" />
                    <button h="55" w="120" id="afz" text="复制网址" />
                </linear>
                
                <grid id="xz" spanCount="4" h="*">
                    
                    <text text="{{name}}" bg="#ffcccccc" margin="1 1"/>
                    
                </grid>
                <text id="url" />
                <text id="sb" h="201" w="280" bg="#ff000033"/>
            </vertical>
        </ScrollView>
        <vertical>
            <text text="" color="#ffff0000"/>
            <text id="dj" bg="#ffcccccc" gravity="center" text="点击" h="100" w="80" margin="280 472 0 0" />
            <text id="yc" bg="#ffcccccc" gravity="center" text="鼠标隐藏" h="100" w="80" margin="280 1 0 0" />
            
        </vertical>
        <vertical>
            <img id="ok" h="360" />
            <text id="cs" text="" color="#ffff0000"/>
            
        </vertical>
        
    </frame>
);
ui.awz.text("http://m.iqiyi.com/v_19rrifgu4t.html?key=20204202d01937a1f6f9491213c8076d&msrc=3_31_56&aid=96678500&tvid=96678500&cid=1&identifier=weixinv1&ftype=27&subtype=1&vip_pc=2&vip_tpc=1&isrd=1&p1=2_22_222&social_platform=link");


ui.aok.click(() => {
    threads.start(function() {

        ui.run(function() {
            ui.webview.loadUrl(jx + ui.awz.text());
        });
        str = http.get(jx + ui.awz.text()).body.string();
        ui.run(function() {
            ui.text.text(str);
        });
    });
});
ui.afz.click(() => {
    threads.start(function() {
        setClip(jx + ui.awz.text());
    });
});


ui.azt.click(() => {
    ui.awz.text(getClip());
});

ui.dj.click(() => {
    threads.start(function(){


        ddx=(h0x+53)*lv;
        ddy=(h0y+16)*lv;
    new android.app.Instrumentation().sendPointerSync(android.view.MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), android.view.MotionEvent.ACTION_DOWN,ddx, ddy, 0));
    new android.app.Instrumentation().sendPointerSync(android.view.MotionEvent.obtain(android.os.SystemClock.uptimeMillis(), android.os.SystemClock.uptimeMillis(), android.view.MotionEvent.ACTION_UP, ddx, ddy, 0));
    
});
});
ui.yc.click(() => {
    var bitmap = Bitmap.createBitmap(1080, 1080, Bitmap.Config.ARGB_8888);

    var canvas = new Canvas(bitmap);
    canvas.drawARGB(0, 250, 0, 0);
  
    

    ui.run(function() {
        ui.ok.setImageBitmap(bitmap);

        //ui.cs.text(hx + "," + hy);

    });

});


ui.adk.click(() => {
    threads.start(function() {

        app.openUrl(jx + ui.awz.text());
    });
});

ui.xz.on("item_click", function(j, item, itemView, listView) {
    for (i = 0; i < apis.length; i++) {
        if (i == item) {
            apis2[i].name = "●" + apis[i].name;
        } else {
            apis2[i].name = "○" + apis[i].name;
        }
    }
    ui.xz.setDataSource(apis2);

    jx = j.url;
    ui.url.text(jx); //toast(item);
});
var apis = [{
        name: "金桥解析",
        url: "http://jqaaa.com/jx.php?url="
    }, //全民解析

    {
        name: "思古解析",
        url: "http://api.bbbbbb.me/jx/v.php?url="
    }, //牛吧吧vip解析
    {
        name: "思古解霸",
        url: "http://api.bbbbbb.me/jx/?url="
    },
    {
        name: "百域解析",
        url: "http://app.baiyug.cn:2019/vip/?url="
    }, //vip视频解析站
    //{name:"",url:""},
    {
        name: "猫云(xxx)",
        url: "https://jx.maoyun.tv/index.php?id="
    }, {
        name: "搜你妹",
        url: "http://www.sonimei.cn/?url="
    }, {
        name: "噗噗电影",
        url: "http://pupudy.com/play?make=url&id="
    }, {
        name: "酷绘",
        url: "http://appapi.svipv.kuuhui.com/svipjx/liulanqichajian/browserplugin/qhjx/qhjx.php?id="
    }, {
        name: "旋风解析",
        url: "http://api.xfsub.com/index.php?url="
    }, {
        name: "石头解析",
        url: "https://jiexi.071811.cc/jx.php?url="
    }, {
        name: "VIP看看",
        url: "http://q.z.vip.totv.72du.com/?url="
    }, {
        name: "ODFLV",
        url: "http://aikan-tv.com/?url="
    }, {
        name: "163人",
        url: "http://jx.api.163ren.com/vod.php?url="
    }, {
        name: "CKFLV",
        url: "http://www.0335haibo.com/tong.php?url="
    }, {
        name: "无名小站2",
        url: "http://www.wmxz.wang/video.php?url="
    }, {
        name: "眼睛会下雨",
        url: "http://www.vipjiexi.com/yun.php?url="
    }, {
        name: "1008影视",
        url: "http://api.1008net.com/v.php?url="
    }, {
        name: "人人发布",
        url: "http://v.renrenfabu.com/jiexi.php?url="
    }


];
apis2 = [];
for (i = 0; i < apis.length; i++) {

    apis2[i] = {
        name: apis[i].name,
        url: apis[i].url
    };


    apis2[i].name = "○" + apis[i].name;
}
ui.xz.setDataSource(apis2);
jx = "http://api.bbbbbb.me/jx/v.php?url=";
ui.url.text("bbbbbb.v" + ":" + jx);


importClass(android.graphics.Paint);
Canvas = android.graphics.Canvas;
importClass(android.graphics.Bitmap);



function ht(hx, hy) {

    var bitmap = Bitmap.createBitmap(1080, 1080, Bitmap.Config.ARGB_8888);

    var canvas = new Canvas(bitmap);
    canvas.drawARGB(0, 250, 0, 0);
    var paint = new Paint();
    //圆盘背景
    paint.setARGB(255, 40, 0, 40); //黑紫色画笔
    paint.setTextSize(60);
    canvas.drawPosText("☝", [hx, hy], paint);


    ui.run(function() {
        ui.ok.setImageBitmap(bitmap);

        //ui.cs.text(hx + "," + hy);

    });
}
h0x = 100;
h0y = 100;
lv=device.width/1080;
ui.sb.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            h0x += parseInt((event.getRawX() - x) / 5);
            h0y += parseInt((event.getRawY() - y) / 5);
            if (h0x < -47) {
                h0x = -47;
            }
            if (h0x > 1017) {
                h0x = 1017;
            }
            if (h0y < 60) {
                h0y = 60;
            }
            if (h0y > 827) {
                h0y = 827;
            }
            //if((new Date().getTime()-downTime)>50){
            ht(h0x, h0y);
            //downTime=new Date().getTime();}
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            //if(new Date().getTime() - downTime > 1500){
            //exit();
            //}
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击

            return true;
    }
    return true;
});