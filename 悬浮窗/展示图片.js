requestScreenCapture();

    var img = captureScreen();
    showImage(img);






function showImage(img) {
    try {
        var Width = device.width,
            Height = device.height;
        if (context.resources.configuration.orientation == 2) {
            Width = device.height;
            Height = device.width;
        };
        sleep(100);
        var window1 = floaty.rawWindow(
            <frame w="{{Math.floor(device.width*0.7)}}px" h="{{Math.floor(device.height*0.7)}}px"alpha="0.9" gravity="center" bg="#888888">
                <img id="img" w="*"alpha="0.9" margin="5" gravity="center"/>
            </frame>
        );
        window1.setPosition(Width, Height);
        window1.setTouchable(false);
        window1.img.setSource(img);
        //window1.img.setAlpha(0.5);
        sleep(50);
        windowyidong([Width / 2 - window1.getWidth() / 2, Height, Width / 2 - window1.getWidth() / 2, Height * 0.3 - 66], window1, 50);
        sleep(2000);
        windowyidong([Width / 2 - window1.getWidth() / 2, Height * 0.3 - 66, Width / 2 - window1.getWidth() / 2, Height], window1, 50);
        window1.close();
    } catch (e) {
        toastLog(e)
    };

    function windowyidong(A, B, C) {
        var sx = A[2] - A[0],
            sy = A[3] - A[1];
        C = C || 75;
        var sd = weiyi(sx, sy) / C;
        var X = sx / sd,
            Y = sy / sd;
        var x = 0,
            y = 0;
        for (var i = 0; i < sd; i++) {
            x += X;
            y += Y;
            sleep(5);
            B.setPosition(A[0] + x, A[1] + y);
        }
        B.setPosition(A[2], A[3]);
    };

    function weiyi() {
        var num = 0;
        for (var i = 0; i < arguments.length; i++) {
            num += arguments[i] * arguments[i];
        }
        return Math.round(Math.sqrt(num) * 1000) / 1000
    };

};
