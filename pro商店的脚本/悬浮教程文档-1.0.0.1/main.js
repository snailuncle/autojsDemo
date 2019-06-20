/**
 *作者QQ: 1811588980
 *完成时间: 2019年3月20日 下午11:24:54
 *Auto.js版本: 4.1.0 Alpha5
 **/

function 刷新屏幕方向(t) {
    this.t = t || 100;
    this.callBackAry = new Array;
    this.Orientation = context.resources.configuration.orientation;
    this.Width = this.Orientation == 1 ? device.width : device.height;
    this.Height = this.Orientation == 2 ? device.width : device.height;
    this.addChangeListener = (fun) => {
        if (typeof(fun) == "function") {
            this.callBackAry.push(fun);
        };
    };
    setInterval(() => {
        if (context.resources.configuration.orientation != this.Orientation) {
            this.Orientation = context.resources.configuration.orientation;
            this.Width = this.Orientation == 1 ? device.width : device.height;
            this.Height = this.Orientation == 2 ? device.width : device.height;
            for (let i in this.callBackAry) {
                try {
                    if (typeof(this.callBackAry[i]) == "function") {
                        this.callBackAry[i](this.Width, this.Height, this.Orientation);
                    };
                } catch (e) {
                    throw e;
                };
            };
        };
    }, this.t);

};


