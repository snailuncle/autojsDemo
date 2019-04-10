"ui";
ui.layout(
    <frame bg="#00BFA5"> 
<canvas id="canvas" />
</frame>
);
var img = 加载图片("/storage/emulated/0/DCIM/Screenshots/Screenshot_2018-08-24-13-16-19-57.png");
var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
var data = {
    translate: {
        x: 0,
        y: 0
    },
    scale: 1,
    rotate: 0
};
ui.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    paint.setStrokeWidth(5);
    var matrix = new android.graphics.Matrix();
    matrix.postRotate(data.rotate);
    matrix.postScale(data.scale, data.scale);
    matrix.postTranslate(data.translate.x, data.translate.y);
    paint.setARGB(255, 0, 0, 0);
    canvas.drawImage(img, matrix, paint);
    paint.setStrokeWidth(5);
    paint.setStyle(Paint.Style.STROKE);
    for (var i = 0; i < TouchPoints.length; i++) {
        break;
        try {
            if (!TouchPoints[i]) {
                continue
            };
            var X = TouchPoints[i].X,
                Y = TouchPoints[i].Y,
                x = TouchPoints[i].x,
                y = TouchPoints[i].y;
            canvas.drawCircle(X, Y, 200, paint);
            canvas.drawCircle(X, Y, 100, paint);
            canvas.drawLine(X, Y, x, y, paint);
            canvas.drawCircle(x, y, 100, paint);
            if (TouchPoints[i + 1]) {
                var x1 = TouchPoints[i + 1].x,
                    y1 = TouchPoints[i + 1].y;
                canvas.drawLine(x, y, x1, y1, paint);
            };
        } catch (e) {};
    };
    var matrix = new android.graphics.Matrix();
    matrix.postRotate(data.rotate, w / 2, h / 2);
    canvas.setMatrix(matrix);
    paint.setStrokeWidth(5);
    paint.setARGB(255, 255, 255, 0);
    canvas.drawLine(w / 2 - 50, h / 2, w / 2 - 100, h / 2, paint);
    paint.setARGB(255, 255, 0, 255);
    canvas.drawLine(w / 2, h / 2 - 50, w / 2, h / 2 - 100, paint);
    paint.setARGB(255, 255, 0, 0);
    canvas.drawLine(w / 2 + 50, h / 2, w / 2 + 100, h / 2, paint);
    paint.setARGB(255, 0, 0, 255);
    canvas.drawLine(w / 2, h / 2 + 50, w / 2, h / 2 + 100, paint);
    var SS = 算坐标(w / 2, h / 2, data);
    var x = Math.floor((0 <= SS.x && SS.x < img.getWidth()) ? SS.x : (0 <= SS.x ? img.getWidth() - 1 : 0));
    var y = Math.floor((0 <= SS.y && SS.y < img.getHeight()) ? SS.y : (0 <= SS.y ? img.getHeight() - 1 : 0));
    var color = images.pixel(img, x, y);
    var colorString = colors.toString(color);
    paint.setColor(color);
    canvas.drawCircle(w / 2, h / 2, 50, paint);
    var SS1 = 算坐标(w / 2, h * 0.43, data);
    var x1 = Math.floor((0 <= SS1.x && SS1.x < img.getWidth()) ? SS1.x : (0 <= SS1.x ? img.getWidth() - 1 : 0));
    var y1 = Math.floor((0 <= SS1.y && SS1.y < img.getHeight()) ? SS1.y : (0 <= SS1.y ? img.getHeight() - 1 : 0));
    var color1 = images.pixel(img, x1, y1);
    var matrix = new android.graphics.Matrix();
    canvas.setMatrix(matrix);
    paint.setStrokeWidth(1);
    paint.setColor(反色(color1));
    paint.setStyle(Paint.Style.FILL);
    var size = 30;
    paint.setTextSize(size);
    canvas.drawText(x + "," + y, w / 2, h * 0.41 + 0.365 * size, paint);
    canvas.drawText(color, w / 2, h * 0.43 + 0.365 * size, paint);
    canvas.drawText(colorString, w / 2, h * 0.45 + 0.365 * size, paint);
});

