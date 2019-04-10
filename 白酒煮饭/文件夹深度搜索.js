"ui";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <text id="text" w="*" lines="1" ellipsize="middle"/>
            <horizontal w="*">
                <input id="input_p" hint="*路径" layout_weight="1" lines="1"/>
                <!--<button id="but_s_p" w="auto" text="选择"/>-->
                <input id="input_s" w="auto" hint="深度" />
            </horizontal>
            <text w="*" gravity="center" textSize="10sp" lines="1" autoLink="web" text="正则表达式学习网址: http://www.runoob.com/jsref/jsref-obj-regexp.html"/>
            <input id="input_d" hint="文件夹(字符或正则)"/>
            <input id="input_f" hint="*文件(字符或正则)"/>
            <input id="input_f_s" hint="文件内容(字符或正则)"/>
            <button id="but_p" w="*" text="路经搜索"/>
            <!--<button id="but_e" w="*" text="结果中搜索"/>-->
            <list id="list" w="*" layout_weight="1">
                <vertical w="*" margin="5" bg="{{colors.toString(colors.GRAY)}}">
                    <text w="*" text="{{name}}" textSize="20sp" lines="1" ellipsize="middle"/>
                    <text w="*" text="{{parent}}" lines="1" ellipsize="start"/>
                </vertical>
            </list>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="200" h="*">
                    <text w="*" text="帮助" textSize="30sp" lines="1" ellipsize="middle" gravity="center"/>
            <scroll h="*">
                <text id="help" h="*" textSize="20sp" margin="5" bg="{{colors.toString(colors.GRAY)}}"/>
            </scroll>
        </vertical>
    </drawer>
);
ui.help.setText("还没来得及写帮助");
var storage = storages.create("AJ深度搜索");
var CurrentThis = this;
var UiInputObj = {
    path: "/sdcard",
    depth: "2",
    dirNameRegExp: "脚本",
    fileNameRegExp: ".js",
    fileInsideRegExp: ""
};
var UiInputObj = storage.get("InputObj", UiInputObj);
ui.run(() => {
    ui.input_p.setText(UiInputObj.path);
    ui.input_s.setText(UiInputObj.depth);
    ui.input_d.setText(UiInputObj.dirNameRegExp);
    ui.input_f.setText(UiInputObj.fileNameRegExp);
    ui.input_f_s.setText(UiInputObj.fileInsideRegExp);
});
events.on("exit", function() {
    log("结束运行");
    storage.put("InputObj", {
        path: String(ui.input_p.getText()),
        depth: String(ui.input_s.getText()),
        dirNameRegExp: String(ui.input_d.getText()),
        fileNameRegExp: String(ui.input_f.getText()),
        fileInsideRegExp: String(ui.input_f_s.getText())
    });
});
var thread = null;


ui.but_p.click(function() {
    if (thread ? !thread.isAlive() : true) { //线程没有运行。

        var path = String(ui.input_p.getText());
        log("path " + path);
        if (!path) {
            toast("请输入路径");
            return;
        };
        //获取输入的路径。
        var C = parseInt(ui.input_s.getText());
        log("C" + C);
        //获取搜索深度。
        var dirReg = String(ui.input_d.getText());
        log("dirReg " + dirReg);
        if (dirReg) {
            try {
                var Reg = eval("(" + dirReg + ")");
                if (Reg instanceof RegExp) {
                    dirReg = Reg;
                };
            } catch (e) {};
        };
        //获取文件夹名的搜索字段。
        var fileReg = String(ui.input_f.getText());
        log("fileReg " + fileReg);
        if (!fileReg) {
            toast("必须输入文件名搜索字段");
            return;
        };
        try {
            var Reg = eval("(" + fileReg + ")");
            if (Reg instanceof RegExp) {
                fileReg = Reg;
            };
        } catch (e) {};

        //获取文件名的搜索字段
        var fileInsideReg = String(ui.input_f_s.getText());
        log("fileInsideReg " + fileInsideReg);
        if (fileInsideReg) {
            try {
                var Reg = eval("(" + fileInsideReg + ")");
                if (Reg instanceof RegExp) {
                    fileInsideReg = Reg;
                };
            } catch (e) {};
        };
        //获取文件内容搜索字段
        var fileList = new Array;
        ui.run(() => {
            ui.list.setDataSource(fileList);
            ui.but_p.setText("停止");
        });
        //新建一个线程，赋值给变量thread
        thread = threads.start(function() {
            //在线程里面执行其他事情。比如点击滑动等自动操作。(需要无障碍权限)
            //提示线程开始运行。
            toastLog("开始搜索");
            searchFiles(path, fileList, {
                dir: dirReg,
                file: fileReg,
                fileIn: fileInsideReg
            }, C);
            toastLog("搜索完成");
            ui.run(() => {
                ui.but_p.setText("路经搜索");
            });
        });
    } else {
        thread.interrupt();
        ui.run(() => {
            ui.but_p.setText("路经搜索");
        });
    };

});

