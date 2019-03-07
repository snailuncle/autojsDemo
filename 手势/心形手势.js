"auto";

toast("开启开发者选项-指针位置或者在画画软件才能查看效果");

setScreenMetrics(1080, 1920);

var points = [10000];

for (var t = -Math.PI; t <= Math.PI; t = t + 0.01) {
    //坐标系的 x,y
    var x = 16 * Math.pow(Math.sin(t), 3);
    var y = 13 * Math.cos(t) - 5 * Math.cos(t * 2) - 2 * Math.cos(t * 3) - Math.cos(t * 4);
    //增大心
    x = x * 16;
    y = -y * 16;
    //算出对于手机机的坐标 手机左上角是0,0
    points.push([parseInt(x + 540), parseInt(y + 960)]);
};

gesture.apply(null, points);
