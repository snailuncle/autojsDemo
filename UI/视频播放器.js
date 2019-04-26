"ui";
ui.layout(
    <vertical gravity="center_horizontal">
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

var videoFilesList = new Array;
var fileExtsList = ["mp4"];
var CurrentPlay = 0;
ui.list.setDataSource(videoFilesList);
var mc = new android.widget.MediaController(activity);
ui.video.setMediaController(mc);

ui.list.on("item_click", function(item, i) {
    if (CurrentPlay != i) {
        CurrentPlay = i;
        var path = files.join(item.dir, item.name);
        // toastLog(path);
        ui.run(() => {
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
