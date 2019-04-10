"ui";
ui.statusBarColor("#ff000000");
ui.layout(
    <frame id="bg" background="#000000">
        <vertical>
            <img id="ok"/>
            <text id="text" color="#ffffff"/>
            <button id="存图" text="存图" bg="#ff333333" margin="10 0 0 0"/>
            
        </vertical>
    </frame>
);
var 存图否 = 0;
importClass(android.graphics.Paint);
Canvas = android.graphics.Canvas;
importClass(android.graphics.Bitmap);
sdpath = android.os.Environment.getExternalStorageDirectory();
files.createWithDirs(sdpath + "/Screenshot/");

threads.start(function() {
    var i = 0;
    var t1 = 1000,
        t2 = 0;
    var bitmap = Bitmap.createBitmap(1080, 1080, Bitmap.Config.ARGB_8888);

    while (true) {
        var bitmap = Bitmap.createBitmap(1080, 1080, Bitmap.Config.ARGB_8888);

        var canvas = new Canvas(bitmap);
        canvas.drawARGB(0, 0, 0, 0);
        var paint = new Paint();
        //圆盘背景
        paint.setARGB(255, 20, 40, 20); //白色画笔
        paint.setStyle(Paint.Style.FILL); //空心样式  
        canvas.drawCircle(540, 540, 426, paint); //绘制圆
        //指针轴圆点
        paint.setARGB(255, 55, 55, 55); //白色画笔
        paint.setStyle(Paint.Style.FILL); //空心样式  
        canvas.drawCircle(540, 540, 20, paint); //绘制圆



        //表边圆
        paint.setARGB(255, 255, 255, 255); //白色画笔
        paint.setStyle(Paint.Style.STROKE); //空心样式  
        paint.setStrokeWidth(10); //边缘宽度  
        canvas.drawCircle(540, 540, 426, paint); //绘制圆

        for (var 刻度 = 0; 刻度 < 360; 刻度 += 30) {
            var 度数 = (Math.PI / 180) * (刻度 - 90);
            paint.setARGB(255, 0, 255, 255); //青色画笔
            paint.setStrokeWidth(10); //边缘宽度 
            canvas.drawLine(350 * Math.cos(度数) + 540, 350 * Math.sin(度数) + 540, 410 * Math.cos(度数) + 540, 410 * Math.sin(度数) + 540, paint); //绘制直线
        }

        var 时间 = new Date();

        刻度 = 时间.getMilliseconds() * (360 / 1000);
        度数 = (Math.PI / 180) * (刻度 - 90);
        var 针尾度数 = (Math.PI / 180) * (刻度 + 90);
        paint.setARGB(255, 255, 0, 255); //青色画笔
        paint.setStrokeWidth(10); //边缘宽度 
        canvas.drawLine(5 * Math.cos(针尾度数) + 800, 5 * Math.sin(针尾度数) + 540, 50 * Math.cos(度数) + 800, 50 * Math.sin(度数) + 540, paint); //绘制直线


        刻度 = 时间.getHours() * 30 + (时间.getMinutes() / 60) * 30;
        度数 = (Math.PI / 180) * (刻度 - 90);
        var 针尾度数 = (Math.PI / 180) * (刻度 + 90);
        paint.setARGB(255, 255, 0, 0); //青色画笔
        paint.setStrokeWidth(10); //边缘宽度 
        canvas.drawLine(100 * Math.cos(针尾度数) + 540, 100 * Math.sin(针尾度数) + 540, 200 * Math.cos(度数) + 540, 200 * Math.sin(度数) + 540, paint); //绘制直线

        刻度 = 时间.getMinutes() * 6 + (时间.getSeconds() / 60) * 6;
        度数 = (Math.PI / 180) * (刻度 - 90);
        var 针尾度数 = (Math.PI / 180) * (刻度 + 90);
        paint.setARGB(255, 0, 255, 0); //青色画笔
        paint.setStrokeWidth(10); //边缘宽度 
        canvas.drawLine(100 * Math.cos(针尾度数) + 540, 100 * Math.sin(针尾度数) + 540, 250 * Math.cos(度数) + 540, 250 * Math.sin(度数) + 540, paint); //绘制直线

        刻度 = 时间.getSeconds() * 6 + (时间.getMilliseconds() / 1000) * 6;
        度数 = (Math.PI / 180) * (刻度 - 90);
        var 针尾度数 = (Math.PI / 180) * (刻度 + 90);
        paint.setARGB(255, 255, 255, 0); //青色画笔
        paint.setStrokeWidth(10); //边缘宽度 
        canvas.drawLine(90 * Math.cos(针尾度数) + 540, 90 * Math.sin(针尾度数) + 540, 300 * Math.cos(度数) + 540, 300 * Math.sin(度数) + 540, paint); //绘制直线


        canvas.save(Canvas.ALL_SAVE_FLAG);
        canvas.restore();
        t1 = new Date().getTime();

        i = parseInt(1000 / (t1 - t2));
        t2 = t1;

        ui.run(function() {
            ui.ok.setImageBitmap(bitmap);
            //ui.text.text(i+"");
        });
        if (存图否 == 1) {
            var mFile = new java.io.File(sdpath + "/Screenshot/Screenshot_" + new Date().getTime() + ".png");
            var mFileOutputStream = new java.io.FileOutputStream(mFile);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, mFileOutputStream);
            存图否 = 0;
        }
    }
});
ui.存图.click(() => {
    存图否 = 1;
});

function getSDPath() {
    sdDir = null;
    sdCardExist = android.os.Environment.getExternalStorageState()
        .equals(android.os.Environment.MEDIA_MOUNTED); //判断sd卡是否存在
    if (sdCardExist) {
        sdDir = android.os.Environment.getExternalStorageDirectory(); //获取跟目录
    }
    return sdDir.toString();
}