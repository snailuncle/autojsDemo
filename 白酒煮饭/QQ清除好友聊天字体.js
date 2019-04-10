var info = "sdcard/tencent/MobileQQ/.font_info"
if (confirm("是否将所有好友的字体恢复系统默认？")) {


    if (files.exists(info)) {
        files.removeDir(info);
        files.createIfNotExists(info);
        toastLog("请刷新QQ查看");

    } else {
        toastLog("字体文件不存在");
        exit();
    }
} else {
    exit();
    //在这里更新恢复正常字体功能

}