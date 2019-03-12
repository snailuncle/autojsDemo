var 悬浮控制 = function(window, windowid) {
    this.Orientation = context.resources.configuration.orientation;
    this.Width = this.Orientation == 1 ? device.width : device.height;
    this.Height = this.Orientation == 2 ? device.width : device.height;
    this.Click = function() {};
    this.LongClick = function() {};
    this.setClick = function(fun) {
        this.Click = fun;
    };
    this.setLongClick = function(fun, ji) {
        this.LongClick = fun;
        if (parseInt(ji)) {
            this.Tjitime = parseInt(ji);
        };
    };
    setInterval(() => {
        if (context.resources.configuration.orientation != this.Orientation) {
            this.Orientation = context.resources.configuration.orientation;
            this.Width = this.Orientation == 1 ? device.width : device.height;
            this.Height = this.Orientation == 2 ? device.width : device.height;
            var xy = this.windowGXY(window.getX(), window.getY(), this.G(window));
            this.windowyidong([window.getX(), window.getY(), xy.x, xy.y], window);
        };
    }, 100);

    this.TX = 0;
    this.TY = 0;
    this.Tx = 0;
    this.Ty = 0;
    this.Tyidong = false;
    this.Tkeep = false;
    this.Tjitime = 15;
    this.Ttime = 0;

    setInterval(() => {
        if (this.Tkeep) {
            this.Ttime++;
            if (!this.Tyidong && this.Ttime > this.Tjitime) {
                //非移动且按下时长超过1秒判断为长按
                this.LongClick();
            };
        };
    }, 50);

    windowid.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
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
                if (!this.Tyidong && this.weiyi(sx, sy) >= 10) {
                    this.Tyidong = true;
                };
                if (this.Tyidong) {
                    window.setPosition(this.TX + sx, this.TY + sy);
                };
                break;
            case event.ACTION_UP:
                if (!this.Tyidong && this.Ttime < 7) {
                    this.Click();
                };
                this.Tkeep = false;
                this.Ttime = 0;
                if (this.Tyidong) {
                    var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
                    threads.start(new java.lang.Runnable(() => {
                        this.windowyidong([window.getX(), window.getY(), A.x, A.y], window)
                    }));
                    this.Tyidong = false;
                };
                break;
        };
        return true;
    }));

    this.G = function(win) {
        var K = 35, //悬浮窗的隐形边矩
            H = 66; //手机通知栏的高度
        return [-K, -K, this.Width - win.getWidth() + K, this.Height - win.getHeight() - H + K]
    };

    this.weiyi = function() { //平方和开方
        var num = 0;
        for (var i = 0; i < arguments.length; i++) {
            num += arguments[i] * arguments[i];
        };
        return Math.round(Math.sqrt(num) * 1000) / 1000
    };

    this.windowGXY = function(x, y, k) {
        x = (k[0] < x && x < k[2]) ? x : (k[0] < x ? k[2] : k[0]);
        y = (k[1] < y && y < k[3]) ? y : (k[1] < y ? k[3] : k[1]);
        return {
            x: x,
            y: y
        };
    };

    this.windowyidong = function(A, w, s) {
        s = s || 10;
        var sx = A[2] - A[0],
            sy = A[3] - A[1];
        var sd = this.weiyi(sx, sy) / s;
        var X = sx / sd,
            Y = sy / sd;
        var x = 0,
            y = 0;
        for (var i = 0; i < sd; i++) {
            x += X;
            y += Y;
            sleep(1);
            w.setPosition(A[0] + x, A[1] + y);
        };
        w.setPosition(A[2], A[3]);
    };
};








var window = floaty.window(
    <button id="but" w="500px" h="50px" text="爱"/>
);

var ad = new 悬浮控制(window, window.but);
ad.setLongClick(function() {
    toastLog("OFF");
    exit();
});
ad.setClick(function() {
    toastLog("ON");
});


