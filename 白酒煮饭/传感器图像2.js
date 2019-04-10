"ui";
ui.layout(
    <vertical bg="{{colors.toString(colors.GRAY)}}" gravity="center">
        <text id="text" w="*" text="重力传感器" gravity="center"/>
        <ImageView id="img" w="{{device.width}}px" h="{{Math.floor(device.height*0.8)}}px"/>
        <text id="text1" w="*" gravity="center"/>
        <list id="list" w="*" bg="#40000000" gravity="center">
            <vertical w="*"  margin="5">
                <text w="*" text="{{name}}" gravity="center" />
                <text w="*" text="{{value}}" gravity="center"/>
            </vertical>
        </list>
    </vertical>
);
var storage = storages.create("传感器图像");
var sensorName = storage.get("sensor", {
        value: "gyroscope",
        name: "陀螺仪传感器"
});


//sleep(1000);
events.on("exit", function() {
    storage.put("sensor", sensorName);
});

//importClass(android.graphics.Paint);
//importClass(android.graphics.Canvas);
//importClass(android.graphics.Bitmap);
var SensorAry = new Array;
//忽略不支持的传感器，即使有传感器不支持也不抛出异常
//sensors.ignoresUnsupportedSensor = true;
var sensorsList = [{
        value: "accelerometer",
        name: "加速度传感器"
    },
    {
        value: "orientation",
        name: "方向传感器"
    },
    {
        value: "gyroscope",
        name: "陀螺仪传感器"
    },
    {
        value: "magnetic_field",
        name: "磁场传感器"
    },
    {
        value: "gravity",
        name: "重力传感器"
    },
    {
        value: "linear_acceleration",
        name: "线性加速度传感器"
    },
    {
        value: "ambient_temperature",
        name: "环境温度传感器"
    },
    {
        value: "light",
        name: "光线传感器"
    },
    {
        value: "pressure",
        name: "压力传感器"
    },
    {
        value: "proximity",
        name: "距离传感器"
    },
    {
        value: "relative_humidity",
        name: "湿度传感器"
    }
];

ui.list.setDataSource(sensorsList);
ui.text.setText(String(sensorName.name));

function SensorFun() {
    var ary = new Array;
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "number") {
            ary.push(arguments[i]);
        };
    };
        ui.run(()=>{
            ui.text1.setText(String(ary.map(function(a){return Math.round(a*10)/10})));
            });
    SensorAry.push(ary);
    if (SensorAry.length >= 100) {
        for (var i = 0; i < 5; i++) {
            SensorAry.shift();
        };
    };
};

//传感器
var sensor = sensors.register(sensorName.value, sensors.delay.ui);
if (sensor) {
    sensor.on("change", SensorFun);
} else {
    toastLog("不支持此传感器");
};

ui.list.on("item_click", function(item, i, itemView, listView) {
    //传感器
    var newsensor = sensors.register(item.value, sensors.delay.ui);
    if (newsensor) {
        ui.run(() => {
            ui.text.setText(item.name);
        });
        sensors.unregister(sensor);
        sensor = newsensor;
        sensorName = item;
        sensor.on("change", SensorFun);
    } else {
        toastLog("不支持此传感器");
    };

});

