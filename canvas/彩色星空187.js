"ui";
ui.layout(
    <frame>
        <canvas id="can" w="*" h="*"/>
    </frame>
)


var rainbowColor = [{
    "色": "赤色",
    "值": [255, 0, 0],
    "color": -65536
}, {
    "色": "橙色",
    "值": [255, 165, 0],
    "color": -23296
}, {
    "色": "黄色",
    "值": [255, 255, 0],
    "color": -256
}, {
    "色": "绿色",
    "值": [0, 255, 0],
    "color": -16711936
}, {
    "色": "青色",
    "值": [0, 127, 255],
    "color": -16744449
}, {
    "色": "蓝色",
    "值": [0, 0, 255],
    "color": -16776961
}, {
    "色": "紫色",
    "值": [139, 0, 255],
    "color": -7667457
}];

var p = new Paint()
p.setStrokeWidth(1)
p.setAntiAlias(true)
p.setDither(true)
p.setStrokeWidth(2)
p.setFilterBitmap(true)
p.setColor(colors.parseColor("#000000"))
ui.can.on("draw", function(canvas) {
    canvas.drawColor(colors.BLACK);
    w = canvas.getWidth();
    h = canvas.getHeight();
    for (var i = 0; i < 100; i++) {
        p.setColor(rainbowColor[random(0, rainbowColor.length - 1)].color)
        canvas.drawCircle(random(0, w), random(0, h), 4, p);
    };
    //sleep(100)
})