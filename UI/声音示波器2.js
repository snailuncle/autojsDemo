"ui";
//2019,8,17
//QQ,1811588980
//转载请说明出处。
//可以调节显示的数据量。

importClass(android.content.pm.ActivityInfo);
importClass(android.view.WindowManager);
importClass(java.io.File);
importClass(java.io.FileInputStream);

ui.layout(
    <frame>
        <canvas id="canvas" />
    </frame>
);

ui.run(() => {
    //横屏
    activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN); //设置成全屏模式
    activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE); //强制为横屏
    /*
        //竖屏
        activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);//设置成全屏模式
        activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);//竖屏
    */
});

threads.start(function() {
//    console.show();
});


function Mbyte(length) {
    return util.java.array("byte", length);
};

function toByte(a) {
    //强制转换为byte数值
    return (a + 128) % 256 - 128;
};

function toNum(a) {
    while (a < 0) {
        a += 256
    };
    return a;
};
var Ary = new Array;
var inde = 0;

var sampleRate = 44100;
//采样率。
var channels = 1;
//声道数。
var bitNum = 8;
//采样位数。
var byteRate = sampleRate * channels * bitNum / 8;
//比特率。每秒的数据量。



importClass(android.media.AudioManager);
importClass(android.media.MediaRecorder);

importClass(android.media.AudioFormat);
importClass(android.media.AudioTrack);
importClass(android.media.AudioRecord);




var sampleRateInHz  =  44100; 
var channelConfig  =  AudioFormat.CHANNEL_OUT_STEREO; 
var audioFormat  =  AudioFormat.ENCODING_PCM_8BIT;

 
var bufferSizeInBytes_ = AudioRecord.getMinBufferSize(sampleRateInHz,  channelConfig,  audioFormat);
var audioRecord = new  AudioRecord(MediaRecorder.AudioSource.MIC, sampleRateInHz,  channelConfig,  audioFormat, bufferSizeInBytes_); 
events.on("exit", function() {
    log("结束运行");
    audioRecord.stop();     
    audioRecord.release(); //释放资源  
});
try {
    audioRecord.startRecording();
} catch (e) {
    toastLog(e);
    toastLog("无录音权限\n已停止");
    exit();
};
var kg=false;

threads.start(function() {
    while (true) {
        var audioData = new Mbyte(bufferSizeInBytes_);

        var readSize = audioRecord.read(audioData, 0, audioData.length);             
        if  (AudioRecord.ERROR_INVALID_OPERATION != readSize&&!kg) { 

            Ary.push(audioData);
        };
    };

});




var paint = new Paint();
//paint.setColor(colors.WHITE);
//paint.setColor(colors.BLACK);
paint.setARGB(255, 64, 64, 64);
paint.setStrokeWidth(1);
paint.setTextSize(100);
//paint.setStyle(Paint.Style.STROKE);
//paint.setStrokeCap(Paint.Cap.ROUND);
//paint.setShader(new android.graphics.RadialGradient(0,200,50,200,colors.RED,colors.GREEN,android.graphics.Shader.TileMode.REPEAT));



ui.canvas.on("draw", function(canvas) {
    canvas.drawColor(android.graphics.Color.TRANSPARENT, android.graphics.PorterDuff.Mode.CLEAR);
    canvas.drawARGB(255, 127, 127, 127);
    let w = canvas.getWidth();
    let h = canvas.getHeight();
    let dw = Math.floor(w*0.95);
    let dh = Math.floor(h / 2);
    let scale = (dh - paint.textSize) / 128*3;
    let drawDur = w+inde//(byteRate*5);
    let scale2 = w/drawDur;
    let index = inde;

    paint.setARGB(255, 0, 0, 0);
    canvas.drawText(String(Ary.length), 0, h, paint);
    canvas.drawText(String(drawDur), 0, paint.textSize, paint);
    /*
    let Is = Math.floor((index) / sampleRate);
    let Iso = (index) % sampleRate;
    canvas.drawText(Is + "," + Iso, dw, h, paint);
*/
    //return;
    if (Ary.length) {
        let II = Ary.length - 1;
        for (let i = 0; i < drawDur; i += Math.ceil(drawDur/w)) {
            let I = Math.floor(i / bufferSizeInBytes_);
            let Io = i % bufferSizeInBytes_;
            if (Ary[II - I]) {
                let num = Ary[II - I][bufferSizeInBytes_ - 1 - Io];
                let num2=(128-Math.abs(num))*(num/Math.abs(num));
                canvas.drawLine(dw-i * scale2, dh, dw-i * scale2, dh - num2 * scale, paint);
            };
        };
    };
    while (Ary.length > Math.ceil(drawDur / bufferSizeInBytes_)) {
        Ary.shift();
    };

    //横轴。
    paint.setARGB(255, 0, 255, 0);
    canvas.drawLine(0, dh, dw, dh, paint);
    canvas.drawLine(0, dh - 127 * scale, w, dh - 127 * scale, paint);
    canvas.drawLine(0, dh + 128 * scale, w, dh + 128 * scale, paint);
    //纵轴。
    paint.setARGB(255, 255, 0, 0);

    canvas.drawLine(dw, 0, dw, h, paint);



});

var pYP;
var mLastX, mLastY;
ui.canvas.setOnTouchListener(new android.view.View.OnTouchListener({
    onTouch: function(view, event) {
        var x = event.getX();
        var y = event.getY();
        switch (event.getAction()) {
            case android.view.MotionEvent.ACTION_DOWN:
                mLastX = x;
                mLastY = y;
                pYP = inde;
                break;
            case android.view.MotionEvent.ACTION_MOVE:
                var ind = Math.floor(pYP - (x - mLastX) * 5);
                inde=ind<=0?0:ind;

                break;
            case android.view.MotionEvent.ACTION_UP:
                var ind = Math.floor(pYP - (x - mLastX) * 5);
                inde=ind<=0?0:ind;
                //kg=!kg;
                break;
        }
        return true;
    }
}));