var 悬浮控制 = function(window, windowid, ar, screen_change_obj) {
    this.Orientation = context.resources.configuration.orientation;
    this.Width = this.Orientation == 1 ? device.width : device.height;
    this.Height = this.Orientation == 2 ? device.width : device.height;
    if (screen_change_obj) {
        screen_change_obj.addChangeListener((Width, Height, Orientation) => {
            this.Orientation = Orientation;
            this.Width = Width;
            this.Height = Height;
            var xy = this.windowGXY(window.getX(), window.getY(), this.G(window));
            this.windowyidong([
                [window.getX(), window.getY()],
                [xy.x, xy.y]
            ]);
        });
    };
    this.isAutoIntScreen = true;
    this.Click = function() {};
    this.Move = function() {};
    this.LongClick = function() {};
    this.setClick = (fun) => {
        fun = fun || function() {};
        this.Click = fun;
    };
    this.setMove = (fun) => {
        fun = fun || function() {};
        this.Move = fun;
    };
    this.setLongClick = (fun, ji) => {
        fun = fun || function() {};
        this.LongClick = fun;
        if (parseInt(ji)) {
            this.Tjitime = parseInt(ji) / 50;
        };
    };
    this.TX = 0;
    this.TY = 0;
    this.Tx = 0;
    this.Ty = 0;
    this.Tyidong = false;
    this.Tkeep = false;
    this.Tjitime = 12;
    this.Ttime = 0;
    setInterval(() => {
        if (this.Tkeep) {
            this.Ttime++;
            if (!this.Tyidong && this.Ttime > this.Tjitime) {
                //非移动且按下时长超过1秒判断为长按
                this.Tkeep = false;
                this.Ttime = 0;
                this.LongClick();
            };
        };
    }, 50);
    if (windowid) {
        windowid.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
            this.Move(view, event);
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    this.Tx = event.getRawX();
                    this.Ty = event.getRawY();
                    this.TX = window.getX();
                    this.TY = window.getY();
                    this.Tkeep = true; //按下,开启计时
                    break;
                case event.ACTION_MOVE:
                    var sx = event.getRawX() - this.Tx;
                    var sy = event.getRawY() - this.Ty;
                    if (!this.Tyidong && this.Tkeep && this.weiyi(sx, sy) >= 10) {
                        this.Tyidong = true;
                    };
                    if (this.Tyidong && this.Tkeep) {
                        window.setPosition(this.TX + sx, this.TY + sy);
                    };
                    break;
                case event.ACTION_UP:
                    if (!this.Tyidong && this.Tkeep && this.Ttime < 7) {
                        this.Click();
                    };
                    this.Tkeep = false;
                    this.Ttime = 0;
                    if (this.Tyidong) {
                        if (this.isAutoIntScreen) {
                            threads.start(new java.lang.Runnable(() => {
                                this.windowyidong(this.IntScreen());
                            }));
                        } else {
                            threads.start(new java.lang.Runnable(() => {
                                this.windowyidong(this.ViewIntScreen());
                            }));

                        };
                        this.Tyidong = false;
                    };
                    break;
            };
            return true;
        }));
    };
    this.G = (win, view) => {
        //返回悬浮窗的坐标范围。
        var K = 36, //悬浮窗的隐形边矩
            H = 66; //手机通知栏的高度
        var ary;
        if (!ar) {
            if (view) {
                ary = [
                    [-view.getX(), -view.getY()],
                    [this.Width - (view.getX() + view.getWidth()), this.Height - (view.getY() + view.getHeight()) - H - K]
                ];

            } else {
                ary = [
                    [0, 0],
                    [this.Width - win.getWidth() + K * 2, this.Height - win.getHeight() - H + K * 2]
                ];
            }
        } else {
            if (view) {
                ary = [
                    [-view.getX(), H - view.getY()],
                    [this.Width - (view.getX() + view.getWidth()), this.Height - (view.getY() + view.getHeight())]
                ];

            } else {
                ary = [
                    [0, H],
                    [this.Width - win.getWidth(), this.Height - win.getHeight()]
                ];
            }
        };
        return ary;
    };
    this.weiyi = function() { //平方和开方
        var num = 0;
        for (var i = 0; i < arguments.length; i++) {
            num += arguments[i] * arguments[i];
        };
        return Math.round(Math.sqrt(num) * 1000) / 1000
    };
    this.windowGXY = function(x, y, k) {
        //修正坐标的所在范围。如果坐标超出了范围，则修正回来。
        x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
        y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
        return {
            x: x,
            y: y
        };
    };
    this.windowyidong = (A, s, w) => {
        //移动悬浮窗的动画效果。
        w = w || window;
        s = s || 10;
        var sx = A[1][0] - A[0][0],
            sy = A[1][1] - A[0][1];
        var sd = this.weiyi(sx, sy) / s;
        var X = sx / sd,
            Y = sy / sd;
        var x = 0,
            y = 0;
        for (var i = 0; i < sd; i++) {
            x += X;
            y += Y;
            sleep(1);
            w.setPosition(A[0][0] + x, A[0][1] + y);
        };
        w.setPosition(A[1][0], A[1][1]);
    };
    this.OutScreen = () => {
        //算出最短的距离到达屏幕之外。
        var F = this.G(window);
        var x = window.getX(),
            y = window.getY();
        var sx = window.getX() + window.getWidth() / 2,
            sy = window.getY() + window.getHeight() / 2 + 66;
        var cx = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? (sx < this.Width / 2 ? (F[0][0] - window.getWidth()) : (F[1][0] + window.getWidth())) : x,
            cy = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? y : (sy < this.Height / 2 ? (F[0][1] - window.getHeight()) : (F[1][1] + window.getHeight()));
        return [
            [x, y],
            [cx, cy]
        ];
    };
    this.toScreenEdge = (d) => {
        //返回到屏幕边缘的坐标。d为浮点数0.1~1之间。
        d = d || 0;
        var F = this.G(window);
        var x = window.getX(),
            y = window.getY();
        var sw = window.getWidth() * d;
        var sx = window.getX() + window.getWidth() / 2,
            sy = window.getY() + window.getHeight() / 2 + 66;
        var cx = sx < (this.Width - sx) ? -sw : (this.Width + sw - window.getWidth() + 72);
        return [
            [x, y],
            [cx, y]
        ];
    };
    this.centerXY = (F) => {
        //返回距离中心位置的一个方形两个坐标。
        var w = window.getWidth();
        var h = window.getHeight();
        return [
            [F[0] + w / 2, F[1] + h / 2],
            [F[0] - w / 2, F[1] - h / 2]
        ];
    };
    this.IntScreen = () => {
        //当悬浮超出屏幕之外之后进入的坐标。
        var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
        return [
            [window.getX(), window.getY()],
            [A.x, A.y]
        ];
    };
    this.ViewIntScreen = () => {
        //当悬浮超出屏幕之外之后进入的坐标。
        var A = this.windowGXY(window.getX(), window.getY(), this.G(window, windowid));
        return [
            [window.getX(), window.getY()],
            [A.x, A.y]
        ];
    };
    threads.start(new java.lang.Runnable(() => {
        this.windowyidong(this.IntScreen());
    }));
};


