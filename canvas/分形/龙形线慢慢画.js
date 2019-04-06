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
//绘制背景色
//canvas.drawColor(colors.BLACK);
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
//绘制围墙
//toast(JSON.stringify(cube.p1,null,4))
paint.setColor(colors.RED);
paint.setStrokeWidth(3)


var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new Canvas(bitmap);



ui.board.on("draw", function(canvas) {



    canvas.drawBitmap(bitmap, 0, 0, paint);

});

threads.start(function () {
  asd(mcanvas, paint,offset,i);
});





function asd(mcanvas, paint ,offset,i) {
  mcanvas.translate(offset.x, offset.y);
  i += 0.3
  n = (Math.sin(i) / 2 + 0.5) * 10
  koch(mcanvas, paint, 0, -500, 0, 500, n);
}





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
  sleep(100)
    var x2, y2
    x2 = (x0-x1)/2-(y0-y1)/2+x1 /*由上面的运算可以得到其余三点 坐标的计算式*/
    y2 = (x0-x1)/2+(y0-y1)/2+y1
    if (k > 1) /*如果迭代次数大于1，就继续迭代下去，即执行以下程序*/ {
        koch(canvas, paint, x0, y0, x2, y2, k - 1);
        /*对以(x0, y0)和(x2, y2)为端点的线段作为初始线段进行迭代运算，以下类同*/
        koch(canvas, paint, x1, y1, x2, y2, k - 1);
    } else { /*如果迭代次数等于1，停止迭代，画出迭代生成的图形*/
        line(canvas, paint, x0, y0, x2, y2);
        /*对以(x0, y0)和(x2, y2)为端点的线段作为初始线段进行迭代运算，以下类同*/
        line(canvas, paint, x1, y1, x2, y2);
       }
}
