requestScreenCapture();
var img = captureScreen();
var p = new Paint();
var canvas = new Canvas(img);

p.setStrokeWidth(10)//设置画笔宽度 
p.setAntiAlias(true)//设置是否使用抗锯齿功能，如果使用，会导致绘图速度变慢 
p.setStyle(Paint.Style.FILL);
p.setTextSize(100)
p.setColor(colors.parseColor("#000000"))
canvas.drawText("xxx",100, 100, p);
images.save(canvas.toImage(), "./1.png");
img.recycle();