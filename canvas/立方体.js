// 重力感应画立方体
"ui";

ui.layout(
    <vertical>
        <canvas id="board" layout_weight="1"/>
    </vertical>
);
//尺寸
const size = 256;


//原坐标
var cube = {
    p1: [-1,-1, 1],
    p2: [-1,-1,-1],
    p3: [ 1,-1,-1],
    p4: [ 1,-1, 1],
    p5: [-1, 1, 1],
    p6: [-1, 1,-1],
    p7: [ 1, 1,-1],
    p8: [ 1, 1, 1]

}
var cube2 = cube
var degree = {
    x: 0,
    y: 0,
    z: 0
}
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
        y: 1000
    };
    //偏移坐标
    canvas.translate(offset.x, offset.y);
    //绘制围墙
    cube2.p1 = rotate(cube.p1, o, degree)
    cube2.p2 = rotate(cube.p2, o, degree)
    cube2.p3 = rotate(cube.p3, o, degree)
    cube2.p4 = rotate(cube.p4, o, degree)
    cube2.p5 = rotate(cube.p5, o, degree)
    cube2.p6 = rotate(cube.p6, o, degree)
    cube2.p7 = rotate(cube.p7, o, degree)
    cube2.p8 = rotate(cube.p8, o, degree)
    //toast(JSON.stringify(cube.p1,null,4))
    paint.setColor(colors.RED);
    line(canvas, paint, cube2.p1, cube2.p2)
    //paint.setColor(colors.GREEN);
    line(canvas, paint, cube2.p2, cube2.p3)
    //paint.setColor(colors.BLUE);
    line(canvas, paint, cube2.p3, cube2.p4)
    line(canvas, paint, cube2.p4, cube2.p1)

    line(canvas, paint, cube2.p5, cube2.p6)
    line(canvas, paint, cube2.p6, cube2.p7)
    line(canvas, paint, cube2.p7, cube2.p8)
    line(canvas, paint, cube2.p8, cube2.p5)
    line(canvas, paint, cube2.p5, cube2.p1)
    line(canvas, paint, cube2.p6, cube2.p2)
    line(canvas, paint, cube2.p7, cube2.p3)
    line(canvas, paint, cube2.p8, cube2.p4)

    /*line(canvas, paint, cube2.p4, cube2.p1)
    line(canvas, paint, cube2.p4, cube2.p2)
    line(canvas, paint, cube2.p4, cube2.p3)*/
});
//重力感应监听
sensors.register("gyroscope", sensors.delay.game).on("change", (event, azimuth, pitch, roll) => {
    degree.x = azimuth;
    degree.y = pitch;
    if (pitch < -90) {
        a = -roll - 180
    } else if (pitch > 90) {
        a = -roll + 180
    } else {
        a = roll
    }
    degree.z = a
});

function zero(num){
    if(num<0){return -1}else{return 1}
    }


//连线
function line(canvas, paint, p1, p2) {
    x1 = p1[0] * size+(p1[2]+5)
    y1 = p1[1] * size+(p1[2]+5)
    x2 = p2[0] * size+(p2[2]+5)
    y2 = p2[1] * size+(p2[2]+5)
    canvas.drawLine(x1, y1, x2, y2, paint);
}

//三轴矩阵旋转
function rotate(p1, p2, d) {

    x = p1[0] - p2[0]
    y = p1[1] - p2[1]
    z = p1[2] - p2[2]
    var ix = 0,
        iy = 0,
        iz = 0
    iy = y * Math.cos(d.x * Math.PI / 180) - z * Math.sin (d.x * Math.PI / 180)
    z = y * Math.sin(d.x * Math.PI / 180) + z * Math.cos(d.x * Math.PI / 180)
    y = iy
    ix = x * Math.cos(d.z * Math.PI / 180) - y * Math.sin(d.z * Math.PI / 180)
    y = x * Math.sin(d.z * Math.PI / 180) + y * Math.cos(d.z * Math.PI / 180)
    x = ix
    ix = x * Math.cos(d.y * Math.PI / 180) - z * Math.sin(d.y * Math.PI / 180)
    z = x * Math.sin(d.y * Math.PI / 180) + z * Math.cos(d.y * Math.PI / 180)
    x = ix
    return [x + p2[0], y + p2[1], z + p2[2]]
}
