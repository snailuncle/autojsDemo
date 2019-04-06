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
        x: 0,
        y: 0
    };
    //偏移坐标
    canvas.translate(offset.x, offset.y);
    //绘制围墙
    //toast(JSON.stringify(cube.p1,null,4))
    paint.setColor(colors.RED);
    paint.setStrokeWidth(1)
    i+=0.1
    n=(Math.sin(i)/2+0.5)*6
   koch(canvas, paint,1000, 50, 1000, 2000, n);



});

function zero(num){
    if(num<0){return -1}else{return 1}
    }


//连线
function line(canvas, paint, x1, y1,x2,y2) {
    canvas.drawLine(x1, y1, x2, y2, paint);
}

//三轴矩阵旋转

function  koch(canvas, paint,x0, y0, x1, y1, k)
{
    var x2, y2, x3, y3, x4, y4;
    x2 = 2.0/3 * x0 + 1.0/3 * x1;  /*由上面的运算可以得到其余三点 坐标的计算式*/
    y2 = 2.0/3 * y0 + 1.0/3 * y1;
    x3 = 1.0/3 * x0 + 2.0/3 * x1;
    y3 = 1.0/3 * y0 + 2.0/3 * y1;
    x4 = 1.0/2 * (x0 + x1) - Math.sqrt(3.0)/6 * (y1 - y0);
    y4 = 1.0/2 * (y0 + y1) + Math.sqrt(3.0)/6 * (x1 - x0);
    if( k > 1)    /*如果迭代次数大于1，就继续迭代下去，即执行以下程序*/
    {
        koch(canvas, paint,x0, y0, x2, y2, k - 1);  /*对以(x0, y0)和(x2, y2)为端点的线段作为
        初始线段进行迭代运算，以下类同*/
        koch(canvas, paint,x2, y2, x4, y4, k - 1);
        koch(canvas, paint,x4, y4, x3, y3, k - 1);
        koch(canvas, paint,x3, y3, x1, y1, k - 1);
    } else {      /*如果迭代次数等于1，停止迭代，画出迭代生成的图形*/
        line(canvas, paint,x0, y0, x2, y2);       /*用直线联结两点(x0, y0)和(x2, y2)*/
        line(canvas, paint,x2, y2, x4, y4);       /*用直线联结两点(x2, y2)和(x4, y4)*/
        line(canvas, paint,x4, y4, x3, y3);       /*用直线联结两点(x4, y4)和(x3, y3)*/
        line(canvas, paint,x3, y3, x1, y1);       /*用直线联结两点(x3, y3)和(x1, y1)*/
    }
}
