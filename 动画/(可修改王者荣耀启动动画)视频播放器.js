"ui";
//(可修改王者荣耀启动动画)视频播放器
ui.layout(
    <vertical gravity="center_horizontal">
        <button id="text" w="*" gravity="center"/>
        <VideoView id="video" w="auto" h="auto" />
        <frame w="*" h="*">
            <list id="list" h="*">
                <linear w="*" bg="?selectableItemBackground">
                    <img src="@drawable/ic_videocam_black_48dp" tint="white" bg="#ff5722" w="50" h="50" margin="16" />
                    <vertical>
                        <text textSize="16sp" textColor="#000000" text="{{this.name}}" marginTop="16" maxLines="1" ellipsize="middle"/>
                        <text textSize="13sp" textColor="#929292" text="{{this.dir}}" marginTop="8" maxLines="1" ellipsize="start"/>
                    </vertical>
                </linear>
            </list>
            <progressbar id="search" w="auto" h="auto" layout_gravity="center"/>
        </frame>
    </vertical>
);

var 王者动画路经 = "/storage/emulated/0/Android/data/com.tencent.tmgp.sgame/files/Resources/Splash_move/";
var 王者动画名 = "Splash_test.mp4";
var videoFilesList = new Array;
var fileExtsList = ["mp4", "avi", "3gp"];
var CurrentPlay = 0;
ui.list.setDataSource(videoFilesList);
var mc = new android.widget.MediaController(activity);
ui.video.setMediaController(mc);
//mc.setMediaPlayer(ui.video);//也没必要。
toastLog("点击文件名可修改");

ui.text.click(function(v) {
    threads.start(function() {
        var dir = videoFilesList[CurrentPlay].dir;
        var name = videoFilesList[CurrentPlay].name;
        var size = parseInt(ui.video.getDuration());
        //toastLog(size);
        if (new java.io.File(files.join(王者动画路经, "王者动画.mp4")).exists() && dialogs.confirm("是否还原动画")) {
            toastLog("执行还原操作");
            if (files.remove(files.join(王者动画路经, 王者动画名)) && files.rename(files.join(王者动画路经, "王者动画.mp4"), 王者动画名)) {
                toastLog("还原成功");
            };
            return;
        };
        if (dialogs.confirm("是否修改为王者荣耀启动动画") && dialogs.confirm("不清楚是否有封号的风险,作者不负责") && (size >= 120000 ? dialogs.confirm("文件过大不建议") : true)) {
            toastLog("执行修改操作");
            if (!new java.io.File(files.join(王者动画路经, "王者动画.mp4")).exists()) {
                if (!files.rename(files.join(王者动画路经, 王者动画名), "王者动画.mp4")) {
                    toastLog("操作失败");
                    return;
                };
            };
            if(!files.copy(files.join(dir,name),files.join(王者动画路经, 王者动画名))){
                    toastLog("操作失败");
                    return;
            };
            toastLog("修改成功");
        };
    });
});

ui.list.on("item_click", function(item, i) {
    if (CurrentPlay != i) {
        CurrentPlay = i;
        var path = files.join(item.dir, item.name);
        // toastLog(path);
        ui.run(() => {
            ui.text.setText(String(item.name));
            ui.video.setVideoPath(path);
            ui.video.start();
        });
    };
});

ui.video.setOnCompletionListener(function() {
    // toastLog("下一个");
    CurrentPlay++;
    CurrentPlay = (0 <= CurrentPlay && CurrentPlay < videoFilesList.length) ? CurrentPlay : (0 <= CurrentPlay ? 0 : videoFilesList.length - 1);
    var path = files.join(videoFilesList[CurrentPlay].dir, videoFilesList[CurrentPlay].name);
    // toastLog(path);
    ui.run(() => {
        ui.text.setText(String(videoFilesList[CurrentPlay].name));
        ui.video.setVideoPath(path);
        ui.video.start();
    });
});

threads.start(function() {
    searchFiles("/sdcard", videoFilesList, fileExtsList, 2);
});
threads.start(function() {
    while (true) {
        if (videoFilesList.length) {
            var path = files.join(videoFilesList[CurrentPlay].dir, videoFilesList[CurrentPlay].name);
            // toastLog(path);
            ui.run(() => {
                ui.search.setVisibility(8);
                ui.text.setText(String(videoFilesList[CurrentPlay].name));
                ui.video.setVideoPath(path);
                ui.video.start();
            });
            break;
        };
    };
});

function searchFiles(dir, list, fileExts, C) {
    //遍历该文件夹的文件
    files.listDir(dir).forEach(fileName => {
        // C == 1 ? log(C, fileName) : 0;
        var path = files.join(dir, fileName);
        //如果是子文件夹则继续扫描子文件夹的文件
        if (files.isDir(path) && ((!C && C != 0) || C > 0)) {
            searchFiles(path, list, fileExts, C - 1);
            return;
        }
        for (var i = 0; i < fileExts.length; i++) {
            //如果文件名的后缀是音乐格式
            if (fileName.split(".")[1] == fileExts[i] && fileName.endsWith(fileExts[i])) {
                //则把它添加到列表中
                list.push({
                    name: fileName,
                    dir: dir
                });
            }
        }
    });
};

//Toast.makeText(this, "拒绝权限将无法使用程序", Toast.LENGTH_SHORT).show();