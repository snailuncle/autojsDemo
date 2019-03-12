toastLog("Are you ready？");
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};


var IMG=captureScreen();
var bitmap=IMG.getBitmap();
var canvas=new Canvas(bitmap);
var w=canvas.width,h=canvas.height;
var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint.setARGB(127,127,127,127);
    var size = 150;
    paint.setTextSize(size);
    canvas.drawText("这是我的截图", w / 2, h / 2 + 0.365 * size, paint);
    
var img=canvas.toImage();    
images.save(img,"/sdcard/脚本/我的截图.png","png",50);