var window = floaty.window(
    <vertical bg="#ffeeeeee" padding="5" h="{{Math.floor(device.width*0.8)}}px">
        <frame>
            <text id="text" w="*" gravity="center" maxLines="1" ellipsize="end"/>
            <progressbar id="progress" w="*" h="auto" indeterminate="true" layout_gravity="top" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
        </frame>
        <frame layout_weight="1">
            <webview id="webview" w="*" h="*"/>
            <list id="list" w="90dp" h="*" bg="#346489" layout_gravity="right">
                <text w="*" h="auto" text="{{txt}}" textSize="16sp" bg="#dddddd" margin="5"padding="5" gravity="center"/>
            </list>
        </frame>
        <horizontal w="*">
            <button id="left"  text="上页" layout_weight="1"/>
            <button id="center"  text="菜单" layout_weight="1"/>
            <button id="right" text="下页" layout_weight="1"/>
        </horizontal>
        <button id="move"  text="移动及最小化" w="*"/>
    </vertical>
);
var window_ = floaty.window(
    <button id="but_" w="150px" h="150px" text="▽" alpha="0.7"/>
);

var ads = new 刷新屏幕方向();
var ad = new 悬浮控制(window, window.move, false, ads);
ad.isAutoIntScreen = false;
var ad_ = new 悬浮控制(window_, window_.but_, false, ads);
ad.setLongClick(exit);
ad_.setLongClick(exit);
events.on("exit", function() {
    toastLog("结束运行");
});
var F = ad.OutScreen();
var F_ = ad_.OutScreen();

threads.start(function() {
    sleep(100);
    F_ = ad_.OutScreen();
    ad_.windowyidong(F_);
});


ad.setClick(function() {
    window.disableFocus();
    threads.start(function() {
        F = ad.OutScreen();
        ad.windowyidong(F);
        ad_.windowyidong([F_[1], ad_.centerXY(ad.centerXY(F[0])[0])[1]]);
        ad_.windowyidong(ad_.IntScreen());
        sleep(50);
        ad_.windowyidong(ad_.toScreenEdge(0));
    });
});

ad_.setClick(function() {
    window.disableFocus();
    threads.start(function() {
        F_ = ad_.OutScreen();
        ad_.windowyidong(F_);
        ad.windowyidong([F[1], ad.centerXY(ad_.centerXY(F_[0])[0])[1]]);
        ad.windowyidong(ad.IntScreen());
    });
});


ui.run(() => {
    window.list.setVisibility(8);
});
var listArray = [{
        txt: "Auto.js官方文档",
        url: "https://hyb1996.github.io/AutoJs-Docs"
    },
    {
        txt: "百度",
        url: "http://www.baidu.com"
    },
    {
        url: "http://www.w3school.com.cn/js/pro_js_syntax.asp",
        txt: "ECMAScript教程"
    },
    {
        url: "http://es6.ruanyifeng.com/#README",
        txt: "阮一峰 - ECMAScript 6教程"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-array.html",
        txt: "array"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-boolean.html",
        txt: "boolean"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-date.html",
        txt: "date"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-math.html",
        txt: "math"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-number.html",
        txt: "number"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-regexp.html",
        txt: "regexp"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-string.html",
        txt: "string"
    }

];



var url = "https://hyb1996.github.io/AutoJs-Docs";
//var url = "file:///storage/emulated/0/网页/试.html";
ui.run(() => {
    window.list.setDataSource(listArray);
    window.webview.loadUrl(url);
});
setInterval(() => {
    ui.run(() => {
        var P = window.webview.getProgress();
        var T = window.webview.getTitle();
        if (P == 100) {
            window.progress.setVisibility(8);
        } else {
            window.progress.setVisibility(0);
        };
        window.text.setText(String(T));
    });
}, 100);

/*
    if (window.webview.canGoBack()) {
            ui.run(() => {
                window.webview.goBack();
            });

};
*/
window.list.on("item_click", function(item, i) {
    ui.run(() => {
        window.webview.loadUrl(String(item.url));
        window.list.setVisibility(8);
    });

});


window.text.click(function(v) {
    var T = String(window.webview.getUrl());
    threads.start(function() {
        switch (dialogs.select("操作", ["刷新当前页面", "复制当前网址"])) {
            case 0:
                ui.run(() => {
                    window.webview.reload();
                });
                break;
            case 1:
                setClip(T);
                toast("已复制\n" + T);
                break;
        };
    });
});

window.left.click(function(v) {
    ui.run(() => {
        window.webview.goBack();
    });
});
window.center.click(function(v) {
    if (window.list.visibility == 8) {
        ui.run(() => {
            window.list.setVisibility(0);
        });
    } else {
        ui.run(() => {
            window.list.setVisibility(8);
        });

    };
});
window.right.click(function(v) {
    ui.run(() => {
        window.webview.goForward();
    });
});