function 算坐标(X, Y, data) {
    var X = X - data.translate.x,
        Y = Y - data.translate.y;
    var WE = weiyi(X, Y);
    var YY = ydfx(X, 0, Y);
    var KY = YY.Y + data.rotate;
    var KK = kdfx(KY, 0);
    return getsdxyz(KK.x, KK.z, 0, WE / data.scale);
};

function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};
var Touch = new Array;
var TouchPoints = new Array;
var TouchData = new Array;
ui.canvas.setOnTouchListener(function(view, event) {
    try {
        switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                var i = event.getPointerId(Math.floor(event.getAction() / 256));
                var id = event.getPointerId(i);
                var X = event.getX(i);
                var Y = event.getY(i);
                TouchPoints[id] = {
                    X: X,
                    Y: Y,
                    x: X,
                    y: Y
                };
                var PC = event.getPointerCount();
                if (PC <= 2) {
                    Touch[id] = {
                        X: X - data.translate.x,
                        Y: Y - data.translate.y
                    };
                    TouchData = {
                        translate: {
                            x: data.translate.x,
                            y: data.translate.y
                        },
                        scale: data.scale,
                        rotate: data.rotate
                    };
                };
                break;
            case event.ACTION_MOVE:
                var PC = event.getPointerCount();
                for (var i = 0; i < PC; i++) {
                    var id = event.getPointerId(i);
                    var X = event.getX(i);
                    var Y = event.getY(i);
                    X = (0 <= X && X < view.width - 1) ? X : (0 <= X ? view.width - 1 : 0);
                    Y = (0 <= Y && Y < view.height - 1) ? Y : (0 <= Y ? view.height - 1 : 0);
                    TouchPoints[id].x = X;
                    TouchPoints[id].y = Y;
                };
                if (PC == 1) {
                    var id = event.getPointerId(0);
                    var X = event.getX(0);
                    var Y = event.getY(0);
                    data.translate.x = X - Touch[id].X;
                    data.translate.y = Y - Touch[id].Y;
                } else {
                    var id = event.getPointerId(0);
                    var X = event.getX(0);
                    var Y = event.getY(0);
                    var id1 = event.getPointerId(1);
                    var X1 = event.getX(1);
                    var Y1 = event.getY(1);
                    var YY = ydfx(Touch[id1].X - Touch[id].X, 0, Touch[id1].Y - Touch[id].Y);
                    var YY1 = ydfx(X1 - X, 0, Y1 - Y);
                    var kY = YY1.Y - YY.Y;
                    data.rotate = TouchData.rotate - kY;
                    var SS = weiyi(Touch[id1].X - Touch[id].X, Touch[id1].Y - Touch[id].Y);
                    var SS1 = weiyi(X1 - X, Y1 - Y);
                    var kS = SS1 / SS;
                    data.scale = TouchData.scale * kS;
                    var TY = ydfx(-Touch[id].X, 0, -Touch[id].Y);
                    var YC = TY.Y - YY.Y;
                    var TS = weiyi(Touch[id].X, Touch[id].Y);
                    var TY1 = YY1.Y + YC;
                    var KKK = kdfx(TY1, 0);
                    var SD = getsdxyz(KKK.x, KKK.z, 0, TS * kS);
                    data.translate.x = X + SD.x;
                    data.translate.y = Y + SD.y;
                };
                break;
            case event.ACTION_UP:
                var id = event.getPointerId(Math.floor(event.getAction() / 256))
                TouchPoints[id] = undefined;
                Touch[id] = undefined;
                var PC = event.getPointerCount();
                for (var i = 0; i < PC; i++) {
                    var id1 = event.getPointerId(i)
                    var X = event.getX(i);
                    var Y = event.getY(i);
                    if (id1 != id) {
                        Touch[id1] = {
                            X: X - data.translate.x,
                            Y: Y - data.translate.y
                        };
                    };
                };
                log(PC);
                break;
        };
        return true;
    } catch (e) {
        return true;
    };
});

function DrawGrid(canvas, paint, s) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    var sx = Math.floor(w / s),
        sy = Math.floor(h / s);
    for (var i = -sx; i < sx; i++) {
        canvas.drawLine(i * s, -h, i * s, h, paint);
    };
    for (var i = -sy; i < sy; i++) {
        canvas.drawLine(-w, i * s, w, i * s, paint);
    };
    var x = (w / 2) % s,
        y = (h / 2) % s;
    return {
        x: x,
        y: y,
        w: (w - 2 * x) / s,
        h: (h - 2 * y) / s,
        s: s
    };
};

