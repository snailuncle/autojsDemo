let FileChooserDialog = require("./file_chooser_dialog");
FileChooserDialog.build({
    title: '请选择目标文件',
    // 初始文件夹路径
    dir: "/sdcard/脚本",
    // 可选择的类型，file为文件，dir为文件夹
    canChoose: ["file"],
    // 选择文件后的回调
    fileCallback: (file) => {
        toast(file);
    }
})
    .show();