var paint = new android.graphics.Paint;
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER); //写字左右中心
var bitmap = android.graphics.Bitmap.createBitmap(1000, 1000, android.graphics.Bitmap.Config.ARGB_8888);
var canvas = new android.graphics.Canvas(bitmap);
threads.start(function() {
    sleep(250);
    bitmap = android.graphics.Bitmap.createBitmap(ui.img.getWidth(), ui.img.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
    canvas = new android.graphics.Canvas(bitmap);
});

var rainbowColor = [{
        色: "赤色",
        值: [255, 0, 0]
    },
    {
        色: "橙色",
        值: [255, 165, 0]
    },
    {
        色: "黄色",
        值: [255, 255, 0]
    },
    {
        色: "绿色",
        值: [0, 255, 0]
    },
    {
        色: "青色",
        值: [0, 127, 255]
    },
    {
        色: "蓝色",
        值: [0, 0, 255]
    },
    {
        色: "紫色",
        值: [139, 0, 255]
    }
];


var data = {
    translate: {
        x: 0,
        y: 0
    },
    scale: 1,
    rotate: 0
};
var Touch = new Array;
var TouchPoints = new Array;
var TouchData = new Array;


setInterval(() => {
    if (!bitmap || !canvas) {
        return;
    };
    //清除图像
    bitmap.eraseColor(0);
    var matrix = new android.graphics.Matrix();
    canvas.setMatrix(matrix);


    var w = canvas.getWidth(),
        h = canvas.getHeight();


    var matrix = new android.graphics.Matrix();
    matrix.postRotate(data.rotate);
    matrix.postScale(data.scale, data.scale);
    matrix.postTranslate(data.translate.x, data.translate.y);
    canvas.setMatrix(matrix);

    paint.setColor(colors.BLACK);
    canvas.drawLine(50, 0, 50, h, paint);
    canvas.drawLine(50, h / 2, w, h / 2, paint);

    var x = w * 0.9,
        y = h * 0.5;
    var sw = 15,
        sh = 25;
    for (var i = -50; i <= 50; i++) {

        var hy = y - i * sh;
        paint.setARGB(31, 0, 0, 0);
        canvas.drawLine(0, hy, w, hy, paint);
        paint.setARGB(127, 0, 0, 0);
        paint.setStrokeWidth(1); //边缘宽度  
        paint.setStyle(Paint.Style.FILL); //实心样式  
        var size = 30;
        paint.setTextSize(size);
        canvas.drawText(String(i), 25, hy + 0.365 * size, paint);

    };
    paint.setStrokeWidth(5 / data.scale); //边缘宽度  
    for (var i = 1; i <= SensorAry.length; i++) {
        var ary = SensorAry[SensorAry.length - i];
        var bary = SensorAry[SensorAry.length - i - 1];
        var X = x - i * sw;
        var bX = x - (i + 1) * sw;
        if (bary) {
            for (var ii = 0; ii < ary.length; ii++) {
                var cy = y - ary[ii] * sh;
                var bcy = y - bary[ii] * sh;
                if (bcy) {
                    paint.setColor(colors.rgb.apply(colors, rainbowColor[ii].值));
                    canvas.drawLine(X, cy, bX, bcy, paint);
                };
            };
        };
    };

    var matrix = new android.graphics.Matrix();
    canvas.setMatrix(matrix);

    paint.setStrokeWidth(5); //边缘宽度  
    paint.setStyle(Paint.Style.STROKE);
    paint.setColor(colors.RED);
    for (var i = 0; i < TouchPoints.length; i++) {
        break;
        try {
            if (!TouchPoints[i]) {
                continue;
            };
            var X = TouchPoints[i].X,
                Y = TouchPoints[i].Y,
                x = TouchPoints[i].x,
                y = TouchPoints[i].y;
               // log(X,Y,x,y);
            canvas.drawCircle(X, Y, 200, paint);
            //canvas.drawCircle(X, Y, 100, paint);
            canvas.drawLine(X, Y, x, y, paint);
            canvas.drawCircle(x, y, 100, paint);
            if (TouchPoints[i + 1]) {
                var x1 = TouchPoints[i + 1].x,
                    y1 = TouchPoints[i + 1].y;
                //canvas.drawLine(x, y, x1, y1, paint);
            };
        } catch (e) {
            log(e)
        };
    };


    ui.run(() => {
        ui.img.setImageBitmap(bitmap);
    });
}, 50);



ui.img.setOnTouchListener(function(view, event) {
    try {
        switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                var X = event.getX(i);
                var Y = event.getY(i);
                TouchPoints[id] = {
                    X: X,
                    Y: Y,
                    x: X,
                    y: Y
                };
                if (!id) {
                    bitmap = android.graphics.Bitmap.createBitmap(view.getWidth(), view.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
                    canvas = new android.graphics.Canvas(bitmap);
                };
                var PC = event.getPointerCount();
                if (PC >= 3) {
                    data = {
                        translate: {
                            x: 0,
                            y: 0
                        },
                        scale: 1,
                        rotate: 0
                    };
                };
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
                break;
            case event.ACTION_MOVE:
                var PC = event.getPointerCount();
                for (var i = 0; i < PC; i++) {
                    var id = event.getPointerId(i);
                    var X = event.getX(i);
                    var Y = event.getY(i);
                    //log(X,Y);
                    X = (0 <= X && X < view.getWidth() - 1) ? X : (0 <= X ? view.getWidth() - 1 : 0);
                    Y = (0 <= Y && Y < view.getHeight() - 1) ? Y : (0 <= Y ? view.getHeight() - 1 : 0);
                    //log(typeof view.width,view.height);
                    TouchPoints[id].x = X;
                    TouchPoints[id].y = Y;
                };
                if (PC == 1) {
                    var id = event.getPointerId(0);
                    var X = event.getX(0);
                    var Y = event.getY(0);
                    data.translate.x = X - Touch[id].X;
                    data.translate.y = Y - Touch[id].Y;
                } else if (PC == 2) {
                    var id = event.getPointerId(0);
                    var X = event.getX(0);
                    var Y = event.getY(0);
                    var id1 = event.getPointerId(1);
                    var X1 = event.getX(1);
                    var Y1 = event.getY(1);
                    var YY = ydfx([Touch[id1].X - Touch[id].X, Touch[id1].Y - Touch[id].Y]);
                    var YY1 = ydfx([X1 - X, Y1 - Y]);
                    var kY = YY1 - YY;
                    data.rotate = TouchData.rotate + kY;
                    var SS = weiyi([Touch[id1].X - Touch[id].X, Touch[id1].Y - Touch[id].Y]);
                    var SS1 = weiyi([X1 - X, Y1 - Y]);
                    var kS = SS1 / SS;
                    data.scale = TouchData.scale * kS;
                    var TY = ydfx([-Touch[id].X, -Touch[id].Y]);
                    var YC = TY - YY;
                    var TS = weiyi([Touch[id].X, Touch[id].Y]);
                    var TY1 = YY1 + YC;
                    var KKK = kdfx(TY1);
                    var SD = getsd(TS * kS, KKK);
                    data.translate.x = X + SD[0];
                    data.translate.y = Y + SD[1];
                } else {
                    data = {
                        translate: {
                            x: 0,
                            y: 0
                        },
                        scale: 1,
                        rotate: 0
                    };
                };
                break;
            case event.ACTION_UP:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                TouchPoints[id] = undefined;
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
                break;
        };
        return true;
    } catch (e) {
        toastLog("Touch: " + e);
        return true;
    };
});



function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = (s / sum) || 0;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return [x, y];
};

function ydfx(ary) {
    var ary = getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};



/*
function eraseColor() {
void eraseColor(int)
}

*/



function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};