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
    //canvas.drawColor(colors.BLACK);
    //绘制分数
    paint.setColor(colors.BLACK);
    paint.setTextSize(50);
    //canvas.drawText(degree.x);
    //toast(JSON.stringify(degree,null,4))
    paint.setStrokeWidth(5);
    var offset = {
        x: 540,
        y: 1700
    };
    //偏移坐标
    canvas.translate(offset.x, offset.y);
    //绘制围墙
    //toast(JSON.stringify(cube.p1,null,4))
    paint.setColor(colors.GREEN);
    paint.setStrokeWidth(3)
    i += 1
    n = 9
    koch(canvas, paint, 0, 0, 0, -150,i, n);



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

l=0.9
function koch(canvas, paint, x0, y0, x1, y1,a, k) {
    var x2, y2,x3,y3
    x2 = l*((x1-x0)*Math.cos(a * Math.PI / 180)-(y1-y0)*Math.sin(a * Math.PI / 180))+x1 /*由上面的运算可以得到其余三点 坐标的计算式*/
    y2 = l*((x1-x0)*Math.sin(a * Math.PI / 180)+(y1-y0)*Math.cos(a * Math.PI / 180))+y1
    x3 = l*((x1-x0)*Math.cos(-a * Math.PI / 180)-(y1-y0)*Math.sin(-a * Math.PI / 180))+x1 /*由上面的运算可以得到其余三点 坐标的计算式*/
    y3 = l*((x1-x0)*Math.sin(-a * Math.PI / 180)+(y1-y0)*Math.cos(-a * Math.PI / 180))+y1
    if (k > 1) /*如果迭代次数大于1，就继续迭代下去，即执行以下程序*/ {
        koch(canvas, paint, x1, y1, x2, y2,a, k - 1);
        koch(canvas, paint, x1, y1, x3, y3,a, k - 1);
        line(canvas, paint, x0, y0, x1, y1);
    } else { /*如果迭代次数等于1，停止迭代，画出迭代生成的图形*/
        line(canvas, paint, x0, y0, x1, y1);
       }
}
