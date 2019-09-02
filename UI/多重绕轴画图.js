"ui";
//ui.statusBarColor("#ff000000");
ui.layout(
    <vertical>
        <canvas id="canvas" w="*" layout_weight="1"/>
        <text id="text" />
        <input id="input" hint="输入上方显示的指令可更新参数" textSize="24sp"/>
        <button id="button" text="更新参数" w="*"/>
    </vertical>
);



function round_A(a, b) {
    return Math.round(b * a) / a
}

//位移
function weiyi(a, b, c) {
    var a, b, c;
    return Math.sqrt(a * a + b * b + c * c)
}



function print_a() {
    var A = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        A = A + "§" + arguments[i];
    }
    log(A);
}

//绝对值Math.abs(a) 

function shuzuG(a) {
    var k = new Array;
    for (var i = 0; i < a.length; i++) {
        k.push(round_A(10, a[i]));
    }
    return k;
}

//速度
function getsdxyz(x, y, z, s) {
    var k = new Array,
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
    } else {
        sy = y / Math.abs(y) * s;
        sx = x;
        sz = z;
    }
    k.push(round_A(10000, sx), round_A(10000, sy), round_A(10000, sz));
    return k;
}

//看的方向
function kdfx(Y, P) {
    var x, y, z, k = new Array;
    ya = Math.sin(P * Math.PI / 180);
    yb = Math.cos(P * Math.PI / 180);
    y = -1 * ya;
    xa = Math.sin(Y % 360 * Math.PI / 180);
    x = xa * yb;
    za = Math.cos(Y % 360 * Math.PI / 180);
    z = za * yb;
    k.push(round_A(10000, x));
    k.push(round_A(10000, y));
    k.push(round_A(10000, z));
    return k;
}

//移动方向
function ydfx(bx, by, bz) {
    var Y, P;
    var k = new Array;
    Y = 180 * Math.asin(Math.abs(bx) / weiyi(bx, bz, 0)) / Math.PI;
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
    k.push(round_A(10000, Y));
    k.push(round_A(10000, P));
    return k;
}

//路径提取
function dir_abcd(a, b, c, d) {
    var A = a.split(b);
    var K = new Array;
    var kg = false;
    for (var i = 0; i < A.length; i++) {
        if (i == c || i == A.length + c) {
            kg = true
        };
        if (kg) {
            K.push(A[i])
        };
        if (i == d || i == A.length + d) {
            kg = false
        };
    }
    return K.join(b);
}

//存画
function saveimg(path, bitmap) {
    try {
        var file = new java.io.File(path);
        var fileOutput = new java.io.FileOutputStream(file);
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, fileOutput);
        return true;
    } catch (e) {
        return false;
    }
}

function shuzuzhiG(A) {
    var C = shuzuzhi[A[0]];
    if (A.length - 2 > C.length) {
        C.push(0);
    };
    for (var i = 1; i < A.length; i++) {
        //parseInt(A[i]);
        var B = parseInt(A[i]);
        if (B || A[i] == "0") {
            C[i - 1] = B;
            //else{C[i-1]=B}
        }
    }
}

ui.canvas.click(() => {
    tingzhi = !tingzhi;
});

ui.button.click(() => {
    var A = ui.input.getText();
    A += " ";
    if (A[0] == "/") {
        A = A.split(" ");
        toast(A.length);
        switch (A[0]) {
            case "/jiaozu":
                A[0] = 0;
                shuzuzhiG(A);
                break;
            case "/suzu":
                A[0] = 1;
                shuzuzhiG(A);
                break;
            case "/juzu":
                A[0] = 2;
                shuzuzhiG(A);
                break;
            case "/jietu":
                jietu = true;
                break;
            case "/tingzhi":
                tingzhi = !tingzhi;
                break;
            case "/xunhuan":
                if (A[1] != 0) {
                    xunhuan = parseInt(A[1])
                };
                break;

        }
        //   for(var i=0;i<A.length;i++){ suzu[i]=parseInt(A[i]); }
    }
    //toast(ui.input.getText())
});

var mainStorage = storages.create("1号绕轴画图");
ui.input.setText(mainStorage.get("input", "/suzu 5 -6"));
var jiaozu = mainStorage.get("jiaozu", [180, 180, 180]); //角,Y
var suzu = mainStorage.get("suzu", [2, -8, 16]); //速,S
var juzu = mainStorage.get("juzu", [200, 100, 75]); //距,F
var sezu = new Array; //色,[A,R,G,B]
var dianzu = new Array; //点,[X,Y]
var shuzuzhi = [jiaozu, suzu, juzu, sezu];




events.on("exit", function() {
    mainStorage.put("jiaozu", jiaozu);
    mainStorage.put("suzu", suzu);
    mainStorage.put("juzu", juzu);
    mainStorage.put("input", String(ui.input.getText()));
});


