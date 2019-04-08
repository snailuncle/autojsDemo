"ui";

ui.layout(
    <vertical>
        <canvas id="board" layout_weight="1"/>
    </vertical>
);
//尺寸
const size = 256;
var i = 0

var o = [0, 0, 0]
var paint = new Paint();
ui.board.on("draw", function(canvas) {
    //绘制背景色
    canvas.drawColor(colors.BLACK);
    //绘制分数
    paint.setColor(colors.BLACK);
    paint.setTextSize(50);
    //canvas.drawText(degree.x);
    //toast(JSON.stringify(degree,null,4))
    paint.setStrokeWidth(5);
    var offset = {
        x: 350,
        y: 1000
    };
    //偏移坐标
    canvas.translate(offset.x, offset.y);
    //绘制围墙
    //toast(JSON.stringify(cube.p1,null,4))
    paint.setColor(colors.RED);
    paint.setStrokeWidth(8)
    i += 0.02
    n = (Math.sin(i) / 2 + 0.5) * 9
    koch(canvas, paint, 0, -500, 0, 500, n);



});

function zero(num) {
    if (num < 0) {
        return -1
    } else {
        return 1
    }
}


//连线
function line(canvas, paint, x1, y1, x2, y2) {
    canvas.drawLine(x1, y1, x2, y2, paint);
}

//三轴矩阵旋转

function koch(canvas, paint, x0, y0, x1, y1, k) {
    var x2, y2,f
    f = slow(slow(k-Math.ceil(k)))
    x2 = (x0-x1)/2-(y0-y1)/2+x1 /*由上面的运算可以得到其余三点 坐标的计算式*/
    y2 = (x0-x1)/2+(y0-y1)/2+y1
    xx=((x0+x1)/2-x2)*f+x2
    yy=((y0+y1)/2-y2)*f+y2
    if (k > 1) /*如果迭代次数大于1，就继续迭代下去，即执行以下程序*/ {
        koch(canvas, paint, x0, y0, x2, y2, k - 1);
        /*对以(x0, y0)和(x2, y2)为端点的线段作为初始线段进行迭代运算，以下类同*/
        koch(canvas, paint, x1, y1, x2, y2, k - 1);
    } else { /*如果迭代次数等于1，停止迭代，画出迭代生成的图形*/
        line(canvas, paint, x0, y0, xx, yy);
        /*对以(x0, y0)和(x2, y2)为端点的线段作为初始线段进行迭代运算，以下类同*/
        line(canvas, paint, x1, y1, xx, yy);
       }
}
function slow(i){
    return (-Math.cos(i*Math.PI)+1)/2
}
