"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年3月6日 下午6:50:57
 *测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
 *备注: 加入更高级的图像缩放查看功能。(不同往日)
 **/
ui.layout(
    <vertical bg="{{colors.toString(colors.GRAY)}}" gravity="center">
        <text id="text" w="*" text="重力传感器" gravity="center"/>
        <canvas id="canvas" w="*" layout_weight="1"/>
        <text id="text1" w="*" gravity="center"/>
        <list id="list" w="*"h="200dp" bg="#40000000" gravity="center">
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
    ui.run(() => {
        ui.text1.setText(String(ary.map(function(a) {
            return Math.round(a * 10) / 10
        })));
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
paint.setTextAlign(Paint.Align.LEFT); //写字左

var ASX = new XYToMatrix(null, 3);



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


ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth() - 50,
        h = canvas.getHeight();
    canvas.drawARGB(255, 127, 127, 127);
    canvas.setMatrix(ASX.matrix);
    var scale = ASX.getScaling();
    //得到缩放比例。

    paint.setColor(colors.BLACK);
    canvas.drawLine(w, h / 2 - h / 2 / scale, w, h / 2 + h / 2 / scale, paint);
    canvas.drawLine(w, h / 2, w - w / scale, h / 2, paint);

    var x = w,
        y = h * 0.5;
    var sw = 15 / scale,
        sh = 25;
    var ic = 1 / scale;

    var fw = 25 / scale;

    var size = 30 / scale;
    paint.setTextSize(size);
    paint.setStrokeWidth(5 / scale); //边缘宽度

    //绘制刻度图
    for (var i = -fw; i <= fw; i += ic) {
        var ia = Math.round(Math.round(i * (1 / ic)) / (1 / ic));

        var hy = y - ia * sh;
        paint.setARGB(31, 0, 0, 0);
        canvas.drawLine(w - w / scale, hy, w, hy, paint);
        paint.setARGB(127, 0, 0, 0);
        //paint.setStrokeWidth(1); //边缘宽度
        paint.setStyle(Paint.Style.FILL); //实心样式
        canvas.drawText(String(ia), w, hy + 0.365 * size, paint);

    };
    //paint.setStrokeWidth(5); //边缘宽度
    //绘制折线图。
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
                    canvas.drawLine(inon(X, 0, w), inon(cy, 0, h), inon(bX, 0, w), inon(bcy, 0, h), paint);
                };
            };
        };
    };
});

//可以用两只手指移动缩放图像。
ui.canvas.setOnTouchListener(ASX.touchListener);


function inon(a, b, c) {
    return (a >= b || a < c) ? a : (a >= b ? c - 1 : b);
};




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




function XYToMatrix(matrix, maxPoints) {
    //通过多点触控来设置matrix从而来缩放图像。
    //第2个参数。最大的手指数量。手指数量超过之后matrix将初始化。
    this.matrix = matrix || new android.graphics.Matrix;
    this.invertMatrix = new android.graphics.Matrix;
    this.matrix.invert(this.invertMatrix);
    this.getScaling = function(ary) {
        //获取缩放比例。
        ary = Array.isArray(ary) ? ary : [0, 0, 100, 100];
        try {
            var Ary = this.matrixPoints(this.matrix, ary);
            return this.weiyi([Ary[2] - Ary[0], Ary[3] - Ary[1]]) / this.weiyi(ary);
        } catch (e) {
            toastLog(e);
        };
    };
    this.maxPoints = maxPoints || 2;
    this.maxPointsListener = () => {};
    this.Touch = {
        Matrix: this.matrix,
        PointStart: new Array,
        PointCurrent: new Array,

    };
    this.touchListener = new android.view.View.OnTouchListener((view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    try {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            this.Touch.PointCurrent[i * 2] = x;
                            this.Touch.PointCurrent[i * 2 + 1] = y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > this.maxPoints) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.maxPointsListener(view, event);
                            break;
                        };

                        var Matrix = new android.graphics.Matrix();
                        Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(Matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.matrix.invert(this.invertMatrix);
                        //反矩阵
                    } catch (e) {
                        throw "MOVE " + e;
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    //log("OUTSIDE");

                    break;
                default:
                    var I = Math.floor(event.getAction() / 256);
                    var ID = event.getPointerId(I);
                    var X = event.getX(I);
                    var Y = event.getY(I);
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            try {
                                log("down");
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                this.Touch.Matrix = this.matrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                throw "DOWN " + e;
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。
                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.maxPointsListener(view, event);
                                    break;
                                };

                                var Matrix = new android.graphics.Matrix();
                                Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.matrix = new android.graphics.Matrix();
                                this.matrix.setConcat(Matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.matrix.invert(this.invertMatrix);
                                //反矩阵
                            } catch (e) {
                                throw "P_DOWN " + e;
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                throw "P_UP " + e;
                            };
                            break;
                    };
            };
        } catch (e) {
            throw "imgTouch: " + e;
        };

        return true;

    });

    this.matrixPoints = function(matrix, ary) {
        //通过矩阵运算坐标数组。但是需要转换为浮点数组。
        var ary = this.toJavaArray("float", ary);
        matrix.mapPoints(ary);
        return this.toJsArray(ary);
    };
    this.toJavaArray = function(type, ary) {
        //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
        var Ary = util.java.array(type, ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.toJsArray = function(ary) {
        var Ary = new Array(ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.getsd = (s, ary) => {
        var sum = this.weiyi(ary);
        var S = (s / sum) || 0;
        for (var i = 0; i < ary.length; i++) {
            ary[i] = ary[i] * S;
        };
        return ary;
    };
    this.weiyi = function(ary) {
        var sum = 0;
        for (var i = 0; i < ary.length; i++) {
            sum += Math.pow(ary[i], 2);
        };
        return Math.sqrt(sum);
    };
    this.kdfx = function(Y) {
        var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
        var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
        return [x, y];
    };
    this.ydfx = (ary) => {
        var ary = this.getsd(1, ary);
        var x = ary[0],
            y = ary[1];
        var Y = Math.asin(y) / (2 * Math.PI) * 360;
        if (x < 0) {
            Y = 180 - Y;
        };
        return Y;
    };


};
