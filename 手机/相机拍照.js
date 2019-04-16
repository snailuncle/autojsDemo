"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年4月3日 下午11:00:30
 *测试机型: PD1813D
 *Auto.js版本: Pro 7.0.0-4
 *屏幕: 1080*2280
 *API: 27
 *备注: 。先去应用权限界面把相机权限打开。(加入了自动聚焦拍照功能)
 **/


var FGH = {
    //需要用到的Android类。
    Camera: android.hardware.Camera,
    //AutoFocusCallback: android.hardware.Camera.AutoFocusCallback,
    //PictureCallback: android.hardware.Camera.PictureCallback,
    //ErrorCallback: android.hardware.Camera.ErrorCallback,
    PackageManager: android.content.pm.PackageManager,
    SurfaceView: android.view.SurfaceView,
    SurfaceHolder: android.view.SurfaceHolder,
    //Callback: android.view.SurfaceHolder.Callback,
    Bitmap: android.graphics.Bitmap,
    BitmapFactory: android.graphics.BitmapFactory,
    Matrix: android.graphics.Matrix,
    View: android.view.View,
    //OnClickListener:android.view.View.OnClickListener,
    Environment: android.os.Environment,
    //android.os.Environment.getExternalStoragePublicDirectory,
};



ui.layout(
    <vertical>
        <frame>
            <android.view.SurfaceView id="surface" w="360"h="640"/>
            <progressbar id="search" w="auto" h="auto" layout_gravity="center"/>
        </frame>
        <button id="pz" w="*"h="*" text="拍照" layout_gravity="bottom|center_horizontal"/>
    </vertical>
);

//此方法返回的是Android系统推荐的用来保存图片和视频的标准的位置。
var SaveDirPath = FGH.Environment.getExternalStoragePublicDirectory(FGH.Environment.DIRECTORY_PICTURES);
log(SaveDirPath);
/*
注意：
Environment.getExternalStoragePublicDirectory（）
在Android 2.2（API 8级）或更高版本中可用。
如果使用较早版本的Android定位设备，应改用
Environment.getExternalStorageDirectory（）。
有关详细信息，请参阅保存共享文件。
*/

ui.run(() => {
    ui.pz.setText("拍照");
    ui.search.setVisibility(8);
});

/** Check if this device has a camera */
function checkCameraHardware(context) {
    if (context.getPackageManager().hasSystemFeature(FGH.PackageManager.FEATURE_CAMERA)) {
        // this device has a camera
        return true;
    } else {
        // no camera on this device
        return false;
    }
};


if (!checkCameraHardware(context)) {
    throw "没有摄像头";
};

toastLog("摄像头数量: " + FGH.Camera.getNumberOfCameras());



var mCamera;
try {
    //打开第1个(默认第1个)摄像头。
    mCamera = FGH.Camera.open();
} catch (e) {
    throw e + " 打开摄像头失败，可能没有权限请手动到应用权限里面打开";
};

//添加错误的回调。
mCamera.setErrorCallback(function(mCamera) {
    toastLog("有错误发生");
});

// get Camera parameters
var params = mCamera.getParameters();
//toastLog(mCamera.getParameters());
var previewSizes = params.getSupportedPreviewSizes();
/*
for (let i in previewSizes) {
    log(previewSizes[i]);
};
*/
var focusModes = params.getSupportedFocusModes();
/*
for (let i in focusModes) {
    log(focusModes[i]);
};
*/
if (focusModes.contains(FGH.Camera.Parameters.FOCUS_MODE_AUTO)) {
    // Autofocus mode is supported
    toastLog("支持自动对焦");
    // set the focus mode
    //params.setFocusMode(FGH.Camera.Parameters.FOCUS_MODE_AUTO);
    // set Camera parameters
    //mCamera.setParameters(params);
};

if (parseInt(device.release) >= 9) {
    //摄像头在正面还是反面？(Android9.0以上有效)
    // toastLog(FGH.Camera.getCameraInfo());
};

var surface = ui.surface;

var holder = surface.getHolder();

// 已弃用的设置，但在3.0之前的Android版本上需要此设置
holder.setType(FGH.SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);

