"ui";
ui.statusBarColor("#ffffff");

//ui布局为一块画布
ui.layout(
    <frame>
        <canvas id="board" w="*" h="*"/>
    </frame>
);
//画笔
var paint = new Paint();
//画笔颜色
paint.setARGB(255,0xd5,0,0);

var Path = new android.graphics.Path;

for (var t = -Math.PI; t <= Math.PI; t = t + 0.01) {
    //坐标系的 x,y
    var x = 16 * Math.pow(Math.sin(t), 3);
    var y = 13 * Math.cos(t) - 5 * Math.cos(t * 2) - 2 * Math.cos(t * 3) - Math.cos(t * 4);
    //增大心  
    x = x * 16;
    y = -y * 16;
    //算出对于手机机的坐标 手机左上角是0,0
    Path.lineTo(x, y);
};

Path.close();

ui.board.on("draw", function(canvas) {
    var w = canvas.getWidth() / 2;
    var h = canvas.getHeight() / 2;
    canvas.translate(w, h);
    canvas.drawPath(Path, paint);
});
