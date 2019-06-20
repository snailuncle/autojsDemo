"ui";
importClass(android.content.Context);
importClass(android.media.MediaRecorder);
importClass(java.io.File);
importClass(java.lang.System);
importClass(android.os.Environment);
importClass(android.hardware.display.DisplayManager);


/*
￥￥无名小姐  制作
QQ:1352187317
录屏这个功能我很早就想去写一个的
但是由于对一些安卓的ui不熟悉导致一直没做出来
前段时间看到开发者写的插件打算用插件形式写一个
结果看代码的时候无意间发现开发者提供了onactivityresult
这个方法的回调，就这样结合网上dome写出了这个
简单的录屏功能
这只是一个轮子，要想变成怎样的车子就看你怎么玩了
*/

runtime.requestPermissions(["RECORD_AUDIO"]);
//

running = false;
width = 720;
height = 1080;
dpi = 1;

mediaRecorder = new MediaRecorder();

ui.layout(
    <vertical>
        <button text="开始录屏" id="button"/>
    </vertical>
);


ui.button.click(function() {
    if (running) {
        stopRecord();
        ui.button.setText("开始录屏");
    } else {
        startintent();
        ui.button.setText("停止录屏");
    }
});

ui.emitter.on("activity_result", (requestCode, resultCode, data) => {
    mediaProjection = mediaProjectionManager.getMediaProjection(resultCode, data);
    if (mediaProjection) {
        startRecord();
    }
});

events.on("exit", function() {
    if (running) {
        stopRecord();
    }
    toastLog("结束运行");
});


function createVirtualDisplay() {
    virtualDisplay = mediaProjection.createVirtualDisplay(
        "无名小姐",
        width,
        height,
        dpi,
        DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
        mediaRecorder.getSurface(),
        null, null);
}


function initRecorder() {
    file = new File(getsaveDirectory(), System.currentTimeMillis() + ".mp4");
    mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
    mediaRecorder.setVideoSource(MediaRecorder.VideoSource.SURFACE);
    mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
    mediaRecorder.setOutputFile(file.getAbsolutePath());
    mediaRecorder.setVideoSize(width, height);
    mediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.H264);
    mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
    mediaRecorder.setVideoEncodingBitRate(5 * 1024 * 1024);
    mediaRecorder.setVideoFrameRate(30);
    try {
        mediaRecorder.prepare();
    } catch (e) {
        log(e);
    }
}

function startintent() {
    SCREEN_CAPTURE_REQUEST_CODE = 10086;
    mediaProjectionManager = context.getSystemService(Context.MEDIA_PROJECTION_SERVICE);
    intent = mediaProjectionManager.createScreenCaptureIntent();
    activity.startActivityForResult(intent, SCREEN_CAPTURE_REQUEST_CODE);
}


function startRecord() {
    if (mediaProjection == null || running) {
        return false;
    }
    initRecorder();
    createVirtualDisplay();
    mediaRecorder.start();
    running = true;
    return true;
}

function stopRecord() {
    if (!running) {
        return false;
    }
    running = false;
    mediaRecorder.stop();
    mediaRecorder.reset();
    virtualDisplay.release();
    mediaProjection.stop();
    return true;
}


function getsaveDirectory() {
    if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
        rootDir = Environment.getExternalStorageDirectory().getAbsolutePath() + "/" + "ScreenRecord" + "/";
        file = new File(rootDir);
        if (!file.exists()) {
            if (!file.mkdirs()) {
                return null;
            }
        }

        toastLog(rootDir);
        return rootDir;
    } else {
        return null;
    }
}