var jietu = false;
var tingzhi = false;
var xunhuan = 10;


threads.start(function() {
    while (1) {

        ui.run(function() {
            ui.text.setText("/jiaozu " + shuzuG(jiaozu).join(" ") + "\n/suzu " + suzu.join(" ") + "\n/juzu " + juzu.join(" "));
        });

        sleep(100);
    };

});


ui.canvas.on("draw", function(canvas) {
    if (tingzhi) {
        return;
    }

    rundraw(canvas);



    for (var i = 0; i < dianzu.length - 180; i++) {
        dianzu.shift();
    }

});

var paint = new Paint();

function rundraw(canvas) {
    //canvas.drawARGB(10, 0, 0, 0);
    canvas.drawARGB(255, 0, 0, 0);

    /*
    for (var 刻度 = 0; 刻度 < 360; 刻度 += 6) {
          var 度数 = (Math.PI / 180) * (刻度 - 90);
          paint.setARGB(255,201,106,100); //青色画笔
          paint.setStrokeWidth(5); //边缘宽度 
          canvas.drawLine(470 * Math.cos(度数) + 540, 470 * Math.sin(度数) + 540, 500 * Math.cos(度数) + 540, 500 * Math.sin(度数) + 540, paint); //绘制直线
        }

        for (var 刻度 = 0; 刻度 < 360; 刻度 += 30) {
          var 度数 = (Math.PI / 180) * (刻度 - 90);
          paint.setARGB(255, 0, 255, 255); //青色画笔
          paint.setStrokeWidth(5); //边缘宽度 
          canvas.drawLine(400 * Math.cos(度数) + 540, 400 * Math.sin(度数) + 540, 500 * Math.cos(度数) + 540, 500 * Math.sin(度数) + 540, paint); //绘制直线
        }

    for (var 刻度 = 0; 刻度 < 360; 刻度 += 30) {
          var 度数 = (Math.PI / 180) * (刻度+15 - 90);
          paint.setARGB(255, 0, 255, 255); //青色画笔
          paint.setStrokeWidth(5); //边缘宽度 
          canvas.drawLine(450 * Math.cos(度数) + 540, 450 * Math.sin(度数) + 540, 500 * Math.cos(度数) + 540, 500 * Math.sin(度数) + 540, paint); //绘制直线
        }
    */
    //var 时间 = new Date();


    var shixy = [540, 540];

    //for(var i=0;i<30;i++)

    for (var i = 0; i < shuzuzhi.length; i++) {
        if (xunhuan != 0 && shuzuzhi[i].length != 0) {
            if (xunhuan > shuzuzhi[i].length) {
                xunhuan = shuzuzhi[i].length
            }
        }
    }

    for (var ai = 0; ai < xunhuan; ai++) {
        jiaozu[ai] = (jiaozu[ai] + suzu[ai]) % 360;
        var A = kdfx(jiaozu[ai], 0);
        var B = getsdxyz(A[0], A[2], 0, juzu[ai])
        var cx = round_A(1, B[0]);
        var cy = round_A(1, B[1]);
        paint.setARGB(255, 201, 106, 100); //青色画笔
        paint.setStrokeWidth(5); //边缘宽度 
        canvas.drawLine(shixy[0], shixy[1], shixy[0] + cx, shixy[1] + cy, paint); //绘制直线
        shixy[0] += cx;
        shixy[1] += cy;
        paint.setARGB(255, 255, 255, 255); //白色画笔
        paint.setStyle(Paint.Style.FILL); //空心样式  
        canvas.drawCircle(shixy[0], shixy[1], 10, paint); //绘制圆
        if (ai == xunhuan - 1) {
            dianzu.push(shixy);
        }
    };

    if (dianzu.length >= 2) {
        for (var i = 0; i < dianzu.length - 1; i++) {
            paint.setARGB(255, 1, 87, 155); //青色画笔
            paint.setStrokeWidth(10); //边缘宽度 
            canvas.drawLine(dianzu[i][0], dianzu[i][1], dianzu[i + 1][0], dianzu[i + 1][1], paint); //绘制直线
        }
    }

    paint.setARGB(255, 128, 0, 0); //白色画笔
    paint.setStyle(Paint.Style.FILL); //空心样式  
    canvas.drawCircle(540, 540, 10, paint); //绘制圆

};






/*
    paint.setARGB(255,0,0,0);//白色画笔
    paint.setStyle(Paint.Style.FILL);//空心样式  
    canvas.drawCircle(540,540,510, paint);//绘制圆
    */
/*
    paint.setARGB(255, 255, 255, 255); //白色画笔
    paint.setStyle(Paint.Style.STROKE); //空心样式  
    paint.setStrokeWidth(5); //边缘宽度  
    canvas.drawCircle(540, 540, 500, paint); //绘制圆
*/