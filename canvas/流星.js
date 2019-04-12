"ui";
//by @Mannix_Wu
//QQ:3068758340
ui.layout(
    <vertical>
        <canvas id="board" layout_weight="1"/>
    </vertical>
);
var degree = {
    x: 0,
    y: 0,
    z: 0
}
   var offset = {
        x: 540,
        y: 1000
    };
var star = new Array();
var count = 1000
var size = 1000
for(let i =0;i<count;i++){
    star.push(Math.random()*size)
    star.push(Math.random()*360)
    }
var paint = new Paint();
ui.board.on("draw", function(canvas) {
    //绘制背景色
    canvas.drawColor(colors.argb(10,0,0,0));
    //绘制分数
    paint.setColor(colors.BLACK);
    paint.setTextSize(50);
    //canvas.drawText(n);
    //toast(JSON.stringify(degree,null,4))
    paint.setStrokeWidth(1);

    offset.x=(offset.x+degree.y*200+540)/2
    offset.y=(offset.y+degree.x*300+1000)/2
    //偏移坐标
    canvas.translate(offset.x, offset.y);
    //绘制围墙
    //toast(JSON.stringify(cube.p1,null,4))
    paint.setColor(colors.WHITE);
    paint.setStrokeWidth(2)
    galaxy(canvas, paint);



});

//连线
function line(canvas, paint, x1, y1, x2, y2) {
    canvas.drawLine(x1, y1, x2, y2, paint);
}

function galaxy(canvas, paint) {
    for(let i = 0;i<count;i++){

    paint.setStrokeWidth(Math.random()*3+1)
        canvas.drawPoint(star[i*2]*Math.cos(star[i*2+1])/(offset.x/540*2),star[i*2]*Math.sin(star[i*2+1]),paint)
        star[i*2+1]+=(size-star[i*2])/20000-0.025
        }
}

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