function Details(A, re) {
    threads.start(function() {
        console.show();
    });
    log(typeof(A));
    log(typeof(re));
    if (typeof(re) == "string") {
        re = new RegExp(re, "i")
    };
    log(A);
    try {
        log(A.toString());
    } catch (e) {
        toast(e)
    };
    for (var i in A) {
        try {
            if (!re || re.test(i.toString())) {
                log(typeof(A[i]));
                log(i + "\n" + A[i].toString())
            };
        } catch (e) {
            log("错误")
        }
    };
};

function 加载图片(A) {
    if (files.isFile(A)) {
        return images.read(A)
    };
    var dir = "/storage/emulated/0/DCIM";
    var jsFiles = files.listDir(dir, function(name) {
        return (name.endsWith(".jpg") || name.endsWith(".png")) && files.isFile(files.join(dir, name));
    });
    if (jsFiles.length) {
        return images.read(files.join(dir, jsFiles[jsFiles.length - 1]));
    } else {
        toastLog("没有图片可以查看");
        toastLog("请自己修改路径");
        toastLog("后使用");
        exit();
    };
};

function weiyi() {
    var num = 0;
    for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
    }
    return Math.sqrt(num);
};

function ydfx(bx, by, bz, w) {
    var Y, P;
    var k = new Array;
    Y = 180 * Math.asin(Math.abs(bx) / weiyi(bx, bz)) / Math.PI;
    P = -180 * Math.asin(by / weiyi(bx, by, bz)) / Math.PI;
    if (bx > 0 && bz < 0) {
        Y = 180 - Y
    };
    if (bx < 0 && bz < 0) {
        Y = Y + 180
    };
    if (bx < 0 && bz > 0) {
        Y = 360 - Y
    };
    if (Math.abs(P) == 90) {
        Y = 0;
    };
    return {
        Y: Y,
        P: P
    };
};

function kdfx(Y, P, w) {
    if (Y == undefined || P == undefined) {
        return {
            x: 0,
            y: 0,
            z: 0
        };
    };
    var x, y, z;
    ya = Math.sin(P * Math.PI / 180);
    yb = Math.cos(P * Math.PI / 180);
    y = -1 * ya;
    xa = Math.sin(Y % 360 * Math.PI / 180);
    x = xa * yb;
    za = Math.cos(Y % 360 * Math.PI / 180);
    z = za * yb;
    return {
        x: x,
        y: y,
        z: z
    };
};

function getsdxyz(x, y, z, s, w) {
    if (s == undefined || x == undefined || y == undefined || z == undefined) {
        return {
            x: 0,
            y: 0,
            z: 0
        };
    };
    var
        d, c = s * s,
        sx, sy, sz;
    if (z != 0) {
        a = x / z;
        b = y / z;
        d = a * a + b * b + 1;
        sz = z / Math.abs(z) * Math.sqrt(c / d);
        sx = sz * a;
        sy = sz * b;
    } else if (x != 0) {
        a = y / x;
        d = a * a + 1;
        sx = x / Math.abs(x) * Math.sqrt(c / d);
        sy = sx * a;
        sz = z;
    } else if (y != 0) {
        sy = y / Math.abs(y) * s;
        sx = x;
        sz = z;
    } else {
        sx = 0;
        sy = 0;
        sz = 0;
    };
    return {
        x: sx,
        y: sy,
        z: sz
    };
};

function Disassembly(A) {
    switch (typeof(A)) {
        case "object":
            var ary = new Array;
            if (Array.isArray(A)) {
                for (var i in A) {
                    ary.push(Disassembly(A[i]));
                };
                return "[" + ary.join(",") + "]";
            } else {
                for (var i in A) {
                    ary.push(i + ":" + Disassembly(A[i]));
                };
                return "{" + ary.join(",") + "}";
            };
            break;
        case "function":
            return A.toString();
            break;
        case "string":
            return "\"" + A.toString() + "\"";
            break;
        case "number":
            return A.toString();
            break;
        case "boolean":
            return A.toString();
            break;
        default:
            return String(A);
    };
};