ui.list.on("item_click", function(item, i, itemView, listView) {
    new weiFile(context, item.path).open();
});


function searchFiles(dir, list, RegexpObj, C, D) {
    ui.run(() => {
        ui.text.setText(String(dir));
    });
    //遍历该文件夹的文件
    files.listDir(dir).forEach(fileName => {
        var path = files.join(dir, fileName);
        //如果是子文件夹则继续扫描子文件夹的文件
        if (files.isDir(path)) {
            if ((!C && C != 0) || C > 0) {
                if (RegexpObj.dir) {
                    if ((RegexpObj.dir instanceof RegExp ? RegexpObj.dir.test(fileName) : (fileName.indexOf(RegexpObj.dir) + 1))) {
                        searchFiles(path, list, RegexpObj, C - 1, 1);
                    } else {
                        searchFiles(path, list, RegexpObj, C - 1, D);
                        //return;
                    };
                } else {
                    searchFiles(path, list, RegexpObj, C - 1, 0);
                };
            };
        } else {
            if (RegexpObj.file) {
                if (D == 0 || D == 1) {
                    if ((RegexpObj.file instanceof RegExp ? RegexpObj.file.test(fileName) : (fileName.indexOf(RegexpObj.file) + 1))) {
                        if (!RegexpObj.fileIn || (RegexpObj.fileIn instanceof RegExp ? RegexpObj.fileIn.test(String(files.read(path))) : (String(files.read(path)).indexOf(RegexpObj.fileIn) + 1))) {
                            //则把它添加到列表中
                            list.push({
                                name: fileName,
                                parent: dir,
                                path: path
                            });
                        };
                    };
                };
            } else {
                //则把它添加到列表中
                list.push({
                    name: fileName,
                    parent: dir,
                    path: path
                });
            };
        };
    });
};

//下面是要主要功能的模块。
function weiFile(ctx, path) {
    this.open = function() {
        var intent = new android.content.Intent("android.intent.action.VIEW");
        intent.setDataAndType(this.uri, this.MIMEType);
        ctx.startActivity(Intent.createChooser(intent, "打开文件(" + this.file.getName() + ")"));
    };
    this.share = function() {
        var sendIntent = new android.content.Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_STREAM, this.uri);
        sendIntent.setType(this.MIMEType);
        ctx.startActivity(Intent.createChooser(sendIntent, "分享文件(" + this.file.getName() + ")"));
    };
    this.getMIMEType = function(file) {
        var MIME_MapTable = {
            'text': ['.txt', '.c', '.conf', '.cpp', '.h', '.htm', '.html', '.java', '.txt', '.js', '.log', '.prop', '.rc', '.sh', '.xml'],
            'image': ['.bmp', '.gif', '.jpeg', '.jpg', '.png'],
            'audio': ['.m3u', '.m4a', '.m4b', '.m4p', '.mp2', '.mp3', '.mpga', '.ogg', '.rmvb', '.wav', '.wma', '.wmv'],
            'video': ['.3gp', '.asf', '.avi', '.m4u', '.m4v', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpg4'],
            'application': ['.apk', '.bin', '.class', '.doc', '.docx', '.xls', '.xlsx', '.exe', '.gtar', '.gz', '.jar', '.js', '.mpc', '.msg', '.pdf', '.pps', '.ppt', '.pptx', '.rtf', '.tar', '.tgz', '.wps', '.z', '.zip'],
            '*': ['']
        };
        var type = "*/*";
        var fName = String(file.getName());
        var dotIndex = fName.split(".");
        if (dotIndex.length < 2) {
            return type;
        }
        var end = String("." + dotIndex.pop()).toLowerCase();
        if (end == "") {
            return type;
        };
        for (var i in MIME_MapTable) {
            var ary = MIME_MapTable[i];
            for (var a = 0; a < ary.length; a++) {
                if (end == ary[a]) {
                    toastLog(i + "/*" + "/" + end);
                    return i + "/*";
                };
            };
        };
        return type;
    }

    this.file = new java.io.File(String(path));
    this.uri = android.net.Uri.fromFile(this.file);
    //this.uri = android.support.v4.content.FileProvider.getUriForFile(ctx, "org.autojs.autojs.fileprovider", this.file);
    this.MIMEType = this.getMIMEType(this.file);
};