//添加控件的回调事件。回调的意思是。当什么什么情况下，怎么怎么做？
holder.addCallback(new FGH.SurfaceHolder.Callback({
    surfaceCreated: function(holder) {
        //SurfaceView&SurfaceHolder的创建完成回调
        try {
            mCamera.setPreviewDisplay(holder);
            mCamera.setDisplayOrientation(90);
            mCamera.startPreview();
            /*
            if (focusModes.contains(FGH.Camera.Parameters.FOCUS_MODE_AUTO)) {
                // Autofocus mode is supported
                toastLog("支持自动对焦");
                // set the focus mode
                params.setFocusMode(FGH.Camera.Parameters.FOCUS_MODE_AUTO);
                // set Camera parameters
                mCamera.setParameters(params);
            };
            */
        } catch (e) {
            throw e;
        }
    },
    surfaceChanged: function(holder, format, width, height) {
        // 如果允许预览可以更改或旋转，可以在这里处理这些事件
        mCamera.stopPreview();
        this.surfaceCreated(holder);
    },
    surfaceDestroyed: function(holder) {
        //结束。//切换到其他软件页面也会运行此回调。
    },
}));


events.on("exit", function() {
    log("结束运行");
    //释放摄像头资源。
    //摄像头是手机所有应用程序的共用设备。
    //需要回收以便其他软件使用。
    mCamera.stopPreview();
    mCamera.release();
});

//预览过程中的回调。
mCamera.setOneShotPreviewCallback(new FGH.Camera.PreviewCallback({
    onPreviewFrame: function(data, camera) {
        //data为bytes数据;
        //这里可以做一些二维码识别的功能。
        //let bitmap=FGH.BitmapFactory.decodeByteArray(data, 0, data.length);

    },
}));

threads.start(function() {
    try {
        console.show();

    } catch (e) {
        toastLog(e);
    };
});



var mPictureCallback = new FGH.Camera.PictureCallback({
    onPictureTaken: function(data, camera) {
        camera.startPreview();
        //data为bytes数据;
        try {
            //拍出来的图片尺寸太大了，我靠。导致。保存图片用的时间太长了。
            let img1=images.fromBytes(data);
            let img2 = images.rotate(img1, 90);
            img1.recycle();
            let img=images.resize(img2, [ 1080,1540]);
            img2.recycle();
            //重设图片尺寸，旋转图片。
            let savePath = files.join(SaveDirPath, "/相机(拍照).png");

            images.save(img, savePath, "png", 100);
            img.recycle();
            toastLog("图片保存成功\n" + savePath);
            media.scanFile(savePath);
            app.viewFile(savePath);
        } catch (e) {
            toastLog(e);
        };
        ui.run(() => {
            ui.pz.setText("拍照");
            ui.search.setVisibility(8);
        });

    },
});

var mAutoFocusCallback = new FGH.Camera.AutoFocusCallback({
    onAutoFocus: function(success, camera) {
        // TODO Auto-generated method stub
        if (success) {
            log("聚焦成功...");
            //mCamera.takePicture(null, null, mPictureCallback);

            //这个有拍照声音。
            camera.takePicture(new FGH.Camera.ShutterCallback({
                //onShutter: function() {
                //    },
            }), null, mPictureCallback);
            ui.run(() => {
                ui.pz.setText("正在保存");
                ui.search.setVisibility(0);
            });

            //camera.takePicture(myShutterCallback, null, myJpegCallback);
        } else {
            log("聚焦失败...");
        }
    }
});

ui.surface.setOnClickListener(new FGH.View.OnClickListener({
    onClick: function(view) {
        try {
            //自动聚焦。
            mCamera.autoFocus(new FGH.Camera.AutoFocusCallback({
                onAutoFocus: function(success, camera) {
                    if (success) {
                        log("聚焦成功");
                    } else {
                        log("聚焦成功");

                    };
                }
            }));
            log("对焦");
        } catch (e) {
            toastLog(e);
        };
    },
}));


//点击拍照按钮。
ui.pz.setOnClickListener(new FGH.View.OnClickListener({
    onClick: function(view) {
        if (view.getText() == "拍照") {
            //自动聚焦。聚焦完成之后拍照。
            mCamera.autoFocus(mAutoFocusCallback);
            //toastLog("点击");
        };
    },
}));
