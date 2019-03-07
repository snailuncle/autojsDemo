"ui";

/**
*作者QQ: 1811588980
*完成时间: 2019年1月29日 下午12:49:03
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 有个问题没法解决。为什么球落地之后会一直跳动,不会停了？
**/

ui.layout(
    <vertical>
        <canvas id="canvas" layout_weight="1" margin="10"/>
    </vertical>
);

function round_A(a, b) {
    return Math.round(b * a) / a
};


var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];;

var paint = new Paint;
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
//paint.setStyle(Paint.Style.STROKE);
paint.setStyle(Paint.Style.FILL);
paint.setARGB(255, 255, 0, 0);
paint.setTextSize(75);

var ballsAry = new Array;
for(let i in rainbowColor){
ballsAry.push({
    r: 50,
    c: rainbowColor[i],
    x: 300,
    y: 100,
    sx: 0,
    sy: 100,
});
break;
};
var G = 4;
var F = 0.7;



ui.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.translate(0,h);
    canvas.scale(1,-1);
    for (let i = 0; i < ballsAry.length; i++) {
        let ob = ballsAry[i];
        //log(ob);
        ob.x += ob.sx;
        ob.y += ob.sy;
        //ob.sx -= G;
        ob.sy -= G;
        if (ob.sx > 0 && ob.x + ob.r >= w) {
            ob.sx = -Math.abs(ob.sx * F);
        };
        if (ob.sx < 0 && ob.x - ob.r <= 0) {
            ob.sx = Math.abs(ob.sx * F);
        };
        if (ob.sy > 0 && ob.y + ob.r >= h) {
            ob.sy = -Math.abs(ob.sy * F);
        };
        if (ob.sy < 0 && ob.y - ob.r <= 0) {
            ob.sy = Math.abs(ob.sy * F);
        };
        paint.setColor(ob.c);
        canvas.drawCircle(ob.x, ob.y, ob.r, paint);
    };
});





function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = s / sum;
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
    return {
        x: x,
        y: y
    };
};

21:41:25.744 
