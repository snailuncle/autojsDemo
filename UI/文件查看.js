"ui";
/**
*作者QQ: 1811588980
*完成时间: 2019年2月13日 下午8:41:29
*测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
*备注: 文件和文件夹分类排序。
**/


var scrollView = XmlToView(
    <scroll/>
);

var myView = new getMyView("/sdcard/脚本");
scrollView.addView(myView.view);

ui.setContentView(scrollView);





function getMyView(path) {
    this.fun = arguments.callee;
    this.file = new myFile(path);
    this.thread = null;
    this.view = XmlToView(
        <vertical id="vt_1" margin="5" >
            <text id="name" textSize="25"margin="5"bg="#dddddd"/>
            <vertical id="vt_2" marginLeft="25">
            </vertical>
        </vertical>
    );
    if (this.file.file.isDirectory()) {
        //ui.run(()=>{
        this.view.name.setText("▽" + String(this.file.name));
        //});
    } else {
        //ui.run(()=>{
        this.view.name.setText("♢" + String(this.file.name));
        //});
    };
    this.view.name.click(() => {
        if (this.file.file.isDirectory()) {
            //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
            if (this.thread ? !this.thread.isAlive() : true) { //线程没有运行。
                if (!this.file.isOpen) {

                    this.isadd = true;
                    var ary = this.file.list();
                    this.thread = threads.start(new java.lang.Runnable(() => {

                        ary.forEach((file) => {
                            ui.run(() => {
                                this.view.vt_2.addView(new this.fun(file.file).view);
                            });
                        });
                        this.file.isOpen = true;
                        ui.run(() => {
                            this.view.name.setText("△" + String(this.file.name));
                        });
                    }));
                } else {
                    this.view.vt_2.removeAllViews();
                    this.file.isOpen = false;
                    //ui.run(()=>{
                    this.view.name.setText("▽" + String(this.file.name));
                    //});
                };
            } else {
                toast("正在加载，我也没办法改这个问题呀");
            };
        } else {
            threads.start(new java.lang.Runnable(() => {
                let k = dialogs.confirm("打开文件?", this.file.name);
                if (k) {
                    app.editFile(this.file.path);
                };
            }));
        }
    });
};


function myFile(path) {
    this.fun = arguments.callee;
    this.file = new java.io.File(path);
    this.name = this.file.name;
    this.path = this.file.path;
    this.isOpen = false;
    this.list = function() {
        return []
    };
    if (this.file.isDirectory()) {
        this.list = function() {
                var fileList = this.file.listFiles();
    //    log(fileList);
    var dirList = fileList.filter(function(file) {
        return file.isDirectory();
    }).sort();
    var fileList = fileList.filter(function(file) {
        return file.isFile();
    }).sort();
            return dirList.concat(fileList).map((file) => {
                return new this.fun(file);
            });
        };
    };
};


function XmlToView(xml) {
    runtime.ui.layoutInflater.setContext(context);
    return runtime.ui.layoutInflater.inflate(xml.toXMLString().toString(), null, true);
};
